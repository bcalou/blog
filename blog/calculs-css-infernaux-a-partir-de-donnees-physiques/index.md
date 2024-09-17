---
title: Calculs CSS infernaux à partir de données physiques
permalink: calculs-css-infernaux-a-partir-de-donnees-physiques
description: La puissance de CSS pour des effets adaptatifs... au prix d'une complexité peu digeste.
date: 2021-06-18
tags:
  - CSS
layout: layouts/post.njk
series: À la découverte d'Eleventy
originalPost: https://dev.to/bcalou/calculs-css-infernaux-a-partir-de-donnees-physiques-4ah9
---

Côté CSS, je suis assez satisfait de l'effet **renversant** (j'exagère un peu) de survol que j'ai mis en place (voir sur [le site](https://top-livres.netlify.app/)).

{% video "hover.webm", "Lorsque le curseur survole un livre, ce dernier pivote avec un effet 3D." %}

Il s'agit en fait d'une adaptation d'un projet open source, [3dbook.xyz](https://3dbook.xyz/).

L'intérêt de cette adaptation réside dans le fait que j'ai utilisé les variables CSS pour faire le lien entre des données concrètes, comme le nombre de pages, et le rendu CSS final.

Car tout ça est subtil. L'épaisseur du livre, par exemple, va dépendre bien sûr du nombre de pages, mais aussi de la taille du livre. Un livre de poche de 200 pages vu de près pourra paraître aussi épais qu'un gros livre de 400 pages vu d'un peu plus loin...

Cela nécessite donc quelques calculs !

## Les données

Voici les données concrètes qui nous intéressent, par exemple pour le livre _Clyde Fans_ :

```yaml
---
width: 17
height: 23.5
pages: 488
offset: true
---
```

Respectivement :

- la largeur et la hauteur du livre en centimètres ;
- le nombre de pages ;
- `offset: true` pour préciser que les pages sont plus petites que la couverture elle-même, ce qui est parfois le cas pour les gros livres (voir le gif ci-dessus).

## Passer les données à l'élément

Grâce au langage de templating `liquid`, je pourrais alors générer des styles inline à partir de ces variables :

```liquid
{% raw %}<img style="width: {{ item.data.width * 10 }}px" />{% endraw %}
```

Dans cet exemple, un livre faisant `20cm` de large dans le monde physique fera `200px` sur mon site.

On peut faire en réalité bien plus propre et flexible, en passant ces paramètres aux composant sous forme de variables CSS.

Voici ce que ça donne :

```liquid
{% raw %}<div
  class="book {% if item.data.offset %}book--offset{% endif %}"
  style="
    --width: {{ item.data.width }};
    --height: {{ item.data.height }};
    --pages: {{ item.data.pages }};
  "
></div>
{% endraw %}
```

La variable `offset`, si elle est présente, permet d'ajouter une classe supplémentaire à l'élément `.book`.

Les 3 autres variables sont passées grâce à l'attribut `style`, et sont maintenant disponibles pour chaque élément `.book`.

<aside>Note : Les variables CSS sont scopées. Chaque élément <code>.book</code> possède désormais ces 3 variables qui ne sont accessibles qu'à lui-même et ses enfants.</aside>

{% figure
  "dom.png",
  "L'inspecteur du DOM montre les trois variables associées à l'élement book.",
  "Les variables sont désormais disponibles dans le scope CSS de l'élément."
%}

## CSS : let the fun begin

Maintenant, nous pouvons utiliser ces variables pour mettre en forme notre livre. Ici, ça se complique et il ne faut pas lésiner sur les commentaires.

Je vais expliquer seulement quelques lignes du code. On commence avec quelques définitions.

```scss
.book {
  /* The books will be contained inside a square of this dimension */
  --base-size: 250;
  --base-size-rem: calc(var(--base-size) * 0.0625rem);

  @include medium {
    --base-size: 350;
  }
}
```

Je souhaite que les livres soient contenus dans un carré de `250` pixels de côté (`--base-size`). Je décline ensuite cette valeur en `rem` (mieux que les pixels), grâce à une petite multiplication.

La mixin `@medium` est une media query qui me permet d'agrandir la taille de base sur des écrans plus larges.

Notez comme je ne redéclare pas `--base-size-rem` dans la mixin `@medium`. En effet, `--base-size-rem` est dynamiquement calculée à partir de `--base-size`. Quand l'une change, l'autre aussi, y compris à l'intérieur d'une media query.

On continue :

```css
.book {
  --is-portrait: clamp(
    0,
    calc((var(--height) - var(--width)) * 999),
    1
  );
}
```

Cette syntaxe du démon permet de savoir si le livre est en format paysage ou portrait, et de stocker cette info dans la variable `--is-portrait` (ça fait ça de moins à saisir dans la « base de données »).

Pas très clair ? On décompose.

`clamp` est une fonction CSS qui va me donner une valeur entre deux bornes (le premier et le troisième paramètre).

Par exemple :

```css
clamp(0, 0.2, 1); /* 0.2, car c'est entre les bornes */
clamp(0, -15, 1); /* 0, car le chiffre du milieu est trop petit */
clamp(0, 4, 1); /* 1, car le chiffre du milieu est trop grand */
```

