---
title: Optimisation agressive des performances d'un site statique
slug: optimisation-agressive-des-performances-d-un-site-statique
description: "Gestion des tailles et formats d'images, lazy-loading, CSS critique inline… tout est bon pour une optimisation maximale."
date: 2021-06-16
tags:
  - Performance
  - HTML
  - CSS
  - Eleventy
layout: layouts/post.njk
series: À la découverte d'Eleventy
originalPost: https://dev.to/bcalou/optimisation-agressive-des-performances-d-un-site-statique-3jc9
---

Grâce au _pre-rendering_ d'Eleventy, _Lighthouse_ donne déjà à [notre site](https://top-livres.netlify.app/) le vénérable score de 100 points en performance 💪. Mais si nous essayions d'aller plus loin ? Le simple calcul d'un outil n'est pas une excuse pour ne pas mieux faire !

Voici les techniques, certaines banales, d'autres plus exotiques, que j'ai l'habitude d'utiliser.

## Lazy loading des images

C'est désormais d'une simplicité absolue en HTML :

```html
<img loading="lazy" />
```

Ainsi, les images sont chargées au fil du scroll. HTML mon amour.

{% video
  "lazy.webm",
  "Un scroll vertical de la page, au fur et à mesure duquel les images sont chargées progressivement."
%}

Un autre attribut a récemment fait son apparition, que je m'empresse d'ajouter :

```html
<img loading="lazy" decoding="async" />
```

L'attribut `decoding="async"` autorise le navigateur à traiter en parallèle le rendu de la page et celui de l'image, ce dernier devenant donc non bloquant.

L'impact sera faible sur mes images de taille moyenne, mais ça ne mange pas de pain.

## Picture, source & srcset

Pour les couvertures, trois formats d'image cohabitent : `avif`, actuellement supporté par [Chrome & Opera](https://caniuse.com/avif), `webp`, désormais [très bien supporté](https://caniuse.com/webp), et `jpeg`, pour les navigateurs un peu à la traîne.

{% aside %}Mise à jour 2024 : Le format <code>avif</code> est désormais supporté par tous les navigateurs majeurs !{% endaside %}

Le navigateur peut choisir son format préféré grâce au tag `picture`, qui contient un tag `source` pour chacun des trois formats d'image. Il contient également un tag `img` qui sera le seul interprété si le navigateur ne comprend pas `picture`. On tire ici parti de la solidité du HTML, qui va simplement ignorer ce qui n'a pas de sens pour lui.

Notez que les attributs `loading`, `decoding` et `alt` se trouvent sur la balise de _fallback_, mais qu'ils seront bien pris en compte.

```html
<picture class="book__cover">
  <source
    type="image/avif"
    srcset="dist/smile_350.avif 350w, dist/smile_700.avif 700w"
    sizes="(min-width: 32em) 21.875rem, 15.625rem"
  />
  <source
    type="image/webp"
    srcset="dist/smile_350.webp 350w, dist/smile_700.webp 700w"
    sizes="(min-width: 32em) 21.875rem, 15.625rem"
  />
  <source
    type="image/jpeg"
    srcset="dist/smile_350.jpg 350w, dist/smile_700.jpg 700w"
    sizes="(min-width: 32em) 21.875rem, 15.625rem"
  />
  <img
    loading="lazy"
    decoding="async"
    src="dist/smile_350.jpg"
    alt="Couverture de Smile"
  />
</picture>
```

Chaque couverture est donc proposée en `avif`, `webp` et en `jpeg`, mais également avec deux largeurs différentes : `350px` et `700px`. C'est ce qui est proposé au navigateur grâce à l'attribut `srcset`.

