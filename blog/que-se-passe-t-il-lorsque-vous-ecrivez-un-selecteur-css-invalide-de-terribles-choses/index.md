---
title: Que se passe-t-il lorsque vous écrivez un sélecteur CSS invalide ?
description: Pourquoi CSS ignore la totalité d'une règle dont seule une partie est invalide, et comment éviter ce piège.
date: 2020-12-07
tags:
  - CSS
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/what-happens-when-you-write-an-invalid-css-selector-bad-things-4734
---

J'aimerais parler d'un comportement très spécifique de CSS qui pourrait vous causer quelques maux de tête si vous n'en avez pas connaissance.

Créons un bouton :

```html
<button>Click me</button>
```

Je souhaite que ce bouton change de couleur lorsqu'il est pressé. Avec la pseudo-classe `:active`, c'est facile.

```css
button:active {
  background-color: black;
  color: white;
}
```

{% codepen "https://codepen.io/bcalou/pen/OJXYNag" %}

Jusqu'ici, tout va bien.

Pour améliorer l'accessibilité, je veux appliquer le même effet lorsque le bouton est ciblé à l'aide du clavier ou d'une technologie d'assistance (et ne rien faire de spécial si le focus vient de la souris).

Cela est possible grâce à la nouvelle pseudo-classe `:focus-visible`. À l'heure où j'écris ces lignes, elle est supportée sans préfixe par [Chrome et Edge](https://caniuse.com/?search=focus-visible).

<aside>Mise à jour 2023 : La pseudo-classe est désormais supportée par tous les navigateurs majeurs 🎉.</aside>

```css
button:active,
button:focus-visible {
  background-color: black;
  color: white;
}
```

{% codepen "https://codepen.io/bcalou/pen/bGeyyPo" %}

Si vous utilisez Chrome ou Edge, vous pouvez essayer de cibler le bouton avec la touche <kbd>Tab</kbd>. Vous devriez alors voir les styles appliqués par le sélecteur `:focus-visible`.

{% figure
  "focus.gif",
  "Le bouton dont le texte est noir sur un fond gris clair inverse ses couleurs.",
  "Ceci est d'une grande aide si vous n'utilisez pas la souris."
%}

## Mais il y a un problème

Pouvez-vous deviner ce qui se passera sur des navigateurs plus vieux ? Bien entendu, les styles associés à `:focus-visible` ne s'appliqueront pas, mais un effet de bord, peut-être ?

On perd aussi les styles de la pseudo-classe `:active` !

{% figure
  "firefox.gif",
  "Un bouton est pressé, mais il ne change pas de couleur.",
  "Les styles associés à la pseudo-classe <code>:active</code> ne s'appliquent pas sur Firefox, bien que ce navigateur comprenne parfaitement ce sélecteur. Tristesse infinie."
%}

Le problème vous paraît peut-être évident si vous le connaissez, mais lorsque j'ai du le débugger au sein d'un fichier CSS bien plus complexe, il m'a ennuyé pour quelques bonnes minutes. Et je ne pense pas que ce soit un fait très connu des débutants.

Comment dire ?

## Si quelconque partie du sélecteur échoue, la totalité du sélecteur échoue

En d'autres termes, si un navigateur ne connaît pas le sélecteur `:focus-within`, il ignorera la totalité de votre règle, y compris la partie concernant le sélecteur `:active`.

On pourrait dire que CSS est légèrement susceptible. S'il n'aime pas le type d'olive que vous avez mis sur la pizza, il n'envisagera même pas de la manger.

{% figure
  "trash.gif",
  "Un camion-poubelle balance une poubelle dont tout le contenu est projeté sur le trottoir.",
  "CSS n'a pas de temps à perdre avec vos sélecteurs zinzins."
%}

Voici la spécification du W3C :

{% blockquote
  "Lors de l'interprétation d'une liste de déclarations, une syntaxe inconnue à quelconque position provoque l'arrêt du parser. Ce dernier avance jusqu'à ce qu'il trouve un point-virgule (ou la fin du bloc). Il recommence alors à zéro avec la déclaration suivante.",
  "W3C",
  "Error-handling",
  "https://www.w3.org/TR/css-syntax-3/#error-handling"
%}

Et voici donc le correctif qu'il vous faudra utiliser : séparer les styles « sûrs » des styles plus exotiques.

```css
button:active {
  background-color: black;
  color: white;
}

button:focus-visible {
  background-color: black;
  color: white;
}
```

{% codepen "https://codepen.io/bcalou/pen/oNzbByo" %}

Maintenant, le sélecteur `:focus-visible` pourrait être ignoré, mais ne dérangera pas le sélecteur `:active`.

## Mais pourquoi ce comportement ?

{% blockquote "Pas si robuste pour un langage qui devrait s'adapter à autant de situations, n'est-ce pas ?" %}

{% blockquote "CSS est cassé ! JS seul peut nous sauver !" %}

Il se trouve qu'il y a en réalité une bonne raison pour cela, qui est expliquée dans un vieux document à propos de CSS 2 :

{% blockquote
  "CSS 2.2 donne un sens particulier à la virgule (,) dans les sélecteurs. Cependant, puisque nous ne savons pas si la virgule pourrait acquérir de nouveaux sens dans de futures versions de CSS, l'ensemble de l'instruction devrait être ignorée s'il y a une erreur où que ce soit dans le sélecteur, même si le reste du sélecteur semble acceptable en CSS 2.2.",
  "W3C",
  "Rule sets, declaration blocks, and selectors",
  "https://www.w3.org/TR/CSS22/syndata.html#rule-sets"
%}

Les concepteurs de CSS ont fait preuve d'une impressionnante capacité d'anticipation. En effet, voici quelques sélecteurs CSS que nous pourrons utiliser tôt ou tard (et pour certains, c'est déjà le cas) :

```css
/* h1.title, h2.title, h3.title */
.title:is(h1, h2, h3) { }

/* exclusions multiples */
.title:not(h1, h2) { }

/* sélecteur de parent */
section:has(img, figure) { }
```

Ces sélecteurs contiennent des virgules, mais ces virgules ne séparent pas des sélecteurs de premier niveau.

Si un navigateur ne comprend pas `:is` et essaie de séparer notre premier exemple, cela pourrait donner quelque chose de ce genre :

<ol>
  <li><code>.title.is(h1</code> : c'est quoi ce truc ? Je passe à la suite.</li>
  <li><code>h2</code> : ciblons tous les <code>h2</code>, même ceux qui n'ont pas la classe <code>.title</code> !</li>
  <li><code>h3)</code> : hein ?</li>
</ol>

## Astuce

Certains développeurs ont même utilisé ce comportement comme une astuce pour discriminer un navigateur précis.

Vous voulez appliquer un style à tous les navigateurs sauf à Internet Explorer ? Vous n'avez qu'à ajouter un sélecteur moderne simplement destiné à ce qu'Internet Explorer ignore la règle.

```css
.covfefe:not(div),
h1 {
  color: red;
}
```

Tadaa, le `h1` sera rouge seulement si le navigateur comprend `:not`.

Avec la bonne combinaison de sélecteurs, vous pourriez cibler ou exclure n'importe quelle version spécifique d'un navigateur. Ce qui, bien entendu, est très sale, et je l'espère plus nécessaire aujourd'hui 🙏
