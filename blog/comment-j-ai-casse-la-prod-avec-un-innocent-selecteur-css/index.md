---
title: Comment j'ai cassé la prod avec un innocent sélecteur CSS
slug: comment-j-ai-casse-la-prod-avec-un-innocent-selecteur-css
description: Sur mon ordi, ça fonctionnait, je vous jure... Mais il ne faut pas confondre un sélecteur CSS et un sélecteur CSS utilisé par JavaScript.
date: 2024-11-12
tags:
  - CSS
  - JavaScript
  - React
layout: layouts/post.njk
---

On passe toutes et tous par là, non ? Transformer une application en page blanche, en prod de préférence ? Non ? Ça viendra, je vous le souhaite. Ce sont de belles sensations grâce auxquelles on vit intensément l'instant présent.

Je vous raconte.

## CSS est gentil

CSS a ceci de merveilleux qu'il « n'échoue pas ». Prenez ce sélecteur, par exemple :

```css
form:has(textarea) {
  ...
}
```

Grâce à <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:has">la pseudo-classe moderne :has</a>, il cible les éléments `form` qui contiennent un élément `textarea`.

{% baseline "has" %}

Aujourd'hui, `:has` est bien supporté par la plupart des navigateurs. Si un vieux navigateur tente d'interpréter ce sélecteur, il ne le **comprendra pas et l'ignorera**.

Ce mécanisme est essentiel à l'adoption rapide des nouvelles fonctionnalités CSS. À moins que les styles à appliquer ne soient absolument critiques, on peut admettre qu'une petite partie (en décroissance) des navigateurs n'en bénéficient pas. Tant que la page est lisible et utilisable, ce n'est généralement pas un problème.

{% aside %}
Il en va de même pour HTML : une balise moderne telle que <code>&lt;search&gt;</code> sera interprétée comme une simple <code>&lt;div&gt;</code> sans signification par des navigateurs plus anciens. La sémantique peut être dégradée, et ce n'est pas anodin, mais c'est très différent que de risquer une page blanche...
{% endaside %}

## Mon erreur : penser que `document.querySelector()` serait aussi sympa...

Tout change quand on entre dans le domaine de JavaScript. Chez lui, ça ne rigole pas, et il n'est pas question « d'échouer silencieusement ».

Le code suivant présente une faille potentielle :

```js
const $form = document.querySelector("form:has(textarea)");

$form.addEventListener("submit", () => {...})
```

Si un élément correspond a sélecteur CSS fourni, `$form` contiendra un objet de type `Element`, sur lequel on pourra agir.

Mais si l'élément n'est pas trouvé, `$form` contiendra `null`. Et `addEventListener` sur `null`, ça fait boum. Et notre JS est joliment planté.

C'est simple à contourner : à moins d'avoir la certitude de la présence de l'élément, mieux vaut la vérifier avant de continuer, grâce à une condition :


```js
const $form = document.querySelector("form:has(textarea)");

if ($form) { // C'est pas null, hein ?
  $form.addEventListener("submit", () => {...})
}
```

Ça, c'est la partie simple. Mon erreur, c'était de présumer du retour du sélecteur suivant. Lisez le bien :

```js
const $form = document.querySelector("form:wow(textarea)");
```

Non, la pseudo-classe `:wow` n'existe pas, vous n'avez pas raté un chapitre de la folle histoire de CSS. Mais alors, que contiendra la variable `$form` ? Sera-t-elle `null`, de nouveau ?

Eh bien non : `$form` ne contiendra rien du tout. À la place, `document.querySelector()` va exploser en plein vol et nous jeter à la figure une erreur fatale :

```js
Uncaught DOMException:
Document.querySelector: 'form:wow(textarea)' is not a valid selector
```

`:wow` n'existe pas, mais c'est aussi ce qui se passera sur un vieux navigateur qui ne comprend pas `:has` : il déclenchera une erreur.

Et cette erreur, si on la catche pas, elle va tout bonnement planter notre JS et tout ce qui va avec. Et si ce qui va avec, c'est une <em>Single Page App</em> générée en JS, le résultat sera une belle page blanche !

## Et maintenant, cassons la prod

Conditionné que j'étais à penser que CSS ne me trahirait pas, j'ai passé un sélecteur contenant `:has` à la librairie <a href="https://react-joyride.com/">React Joyride</a>.

Le but de cette librairie est de générer un « parcours pas à pas » de bienvenue. Pour cela, il faut lui passer les sélecteurs qui lui permettront de cibler les éléments à mettre en valeur.

{% figure
  "joyride.png",
  "Une page d'accueil par dessus laquelle une boîte d'information met en valeur un élément spécifique",
  "React Joyride en action."
%}

Confiant dans l'usage de `:has` (qui m'évitait d'avoir à ajouter une classe conditionnelle à un élément), je pousse mon code. Le code passe la recette sans problème et atterit en production de ce site à quelques milliers de visites par jour 🙃

Quelques jours plus tard, surprise ! Quelques personnes semblent se plaindre d'atterir sur une page blanche... Leur point commun ? Utiliser une version de Safari dans laquelle `:has` n'était pas encore implémentée...

Je transpire un peu en réalisant mon erreur et pousse aussitôt un hotfix pour ne plus utiliser `:has`... Je comprends alors que la librairie est ma complice dans ce crime involontaire. Les erreurs de `querySelector` ne sont pas catchées.

Ou comment une fonctionnalité « annexe » de la plateforme devient soudain capable d'en crasher l'intégralité.

<a href="https://github.com/gilbarbara/react-joyride/issues/1035">Un ticket Github</a> et quelques temps plus tard, l'affaire est résolue dans le code source de la librairie. Je peux de nouveau utiliser des sélecteurs modernes tels que `:has` sans risquer l'intégrité de la page.

Schématiquement, si l'on revient à mon exemple de base, c'est aussi simple que ça :

```js
try {
  const $form = document.querySelector("form:has(textarea)");

  if ($form) {
    $form.addEventListener("submit", () => {...})
  }
} catch (error) {
  console.error(error);
}
```

## Morale de l'histoire

Deux erreurs ont été commises dans cette affaire :

- de la part de la librairie, qui ne catchait pas les erreurs (quand ce genre de choses vous arrive, faites un ticket ! à défaut de contribuer directement, vous aiderez les autrices et auteurs) ;
- de ma part : j'étais tellement convaincu de la résilience de CSS que j'ai oublié que je sortais du cadre strict de CSS et que je me trouvais en réalité en territoire JavaScript.

À l'avenir, une précaution simple : tester avec un sélecteur « impossible » tel que `:uhoh` pour m'assurer de la bonne prise en charge des cas invalides...

Cet article aurait pu être une simple phrase (mais où serait le plaisir ?) : **CSS échoue silencieusement. `document.querySelector()`, non !**