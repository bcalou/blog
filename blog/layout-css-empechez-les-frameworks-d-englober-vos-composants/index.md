---
title: "Layout CSS : empêchez les frameworks d'englober vos composants"
intro: L'astuce des marges automatiques offre une grande flexibilité dans le cadre d'un composant flex.
date: 2019-06-26
tags:
  - css
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/css-layout-get-around-frameworks-wrapping-your-components-2hgm
---

CSS est difficile, à ce qu'il paraît. Mais avez-vous déjà essayé d'écrire du CSS en vous battant contre un framework qui modifie votre DOM ?

## Le problème

Je travaille sur une interface simple : header, contenu, footer. Le header et le footer ont une taille fixe, et je souhaite positionner le contenu au centre de l'espace restant.

{% blockquote
  "Ah, flexbox, mon vieil ami, ainsi nous nous retrouvons !",
  "Moi-même (pas vraiment, c'est juste pour l'ambiance)"
%}

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

{% figure
  "base.png",
  "Le main correctement placé au centre de l'espace vide.",
  "Chacun des trois descendants directs du <code>body</code> a une bordure bleue. Jusqu'ici, tout va bien."
%}

Je suis donc heureux, comme tout développeur front quand les choses s'alignent correctement.

Mais alors que l'application grandit, je réalise que je vais avoir besoin d'englober le `main` et le `footer` à l'intérieur d'un composant Angular unique, pour des raisons structurelles propres à l'application.

C'est alors que ma belle page se brise, et vous pouvez comprendre pourquoi en regardant la structure générée par l'apparition de ce nouveau composant :

```html
<body>
  <header></header>
  <my-component>
    <main></main>
    <footer></footer>
  </my-component>
</body>
```

Hélas ! Flexbox ne s'intéresse à rien d'autre qu'à ses propres enfants directs, qui sont maintenant `header` et `my-component`.

{% figure
  "wrapped.png",
  "Le header est placé en haut, le main et le footer sont ensembles, collés en bas.",
  "Regardez les bordures bleues : le <code>body</code> n'a plus que deux enfants directs."
%}

Ma première idée fut de faire de `my-component` un conteneur flex lui-même, mais je n'allai pas très loin avec cette idée.

```css
my-component {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

{% figure
  "fail.png",
  "Le main est collé sous le header, avec un grand espace entre le main et le footer.",
  "<code>my-component</code> est un conteneur flex lui-même... Mais cela ne centre pas le bloc <code>main</code> pour autant."
%}

Pensez-y un instant : comment vous y prendriez-vous ?

## Une méthode douteuse

Je sais que vous n'y avez pas pensé un instant et que vous avez continué votre lecture. Je ne vous en veux pas.

Une méthode à laquelle je n'avais pas pensé avant d'écrire cet article est d'ajouter un pseudo-élément à `my-component` :

```css
my-component::before {
  content: "";
}
```

`my-component` a désormais trois enfants : le pseudo-élément `before`, le `main` et le `footer`.

Voici le résultat en action !

{% codepen "https://codepen.io/bcalou/pen/GaJyXZ" %}

Il n'y a qu'à remplacer le contenu du pseudo-élément par une chaîne vide, et voilà ! Parfois, une solution un peu sournoise comme celle-ci est si simple qu'elle en devient attractive...

## Une méthode plus propre

Mais ajouter un pseudo-élément juste pour tromper flexbox ne me paraît pas extrêmement propre !

Il y a quelques semaines, j'ai lu cet excellent article de Rachel Andrews : [Digging Into The Display Property: Box Generation](https://www.smashingmagazine.com/2019/05/display-box-generation/).

En lisant les informations à propos de `display: content`, j'avais deux pensées parallèles :

* Ça alors, c'est fort intéressant...
* ...mais je ne vais jamais m'en servir.

Mais en travaillant sur mon problème de layout, l'article me revint à l'esprit. En voici un extrait :

{% blockquote
  "La valeur <code>display: contents</code> retire la boîte (<em>box</em>) à laquelle elle est appliquée de l'arbre des boîtes (<em>box tree</em>), de la même façon que <code>display: none</code>, mais en laissant les enfants en place.",
  "Rachel Andrews",
  "Digging Into The Display Property: Box Generation",
  "https://www.smashingmagazine.com/2019/05/display-box-generation/#display-contents"
%}

En d'autres termes, cela sera équivalent (dans notre cas !) à ce qu'il se passerait si l'on commentait l'élément (mais pas ses enfants) :

```html
<body>
  <header></header>
  <!-- <my-component> -->
  <main></main>
  <footer></footer>
  <!-- </my-component> -->
