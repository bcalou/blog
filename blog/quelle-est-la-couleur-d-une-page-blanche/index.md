---
title: "Quelle est la couleur d'une page blanche ?"
slug: quelle-est-la-couleur-d-une-page-blanche
description: Derrière le body et l'élément html se trouve le « canvas », composant élémentaire mais méconnu de nos chères pages web.
date: 2020-05-22
tags:
  - CSS
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/what-is-the-color-of-a-blank-page-49og
series: Aventures CSS au pays du canvas
---

Imaginez le HTML suivant dans votre tête :

```html
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

Vous ouvrez ce HTML dans votre navigateur. Quel est la couleur de la page ?

{% img "trap.jpg", "It's a CSS trap!" %}

Vous pouvez penser que c'est une question piège, car le blanc n'est pas réellement une couleur, mais la page n'est de toute façon pas blanche : elle est _transparente_. Oui, le navigateur est blanc, mais la page présentée au sein du navigateur est transparente.

## Prouve-moi que la page n'est pas blanche, car elle me semble tout de même pas mal blanche

Mode philosophe activé :

{% blockquote "Qu'est ce qu'une page ?" %}

Deux éléments doivent être considérés :

- l'élement `body` ;
- l'élement `html`.

Si l'on souhaite obtenir un fond jaune, on utilise la propriété `background-color` sur le `body` :

```css
body {
  background-color: yellow;
}
```

{% codepen "https://codepen.io/bcalou/pen/WNQggzY" %}

À partir de cet exemple, on peut imaginer que le `body` remplit l'intégralité du viewport, car désormais tout est jaune.

C'est faux. Ajoutons une bordure au `body` :

{% codepen "https://codepen.io/bcalou/pen/PoPddaR" %}

Vous pouvez voir qu'en réalité le `body` n'utilise que l'espace dont il a besoin pour afficher le contenu « Hello world ».

{% blockquote "Mais alors, pourquoi tout ce jaune ?" %}

Il faut demander cela au w3c :

{% blockquote
  "L'arrière-plan de l'élément racine devient l'arrière-plan du canvas et sa zone de peinture s'étend pour couvrir le canvas en entier.",
  "W3C",
  "The Canvas Background and the Root Element",
  "https://www.w3.org/TR/css-backgrounds-3/#root-background"
%}

Traduction humaine : vous spécifiez une couleur de fond sur le `body`. Le navigateur l'utilisera comme couleur de fond du canvas.

Le canvas, dites-vous ?

{% blockquote
  "Le canvas du document est la surface infinie sur laquelle le document est rendu.",
  "W3C",
  "Backgrounds of Special Elements",
  "https://www.w3.org/TR/css-backgrounds-3/#special-backgrounds"
%}

Une surface infinie, rien que ça.

La notion de canvas est absente de la plupart des cours dédiés au CSS (y compris du mien, dois-je avouer), bien qu'il s'agisse d'un composant très important du navigateur. Comme nous venons de le voir, en se basant sur le `body`, il fourni un arrière-plan pour l'ensemble du viewport.

Avec cette nouvelle information, nous pouvons mettre à jour notre représentation mentale de la page, de haut en bas :

<ol>
  <li>l'élément <code>body</code> ;</li>
  <li>l'élément <code>html</code> ;</li>
  <li>le canvas.</li>
</ol>

Pendant longtemps, j'ai pensé que le canvas était jaune parce que le `body` _était_ le canvas. Mais non : le canvas ne fait qu'utiliser une information provenant du `body` et peut être bien plus grand que le `body` lui-même.

Il est intéressant de noter que bien que l'on demande au `body` d'être jaune, il est en réalité transparent. Comme l'explique le W3C :

{% blockquote
  "Le fond de l'élément racine devient le fond du canvas. L'élément racine ne peint pas son arrière-plan de nouveau, ce qui signifie que la valeur effective de son arrière-plan est transparente.",
  "WC3",
  "The Canvas Background and the Root Element",
  "https://www.w3.org/TR/css-backgrounds-3/#root-background"
%}

Il est inutile pour le navigateur de peindre le `body`, qui a la même couleur que le canvas : il est donc traité comme étant transparent.

En d'autres termes, lorsque vous donnez une couleur de fond au `body`, vous stylisez en réalité le canvas (qui ne peut pas être ciblé directement en CSS). Le canvas « vole » la valeur du `body`.

## Au-delà du body

Mode philosophe activé :

{% blockquote "Qu'est ce que le <code>body</code> ?" %}

D'après le W3C, le `body` <q cite="https://html.spec.whatwg.org/multipage/sections.html#the-body-element">représente les contenus du document</q>.

Si le `body` est le contenu, il semble honnête de dire que ce qui est en dehors du `body` n'est pas le contenu.

Dans ce cas, utiliser `background-color` sur l'élément `html` ne devrait pas avoir d'effet, puisqu'il ne fait pas partie du contenu ?

Pensez-y un instant : à quoi ressemblerait notre page avec ce CSS ?

```css
html {
  background-color: green;
}