Enfin, l'attribut `sizes` permet au navigateur de connaître la taille d'affichage des images (il faut lui dire, car il ne peut pas le deviner à partir du CSS, pour des raisons d'implémentation).

Le contenu de l'attribut s'interprète ainsi : au dessus de `32em` de large pour le viewport, l'image fera `21.875rem` de large. Sinon, elle fera seulement `15.625rem` de large.

Le navigateur connaît la taille du viewport et en déduit la taille de l'image affichée.

Grâce à toutes les informations à sa disposition, le navigateur peut finalement choisir quelle image utiliser, en fonction des formats supportés, de la taille du viewport, du _pixel ratio_ de l'écran, du cache, de la qualité de connexion...

Voici le poids des dix images en fonction du format et de la dimension :

<table>
  <caption>Poids des images en fonction de leur format et dimension</caption>
  <tr>
    <td></td>
    <th scope="col">avif</th>
    <th scope="col">webp</th>
    <th scope="col">jpeg</th>
  </tr>
  <tr>
    <th scope="row">350px</th>
    <td>🌟&nbsp;147Ko</td>
    <td>252Ko</td>
    <td>321Ko</td>
  </tr>
  <tr>
    <th scope="row">700px</th>
    <td>249Ko</td>
    <td>459Ko</td>
    <td>624Ko</td>
  </tr>
</table>

On varie donc du simple au quadruple ! Avec des images plus grandes, la différence sera encore plus importante.

### Générer les images avec Eleventy

Plutôt être forcé à regarder la saison 29 de _Plus belle la vie_ que de produire à la main toutes les images nécessaires à cette optimisation.

Pour rappel, on parle de 10 livres × 3 formats × 2 tailles, doit 60 images !

Non, je souhaite prendre l'image de la meilleure qualité possible, et laisser la machine faire le reste. Et là, merveille : Eleventy propose exactement ce qu'il me faut.

Nous allons créer un helper `bookImage`, que nous appellerons pour chaque item :

```liquid
{% raw %}{% bookImage item %}{% endraw %}
```

Un helper est une fonction qui retourne un template. Elle se déclare ainsi, encore une fois dans le fichier `.eleventy.js`.

```js
eleventyConfig.addLiquidShortcode("bookImage", bookImage);

async function bookImage(book) {
  return "<p>Hello world !</p>";
}
```

Rappel important : Eleventy étant un **générateur de site statique**, ce JavaScript est exécuté une fois pour toutes lorsque le site est généré, et non pas au _runtime_ côté client. Le but est toujours d'avoir un HTML statique au final.

Dans notre helper, nous allons utiliser le plugin officiel [Image](https://www.11ty.dev/docs/plugins/image/). Ça se passe comme ça :

```js
const images = await Image(`src/img/${book.fileSlug}.jpg`, {
  widths: [350, 700, null],
  formats: ["avif", "webp", "jpeg"],
  outputDir: "_site/img",
});
```

Si nous passons un objet `book` et que nous avons bien un fichier image correspondant dans `src/img/`, cette fonction va générer les 6 images nécessaires.

Seule bizarrerie à mentionner, le `null` dans la liste des largeurs, nécessaire au cas où l'image source fait moins de `700px` (la grande taille sera alors la taille originale de l'image, par exemple `579px`).

Ensuite, et je vous passe les détails d'implémentation, nous allons retourner le template correspondant. Vous savez, le gros bout de code décrit plus haut avec toutes les `sources`, `srcset`...

```js
return `<picture class="book__cover">
  ${sources}
  <img
    src="${url}"
    alt="${alt}"
    loading="lazy"
    decoding="async"
  />
</picture>`;
```

Peut-être l'avez vous remarqué, ce helper a de formidable qu'il fait deux choses très importantes à la fois :

- il génère les images nécessaires ;
- il renvoie le markup associé.

La séparation de ces deux processus est fréquente. Qu'ils soient ici si intriqués facilitera certainement la maintenance.

Une autre façon de le dire, c'est que le template génère à la volée les images dont il a besoin !

{% video
  "generation.webm",
  "Les images sont générées dans un dossier. Le processus peut être désactivé en développement pour gagner du temps."
%}

## CSS critique inline

Actuellement, la cascade du site ressemble à ça :

{% figure
  "cascade.png",
  "Trois étapes de chargement distinctes se suivent : d'abord le HTML, puis le CSS/JS, puis les images.",
  "J'ai utilisé une simulation « slow 3G » pour forcer le trait."
%}

On voit nettement les deux ressources **bloquantes** que sont le CSS et le JavaScript.

Contrairement aux images, le CSS et le JavaScript bloquent l'affichage de la page tant qu'ils ne sont pas chargés, parsés et exécutés.

Le client récupère le HTML, puis effectue deux nouvelles requêtes pour récupérer le CSS et le JavaScript. Il ne se passera rien d'autre pendant ce temps. La page restera blanche et les images ne commenceront pas à se charger. Quel gâchis !

Une bonne solution serait d'utiliser un _server push_, pour envoyer ces ressources avant même que le navigateur ne les ait demandé. Mais il faut pour cela avoir accès au serveur.

Alors me vient une pensée impure :

{% blockquote "Mon CSS ne fait que 4ko, qu'est ce qui m'empêche de le mettre directement dans le HTML lors du build ?" %}

Il s'agit en réalité d'une technique très efficace appelée _Critical CSS Inline_, qui consiste à placer le CSS nécessaire au rendu de ce que l'on voit en premier directement dans le HTML. On charge ensuite le reste du CSS en asynchrone, sans bloquer la page.

Dans mon cas, le CSS critique représente la quasi totalité de ma petite page, mais la technique n'en est pas moins intéressante.

Je vais ici faire appel au plugin [eleventy-critical-css](https://github.com/gregives/eleventy-critical-css), qui cette fois n'est pas officiel mais créé par la communauté.

Je n'ai pas grand chose à dire sur l'utilisation tant elle est directe :

```js
if (prod) {
  eleventyConfig.addPlugin(criticalCss, {
    assetPaths: ["_site/index.html"],
    minify: true,
  });
}
```

C'est tout !

{% figure
  "critical.png",
  "Le code source du HTML dans lequel on peut voir du CSS minifié.",
  "Le CSS critique est extrait puis directement inclus dans l'index.html."
%}

En plus d'inclure le CSS critique, le plugin ajoute la ligne suivante :

```html
<link
  href="./css/styles.css"
  rel="stylesheet"
  media="print"
  onload="this.media='all'"
/>
```

Cette technique permet de charger le reste du CSS en asynchrone. En effet, le navigateur charge les CSS associées au media `print` en asynchrone par défaut. Une fois ceci fait, la destination de la feuille de style est mise à jour de `print` vers `all` grâce à `onload="this.media='all'`. Habile.

### Et le JavaScript ?

Quand au JavaScript, qui sert uniquement à gérer l'ouverture fluide des éléments `details` sur mobile, l'attribut `async` sera idéal :

```html
<script async src="./dist/script.js"></script>
```

Si l'utilisateur venait à cliquer sur un élément `details` avant que le script ne soit chargé, il s'ouvrirait alors sans transition, soit son comportement par défaut. Quand le JavaScript arrive, on utilise donc l'approche d'amélioration progressive sur ces éléments pour améliorer l'expérience.

Résultat, nous n'avons plus aucune ressource bloquante !

{% img
  "after.png",
  "Seules deux étapes sont visibles : d'abord le HTML, ensuite tout le reste en parallèle."
%}

Nous avons ainsi drastiquement amélioré le **chemin critique**, soit cet instant crucial entre la requête et l'affichage de la page.

En une seule requête, notre utilisateur verra un contenu.

Mon petit projet effectue désormais un chargement initial de **128k** et s'affiche en moins d'une seconde.

## Un site performant, c'est forcément moche ?

Il n'y a rien de plus faux ! Il n'y a **aucune** corrélation entre la beauté d'un site et sa performance. Si vous avez les bons designers et les bons développeurs, les deux sont parfaitement compatibles.

Ne me croyez pas sur parole : voici une [liste d'autres sites générés avec Eleventy](https://www.11ty.dev/speedlify/), qui atteignent les 100 points sur tous les critères, tout en étant bien plus riches que le mien.

Ces 100 points ne sont d'ailleurs qu'un point de départ : mon petit projet les atteignait avant même les optimisations décrites dans cet article. Ils ne doivent donc pas nous empêcher d'aller plus loin !
