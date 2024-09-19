---
title: "Le problème avec Chrome, les iframes et mix-blend-mode"
slug: le-probleme-avec-chrome-les-iframes-et-mix-blend-mode
description: Enquête sur un bug obscur de Chrome, empêchant l'utilisation de la propriété de fusion de calques au sein d'une iframe.
date: 2020-05-26
tags:
  - CSS
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/the-trouble-with-chrome-iframes-and-mix-blend-mode-4bi1
series: Aventures CSS au pays du canvas
---

Dans cet article, je vais décrire un bug très spécifique de Chrome, et explorer ce qu'il nous apprend sur le comportement du canvas, que j'ai décrit dans l'article initial.

Si vous le pouvez, je vous recommande d'utiliser Chrome pour la lecture de cet article, afin de voir ce qu'il se passe.

## Quel est le bug ?

Dans Chrome, **au sein d'une `iframe`, un élément ne peut pas se mélanger avec le canvas de l'`iframe`**.

Pour montrer cela, CodePen est parfait : en effet, tout ce que vous voyez dans un CodePen se trouve à l'intérieur d'une `iframe`.

Reprenons l'exemple du post original, dans lequel nous souhaitons mélanger le `h1` vert avec l'arrière-plan blanc du `body` :

```css
body {
  background-color: white;
}

h1 {
  color: green;
  mix-blend-mode: difference;
}
```

Ce CSS est valide et devrait produire un titre rose (rose étant la différence entre vert et blanc).

{% codepen "https://codepen.io/bcalou/pen/RwWdKXe" %}

À l'heure où j'écris ces lignes (mai 2020) :

- Firefox passe le test (titre rose) ;
- Safari passe le test (titre rose) ;
- Chrome échoue (titre vert) – je l'ai fait fonctionner dans le post original avec une astuce que j'expliquerai par la suite.

D'après ce que nous avons appris dans l'article initial, voici ce qui se passe :

<ol>
  <li>le <code>body</code> est transparent (<code>white</code> est défini dans le CSS, mais la valeur est « volée » par le canvas) ;</li>
  <li>le <code>html</code> est transparent (valeur par défaut de <code>background-color</code>) ;</li>
  <li>le canvas est blanc (la valeur est issue du <code>body</code>).</li>
</ol>

Dans Firefox et Safari, le `h1` n'a aucun problème pour se mélanger au canvas blanc. Mais cela ne fonctionne pas sous Chrome.

Comme je l'ai précisé, cela se produit car CodePen présente notre code dans une `iframe` : [le même code fonctionne très bien en isolation](https://css-experiments.netlify.app/chrome_debug.html).

## Comment corriger cela ?

C'est très simple. Mais c'est ce que ce correctif révèle qui m'intéresse. Vous rappelez-vous du mécanisme du canvas « volant » l'arrière-plan du `body`, et du `body` ne repeignant pas la même couleur, finissant donc transparent ?

{% blockquote
  "Le fond de l'élément racine devient le fond du canvas. L'élément racine ne peint pas son arrière-plan de nouveau, ce qui signifie que la valeur effective de son arrière-plan est transparente.",
  "WC3",
  "The Canvas Background and the Root Element",
  "https://www.w3.org/TR/css-backgrounds-3/#root-background"
%}

Il se trouve que Chrome n'a pas de problème pour mélanger un élément avec l'arrière-plan du `body` de l'`iframe`. Mais le vol de l'arrière-plan par le canvas provoque une erreur.

Peut-on empêcher le canvas de commetre un tel crime ?

Oui, en donnant une couleur de fond à l'élément `html` également :

```css
html,
body {
  background-color: white;
}
```

{% codepen "https://codepen.io/bcalou/pen/GRpeWra" %}

Cela fonctionne désormais partout !

J'avais déjà utilisé ce correctif, mais je comprends seulement maintenant pourquoi il fonctionne : c'est parce qu'il empêche le canvas de voler l'arrière-plan du `body`.

Vous rappelez-vous de notre petit algorithme ?

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

Cela va à l'encontre des bonnes pratiques dictées par le W3C, mais si vous donnez une couleur de fond à l'élément `html`, elle sera utilisée par le canvas. Le `body` sera laissé tranquille.

Voici donc ce qui se passe :

<ol>
  <li>le <code>body</code> est blanc (valeur spécifiée en CSS. La valeur ne peut plus être volée, grâce au <code>html</code> faisant office de leurre) ;</li>
  <li>le <code>html</code> est transparent (<code>white</code> spécifiée en CSS, mais volé par le canvas) ;</li>
  <li>le canvas est blanc (valeur récupérée du <code>html</code>).</li>
</ol>

En quelque sorte, nous posons un appât avec la couleur du fond du `html`, pour que le `body` puisse conserver son propre arrière-plan, et que le titre puisse se mélanger correctement.

Un point contre-intuitif est que n'importe quel fond fera l'affaire, même un fond quasiment invisible :

```css
html {
  background-color: rgba(255, 255, 255, 0.01);
}

body {
  background-color: white;
}
```

L'arrière plan déclaré avec `rgba` est pratiquement invisible, mais le résultat est le même.

{% codepen "https://codepen.io/bcalou/pen/bGVZqaE" %}

Cela était assez confus pour moi. La valeur n'a pas d'impact ?

Il est plus facile de comprendre pourquoi, désormais. La valeur n'a aucune importance : la seule chose qui compte, _c'est qu'il y ait une valeur_, et que cette valeur distrait le canvas, qui ne viendra pas voler celle du `body`.

Penchons-nous maintenant sur un cas encore plus spécifique et voyons ce qu'il peut nous apprendre sur la relation entre le `body` et le canvas.

## Ça va trop loin

Le correctif de la couleur de fond sur l'élément `html` est simple, mais il y a un cas intéressant que ce correctif ne couvre pas.

