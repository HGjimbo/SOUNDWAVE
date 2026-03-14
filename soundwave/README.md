# 🎵 SoundWave — Lecteur de Musique

> Projet personnel réalisé par · byNJ

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Aperçu

SoundWave est un lecteur de musique interactif entièrement réalisé en HTML, CSS et JavaScript  — aucun framework, aucune dépendance.

L'interface dark & moderne s'adapte dynamiquement à la piste en cours grâce à un système de couleurs ambiantes.

---

## Fonctionnalités

-  Lecture / Pause avec animation de l'artwork
- Navigation entre les pistes (précédent / suivant)
-  Mode aléatoire (shuffle)
-  Mode répétition
-  Barre de progression cliquable
-  Contrôle du volume
-  Fond ambiant dynamique selon la piste
-  Playlist latérale avec indicateur de lecture animé
-  Visualiseur audio animé

---

## Structure du projet

```
soundwave/
├── index.html        # Structure HTML
├── css/
│   └── style.css     # Tous les styles (dark theme, animations)
└── js/
    ├── tracks.js     # Données de la playlist
    └── player.js     # Logique du lecteur
```

---

## Lancer le projet

Aucune installation nécessaire. Il suffit d'ouvrir `index.html` dans un navigateur :

```bash
# Cloner le repo
git clone https://github.com/byNJ/soundwave.git

# Ouvrir dans le navigateur
open index.html
```

---

## Ce que j'ai appris

- Manipulation avancée du **DOM** en JavaScript vanilla
- Gestion d'**état** sans framework (play, pause, shuffle, repeat)
- **Animations CSS** : rotation, barres animées, transitions fluides
- **Design system** avec variables CSS et thème cohérent
- Découpage du code en **modules JS séparés**

---

## Auteur

**byNJ** · L1 Informatique  
[GitHub](https://github.com/byNJ)
