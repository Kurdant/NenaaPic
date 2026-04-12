#!/bin/bash
# ============================================================
# NenaaPic — Script déploiement VPS 185.216.26.204
# Usage : bash deploy-vps.sh
# Exécuter en tant que root sur le VPS
# ============================================================

set -e
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo -e "${GREEN}=== NenaaPic VPS Setup ===${NC}"

# ── 1. Système ──────────────────────────────────────────────
echo -e "${YELLOW}[1/6] Mise à jour système...${NC}"
apt update && apt upgrade -y
apt install -y nginx git curl

# ── 2. Node.js 20 + PM2 ─────────────────────────────────────
echo -e "${YELLOW}[2/6] Installation Node.js 20 + PM2...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
echo "Node: $(node -v) | NPM: $(npm -v) | PM2: $(pm2 -v)"

# ── 3. Dossier API ───────────────────────────────────────────
echo -e "${YELLOW}[3/6] Setup dossier API...${NC}"
mkdir -p /home/nenaapic-api/uploads
cd /home/nenaapic-api

# Copier les fichiers backend (à faire manuellement ou via git)
echo -e "${YELLOW}  → Place server.js et package.json dans /home/nenaapic-api/${NC}"
echo -e "${YELLOW}  → Appuie sur Entrée quand c'est fait...${NC}"
read -p ""

# Créer .env
cat > /home/nenaapic-api/.env << 'EOF'
PORT=5000
UPLOAD_DIR=/home/nenaapic-api/uploads
API_PASSWORD=nenaapic1234
NODE_ENV=production
EOF

npm install

# ── 4. PM2 ───────────────────────────────────────────────────
echo -e "${YELLOW}[4/6] Démarrage avec PM2...${NC}"
pm2 delete nenaapic-api 2>/dev/null || true
pm2 start /home/nenaapic-api/server.js --name "nenaapic-api"
pm2 save
pm2 startup | tail -1 | bash 2>/dev/null || true

# ── 5. Nginx ─────────────────────────────────────────────────
echo -e "${YELLOW}[5/6] Configuration Nginx...${NC}"

cat > /etc/nginx/sites-available/nenaapic-api << 'EOF'
server {
    listen 80;
    server_name 185.216.26.204;

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Désactiver default si présent
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/nenaapic-api /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# ── 6. Vérification ──────────────────────────────────────────
echo -e "${YELLOW}[6/6] Vérification...${NC}"
sleep 2
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health)
if [ "$STATUS" = "200" ]; then
    echo -e "${GREEN}✅ API OK — http://185.216.26.204:5000/health${NC}"
else
    echo -e "⚠️  API status: $STATUS — vérifie avec: pm2 logs nenaapic-api"
fi

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Backend prêt sur http://185.216.26.204   ${NC}"
echo -e "${GREEN}  API Gallery : GET /api/gallery           ${NC}"
echo -e "${GREEN}  Upload admin : le front pointe dessus    ${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo "Commandes utiles :"
echo "  pm2 status          → état des services"
echo "  pm2 logs nenaapic-api → logs en direct"
echo "  pm2 restart nenaapic-api → restart"
