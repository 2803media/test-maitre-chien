<div align="center">

# 🐕 Test de Compatibilité Maître & Chien - Next.js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

> Une application moderne pour évaluer la compatibilité entre un maître et son chien, construite avec Next.js 13+ et Tailwind CSS.

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

## Dépendances

### Production

- **next** (^16.0.10) - Framework React
- **react** (^19.2.2) - Bibliothèque UI
- **react-dom** (^19.2.2) - React DOM
- **recharts** (^3.6.0) - Bibliothèque de graphiques
- **lucide-react** (^0.562.0) - Icônes SVG (1000+)
- **next-themes** (^0.4.6) - Gestion du dark mode

### Développement

- **tailwindcss** (^4.0.0) - Framework CSS utility-first
- **autoprefixer** (^10.4.18) - Préfixes CSS automatiques
- **postcss** (^8.4.35) - Transformation CSS
- **eslint** (^9.39.1) - Linter JavaScript
- **eslint-config-next** (^16.0.9) - Configuration ESLint pour Next.js

## 🚀 Installation et démarrage rapide

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

## 👥 Auteurs

- **2803 MEDIA** - [Site web](https://www.2803.media/)

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Ajouter une fonctionnalité incroyable'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENCE](LICENCE) pour plus de détails.

## 🙏 Remerciements

- Icônes par [Lucide](https://lucide.dev/)
- Graphiques avec [Recharts](https://recharts.org/)

## 🚀 Évolution future

- [ ] Ajouter plus de questions
- [ ] Implémenter l'authentification
- [ ] Sauvegarder les résultats
- [ ] Ajouter des statistiques globales
- [ ] Version multilingue

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
};
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

Puis configure ton serveur web pour pointer vers le port 3010.

## 🐛 Dépannage

### Problèmes courants

1. **Erreurs de dépendances**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Erreurs de compilation**
   - Vérifiez la version de Node.js (18+ requise)
   - Exécutez `npm run lint` pour identifier les problèmes

3. **Problèmes de style**
   - Vérifiez que Tailwind est correctement configuré
   - Exécutez `npx tailwindcss -i ./app/globals.css -o ./app/output.css --watch`

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une [issue](https://github.com/2803media/test-maitre-chien/issues).

### Port 3010 déjà utilisé

```bash
npm run dev -- -p 3011
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

Puis ouvre **http://localhost:3010** dans ton navigateur ! 🚀

---

_Fait avec ❤️ pour les amoureux des chiens_ 🐕
