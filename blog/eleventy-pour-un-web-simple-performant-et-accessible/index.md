---
title: Eleventy — Pour un web simple, performant et accessible
intro: Grâce au <i>pre-rendering</i>, Eleventy génère à l'avance un contenu statique, offrant ainsi de grands avantages sur une <i>Single-Page App</i>.
date: 2021-06-14
tags:
  - outils
  - performance
  - accessibilité
layout: layouts/post.njk
series: À la découverte d'Eleventy
originalPost: https://dev.to/bcalou/eleventy-pour-un-web-simple-performant-et-accessible-4m0p
---

Et si nous gardions Vue, React et ses compagnons pour les web app _vraiment_ complexes ? Et s'ils devenaient **l'exception à la règle**, plutôt que d'être notre modèle mental par défaut ?

Tant de sites ne sont pas si complexes que ça ! Portfolios, sites vitrines, documentation en ligne, blogs... Ce web là mérite bien mieux que la complexité et les coûts qu'engendrent l'utilisation de nos frameworks JS favoris.

Une des ces nombreuses alternatives s'appelle [Eleventy](https://www.11ty.dev/). Il s'agit un générateur de site statique, dont je suis totalement tombé sous le charme pour sa simplicité et son efficacité.

## Ça sert à quoi ?

Pour découvrir la bête, j'ai réalisé un site tout simple présentant [mes 10 livres préférés de l'année](https://top-livres.netlify.app/) (entends-je une remarque sur mon sens inestimable du design&nbsp;?).

{% figure
  "screenshot.png",
  "Une capture d'écran du site montrant une liste de livres et leurs descriptions.",
  "C'est pas moche, c'est sobre."
%}

Le site est totalement statique : à cette adresse se trouve un fichier HTML, accompagné d'un peu de CSS et de JS. Pour la performance, on ne fait pas mieux.

{% figure
  "lighthouse.png",
  "L'outil lighthouse montre des scores de 100/100 dans les quatres catégories : performance, accessibilité, bonnes pratiques et référencement.",
  "Les scores des divers outils en ligne ne se substituent pas à l'analyse humaine, mais permettent de vérifier que l'essentiel est là."
%}

Certes, le site est basique, mais j'aurais tout aussi bien pu le générer grâce à un appel GraphQL, une boucle React et autres joyeusetés. Sauf qu'on ne bat pas la simplicité. <q>Boring code is good code</q>, qu'ils disent.

Pour autant, je ne me suis pas amusé à écrire à la main les 770 lignes de ce fichier, très redondantes (10 répétitions du composant permettant d'afficher un livre et sa description).

C'est ici qu'**Eleventy** entre en scène.

## Comment ça marche ?

Si on voulait résumer grossièrement, on pourrait présenter Eleventy ainsi :

```
données + templates = ♡ HTML ♡
```

### Markdown, la « base de données »

Chaque livre représenté dans le site est un fichier `markdown` (d'autres formats, tels que `JSON` sont possibles). Voici par exemple celui pour le livre _Dune_ :

```yaml
---
tags: book
title: Dune
author: Frank Herbert
year: 1965
width: 10
height: 17
pages: 896
color: "#cf5441"
publisher: Pocket
link: https://www.lisez.com/livre-de-poche/dune/9782266320481
description: Ce pavé a la réputation d'être un peu chiant, et oui, bon, peut-être, faut rentrer dedans comme on dit...
---
```

Les trois tirets au début et à la fin permettent de définir une table. Le reste est assez direct.

<aside>Note : Il serait formidable de pouvoir typer les objets, avec chaque type de champ et des champs optionnels...</aside>

Voici donc ma belle liste de livres :

{% img "liste.png", "La liste des 10 fichiers markdown." %}

Si nous sommes très, très loin d'une base de données telle qu'on l'entend habituellement, cette simplicité vient avec ses avantages : il est ultra simple de mettre à jour le contenu.

Je n'ai qu'à modifier le fichier (potentiellement directement sur Github), et le process automatique de build que je décris plus loin se mettra en action. Corollaire : les données sont versionnées et il devient difficile d'en perdre.

On ne pourra certes pas faire du relationnel bien avancé, mais pour notre exemple, c'est parfait !

### Rendre disponible les données

Par défaut, il est déjà possible de boucler sur cette collection de livres, qui sera ordonnée par date de création des fichiers markdown.

C'est bien pratique pour les posts d'un blog, mais dans mon cas je souhaite avoir une collection ordonnée par ordre alphabétique. Il faut alors la déclarer dans un fichier dédié, `.eleventy.js` :

```js
eleventyConfig.addCollection("itemsAscending", (collection) =>
  collection.getFilteredByGlob("src/items/*.md").sort((a, b) => {
    if (a.data.title > b.data.title) return 1;
    else if (a.data.title < b.data.title) return -1;
    else return 0;
  })
);
```

Un peu de travail manuel, certes, mais en contrepartie, une grande liberté.

Je pourrais trier par année, par auteur, ou même créer une sous-collection contenant uniquement les livres de moins de 100 pages, pour les moins motivés. Après tout, ce n'est que du JavaScript : on fait exactement ce qu'on veut.

<aside>Important : Ce JavaScript n'est pas exécuté côté client, mais bien lors de la génération du HTML statique, que je détaille ensuite.</aside>

### Templating

De nombreux langages de templating sont compatibles. J'ai choisi `liquid` pour une raison qui a totalement disparu de mon esprit (probablement parce qu'il n'y avait aucune raison).

Voici donc la boucle du fichier `index.liquid` qui va générer les livres :

```liquid
{% raw %}<main class="items">
  {%- for item in collections.itemsAscending -%}
    {% include src/partials/item %}
  {%- endfor -%}
</main>{% endraw %}
```

Dans le fichier `item.liquid` dont voici un extrait, la syntaxe parle d'elle-même :

```liquid
{% raw %}<h2 class="item__title">{{ item.data.title }}</h2>
{% if item.data.subtitle %}
  <h3 class="item__subtitle">{{ item.data.subtitle }}</h3>
{% endif %}{% endraw %}
```

C'est simple, c'est bien 👌

### Vous prendrez bien un peu de CSS / JS ?

Oui, mais à condition de pouvoir utiliser `SASS` et du JavaScript moderne !

Pour satisfaire ces besoins, Eleventy utilise un système de [plugins](https://www.11ty.dev/docs/plugins/) très simples à utiliser.

Encore une fois, ça se passe dans le fichier de configuration `.eleventy.js`. Pour le CSS, d'abord :

```js
const prod = process.env.ELEVENTY_ENV === "prod";

eleventyConfig.addPlugin(sass, {
  watch: "src/styles/**/*.scss",
  outputDir: "_site/css",
  cleanCSS: prod,
  sourcemaps: !prod,
});
```

Le booléen `prod` nous permettra de minifier le CSS uniquement en production, et de générer des _sourcemaps_ uniquement en développement.

Même système pour le JavaScript :

```js
eleventyConfig.addPlugin(babel, {
  watch: "src/js/script.js",
  outputDir: "_site/js",
  uglify: prod,
});
```

Il n'y a pas grand chose à ajouter. Si je peux éviter de tout câbler à la main à chaque projet, tant mieux (je t'aime toujours, Gulp).

### Action !

Tout est en place. Voici la commande que j'utilise pour lancer le serveur de développement :

```
eleventy --input=src --serve
```

Les données markdown sont injectées dans les templates, eux-même transformés en bon vieux HTML.

`--input=src` désigne le dossier dans lequel j'ai placé tout mon code source (`liquid`, `markdown`, `css`...).

Le flag `--serve` vous créera un petit _live server_ à rechargement automatique. À chaque fois que vous changez un fichier, le HTML final est régénéré, en un dixième de seconde de mon côté.

Et voici la commande de build :

```
ELEVENTY_ENV=prod eleventy --input=src
```

En utilisant un service tel que [Netlify](https://app.netlify.com/) (pour qui travaille le créateur d'Eleventy, tout est lié), il ne vous reste plus qu'à renseigner la commande à lancer et le dossier généré à servir (`_site` pour Eleventy).

{% figure
  "netlify.png",
  "La configuration Netlify.",
  "La commande <code>build</code> contient l'appel à Eleventy."
%}

Le projet Netlify étant lié au projet Github, chaque push ou modification du code sur Github mettra à jour le site en une poignée de secondes.

## Un meilleur web ?

À nouveau, il est évident qu'un outil tel qu'Eleventy n'est pas adapté à des applications à forte complexité métier, et ce n'est pas le terrain sur lequel il joue.

En revanche, nous avons désormais un site :

- **léger**, car rien ne peut battre du HTML ;
- **performant**, le CPU n'étant pas sollicité par une montagne de JavaScript ;
- **accessible**, pour peu que le HTML soit écrit correctement bien sûr ;
- **explorable** par les moteurs de recherche ;
- **prédictif**, dans le sens où la complexité se situe côté serveur ;
- aisément **modifiable** et rapidement **déployable**.

Bref, des objectifs parfois mis à mal lorsqu'on utilise des outils inadaptés, mais des objectifs essentiels...

Voici un web qui me plaît !

Retrouvez le code complet de ce projet sur [Github](https://github.com/bcalou/top-books-2020).

## La Jamstack

Eleventy fait partie de l'approche [Jamstack](https://jamstack.org/), qui se définit par des termes souvent obscurs, mais dont le point le plus important est sans doute la génération en avance des sites côté back : le _pre-rendering_.

{% img "jamstack.png", "Logo Jamstack." %}

[Beaucoup de générateurs](https://jamstack.org/generators/) sont d'ailleurs disponibles. Eleventy a la réputation de faire partie des plus simples, ce que j'ai largement pu vérifier par moi-même.

J'aime particulièrement le fait qu'il ne soit pas lié à un langage ou un framework en particulier. Bref, Je le conserve précieusement dans ma boîte à outils.

La prochaine fois, ne vous demandez pas <q>Quel framework JS vais-je choisir ?</q>, mais bien <q>Suis-je dans l'absolue nécessité d'en utiliser un ?</q>.