Notre valeur du milieu à nous, en simplifiant la syntaxe, ressemble à ça : `(height - width) * 999`.

Si le livre est au format portrait, la hauteur est plus grande que la largeur, et donc `(height - width)` est positif. La multiplication par `999` va nous faire obtenir un nombre très grand, transformé en 1 par les bornes du `clamp`.

À l'inverse, on obtiendra un nombre négatif si le livre est au format paysage, qui sera ramené à 0 par les bornes du `clamp`.

Et voici comment on obtient un booléen en CSS 🙃 À manier avec précaution, nous sommes d'accord...
  
Je peux ensuite utiliser ce booléen pour obtenir d'autres valeurs.

{% figure
  "paysage.jpeg",
  "Les livres en format paysage sont trop gros.",
  "Si tous les livres font la même hauteur, ceux qui sont en paysage comme <cite>Panthère</cite> deviennent beaucoup trop gros. D'où l'intérêt du booléen <code>is-portrait</code> pour la suite."
%}

Quelle devrait être la hauteur d'un livre s'il est en portrait ? La hauteur du conteneur, soit `--base-size-rem`. S'il est en paysage, au contraire, cela devrait être dépendant de largeur, qui elle sera `--base-size-rem`.

<aside>Note : L'usage de <code>object-fit: contain</code> pour contenir l'image n'est pas suffisante ici, car d'autres éléments et pseudo-éléments constitutifs de l'effet final ont besoin de connaître les dimensions exactes.</aside>

Et c'est ainsi que l'on parvient à des atrocités de ce genre :

```css
.book {
  /* Height is base size if portrait, based on size ratio otherwise */
  --height-rem: clamp(
    calc(var(--is-portrait) * var(--base-size-rem)),
    calc(var(--base-size-rem) / (var(--width) / var(--height))),
    var(--base-size-rem)
  );
}
```

{% img "shocked.jpg", "Expression de dégoût." %}

Allez, on s'accroche une dernière fois, promis. `clamp`, on connaît déjà, alors regardons nos bornes. Que remarque t-on si le livre est en mode portrait ? La première borne :

```css
var(--is-portrait) * var(--base-size-rem)
```

Cette valeur devient simplement `--base-size-rem`, puisque `is-portrait` vaut 1. Et c'est aussi la valeur de la seconde borne. Si les bornes sont identiques, peu importe la valeur du milieu, le résultat sera `--base-size-rem`.

Et c'est que l'on souhaite. Pour les livres portrait, la hauteur est la taille du conteneur, tout bêtement.

Au contraire, pour un livre paysage, la borne du bas deviendra `0` grâce à notre booléen. Et donc la valeur du milieu pourra entrer en action. La voici :

```css
var(--base-size-rem) / (var(--width) / var(--height))
```

On prend la valeur de base (qui sera donc la largeur), on divise par le ratio entre largeur et hauteur, et hop, on obtient notre hauteur.

{% figure
  "smaller.jpeg",
  "Le livre en paysage est plus petit qu'avant.",
  "Les livres en paysage font désormais une taille raisonnable, car leur dimension principale devient leur largeur."
%}

## Support navigateur

Quelques navigateurs dignes d'être considérés (Edge 18, Safari 13...), ne prennent pas en charge l'opération CSS `clamp`.

La mixin suivante permet de détecter ce support, pour mettre en place une solution de fallback avec des calculs un peu moins fins.

```scss
@mixin supports-clamp {
  @supports (width: clamp(0px, 1px, 2px)) {
    @content;
  }
}
```

Pour reprendre notre calcul du dessus, on l'utilise ainsi :

```scss
.book {
  --height-rem: var(--base-size-rem);

  @include supports-clamp {
    /* Height is base size if portrait, based on size ratio otherwise */
    --height-rem: clamp(
      calc(var(--is-portrait) * var(--base-size-rem)),
      calc(var(--base-size-rem) / var(--ratio-width-height)),
      var(--base-size-rem)
    );
  }
}
```

Si `clamp` n'est pas supporté, le navigateur utilisera la première ligne et ignorera tout le reste. Pour quelques utilisateurs, le rendu sera un peu moins subtil, mais le contenu reste lisible et c'est l'essentiel.

<aside>Mise à jour 2024 : <code>clamp</code> est désormais supporté par tous les navigateurs majeurs.</aside>

## Vers un CSS plus adapté aux calculs visuels ?

Le [code CSS complet du composant](https://github.com/bcalou/top-books-2020/blob/master/src/styles/blocs/_book.scss) est disponible.

Tout cela est bien stimulant, mais guère lisible, y compris pour moi-même quelques mois après l'avoir écrit.

Pour un projet perso, c'est bien sympathique, mais la scalabilité n'est pas au rendez-vous.

Cela reste pourtant la solution qui me paraît la plus élégante, car elle se repose sur des informations physiques concrètes et ne nécessite pas de manipulations JavaScript qui seraient par nature moins performantes. On peut donc espérer que la syntaxe CSS continue d'évoluer pour permettre ce genre d'opérations avec plus de fluidité.

Peut-être grâce à [Houdini](https://houdini.how/about/) ?

En attendant, il faudra faire fonctionner nos petites cellules grises... Et commenter, beaucoup commenter !
