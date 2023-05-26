---
title: Flexbox — Les marges négatives à la rescousse
intro: Habituellement évitées, les marges négatives permettent de résoudre le problème de l'espacement entre les enfants d'un conteneur flex.
date: 2020-11-02
tags:
  - css
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/flexbox-when-negative-margins-save-the-day-h4i
---

<aside>Mise à jour 2023 : Bonne nouvelle, la technique décrite dans cet article est devenue pratiquement obsolète grâce au <a href="https://caniuse.com/flexbox-gap">large support de la propriété gap</a> par les navigateurs modernes.</aside>

La gestion des espaces avec flexbox n'est pas aussi simple qu'elle en a l'air. Voici une simple astuce que j'ai beaucoup utilisée ces derniers temps.

## Le problème

Voici notre HTML pour cette démo :

```html
<article>
  <h1>Hello World</h1>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>Front-end dev</li>
    <li>Web</li>
  </ul>
  <p>Lorem ipsum...</p>
</article>
```

C'est un article avec une liste de tags. Avec un peu de CSS basique, voici à quoi il ressemble.

{% codepen "https://codepen.io/bcalou/pen/dyXdqOL" %}

Nous souhaitons que la liste des tags soit un conteneur flex, avec la possibilité d'un retour à la ligne. Allons-y !

```css
ul {
  display: flex;
  flex-wrap: wrap;
}

li {
  margin-right: 2em;
}
```

Comme vous pouvez le voir, j'ai aussi ajouté de l'espace après chaque élément `<li>`, `2em` étant égal à `32px` pour un texte basique (avec l'avantage de s'adapter aux préférences de l'utilisateur et à la taille de font de l'élément lui-même).

Et voici le résultat :

{% codepen "https://codepen.io/bcalou/pen/WNxMgpp" %}

Cela peut sembler assez bien, mais le diable est dans les détails.

Regardez le coin inférieur droit de l'article : je l'ai rendu redimensionnable pour que vous puissez simuler un redimensionnement du navigateur.

Il y a deux problèmes principaux. Pouvez-vous les repérer ?

## Le problème horizontal

Le premier problème est qu'à cause de sa marge à droite, le dernier élément passe à la ligne trop tôt.

{% figure
  "wrap.gif",
  "L'article est redimensionné et le dernier élément passe à la ligne.",
  "Remarquez-vous comme le dernier élément aurait suffisamment d'espace pour aller plus loin à droite avant de revenir à la ligne ? Comparez cet espace à l'espace à gauche du premier élement."
%}

Il serait possible de corriger ce problème en excluant le dernier élément de cette règle :

```css
li:not(:last-child) {
  margin-right: 2em;
}
```

{% codepen "https://codepen.io/bcalou/pen/mdEXGvE" %}

Mais le problème est le même : tous les autres élément reviennent à la ligne trop tôt.

{% figure
"autres.gif",
"L'article est redimensionné et les éléments passent les uns après les autres à la ligne.",
"Désormais, le dernier élement peut aller plus loin vers la droite, mais les autres provoquent un retour à la ligne prématuré."
%}

Bon, si `margin-right` ne convient pas, que dire de `margin-left` ? Essayons de l'utiliser sur chaque élément, à l'exception du premier, qui ne devrait pas être précédé par un espace.

```css
li:not(:first-child) {
  margin-left: 2em;
}
```

{% codepen "https://codepen.io/bcalou/pen/BazrZQv" %}

Est-ce mieux désormais ? Prenez un moment pour essayer de deviner quel pourrait être le problème.

Puisqu'il n'y a plus de marge à droite, le retour à la ligne a lieu exactement quand il le faut. Mais maintenant, notre problème est ailleurs :

{% figure
"left.gif",
"L'article est redimensionné et le dernier élément passe à la ligne, avec un décalage vers la droite par rapport au premier de la ligne du dessus.",
"La nouvelle ligne révèle la propriété <code>margin-left</code> de l'élément."
%}

Nous ne sommes pas vraiment en position de nous plaindre. Nous avons demandé à CSS que tous les éléments sauf le premier aient une marge à gauche, et c'est ce qui se passe.