</body>
```

Et voici comment procéder dans les faits :

```css
my-component {
  display: contents;
}
```

<aside>Note : En réalité, certaines propriétés CSS (<code>font-size</code>, <code>color</code>...) appliquées à l'élément impactent toujours ses enfants. Donc commenter l'élément n'est pas strictement équivalent, mais vous avez l'idée.</aside>

Donc... Cela signifie-t-il que du point de vue de flexbox, `main` et `footer` sont de nouveau des enfants directs du `body` ? Oui ! `my-component` n'a plus besoin d'être un conteneur flex lui-même. La propriété `justify-content: space-between` appliquée au `body` fonctionne de nouveau.

C'est la solution la plus courte présentée dans cet article : un sélecteur et une propriété. Presque magique.

{% codepen "https://codepen.io/bcalou/pen/xNJVWG" %}

Notez que la bordure bleue qui entourait `my-component` a disparu : en effet, la boîte n'est plus rendue, donc les propriétés correspondantes (<code>margin</code>, <code>padding</code>, <code>border</code>...) n'ont plus d'effet.

Bien que j'aime la belle simplicité de cette solution, `display: contents` possède ses inconvénients.

`display: contents` peut provoquer des **problèmes d'accessibilité**, car l'élément est caché de l'arbre d'accessibilité. Si vous l'utilisez sur un élément `ul`, l'information qu'il s'agit d'une liste sera perdue dans de nombreux navigateurs.

Ce n'est pas un problème dans notre cas, cependant, puisque `my-component` ne véhicule pas de sens sémantique particulier. Mais l'on pourrait toutefois se méfier du **support navigateur**, qui est dans cette zone grise que j'appelerai la zone <q>meh...</q>.

<aside>Mise à jour 2023 : <code>display: contents</code> est désormais largement supporté, bien que <a href="https://caniuse.com/?search=display%3A%20contents">caniuse.com</a> rapporte toujours de nombreux problèmes d'accessibilité. À juger au cas par cas, donc.</aside>

## Une méthode encore plus propre

Voici donc la technique `margin: auto`.

Ce n'est qu'en rédigeant cet article que je me suis souvenu d'un autre article, un des meilleurs que j'ai lu sur le sujet: [Flexbox's Best Kept Secret](https://hackernoon.com/flexbox-s-best-kept-secret-bd3d892826b6), de Sam Provenza. Il date de 2015 et j'ai utilisé ce « secret » un grand nombre de fois depuis.

Quatre ans plus tard, je ne suis pas sûr qu'il soit bien connu. Mais vous pouvez utiliser `margin-left: auto`, pas exemple, pour « pousser » un élément flexbox aussi loin que possible vers la droite.

Voyez plutôt ce Codepen. L'élément de prix possède la propriété `margin-left: auto`.

{% codepen "https://codepen.io/samserif/pen/GpwyOg" %}

C'est extrèmement utile ! Avec cette technique, il devient possible de pousser un élément dans n'importe quelle direction, horizontale ou verticale.

Mais il y avait une partie de l'article que j'avais oubliée :

{% blockquote
  "Si vous ne spécifiez pas de direction et que vous appliquez simplement <code>margin: auto</code>, l'élément distribura l'espace disponible des deux cotés, équitablement.",
  "Sam Provenza",
  "Flexbox's Best Kept Secret",
  "https://hackernoon.com/flexbox-s-best-kept-secret-bd3d892826b6"
%}

Ainsi, le « secret » fonctionne aussi avec plusieurs marges `auto`.

Et la voici donc, cette merveilleuse solution à notre problème : faire de `my-component` un conteneur flex de nouveau, et utiliser `margin: auto 0` sur l'élément `main`.

<aside>Mise à jour 2023 : Utiliser la propriété logique <code>margin-block: auto</code> nous éviterait d'avoir à spécifier le <code>0</code>, qui m'a toujours un peu gêné...</aside>

```css
my-component {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

main {
  margin: auto 0;
}
```

Et voici le résultat en action.

{% codepen "https://codepen.io/bcalou/pen/ZNjWRN" %}

L'espace libre est distribué équitablement entre le dessus et le dessous de l'élément `main`.

Pas de pseudo-élément magique. Moins de risque d'accessibilité et de compatibilité. Simplement la majestueuse et toute puissante flexpower™.

L'épopée du centrage vertical ne s'achève jamais.
