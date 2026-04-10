# Homepage — Maquette & Spécification Complète

## Référence visuelle
- Hero actuel à garder : screenshot hero NenaaPic
- Section texte inspi : `jeroennoordzij.com` (Capturing Editorial Essence)
- Section CTA inspi : `jeroennoordzij.com` (Get In Touch)

---

## Vue d'ensemble — Flux de la Homepage

```
┌─────────────────────────────────┐
│                                 │
│    ÉCRAN DE CHARGEMENT          │
│    (2 secondes)                 │
│    fond jaune pastel sombre     │
│    "NENAA PICTURE"              │
│                                 │
├─────────────────────────────────┤  ← Scroll snap section 1
│                                 │
│         HERO (inchangé)         │
│    Photo plein écran + glass    │
│    "NENAAPIC"                   │
│    "Capturer la beauté..."      │
│    [EXPLORER MON TRAVAIL]       │
│                                 │
├─────────────────────────────────┤  ← Scroll snap section 2
│                                 │
│    SECTION TEXTE (fond noir)    │
│    Titre géant serif            │
│    "CAPTURER L'ESSENCE"         │
│    "DE VOS MOMENTS"             │
│    + paragraphe 2 colonnes      │
│    + lien "À PROPOS ⊕"         │
│                                 │
├─────────────────────────────────┤  ← Scroll snap section 3
│                                 │
│    MINI PORTFOLIO SLIDER        │
│    (fond noir)                  │
│    Cards plein écran            │
│    Images qui remplissent tout  │
│    Navigation slider dots/flèch │
│                                 │
├─────────────────────────────────┤  ← Scroll snap section 4
│                                 │
│    GET IN TOUCH                 │
│    (fond jaune pastel léger)    │
│    Titre géant noir             │
│    Texte centré noir            │
│    "CONTACTEZ-MOI ⊕"           │
│                                 │
├─────────────────────────────────┤
│    FOOTER (noir, simple)        │
└─────────────────────────────────┘
```

---

## 1. Écran de Chargement (Splash Screen)

### Visuel
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│        NENAA PICTURE            │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
    fond : jaune pastel sombre
```

### Spécifications
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Durée                  | **2 secondes** puis fade-out                         |
| Fond                   | Jaune pastel sombre/chaud — `#F5E6C8` ou `#E8D5A8`  |
| Texte                  | `NENAA PICTURE`                                       |
| Police texte           | Playfair Display, 700, uppercase, tracking très élargi |
| Taille texte           | `~3rem` à `4rem`                                     |
| Couleur texte          | Noir profond `#0F1419` ou `#1A1A1A`                  |
| Position               | Centré horizontal + vertical                          |
| Z-index                | `100` (au-dessus de tout)                            |
| Animation sortie       | Fade-out `opacity 1→0` + léger `scale(1.02)`, 0.6s  |
| Position CSS           | `fixed inset-0`                                      |
| Après disparition      | `display: none` ou démonté du DOM                    |

### Comportement
- Affiché au premier chargement du site uniquement
- Bloque le scroll pendant les 2 secondes
- Fade-out élégant après 2s → révèle le Hero en dessous
- Option: ne s'affiche qu'une fois par session (sessionStorage)

---

## 2. Hero Section (INCHANGÉE)

Le composant `HeroBannerV2.jsx` actuel reste **exactement tel quel** :
- Photo plein écran de Nice (banner.jpg)
- Moitié gauche floue
- Card glassmorphism centrée avec :
  - `NENAAPIC` (gros titre blanc)
  - `Capturer la beauté de la vie` (sous-titre)
  - Boutons `EXPLORER MON TRAVAIL` + `ME CONTACTER`
- Éléments décoratifs jaunes (ligne + cercle)
- Hauteur : `100vh`

### Seul ajustement
- Retirer le `-mt-16` puisqu'il n'y a plus de header bar
- Le hero doit coller au top de la page (`margin-top: 0`)

---

## 3. Section Texte — "Capturer l'Essence" (fond noir)

### Visuel (d'après référence jeroennoordzij)
```
┌─────────────────────────────────────────────────┐
│                                                 │
│                   fond #000000                  │
│                                                 │
│                                                 │
│            CAPTURER                             │
│         L'ESSENCE DE                            │
│         VOS MOMENTS                             │
│                                                 │
│   Photographe passionnée     Mon approche       │
│   basée à Nice, je capture   artistique combine │
│   l'essence de vos moments   technique pro et   │
│   les plus précieux...       sensibilité...     │
│                                                 │
│          À PROPOS DE NENAAPIC  ⊕                │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Spécifications
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Fond                   | `#000000` (noir pur)                                 |
| Hauteur                | `100vh` (plein écran)                                |
| Layout                 | Flex column, centré verticalement                    |
| Padding horizontal     | `~5rem` à `8rem` (large marge latérale)              |