Ajoutons un pseudo-élément avec une position `absolute` à notre titre :

```css
h1::after {
  content: "Hello from the other side";
  position: absolute;
  bottom: 50px;
  right: 50px;
}
```

Comme vous pouvez le voir, le pseudo-élément va atterir en bas à droite de notre page, _en dehors_ des éléments `body` et `html`. Je ne pense pas que les dieux du CSS aient voulu cette situation, mais oups, je viens de la produire.

Quelle sera donc la couleur du pseudo-élément ?

{% codepen "https://codepen.io/bcalou/pen/RwWdgpx" %}

Si vous utilisez Chrome, vous pouvez voir que l'élément est vert. Cela illustre bien le bug : à l'intérieur d'une `iframe`, un élément peut se mélanger au `body`, mais pas au canvas, bien que les deux soient blancs.

Et maintenant, la touche finale : vous pouvez clairement voir la distinction entre le `body` blanc et le canvas blanc en redimensionnant le viewport pour amener le pseudo-élément au dessus du `body`.

{% video
  "resize.webm",
  "Lorsque l'élément flotte en dehors du body, la fusion n'est pas appliquée et il reste vert. Lorsque la hauteur de la fenêtre est réduite et que l'élément ré-intègre le body, la fusion fonctionne et il devient rose comme prévu."
%}

Analysons la situation :

- le texte se mélange avec le `body` (valeur `white` dans le CSS) ;
- le texte ne se mélange pas avec le `html` (valeur `white` dans le CSS volée par le canvas, donc transparent) ;
- le texte ne se mélange pas avec le canvas, bien qu'il soit blanc, à cause du bug de l'`iframe` sous Chrome.

## Pourquoi cela m'importe-t-il tant ?

Il peut paraître exagéré de se pré-occuper de situations si extrêmes. Ce n'est pas le genre de problème que vous risquez de rencontrer au quotidien. Pensez-y : pour reproduire ce que montre le gif ci-dessus par accident, il vous faudrait :

- utiliser Chrome ;
- utiliser une `iframe` (créée par CodePen, par exemple) ;
- utiliser `mix-blend-mode` ;
- l'utiliser sur un élément dont tous les parents sont dépourvus d'arrière-plan ;
- l'utiliser sur un élément en position `absolute` ;
- travailler avec un `body` suffisamment petit pout que l'élément en position `absolute` passe en-dehors.

Eh bien, croyez-le ou non, c'est exactement ce qui m'est arrivé il y a quelques temps.

J'aidais un de mes étudiants à créer un effet avec `mix-blend-mode`. J'ai innocemment créé une démo sur CodePen, en utilisant Firefox. Tout était parfait. Affaire classée. Jusqu'à ce que mon étudiant m'informe que cela ne fonctionnait pas sous Chrome.

{% figure
  "worthy.jpeg",
  "Un homme plein de désillusion retire ses lunettes.",
  "Je ne suis plus digne d'être ton professeur."
%}

Il m'a fallu pas mal de temps pour comprendre tout ce que j'ai expliqué dans ces deux articles. Pour être honnête, j'ai d'abord fonctionné en mode « corriger maintenant, comprendre plus tard ». J'ai ajouté une couleur d'arrière-plan à l'élément `html`, forcé la hauteur du `body` à `100vh`, et voilà !

Quelques mois plus tard, je me pose pour analyser le problème... Et me voilà pris dans cette spirale infernale.

## Améliorer les choses

Bien que le correctif de la couleur de fond sur l'élément `html` soit simple, et bien que la situation décrite plus haut est hautement improbable, il s'agit toujours d'un bug.

En réalité, il s'agissait même d'un bug qui se produisait en dehors des `iframes` ! Un [ticket Chromium a été ouvert en 2017](https://bugs.chromium.org/p/chromium/issues/detail?id=711955). Il a été marqué comme résolu en 2020.

Réalisant que le bug se produisait toujours dans les `iframes`, je me suis permis de le signaler dans [un commentaire](https://bugs.chromium.org/p/chromium/issues/detail?id=711955#c16), ce qui a conduit à la création d'un [ticket dédié](https://bugs.chromium.org/p/chromium/issues/detail?id=711955).

{% aside %}Mise à jour 2024 : Le bug, qui ne doit pas empêcher de dormir grand monde, n'a toujours pas été résolu.{% endaside %}

## Méfiez-vous de vos habitudes de test

Je suis amoureux de CodePen. Je pense que je n'ai pas besoin d'expliquer pourquoi. Je m'en sers presque tous les jours.

Mais dans ce cas précis, CodePen m'a mis dans une situation qui n'était **pas** la même que celle que je tentais de débloquer. J'aidais un étudiant à créer une page qui ne contenait pas d'`iframe`. En utilisant un outil présentant mon code dans une `iframe`, j'ai changé les conditions initiales. Et comme nous l'avons vu, c'est un changement non négligeable lorsqu'on parle de Chrome et de `mix-blend-mode`.

Notez que CodePen n'est pas à blâmer : c'est Chrome qui est en faute ici, et CodePen n'a pas d'autre choix que de présenter mon code dans une `iframe` – sauf si vous utilisez la vue _debug_ !

{% figure
  "debug.jpg",
  "Le menu de CodePen permettant d'accéder à la vue debug.",
  "Utilisez la vue <i>debug</i> pour éxécuter votre code dans une vraie page – sans <code>iframe</code> !"
%}

Je suis aussi à blâmer : j'avais une telle confiance aveugle en CodePen que j'ai inconsciemment écarté l'hypothèse que l'utiliser pouvait affecter mon résultat.

Alors, comme disait l'autre : ne tombez pas amoureux de vos outils. Rien ne vaut un vrai test.
