---
title: "L'ère du no-hacks CSS"
slug: l-ere-du-no-hacks-css
description: "Propagez la nouvelle : en 2022, le CSS bricolé, c'est de l'histoire ancienne."
date: 2022-03-28
tags:
  - CSS
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/the-era-of-no-hacks-css-287l
---

Si vous avez appris CSS n'importe quand avant 2020, il y a fort à parier que vous avez collecté tout un tas d'astuces (ou <em>hacks</em>) en cours de route. Vous savez, ces choses comme le centrage vertical, les styles pour les éléments de formulaire, le dimensionnement des images, les retours à la ligne... De la magie noire. Des comportement incroyablement spécifiques que vous recherchez dans Google, espérant que quelqu'un a déjà écrit un article à ce propos, et qui ruineront votre journée dans le cas contraire.

Beaucoup de mes collègues regardent CSS avec une grande méfiance, car ils ont dû s'y frotter il y a 10 ans, avant de se diriger vers le back-end, la gestion de projet, le design ou même le « front-end pur JS ».

Beaucoup de gens vont jusqu'à regarder les développeurs utilisant CSS comme d'étranges créatures, ceux qui sont parvenu à dompter le monstre, ceux qui ont pu voir au travers de la jungle impénétrable des <em>hacks</em> et donner du sens à tout cela aux dépends de leur propre sanité d'esprit.

Mais la réalité est la suivante :

## Nous n'aimons pas les hacks CSS

Personnellement, je les déteste. Ils peuvent être amusants à montrer à quelqu'un qui se débat face à un étrange comportement de mise en page (tadaaaa !), mais je les méprise, car ce ne sont que des contournements, ou d'horribles façon non-standards d'utiliser des propriétés qui n'ont jamais été faites pour cela. Ces codes sont énigmatiques, un cauchemar de maintenance, et, probablement le pire, ils créent une méfiance envers CSS qui au bout du compte fait du mal à l'ensemble de l'écosystème.

Et c'est ainsi que naissent les memes de Petter Griffin se battant contre le CSS, les blagues sur l'alignement vertical... Fichtre, j'ai même l'ironique mug <q>CSS is awesome</q> comme bannière Twitter.

{% img
  "awesome.jpeg",
  "Un mug sur le quel est écrit CSS is awesome. Le texte déborde de son conteneur."
%}

Ces blagues nous ont aidé à supporter la dure réalité de CSS pendant des années, mais le fait est qu'elles sont désormais périmées. En réalité, les utilser reviendrait presque à dire :

{% blockquote
  "J'ai appris CSS il y a 10 ans, j'ai détesté cela et je n'ai jamais ré-essayé ! (insérez la présentation d'une librairie CSS-in-JS miraculeuse ici)"
%}

Oui, il est temps que cette bannière Twitter s'en aille...

## 2022 sera-t-elle le début de l'ère du no-hacks CSS ?

Beaucoup de choses se passent autour de CSS ces temps-ci, et je pense que 2022 pourrait être l'année où l'on se débarasse des hacks CSS, ou du moins où l'on cesse de les considérer comme du « CSS normal ».

Jetez un oeil à ce tweet, par exemple :

{% figure
  "bramus.png",
  "Tweet de Bramus",
  "X",
  "https://x.com/bramus/status/11475583226165055501"
%}

Les choses avancent vite est CSS devient un langage mature. Même la communauté des navigateurs s'organise pour faire évoluer CSS de la meilleure façon possible, avec par exemple l'initative [Interop](https://wpt.fyi/interop-2022).

## L'exemple de accent-color

La propriété [accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) est plutôt simple et l'une de mes nouveautés préférées.

Son seul but est de vous permettre de changer la couleur des inputs natifs : checkboxes, boutons radios, ranges... Voyez plutôt :

```css
:root {
  accent-color: crimson;
}
```

{% codepen "https://codepen.io/bcalou/pen/XWVpOxB" %}

Une ligne de CSS et zéro hack.

Pendant des années (oserai-je dire des décennies ?), les développeurs CSS ont réalisé cet effet en cachant l'input réel en en montrant un input factice possédant l'apparence désirée. Les deux étaient liés par la bonne vieille pseudo-classe `:checked`. Ce code n'a jamais été du code normal. C'était du code sale, propice aux bugs, attendant patiemment d'être remplacé par une solution propre.

## Laisser tomber les hacks est aussi votre responsabilité

La propriété `accent-color` est également un bon exemple de cela. En effet, elle est nouvelle et n'est pas supportée par tous les navigateurs.

Eh bien comme dirait l'autre, je n'en ai cure.

CSS étant génial, il ignorera simplement `accent-color` sur les navigateurs plus vieux et utilisera les couleurs par défaut. Ce qui est tout à fait acceptable (faites simplement attention à tester le contraste si votre fond n'est pas blanc).

Encore mieux, le temps passant, de plus en plus de gens utiliseront un navigateur supportant cette fonctionnalité et verront le design initialement voulu. Voici la magie de l'amélioration progressive : votre site web s'améliore alors que vous n'êtes même pas en train de travailler.

Le fait que je ne m'en soucie pas ne veux pas dire que ce sera le cas pour tout le monde. Un designer ou un manager décidera peut-être qu'il est important que les inputs respectent la couleur de la marque, même sur les vieux navigateurs, et je respecte cela. Mais ce n'est pas qu'une question de design, il y a des coûts et des bénéfices.

Je défendrais donc la position que bidouiller le CSS (une bidouille qui peut bugger) pour une fraction de l'audience (une fraction qui aurait une très bonne solution alternative et dont la taille diminuera avec le temps) n'en vaut pas la peine dans la plupart des cas.

J'adore également la propriété `gap` pour flexbox, qui rend la gestion des espacements si simple :

```css
body {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

{% codepen "https://codepen.io/bcalou/pen/abEpMOx" %}

Une fraction en diminution des navigateurs ne supporte pas cette fonctionnalité et ne montrera   aucun espace entre les éléments. Que vous soyez prêt à utiliser un [hack de marges négatives](https://bastiencalou.fr/posts/flexbox-les-marges-negatives-a-la-rescousse/) ou non est un autre débat sur lequel il vous faudra trancher.

J'ai commencé à faire la paix avec le fait qu'une petite fraction (et encore une fois, en diminution) des utilisateurs n'aura pas les espaces. Tant que le contenu est parfaitement lisible, cela ne me dérange pas.

{% aside %}
Mise à jour 2024 : la propriété <code>gap</code> est désormais supportée pour flexbox sur l'ensemble des navigateurs majeurs. 🎉
{% endaside %}

## Adieux les hacks

Bien sûr, j'utilise toujours des hacks, de temps en temps. Mais j'ai cessé de les considérer comme du CSS commun.

CSS rattrape son retard sur nos bidouilles et est en train d'éradiquer les hacks en proposant des fonctionnalités standards et robustes. Si vous utilisez (et défendez) les techniques d'amélioration progressive grâce auxquelles vous savez que votre contenu sera toujours accessible sans chaque ligne de CSS désirée, vous pouvez utiliser ces nouveautés à volonté. Vous vivrez libre, plus longtemps et, je le crois, ferez de meilleurs sites web.

Partagez cet article à un ou une collègue qui déteste CSS ;) Si c'est votre cas, je ne peux pas vous blâmer. Mais nous sommes en 2022 et CSS a changé.