Comme il serait agréable de pouvoir exclure les éléments étant les premiers de leur ligne ! Mais il n'y a pas de sélecteur magique comme celui-ci :

```css
li:not(:first-flex-row-item) {
  /* N'existe pas */
}
```

Un tel sélecteur hypothétique pourrait causer une _dépendance circulaire_. Par exemple, je pourrais dire que le premier élément d'une ligne a une petite taille de font. Cela pourrait permettre à l'élément de retourner sur la ligne précédente (car il prendrait moins de place). Il ne serait donc plus ciblé par le sélecteur, reprendrait sa taille originale, reviendrait sur la seconde ligne et... 🤯

Les dépendances circulaires sont une des raisons principales pour lesquelles nous n'avons pas encore accès aux <a href="https://css-tricks.com/lets-not-forget-about-container-queries/">container queries</a>. Mais c'est une autre histoire.

<aside>Mise à jour 2023 : Après des années d'effort, les <i>containers queries</i> seront bientôt <a href="https://caniuse.com/?search=container%20queries">largement supportées !</a></aside>

## L'astuce de la marge négative

Voici donc la solution : d'abord, tous les éléments reçoivent un `margin-left`.

```css
li {
  margin-left: 2em;
}
```

{% codepen "https://codepen.io/bcalou/pen/yLJKPXy" %}

Nous devons maintenant nous débarrasser de l'espace à gauche du premier élément, et nous pouvons faire cela à l'aide de marges négatives.

Les marges négatives ne sont pas considérées comme faisant partie des bonnes pratiques, et je pense qu'il faut les éviter autant que possible, car elle peuvent rendre la logique de votre code plus difficile à comprendre.

