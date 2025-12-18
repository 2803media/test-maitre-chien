# 🐕 Test de Compatibilité Maître & Chien - Next.js

Application Next.js moderne pour évaluer la compatibilité entre un maître et son chien.

## 📁 Structure du projet (Next.js App Router)

```
test-chien-nextjs/
├── 📱 app/                      # App Router de Next.js
│   ├── layout.js               # Layout racine avec ThemeProvider
│   ├── page.js                 # Page principale (logique du test)
│   └── globals.css             # Styles Tailwind + custom
│
├── 🧩 components/              # Composants React réutilisables
│   ├── DarkModeToggle.js      # Toggle dark/light mode
│   ├── GenderSelection.js     # Sélection du profil
│   ├── ProgressBar.js         # Barre de progression animée
│   ├── Question.js            # Carte de question interactive
│   ├── RadarChart.js          # Graphique radar (Recharts)
│   └── Results.js             # Affichage des résultats
│
├── 📊 data/                    # Données de l'application
│   └── questions.js           # 28 questions avec métadonnées
│
├── 🔧 lib/                     # Fonctions utilitaires
│   └── scoring.js             # Calculs de compatibilité
│
├── 📦 public/                  # Fichiers statiques (vide pour l'instant)
│
└── ⚙️  Configuration
    ├── package.json           # Dépendances et scripts
    ├── next.config.js         # Configuration Next.js
    ├── tailwind.config.js     # Configuration Tailwind
    ├── postcss.config.js      # Configuration PostCSS
    ├── .eslintrc.json         # Configuration ESLint
    └── .gitignore             # Fichiers à ignorer
```

## 🚀 Installation et lancement

### Prérequis
- Node.js 18+ installé
- npm (livré avec Node.js)

### Étapes

```bash
# 1. Dézipper l'archive et entrer dans le dossier
cd test-chien-nextjs

# 2. Installer les dépendances (première fois uniquement)
npm install
# ⏱️ Durée : 2-3 minutes

# 3. Lancer le serveur de développement
npm run dev

# 4. Ouvrir dans le navigateur
# → http://localhost:3000
```

## 📦 Dépendances installées

Lors de `npm install`, les packages suivants seront installés :

### Production
- **next** (^14.2.0) - Framework React
- **react** (^18.3.0) - Bibliothèque UI
- **react-dom** (^18.3.0) - React DOM
- **recharts** (^2.12.0) - Bibliothèque de graphiques
- **lucide-react** (^0.344.0) - Icônes SVG (1000+)
- **next-themes** (^0.2.1) - Gestion du dark mode

### Développement
- **tailwindcss** (^3.4.1) - Framework CSS utility-first
- **autoprefixer** (^10.4.18) - Préfixes CSS automatiques
- **postcss** (^8.4.35) - Transformation CSS
- **eslint** (^8.57.0) - Linter JavaScript
- **eslint-config-next** (^14.2.0) - Configuration ESLint pour Next.js

## ✨ Fonctionnalités

### Interface utilisateur
- ✅ Design ultra-moderne avec Tailwind CSS
- ✅ Dark mode avec sauvegarde de préférence
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Animations et transitions fluides
- ✅ Glass morphism effects
- ✅ Scrollbar personnalisée

### Test de compatibilité
- ✅ Sélection du profil (Homme/Femme/Neutre)
- ✅ 28 questions adaptatives selon le genre
- ✅ Affichage progressif des questions
- ✅ Barre de progression en temps réel
- ✅ Validation automatique
- ✅ Scroll automatique vers nouvelle question

### Résultats
- ✅ Score de compatibilité global (0-100%)
- ✅ Interprétation personnalisée
- ✅ Graphique radar interactif
- ✅ Compatibilité détaillée par axe (14 axes)
- ✅ Code couleur (vert/jaune/rouge)
- ✅ Emojis selon le niveau
- ✅ Impression des résultats
- ✅ Recommencer le test

## 🎯 Scripts disponibles

```bash
# Développement
npm run dev          # Lancer en mode développement (port 3000)

# Production
npm run build        # Compiler pour la production
npm start            # Lancer en mode production

# Qualité du code
npm run lint         # Vérifier le code avec ESLint
```

## 🎨 Personnalisation

### Changer les couleurs
Éditez `tailwind.config.js` :