### Titre
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Texte                  | `CAPTURER` / `L'ESSENCE DE` (italique) / `VOS MOMENTS` |
| Police                 | Playfair Display, 700                                |
| Taille                 | `~5rem` à `7rem` (très grand, impactant)             |
| Couleur                | `#FFFFFF`                                            |
| Alignement             | Centré                                               |
| Italique               | La ligne du milieu en *italique* pour contraste      |
| Casse                  | MAJUSCULES                                           |

### Paragraphe
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Layout                 | **2 colonnes** côte à côte                           |
| Police                 | Inter, 400, `~0.95rem`                               |
| Couleur                | `rgba(255,255,255,0.75)`                             |
| Line-height            | 1.7                                                  |
| Max-width              | `~900px` centré                                      |
| Gap entre colonnes     | `~3rem`                                              |

### Lien "À Propos"
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Texte                  | `À PROPOS DE NENAAPIC`                               |
| Icône                  | Cercle avec `+` (⊕) à droite du texte               |
| Police                 | Inter, 500, uppercase, tracking élargi, `~0.85rem`   |
| Couleur                | `#FFFFFF`                                            |
| Hover                  | Underline ou couleur primary-yellow                  |
| Route                  | `<Link to="/about">`                                 |
| Position               | Centré, sous le paragraphe, `margin-top: ~3rem`      |

### Animation d'entrée
- **Scroll-triggered** : quand la section entre dans le viewport
- Le titre apparaît avec `translateY(40px) → 0` + `opacity 0→1`, durée 0.6s
- Le paragraphe suit avec délai +0.2s
- Le lien suit avec délai +0.4s
- **L'effet doit être "instantané"** — snap scroll feel, la section prend tout l'écran d'un coup

---

## 4. Mini Portfolio Slider (fond noir)

### Visuel
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │                                           │  │
│  │        IMAGE PLEIN ÉCRAN                  │  │
│  │        (photo portfolio)                  │  │
│  │                                           │  │
│  │                                           │  │
│  │                          Titre du projet  │  │
│  │                          Catégorie        │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│              ●  ○  ○  ○  ○                      │
│          ou  ◀  1/5  ▶                          │
│                                                 │
│        VOIR TOUT LE PORTFOLIO  ⊕                │
│                                                 │
└─────────────────────────────────────────────────┘
      fond #000000 ou #0A0A0A
```

### Spécifications
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Fond                   | `#000000`                                            |
| Hauteur                | `100vh`                                              |
| Layout                 | Flex column centré                                   |

### Cards du slider
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Taille image           | Quasi plein écran — `~85vw` × `~65vh`               |
| Aspect                 | L'image remplit tout l'espace de la card             |
| Border-radius          | `0` ou très subtil `4px`                             |
| Overlay                | Léger gradient bottom pour le texte                  |
| Titre projet           | Blanc, Playfair Display, `~1.5rem`, bottom-right     |
| Catégorie              | Blanc/gris, Inter, `~0.8rem`, sous le titre          |

### Navigation slider
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Type                   | Dots ou compteur (`1 / 5`) ou flèches gauche/droite |
| Couleur                | Blanc, dot actif = plein, inactifs = outline          |
| Transition             | Slide horizontal avec ease, `0.5s`                   |
| Swipe                  | Support tactile (touch drag)                         |
| Auto-play              | Non (manuel uniquement)                              |

### Lien Portfolio
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Texte                  | `VOIR TOUT LE PORTFOLIO`                             |
| Style                  | Identique au lien "À Propos" section précédente      |
| Route                  | `<Link to="/portfolio">`                             |

### Images sources
Les images viennent de l'API :
```
${API_URL}/api/uploads/portfolio/mariages/mariage-1.jpg
${API_URL}/api/uploads/portfolio/portraits/portrait-1.jpg
${API_URL}/api/uploads/portfolio/couples/couple-1.jpg
${API_URL}/api/uploads/portfolio/entreprise/entreprise-1.jpg
...
```

### Animation d'entrée
- Même snap scroll que les autres sections
- La première card apparaît avec un léger scale-in (`scale(0.95)→1`)

---

## 5. Section "Get In Touch" (fond jaune pastel)

