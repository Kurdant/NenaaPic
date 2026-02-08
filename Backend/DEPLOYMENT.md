# NenaaPic Backend - VPS Deployment Guide

## Prerequisites
- VPS Debian 13.0 running
- SSH access configured
- Domain: nenaa-pic.kurdant.fr pointed to VPS IP

## Deployment Steps

### 1. SSH into VPS
```bash
ssh root@[YOUR_VPS_IP]
```

### 2. Install Node.js & PM2 (if not already installed)
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js (latest LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Verify installations
node -v
npm -v
pm2 --version
```

### 3. Create app directory and copy files
```bash
# Create directory structure
mkdir -p /home/nenaa-pic-backend
cd /home/nenaa-pic-backend

# Create uploads folder
mkdir -p uploads

# Create package.json (copy content from Backend/package.json)
# Create server.js (copy content from Backend/server.js)
```

### 4. Install dependencies
```bash
npm install
```

### 5. Create .env file
```bash
cat > .env << EOF
PORT=5000
UPLOAD_DIR=/home/nenaa-pic-backend/uploads
API_PASSWORD=nenaapic1234
NODE_ENV=production
EOF
```

### 6. Start with PM2
```bash
pm2 start server.js --name "nenaa-pic-backend"
pm2 save
pm2 startup
```

### 7. Setup Nginx (reverse proxy)
```bash
# Install nginx if needed
apt install -y nginx

# Create nginx config
cat > /etc/nginx/sites-available/nenaa-pic.kurdant.fr << 'EOF'
server {
    listen 80;
    server_name nenaa-pic.kurdant.fr;
    
    client_max_body_size 50M;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/nenaa-pic.kurdant.fr /etc/nginx/sites-enabled/

# Test nginx config
nginx -t

# Restart nginx
systemctl restart nginx
systemctl enable nginx
```

### 8. Setup SSL with Let's Encrypt (recommended)
```bash
apt install -y certbot python3-certbot-nginx

certbot --nginx -d nenaa-pic.kurdant.fr
```

### 9. Verify backend is running
```bash
pm2 status
pm2 logs nenaa-pic-backend

# Test endpoint
curl http://localhost:5000/health
```

## Full Deployment Script (Copy-Paste)
Run this all at once:

```bash
#!/bin/bash

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs npm

# Install PM2
npm install -g pm2

# Create directory
mkdir -p /home/nenaa-pic-backend/uploads
cd /home/nenaa-pic-backend

# Create package.json
cat > package.json << 'EOF'
{
  "name": "nenaa-pic-backend",
  "version": "1.0.0",
  "description": "Image upload backend for NenaaPic",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.0",
    "dotenv": "^16.3.1"
  }
}
EOF

# Create server.js
# [PASTE server.js content here]

# Install dependencies
npm install

# Create .env
cat > .env << 'EOF'
PORT=5000
UPLOAD_DIR=/home/nenaa-pic-backend/uploads
API_PASSWORD=nenaapic1234
NODE_ENV=production
EOF

# Start with PM2
pm2 start server.js --name "nenaa-pic-backend"
pm2 save
pm2 startup

# Install and configure nginx
apt install -y nginx

cat > /etc/nginx/sites-available/nenaa-pic.kurdant.fr << 'EOF'
server {
    listen 80;
    server_name nenaa-pic.kurdant.fr;
    client_max_body_size 50M;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -s /etc/nginx/sites-available/nenaa-pic.kurdant.fr /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
systemctl enable nginx

# Setup SSL
apt install -y certbot python3-certbot-nginx
certbot --nginx -d nenaa-pic.kurdant.fr -n --agree-tos -m your-email@example.com

echo "✅ Deployment complete!"
echo "Check status: pm2 status"
echo "View logs: pm2 logs nenaa-pic-backend"
```

## Commands after deployment

```bash
# Check status
pm2 status

# View logs
pm2 logs nenaa-pic-backend

# Stop
pm2 stop nenaa-pic-backend

# Restart
pm2 restart nenaa-pic-backend

# Update code (if you make changes)
cd /home/nenaa-pic-backend
git pull # or copy new files
pm2 restart nenaa-pic-backend
```

## Testing

After deployment, test these URLs:

```bash
# Health check
curl http://nenaa-pic.kurdant.fr/health

# Try upload (from local)
curl -X POST http://nenaa-pic.kurdant.fr/api/upload \
  -H "x-api-password: nenaapic1234" \
  -F "image=@/path/to/image.jpg"
```