Ceci étant dit, elles sont [autorisées par le w3c](https://www.w3.org/TR/CSS2/box.html#margin-properties) et offrent un très bon support navigateur.

Et dans notre cas, elles nous sauvent la mise :

```css
ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: -2em;
}

li {
  margin-left: 2em;
}
```

{% codepen "https://codepen.io/bcalou/pen/MWeVomw" %}

{% figure
  "borders.png",
  "Des bordures bleues montrent que la liste des éléments est décalée vers la droite jusqu'en dehors de son parent, pour que le premier élément paraisse visuellement au bon endroit.",
  "Une bordure bleue sur l'élément <code>ul</code> révèle l'astuce."
%}

## Et l'axe vertical ?

Devinez quoi, c'est la même chose !

Il est impossible de cibler tous les éléments en excluant ceux qui sont sur la première ligne.

Il faut donc donner à tout le monde une marge supérieure.

```css
li {
  margin-left: 2em;
  margin-top: 1em;
}
```

{% codepen "https://codepen.io/bcalou/pen/zYBWzdo" %}

À cause de cet ajout, la liste apparaît plus bas que ce que nous souhaitons.

Il serait possible de retirer la propriété `margin-bottom: 1em` du titre pour compenser.

{% figure
  "title.png",
  "La marge entre le titre et les éléments est équivalente à la marge ajoutée au dessus des éléments.",
  "Retirer la marge sous le titre (zone jaune) compenserait le nouvel espace à l'intérieur de l'élement <code>ul</code> (bordures bleues)."
%}

Mais j'essaie de toujours **garder mes éléments indépendants du contexte**. La liste pourrait apparaître sous un autre élément quelque part ailleurs. Ou le titre pourrait être suivi par autre chose que cette liste.

Vous voyez, le _component driven development_, les _design system_ et toutes ces choses-là...

Nous devons donc utiliser la même astuce et appliquer une marge négative à notre liste :

```css
ul {
  display: flex;
  flex-wrap: wrap;
  margin-left: -2em;
  margin-top: -1em;
}
```

Et voici notre version finale. Elle fonctionne sur tous les navigateurs qui supportent correctement flexbox, y compris Internet Explorer 11.

## Et la propriété `gap` ?

Les articles tels que celui-ci deviendront obsolète lorsque la propriété CSS `gap` sera largement supportée.

Mais ce n'est pas encore le cas. À l'heure où j'écris ces lignes, le [support navigateur est de 70%](https://caniuse.com/flexbox-gap). Pas super, comparé au support à 99% de flexblox lui-même – Safari serait-il devenu le nouvel Internet Explorer ?

<aside>Mise à jour 2023 : Après ce qui a semblé être une petite période de flottement, Safari s'est repris en main et a rattrapé une bonne partie de son retard sur ses concurrents. Ce cliché n'a plus lieu d'être.</aside>

Tous les autres navigateurs modernes devraient vous montrer le même résultat avec le code suivant, sans astuce !

```css
ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1em 2em; /* row-gap + column-gap */
}

/* Plus de style sur les items eux-mêmes */
```

{% codepen "https://codepen.io/bcalou/pen/zYBWRaO" %}

Le point embêtant est qu'il n'est pas possible de détecter le support de cette propriété. Prenez le code suivant :

```css
@supports (gap: 1em 2em) {
  /* Désactiver les astuces et utiliser la solution propre */
}
```

La syntaxe `@supports` permet d'appliquer des règles uniquement si le navigateur comprend ce qui se trouve entre les parenthèses.

Le problème est que `gap` est également un propriété utilisée pour les grilles CSS, avec un bien meilleur support de 92%. Mais cela ne signifie pas que la propriété fonctionnera pour flexbox.

[Le problème est étudié](https://github.com/w3c/csswg-drafts/issues/3559) par le _CSS Working Group_.

En attendant, vive les marges négatives.

## Et maintenant, avec des variables ✨

Nous pouvons améliorer notre code et le rendre plus générique si besoin. J'aime séparer mon CSS produisant des éléments BEM sémantiques et mes classes utilitaires. Je vais donc créer une classe utilitaire `u-flex`.

Je ne suis pas un grand fan du fait d'avoir des classes orientées style dans mon HTML, et je pourrais donc utiliser une mixin SASS pour parvenir au même résultat, mais vous saisissez l'idée.

Utilisons les variables CSS, qui sont très bien supportées (95%). En CSS, il est possible d'obtenir l'opposé d'une valeur en la multipliant par `-1`. Voici un exemple :

```css
div {
  --size: 2em;
  width: calc(-1 * var(--size)); /* -2em */
}
```

Voici donc notre classe utilitaire :

```css
.u-flex {
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--row-gap));
  margin-left: calc(-1 * var(--column-gap));
}

.u-flex > * {
  margin-top: var(--row-gap);
  margin-left: var(--column-gap);
}
```

J'aime utiliser le sélecteur d'enfant direct (`> *`) avec flexbox et grid. Il s'accorde très bien avec la relation parent/enfant de ces fonctionnalités et fonctionnera à tous les coups.

Et voici comment je l'utiliserai :

```html
<ul class="u-flex">
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>Front-end dev</li>
  <li>Web</li>
</ul>
```

```css
ul {
  --row-gap: 1em;
  --column-gap: 2em;
}
```

{% codepen "https://codepen.io/bcalou/pen/oNLqEQz" %}

Le pouvoir des variables CSS nous permet de définir des espaces différents pour chaque élément ciblé. Nous pourrions même définir des valeurs par défaut pour l'ensemble du document :

```css
:root {
  --row-gap: 1em;
  --column-gap: 2em;
}
```

Ainsi, nous n'avons besoin de changer les variables localement que si nous souhaitons une valeur différente.

<aside>Mise à jour 2023 : Plutôt que des variables à la racine, l'utilisation d'une valeur par défaut serait plus appropriée, par exemple : <code>var(--row-gap, 1em);</code></aside>

## Mauvaises pratiques

Nous connaissons toutes et tous un tas de mauvaises pratiques : `!important` est une autre qui me vient à l'esprit. Mais comme les marges négatives, même `!important` a des cas d'usages légitimes.

Cet astuce de la marge négative est un rappel pour moi : les choses que l'on apprend à éviter pourraient nous être bien utiles un jour ou l'autre. Tout dépend du contexte.