```javascript
colors: {
  primary: {
    500: '#f37e3c',  // Couleur principale
    600: '#e45f23',  // Plus foncé
    // ...
  }
}
```

### Ajouter des questions
Éditez `data/questions.js` :

```javascript
{
  id: 29,
  axis: "Nouvel axe",
  text: "Votre question ici",
  icon: "Heart",  // Nom de l'icône Lucide
  genre: "all"    // "all", "homme", ou "femme"
}
```

### Modifier les interprétations
Dans `data/questions.js`, section `INTERPRETATIONS` :

```javascript
export const INTERPRETATIONS = {
  "90-100": "Votre message pour 90-100%",
  "75-89": "Votre message pour 75-89%",
  // ...
}
```

## 🔧 Architecture technique

### App Router de Next.js
Le projet utilise l'**App Router** (nouvelle architecture de Next.js) :
- `app/layout.js` : Layout partagé avec ThemeProvider
- `app/page.js` : Page principale avec logique du test
- `app/globals.css` : Styles globaux

### Composants modulaires
Chaque fonctionnalité est isolée dans son propre composant :
- Réutilisable
- Testable
- Maintenable

### Gestion d'état
- `useState` pour l'état local
- `useEffect` pour les effets de bord
- `useRef` pour les références DOM
- Pas de Redux (pas nécessaire pour ce projet)

## 🌐 Déploiement

### Option 1 : Vercel (recommandé)

1. Push ton code sur GitHub
2. Va sur [vercel.com](https://vercel.com)
3. Importe ton repo GitHub
4. Clique sur "Deploy"

**✨ Ton site sera en ligne en 2 minutes !**

### Option 2 : Build manuel

```bash
npm run build
npm start
```

Puis configure ton serveur web pour pointer vers le port 3000.

## 🐛 Dépannage

### Port 3000 déjà utilisé
```bash
npm run dev -- -p 3001
```

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Les icônes ne s'affichent pas
Vérifiez que lucide-react est installé :
```bash
npm list lucide-react
```

### Le dark mode ne fonctionne pas
Vérifiez la console du navigateur pour les erreurs.

### Erreur de build
```bash
rm -rf .next
npm run dev
```

## 📚 Ressources

### Documentation
- [Next.js](https://nextjs.org/docs) - Framework
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling
- [Lucide Icons](https://lucide.dev/) - Icônes
- [Recharts](https://recharts.org/) - Graphiques
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode

### Tutoriels
- [Next.js Learn](https://nextjs.org/learn) - Tutoriel officiel
- [Tailwind UI](https://tailwindui.com/) - Composants Tailwind

## 📊 Axes analysés

1. **Énergie** - Besoin d'activité physique
2. **Sociabilité** - Rapport aux autres
3. **Stress** - Gestion des imprévus
4. **Curiosité** - Exploration et nouveauté
5. **Discipline** - Respect des règles
6. **Attachement** - Gestion de la séparation
7. **Leadership** - Prise d'initiatives
8. **Sensibilité** - Réactivité aux stimuli
9. **Motivation** - Leviers d'encouragement
10. **Réactivité** - Contrôle des impulsions
11. **Patience** - Capacité d'attente (femmes)
12. **Communication** - Signaux non-verbaux (femmes)
13. **Empathie** - Connexion émotionnelle (femmes)
14. **Protection** - Instinct protecteur (femmes)

## 🎓 Technologies apprises

En travaillant sur ce projet, vous apprendrez :
- ✅ Next.js App Router
- ✅ React Hooks (useState, useEffect, useRef)
- ✅ Tailwind CSS avancé
- ✅ Composants réutilisables
- ✅ Dark mode implementation
- ✅ Recharts pour visualisation de données
- ✅ Responsive design
- ✅ Animations CSS

## 📄 Licence

Usage personnel et éducatif libre.

## 🙏 Crédits

- **Framework** : Next.js
- **Icônes** : Lucide React
- **Graphiques** : Recharts
- **Styling** : Tailwind CSS
- **Fonts** : Inter (Google Fonts)

---

**Prêt à démarrer ?**

```bash
npm install && npm run dev
```

Puis ouvre **http://localhost:3000** dans ton navigateur ! 🚀

---

*Fait avec ❤️ pour les amoureux des chiens* 🐕
