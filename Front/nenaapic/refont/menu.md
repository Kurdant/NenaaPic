# Menu — Maquette & Spécification

## Référence visuelle
`/image-refonte-site/site_jeroennoordzij_inspi/menu-ouvert.png`

---

## Concept

Suppression totale de la barre de navigation traditionnelle.
Le header est remplacé par deux éléments flottants au-dessus du contenu :

```
┌──────────────────────────────────────────────────────┐
│  NENAAPIC                                      ──    │
│  (logo)                                      (burger)│
│                                                      │
│                     [ HERO / PAGE ]                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

- **Logo** : `NENAAPIC` — en haut à gauche, position absolute/fixed, texte blanc, Playfair Display, tracking élargi
- **Burger** : 2 traits horizontaux simples — en haut à droite, blanc, pas de cadre

---

## Menu ouvert — Desktop (≥ 768px)

Le panneau menu glisse depuis la droite et occupe **50% de la largeur de l'écran** (la moitié droite).

```
┌─────────────────────┬─────────────────────┐
│                     │                     │
│   (page visible     │        pur noir     │
│    mais assombrie)  │                     │
│                     │           HOME      │
│                     │      PORTFOLIO      │
│                     │       SERVICES      │
│                     │       À PROPOS      │
│                     │        CONTACT      │
│                     │                     │
│                     │              ──     │
│                     │          (burger)   │
└─────────────────────┴─────────────────────┘
```

### Spécifications Desktop
| Propriété                | Valeur                                      |
|--------------------------|---------------------------------------------|
| Largeur panneau          | `50vw` (moitié droite)                      |
| Fond                     | `#000000` (noir pur)                        |
| Position                 | `fixed`, `top: 0`, `right: 0`, `height: 100vh` |
| Z-index                  | `50`                                        |
| Animation d'entrée       | Slide-in depuis la droite (`translateX(100%)` → `0`) ~0.5s ease |
| Overlay gauche           | Fond semi-transparent noir ~`rgba(0,0,0,0.5)` sur la partie page |

### Liens du menu
| Propriété                | Valeur                                      |
|--------------------------|---------------------------------------------|
| Alignement texte         | **Droite** (`text-align: right`)            |
| Police                   | **Playfair Display**, 700 (bold)            |
| Casse                    | **MAJUSCULES** (`text-transform: uppercase`)|
| Taille                   | `~3.5rem` à `4.5rem` (très grand, impactant)|
| Couleur                  | `#FFFFFF` / `rgba(255,255,255,0.85)`        |
| Couleur hover            | `#F4D35E` (primary-yellow) ou blanc pur     |
| Espacement vertical      | `~1.5rem` à `2rem` entre chaque lien        |
| Padding droite           | `~3rem` à `5rem` du bord droit              |
| Position verticale       | Centré verticalement dans le panneau (`flex items-center`) |
| Animation liens          | Apparition staggerée de haut en bas, fade-in + léger slide |

### Items du menu
```
HOME
PORTFOLIO
SERVICES
À PROPOS
CONTACT
```

---

## Menu ouvert — Mobile (< 768px)

Le panneau menu occupe **100% de l'écran**.

```
┌──────────────────────────┐
│  NENAAPIC           ──   │
│                          │
│                          │
│                   HOME   │
│              PORTFOLIO   │
│               SERVICES   │
│              À PROPOS    │
│                CONTACT   │
│                          │
│                          │
└──────────────────────────┘
```

### Spécifications Mobile
| Propriété                | Valeur                                      |
|--------------------------|---------------------------------------------|
| Largeur panneau          | `100vw` (plein écran)                       |
| Fond                     | `#000000`                                   |
| Taille police liens      | `~2rem` à `2.5rem` (légèrement réduit)     |
| Alignement               | Droite, avec padding-right adapté           |
| Position verticale       | Centré verticalement                        |

---

## Bouton Burger

### État fermé (2 traits)
```
  ────────
  ────────
```
- 2 lignes horizontales blanches
- Largeur : `~30px`
- Espacement : `~8px` entre les 2 traits
- Épaisseur : `1px` à `2px`
- Pas de troisième trait

### État ouvert
Le burger reste 2 traits (ou se transforme en X subtil) — même position en haut à droite.
Le burger est **par-dessus** le panneau noir, toujours accessible.

---

## Logo flottant

- **Texte** : `NENAAPIC`
- **Police** : Playfair Display, 700, uppercase, tracking élargi
- **Couleur** : Blanc (`#FFFFFF`)
- **Position** : `fixed`, `top: ~1.5rem`, `left: ~2rem`
- **Z-index** : `51` (au-dessus du panneau menu)
- **Pas de fond** : flotte directement sur le contenu / le panneau menu
- **Lien** : clique → retour accueil (`/`)

---

## Animations

1. **Ouverture du panneau** : `translateX(100%)` → `translateX(0)`, durée `0.5s`, ease-out
2. **Fermeture** : inverse, `0.4s` ease-in
3. **Overlay** : fade-in opacity `0` → `0.5`, synchronisé avec l'ouverture
4. **Liens** : apparition staggerée (délai +0.05s par item), `opacity 0→1` + `translateY(20px)→0`
5. **Burger** : transition douce des traits si transformation en X

---

## Ce qui ne change PAS

- Le **Hero** reste identique (HeroBannerV2.jsx)
- Le **contenu de la page** défile normalement sous le logo/burger
- Pas de `padding-top` sur le body (le header n'occupe plus d'espace)
- Le hero doit remonter jusqu'en haut de l'écran (plein écran, bord à bord)

---

## Résumé technique — Structure React

```
Header.jsx (refonte complète)
├── Logo fixe (top-left, z-51)
├── Burger fixe (top-right, z-51)
├── Overlay sombre (z-40, conditionnel)
└── Panneau menu (z-50, conditionnel)
    └── Nav links (right-aligned, centered vertically)
```

```jsx
// Pseudo-structure
<>
  <Link to="/" className="fixed top-6 left-8 z-[51]">NENAAPIC</Link>
  <button onClick={toggle} className="fixed top-6 right-8 z-[51]">
    {/* 2 lignes SVG */}
  </button>

  {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={close} />}
  
  <div className={`fixed top-0 right-0 h-full w-1/2 md:w-1/2 w-full bg-black z-50 
    transform transition ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <nav className="h-full flex flex-col items-end justify-center pr-12 gap-6">
      <Link>HOME</Link>
      <Link>PORTFOLIO</Link>
      ...
    </nav>
  </div>
</>
```
