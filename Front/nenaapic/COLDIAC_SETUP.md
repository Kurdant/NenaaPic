# Installation de la police Coldiac Free Regular

## Étapes pour installer Coldiac :

1. **Télécharge la police Coldiac Free Regular**
   - Depuis le site officiel ou ton dossier de polices

2. **Place les fichiers dans `public/fonts/`**
   
   Les fichiers nécessaires :
   - `Coldiac-Regular.woff2` (recommandé, meilleure compression)
   - `Coldiac-Regular.woff` (fallback)
   - `Coldiac-Regular.ttf` (fallback)

3. **Structure attendue :**
   ```
   Front/nenaapic/public/fonts/
   ├── Coldiac-Regular.woff2
   ├── Coldiac-Regular.woff
   └── Coldiac-Regular.ttf
   ```

4. **Redémarre le serveur**
   ```bash
   cd Front\nenaapic
   npm start
   ```

## Configuration actuelle :

✅ `src/index.css` - @font-face configuré pour Coldiac  
✅ `tailwind.config.js` - Coldiac défini comme police heading  
✅ Dossier `public/fonts/` créé  

**Une fois les fichiers de police ajoutés, la police Coldiac s'appliquera automatiquement !**

---

## Si tu n'as pas les fichiers Coldiac :

Le site utilisera la police système par défaut (sans-serif) en attendant.
Tous les titres (H1, H2, H3) utiliseront Coldiac une fois les fichiers ajoutés.
