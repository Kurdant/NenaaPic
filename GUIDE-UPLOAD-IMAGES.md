# 📸 NenaaPic - Guide d'Upload des Images

## 🎯 Comment utiliser le système d'upload

Tu peux uploader les images directement depuis l'interface admin à: **`/admin`** 

Ou tu peux télécharger les images en bulk. Voici la **structure exacte** qu'il faut respecter:

---

## 📁 Structure des dossiers et noms d'images

### **1. PORTFOLIO (9 images total)**

#### Mariages (3 images)
```
portfolio/mariages/
├── mariage-1.jpg
├── mariage-2.jpg
└── mariage-3.jpg
```

#### Portraits (3 images)
```
portfolio/portraits/
├── portrait-1.jpg
├── portrait-2.jpg
└── portrait-3.jpg
```

#### Couples (3 images)
```
portfolio/couples/
├── couple-1.jpg
├── couple-2.jpg
└── couple-3.jpg
```

#### Entreprise (3 images) ⚠️ À CRÉER
```
portfolio/entreprise/
├── entreprise-1.jpg
├── entreprise-2.jpg
└── entreprise-3.jpg
```

---

### **2. SERVICES (4 images)**

```
services/
├── mariage.jpg
├── portraits.jpg
├── entreprise.jpg
└── couples.jpg
```

**Important**: Les noms DOIVENT correspondent exactement aux titres des services!

---

### **3. HEADER (1 image)**

```
header/
└── banner.jpg
```

---

## 🚀 Comment uploader

### **Via l'interface Admin (/admin)**

1. Va sur `https://nenaa-pic.kurdant.fr/admin`
2. **Sélectionne la catégorie** (ex: "Portfolio - Mariages")
3. **Choisis ton image**
4. **Entre le nom** exactement comme indiqué ci-dessus (ex: `mariage-1`)
5. **Clique UPLOAD**

### **Via dossiers (Bulk upload)**

1. Crée la structure de dossiers sur ton ordinateur:
```
uploads/
├── portfolio/
│   ├── mariages/
│   ├── portraits/
│   ├── couples/
│   └── entreprise/
├── services/
└── header/
```

2. Mets les images dans les bons dossiers avec les **noms exacts**
3. Uploader chaque dossier via l'interface admin

---

## 📝 Liste des images à fournir

| Catégorie | Nom | Dimensions recommandées |
|-----------|-----|------------------------|
| **Mariages** | mariage-1.jpg | 1920x1080+ |
| | mariage-2.jpg | 1920x1080+ |
| | mariage-3.jpg | 1920x1080+ |
| **Portraits** | portrait-1.jpg | 1920x1080+ |
| | portrait-2.jpg | 1920x1080+ |
| | portrait-3.jpg | 1920x1080+ |
| **Couples** | couple-1.jpg | 1920x1080+ |
| | couple-2.jpg | 1920x1080+ |
| | couple-3.jpg | 1920x1080+ |
| **Entreprise** | entreprise-1.jpg | 1920x1080+ |
| | entreprise-2.jpg | 1920x1080+ |
| | entreprise-3.jpg | 1920x1080+ |
| **Services** | mariage.jpg | 1920x1080+ |
| | portraits.jpg | 1920x1080+ |
| | couples.jpg | 1920x1080+ |
| | entreprise.jpg | 1920x1080+ |
| **Header** | banner.jpg | 2560x1440+ |

---

## ✅ Checklist avant de valider

- [ ] Tous les noms sont **EXACTEMENT** comme indiqué (majuscules/minuscules comptent)
- [ ] Les images sont en **JPG ou PNG**
- [ ] Les dimensions sont **1920x1080 minimum** (sauf banner: 2560x1440)
- [ ] Les fichiers pèsent **moins de 5MB** chacun
- [ ] Les images sont dans les **bons dossiers**

---

## 🆘 Aide rapide

**Je veux changer une image:**
1. Va sur `/admin`
2. Sélectionne la catégorie
3. Hover sur l'image et clique "Supprimer"
4. Upload la nouvelle avec le même nom

**Je veux ajouter plus d'images:**
- Portfolio: Tu peux ajouter mariage-4.jpg, portrait-4.jpg, etc.
- Mais faut que Hugo mette à jour le site pour les afficher!

**Un nom d'image est mal écrit:**
- Supprime l'image
- Re-upload avec le bon nom
- **OU** demande à Hugo de changer le nom en code

---

**Questions?** Contacte Hugo! 🚀
