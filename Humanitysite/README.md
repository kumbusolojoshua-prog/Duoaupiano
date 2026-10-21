#  Campagne #FaitesDuo — Habitat & Humanisme Rhône

> **Plateforme interactive web pour la campagne solidaire de fin d'année d'Habitat & Humanisme Rhône.**

Ce projet est un site vitrine interactif dédié à la campagne **#FaitesDuo**, dont l'objectif est d'associer un toit à un accompagnement pour permettre aux personnes en situation de précarité de se reconstruire. Le site intègre l'expérience interactive centrale du **Piano des Toits** (88 touches), symbole d'harmonie et d'action collective.

---

##  Aperçu de l'Expérience & Fonctionnalités

- **Expérience Interactive — Le Piano des Toits (88 Touches)** :
  - Synthétiseur audio virtuel développé avec l'API native `Web Audio` (aucun fichier audio lourd externe requis).
  - Génération dynamique et réactive des 88 touches (blanches et noires) au format clavier réel.
  - Système d'illumination dynamique des touches parrainées (représentant les logements financés).
  - Compteur de dons et barre de progression connectés en temps réel.
- **Identité Visuelle & Charte Graphique Officielle** :
  - Respect strict de la palette Habitat & Humanisme Rhône (Bleu Nuit `#30277e`, Orange Solidaire `#ee7219`, Cyan `#009fe3`, Beige `#f8eee3`).
  - Découpes graphiques sur mesure en forme de toit via `clip-path` CSS.
- **Parcours Engagement & Parrainage** :
  - Fenêtre modale interactive de sélection de montant de don (29€ - 35€ / mois) avec confirmation instantanée et feedback visuel.
- **Design Réactif & Responsive** :
  - Layout optimisé pour mobile, tablette et desktop avec navigation adaptative et support tactile (`touchstart`).

---

## Architecture du Projet

Le projet repose sur une architecture statique légère, ultra-rapide et sans dépendance serveur :

```
├── index.html        # Structure sémantique HTML5, intégration Tailwind CSS & FontAwesome
├── style.css         # Charte graphique officielle, formes sur mesure (toits) et styles du piano
└── interactive.js    # Moteur JS : Web Audio API, rendu 88 touches, modale, jauges & notifications
```

### Détail des fichiers :

1. **`index.html`** :
   - Structure sémantique complète (Header, Hero, Présentation du Duo, Section Interactive Piano, Tarifs/Paliers, Footer).
   - Intégration par CDN de **Tailwind CSS** (mise en page rapide) et **FontAwesome 6** (iconographie).
   - Zone réceptrice du piano via l'élément `#piano-keyboard`.

2. **`style.css`** :
   - Déclaration des variables CSS globales (`--color-blue`, `--color-orange`, `--color-beige`, etc.).
   - Règles de contraste sur mesure pour assurer une lisibilité optimale sur les cartes blanches et sombres.
   - Design du piano : dégradés CSS, ombres portées, états actifs et effets de lueur (`.lit`) pour les touches allumées.

3. **`interactive.js`** :
   - **Génération du Piano** : Algorithme `renderPiano()` générant la séquence exacte d'octaves d'un piano 88 touches.
   - **Moteur Audio** : Utilisation de `OscillatorNode` et `GainNode` pour simuler des notes de piano chaleureuses.
   - **Gestion d'État** : Mises à jour dynamiques du compteur `#lit-count` et de la barre de progression `#piano-progress`.
   - **UI & Modale** : Gestion des événements du formulaire de don, notifications flottantes temporisées.

---

## Installation & Développement Local

Aucune installation complexe ni outil de build (Node.js/NPM) n'est nécessaire.

1. **Cloner ou télécharger** le dossier du projet.
2. Assurez-vous que les 3 fichiers (`index.html`, `style.css`, `interactive.js`) se trouvent dans le **même répertoire**.
3. Ouvrez simplement `index.html` dans n'importe quel navigateur web moderne (Chrome, Firefox, Edge, Safari).

*Conseil de développement : Vous pouvez utiliser l'extension **Live Server** sur Visual Studio Code pour un rechargement automatique lors de vos modifications.*

---

##  Guide de Déploiement Web


Ces plateformes hébergent gratuitement votre site avec un certificat SSL (HTTPS) inclus et un nom de domaine offert (ex: `faitesduo-rhone.netlify.app`).



####  Vercel
1. Créez un compte sur [Vercel.com](https://vercel.com).
2. Importez votre projet via votre compte GitHub ou via le CLI Vercel (`npm i -g vercel && vercel`).
3. Déploiement automatique avec des performances d'affichage ultra-rapides.


---

##  Charte Palette & Couleurs

| Couleur | Code Hex | Usage |
| :--- | :--- | :--- |
| **Bleu Nuit** | `#30277e` | En-têtes, éléments institutionnels, typographie |
| **Orange Solidaire** | `#ee7219` | Boutons d'action (CTA), touches illuminées, accents |
| **Bleu Dark Navy** | `#0d1626` | Arrière-plan principal de la page et du piano |
| **Cyan** | `#009fe3` | Subtitles, touches secondaires, pictogrammes |
| **Beige / Crème** | `#f8eee3` | Fonds de cartes secondaires, textes sur fond sombre |

---

##  Crédits & Organisation

- **Organisation** : Habitat & Humanisme Rhône
- **Campagne** : #FaitesDuo — *Abris & Accompagnement*
- **Événement Phare** : Concert Solidaire du 9 Décembre