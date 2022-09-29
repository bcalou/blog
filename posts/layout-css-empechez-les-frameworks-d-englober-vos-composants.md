---
title: "Layout CSS : empêchez les frameworks d'englober vos composants"
date: 2019-06-26
tags:
  - css
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/css-layout-get-around-frameworks-wrapping-your-components-2hgm
---

CSS est difficile, à ce qu'il paraît. Mais avez vous déjà essayé d'écrire du CSS en vous battant contre un framework qui modifie votre DOM ?

## Le problème

Je travaille sur une interface simple : header, contenu, footer. Le header et le footer ont une taille fixe, et je souhaite positionner le contenu au centre de l'espace restant.

<figure>
  <blockquote>Ah, flexbox, mon vieil ami, ainsi nous nous retrouvons !</blockquote>
  <figcaption>Moi-même (pas vraiment, c'est juste pour mettre dans l'ambiance)</figcaption>
</figure>

Me voilà donc avec cette implémentation simple :

```html
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

```css
body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

<figure>
  {% img "layout/base.png", "Le main correctement placé au centre de l'espace vide" %}
  <figcaption>Chacun des trois descendants directs du body a une bordure bleue. Jusqu'ici, tout va bien.</figcaption>
</figure>

Je suis donc heureux, comme tout développeur front quand les choses s'alignent correctement.

Mais alors que l'application grandit, je réalise que je vais avoir besoin d'englober le `main` et le `footer` à l'intérieur d'un composant Angular unique, pour des raisons structurelles propres à l'application.