body {
  background-color: yellow;
}
```

Quelle est la couleur de la page maintenant ? Est-elle verte, est-elle jaune, est-elle les deux ? Bien sûr qu'elle est les deux.

{% codepen "https://codepen.io/bcalou/pen/oNjPPNj" %}

Que voyons-nous ?

<ol>
  <li>le jaune est désormais limité au <code>body</code> ;</li>
  <li>l'élément <code>html</code> semble remplir l'ensemble du viewport.</li>
</ol>

Faux ! Une fois de plus, nous sommes trompés par les apparences.

{% blockquote "Mais si, il remplit le viewport, toute la page est verte !" %}

Je sais. Mais ajoutons des bordures à l'élément `html` pour comprendre ce qui se passe :

{% codepen "https://codepen.io/bcalou/pen/zYvJJzY" %}

Il est intéressant de noter que le navigateur n'a pas de problème pour appliquer des styles (tels que nos bordures) en dehors du `body`. Mais continuons.

Donc, en réalité, le `html` se comporte comme le `body` : il ne prend que la place nécessaire à la présentation de son contenu, c'est à dire le `body` et ses `8px` de marge, qui viennent des styles par défaut du navigateur.

{% blockquote "Mais alors pourquoi tout ce vert ?" %}

Même réponse du W3C :

{% blockquote
  "Le fond de l'élément racine devient le fond du canvas.",
  "WC3",
  "The Canvas Background and the Root Element",
  "https://www.w3.org/TR/css-backgrounds-3/#root-background"
%}

On apprend également que l'élément racine peut être le `body` ou le `html` :

{% blockquote
  "Il est recommandé aux auteurs de documents HTML de spécifier le fond du canvas sur l'élément <code>body</code> plutôt que sur l'élement <code>html</code>.",
  "W3C",
  "The Canvas Background and the HTML &lt;body&gt; Element",
  "https://www.w3.org/TR/css-backgrounds-3/#body-background"
%}

Bien que le W3C recommande de ne pas utiliser l'élément `html` pour faire cela, c'est ce que l'on vient de faire, et c'est de là que le canvas tire sa couleur verte.

Comme dans le premier exemple, l'élément `html` est traité come transparent : son vert est « volé » par le canvas.

Nous avons maintenant l'algorithme complet que le navigateur utilise pour choisir la couleur du canvas :

```
if (le html possède une background-color) {
  on l'utilise pour peindre le canvas
}
else if (le body possède une background-color) {
  on l'utilise pour peindre le canvas
}
else {
  le canvas demeure transparent
}
```

Bien, cela fait un mystère de résolu, et ce n'est pas si étrange, finalement. Il est même assez heureux que nous n'ayons pas à donner des dimensions explicites à l'élément racine pour que la couleur de fond remplisse le viewport.

## Pourquoi est-ce important ? Et c'est quoi cette histoire de blanc VS transparent ?

Comprendre qu'il y a une différence entre blanc et transparent, bien que les deux situations semblent identiques, est clé dans la compréhension de certains mystères du CSS.

Amusons-nous avec `mix-blend-mode`. Cette propriété CSS nous permet de définir comment un élément devrait se mélanger visuellement avec son parent. On en parle parfois comme de « Photoshop dans le navigateur ». Que cela soit une éxagération ou non, les possibilités sont extraordinaires.

{% figure
  "blend.jpg",
  "Une série d'exemples d'utilisation de mix-blend-mode pour créer différents effets visuels.",
  "Quelques exemples d'utilisation de mix-blend-mode."
%}

Commençons avec un exemple simple : notre `h1` sera vert, et nous souhaitons changer son apparence avec `mix-blend-mode: difference`.

```css
h1 {
  color: green;
  mix-blend-mode: difference;
}
```

La valeur `difference` signifie que la couleur du texte sera la différence entre la couleur originale (vert) et la couleur de l'arrière-plan.

La différence entre vert et blanc est rose. On espère donc que notre titre sera rose.

{% codepen "https://codepen.io/bcalou/pen/YzyOJEO" %}

Il n'est pas rose. Je répète, il n'est pas rose.

{% blockquote "Mais il devrait devenir rose, l'arrière-plan est blanc !" %}

Non, il n'est pas blanc. Il est transparent.

{% img "smart.jpg", "Bien vu !" %}

La différence entre vert est transparent est vert, et c'est pour cela que la couleur du titre reste inchangée.

Récapitulons :

<ol>
  <li>le <code>body</code> est transparent (valeur par défaut de <code>background-color</code>) ;</li>
  <li>le <code>html</code> est transparent (valeur par défaut de <code>background-color</code>) ;</li>
  <li>le canvas est transparent (aucune valeur fournie par <code>html</code> ou <code>body</code>).</li>
</ol>

Notre pauvre titre n'a donc rien avec quoi se mélanger.

Le correctif est facile : donnez un arrière-plan blanc au `body` !

```css
body {
  background-color: white;
}
```

Et maintenant, ça fonctionne !

{% codepen "https://codepen.io/bcalou/pen/wvKEYGO" %}

Récapitulons à nouveau :

<ol>
  <li>le <code>body</code> est transparent (<code>white</code> est défini dans le CSS, mais la valeur est « volée » par le canvas) ;</li>
  <li>le <code>html</code> est transparent (valeur par défaut de <code>background-color</code>) ;</li>
  <li>le canvas est blanc (la valeur est issue du <code>body</code>).</li>
</ol>

Et c'est ainsi que notre titre vert se mélange au canvas pour devenir rose. Ce titre pourrait bien sûr être une image, une vidéo, quoi que ce soit. Le `body` (ou n'importe quel élément contenant notre cible) _doit_ posséder un arrière-plan (on pourrait également donner une couleur de fond à l'élément `html` pour y parvenir, mais ce n'est pas standard).

Notre périple touche à sa fin, mais une question demeure...

## Quelle est la couleur d'un canvas vide ?

Notre modèle mental d'une page est ainsi :

<ol>
  <li>l'élément <code>body</code> ;</li>
  <li>l'élément <code>html</code> ;</li>
  <li>le canvas.</li>
</ol>

D'après ce que nous venons d'apprendre, si le `body` et le `html` sont transparents, le canvas sera transparent aussi.

{% blockquote "Mais comment la dernière couche peut-elle être transparente ? Si c'était le cas, on verrait le bureau et les autres fenêtres au travers du navigateur, tu es fou !" %}

Laissez-moi vous expliquer. Et s'il y avait une _autre_ couche, réellement blanche, plus bas que le canvas ?

{% img "theory.jpg", "Un homme explique frénétiquement une théorie farfelue." %}

Encore une fois, le W3C nous donne la réponse :

{% blockquote
  "Si l'arrière-plan du canvas n'est pas opaque, ce qui est visible en dessous dépendra de l'agent utilisateur.",
  "W3C",
  "The Canvas Background and the HTML &lt;body&gt; Element",
  "https://www.w3.org/TR/css-backgrounds-3/#body-background"
%}

Traduction humaine : il y a quelque chose _derrière_ le canvas. Vous pouvez voir cette chose si le canvas est transparent. Ce que vous voyez dépend du navigateur.

Sur tous les navigateurs auxquels je peux penser, cette dernière couche est blanche. Mais théoriquement, elle pourrait aussi montrer l'image d'un cheval en train de manger une pizza à l'ananas. Quel web étrange cela serait.

Bref, cela m'a conduit à me poser une question : y a-t-il un moyen de vraiment voir la différence entre un canvas blanc et un canvas transparent ? Peut-on obtenir la _preuve_ que le canvas est transparent par défaut ? Je demande pour un ami.

## L'indice de l'iframe

Revenons à un CSS très simple :

```css
html,
body {
  border: 3px dashed black;
}
```

{% codepen "https://codepen.io/bcalou/pen/ExVdbgE" %}

Incluons cette page dans une autre grâce à une balise `<iframe>` :

```html
<iframe src="..." width="100%" height="300px"></iframe>
```

Voici ce que l'on obtient :

{% codepen "https://codepen.io/bcalou/pen/GRpYOjV" %}

La question est donc : l'`iframe` possède-t-elle un canvas transparent ou blanc ?

Nous pouvons obtenir la réponse en donnant un arrière-plan à la page parente :

```css
body {
  background-color: lightblue;
}
```

{% codepen "https://codepen.io/bcalou/pen/ExVdbNL" %}

Comme vous pouvez le constater, l'`iframe` est transparente. Son `body`, son `html` et son canvas. On peut voir la page parente au travers.

{% blockquote "Cela prouve-t-il vraiment que le canvas est transparent ? Peut-être que les iframes n'ont pas de canvas ?" %}

C'est une question légitime. Pour y répondre, ajoutons un fond blanc à l'élément `body` de l'`iframe` :

```css
body {
  background-color: white;
}
```

{% codepen "https://codepen.io/bcalou/pen/mdezqON" %}

Si l'`iframe` n'avait pas de canvas, la zone en dehors de son élément `body` ne serait pas remplie. Mais grâce au mécanisme du canvas, la couleur de fond du `body` peut être utilisée pour couvrir l'ensemble du viewport de l'`iframe`.

Et c'est ainsi que l'on montre que sur n'importe quelle page, **le canvas par défaut n'est pas blanc mais transparent**.

Ce que vous voyez quand vous ouvrez une page vide n'est donc pas un canvas blanc. C'est juste le « fond » du navigateur, l'arrière-plan du logiciel, en dehors du monde du CSS, qui n'interagit aucunement avec quoi que ce soit.

{% img "deep.png", "C'est vraiment profond..." %}

Et voici donc notre modèle (final ?) de ce que nous voyons :

<ol>
  <li>l'élément <code>body</code> (transparent par défaut) ;</li>
  <li>l'élément <code>html</code> (transparent par défaut) ;</li>
  <li>le canvas (dépend du <code>html</code> et du <code>body</code>, donc transparent par défaut) ;</li>
  <li>les fondations innaccessibles du logiciel (souvent un fond blanc).</li>
</ol>

Oh, et j'ai essayé d'en faire un dessin :

{% figure
  "schema.png",
  "Les quatres couches du navigateur : body, html, canvas et fond du navigateur.",
  "It's a small <em>Hello World</em> after all."
%}

C'était sympa, ce petit voyage. Et oui, j'ai une vie. Si vous avez plus d'informations à propos de tout cela, laissez un commentaire !

CSS tourne beaucoup autour de ce que l'on voit, mais aussi beaucoup autour de ce que l'on ne voit pas.