### Visuel (adapté de la référence)
```
┌─────────────────────────────────────────────────┐
│                                                 │
│     fond jaune pastel très léger                │
│                                                 │
│                                                 │
│                                                 │
│           GET IN TOUCH                          │
│                                                 │
│   Prête à créer quelque chose                   │
│   d'inoubliable ? Que ce soit pour              │
│   votre mariage, un portrait, ou un             │
│   projet créatif, je suis là pour               │
│   donner vie à votre vision.                    │
│                                                 │
│         CONTACTEZ-MOI  ⊕                        │
│                                                 │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Spécifications
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Fond                   | Jaune pastel très léger — `#FBF7EF` ou `#F8F0E0`    |
| Hauteur                | `100vh`                                              |
| Layout                 | Flex column centré vertical + horizontal             |
| Padding                | Large `~5rem` à `8rem`                               |

### Titre
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Texte                  | `GET IN TOUCH`                                       |
| Police                 | Playfair Display, 700                                |
| Taille                 | `~5rem` à `8rem` (même scale que la section texte)   |
| Couleur                | Noir profond `#0F1419`                               |
| Casse                  | MAJUSCULES                                           |
| Alignement             | Centré                                               |

### Paragraphe
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Police                 | Inter, 400, `~1rem`                                  |
| Couleur                | `#2C3E50` ou `#333333`                               |
| Max-width              | `~650px`                                             |
| Alignement             | Centré                                               |
| Line-height            | 1.7                                                  |

### Lien CTA
| Propriété              | Valeur                                              |
|------------------------|------------------------------------------------------|
| Texte                  | `CONTACTEZ-MOI`                                      |
| Icône                  | Cercle avec `+` (⊕) à droite                        |
| Police                 | Inter, 500, uppercase, tracking élargi               |
| Couleur                | `#0F1419`                                            |
| Hover                  | Underline ou couleur primary-yellow                  |
| Route                  | `<Link to="/contact">`                               |

### Animation d'entrée
- Identique aux autres sections
- Titre slide-up + fade, texte suit, CTA suit

---

## Scroll Behavior — Snap + Reveal

### Approche technique
Chaque section = `100vh`, défilement en **scroll-snap** pour l'effet "d'un coup" :

```css
/* Container principal */
.homepage {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

/* Chaque section */
.snap-section {
  scroll-snap-align: start;
  height: 100vh;
  overflow: hidden;
}
```

### Animations
- Chaque section utilise `IntersectionObserver` (hook `useScrollAnimation`)
- Quand la section snap dans le viewport → les éléments s'animent avec `translateY(30-40px)→0` + `opacity 0→1`
- Timing staggeré : titre → texte → CTA (délais +0.15s)
- Courbe : `cubic-bezier(0.4, 0, 0.2, 1)` (smooth decel)
- Durée : `0.6s` à `0.8s`

---

## Ce qu'on RETIRE de la homepage actuelle

- ❌ `FeaturedWorksGrid` (remplacé par le slider)
- ❌ `ServicesGrid` (supprimé)
- ❌ `TestimonialStats` (supprimé)
- ❌ `CTASection` (remplacé par "Get In Touch")
- ❌ Toutes les `<Section>` wrapper actuelles
- ❌ Header bar en haut (remplacé par logo+burger flottants — voir `refont/menu.md`)

## Ce qu'on GARDE

- ✅ `HeroBannerV2` (hero existant, juste retirer `-mt-16`)
- ✅ `Footer` (noir, simple, en bas)
- ✅ Couleurs Tailwind du design system dans `tailwind.config.js`
- ✅ Hook `useScrollAnimation`

---

## Structure React finale

```
Home.jsx
├── LoadingScreen (état local, 2s timeout, conditionnel)
├── <div className="homepage snap-container">
│   ├── HeroBannerV2 (section 1, snap)
│   ├── AboutTextSection (section 2, snap, fond noir)
│   ├── PortfolioSlider (section 3, snap, fond noir)
│   ├── GetInTouchSection (section 4, snap, fond jaune pastel)
│   └── Footer
│
Header.jsx (flottant — logo + burger, voir refont/menu.md)
```

---

## Palette de couleurs pour la homepage

| Usage                    | Couleur                     |
|--------------------------|-----------------------------|
| Splash screen fond       | `#F5E6C8` (jaune pastel sombre) |
| Splash screen texte      | `#0F1419` (noir profond)    |
| Section texte fond       | `#000000` (noir pur)        |
| Section texte titre      | `#FFFFFF`                   |
| Section texte body       | `rgba(255,255,255,0.75)`    |
| Slider fond              | `#000000`                   |
| Get In Touch fond        | `#FBF7EF` (jaune pastel très léger) |
| Get In Touch titre       | `#0F1419`                   |
| Get In Touch body        | `#2C3E50`                   |
| Liens + icône ⊕          | Blanc (sur noir) / Noir (sur clair) |
