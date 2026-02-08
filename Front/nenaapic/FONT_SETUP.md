# Installation de la police Bruney

## Option 1 : Police locale (recommandé si tu as Bruney)

1. Télécharge la police Bruney
2. Crée le dossier `public/fonts/`
3. Place les fichiers :
   - `Bruney-Regular.woff2`
   - `Bruney-Regular.woff`
   - `Bruney-Bold.woff2`
   - `Bruney-Bold.woff`

Les @font-face sont déjà configurés dans `src/index.css`

## Option 2 : Police alternative (si Bruney indisponible)

Utilise **Cormorant Garamond** (similaire à Bruney) :

1. Dans `src/index.css`, remplace :
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap');
```

Et commente les @font-face de Bruney.

2. Dans `tailwind.config.js`, remplace :
```js
fontFamily: {
  heading: ['Cormorant Garamond', 'serif'],
}
```

## Option 3 : Autres alternatives

- **Playfair Display** : Élégant, serif classique
- **Bodoni Moda** : Moderne, luxueux
- **Libre Baskerville** : Serif raffiné

Tape juste :
```bash
npm start
```

Le site fonctionnera avec les polices système par défaut en attendant.
