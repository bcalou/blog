---
title: De l'aléatoire en CSS, c'est possible ! Enfin, presque...
slug: de-l-aleatoire-en-css-c-est-possible-enfin-presque
description: Sauf à vouloir s'aventurer en eaux troubles, JavaScript est plus indiqué... Mais pour combien de temps ?
date: 2024-10-14
tags:
  - CSS
  - JavaScript
layout: layouts/post.njk
---

Pour la sortie de ce nouveau blog, il me fallait mettre en place un effet visuel renversant, qui impressionnerait la galerie et montrerait toute l'étendue de mes capacités.

Comme je n'avais pas le temps de faire cela, j'ai codé un effet rigolo de survol : lorsque la souris est passée sur ma photo, deux émojis parmi une centaine soigneusement sélectionnés apparaissent aléatoirement.

{% video "photo.webm", "La souris survole ma photo. À chaque survol, deux émojis aléatoires recouvrent mes yeux." %}

Du grand art, je vous dis.

Cela a soulevé une question intéressante : quelle serait la meilleure méthode pour sélectionner l'émoji aléatoirement ? CSS suffirait-t-il ?

## CSS : la roulette invisible

La roulette invisible, c'est le petit nom que je donne à cette technique que je n'ai pas inventée, mais qui est intéressante. Je vous explique.

Tout commence avec un pseudo-élément vide.

```css
div::before {
  content: '';
}
```

Appliquons à ce pseudo-élément une animation `emojis`. Son but ? Changer le contenu de la propriété `content` pour y injecter nos émojis. Pour l'instant, trois suffiront.

```css
div::before {
  content: '';
  animation: emojis 1s linear infinite;
}

@keyframes emojis {
  0% {
    content: "💥" / "";
  }

  50% {
    content: "🐸" / "";
  }

  100% {
    content: "🎉" / "";
  }
}
```

{% aside %}
Note : la syntaxe <code>content: "🎉" / ""</code> permet de définir, dans la seconde string, le texte alternatif pour ce pseudo-élément, qui pourra être lu par les technologies d'assistance. Quand on utilise un pseudo-élément à des fins décoratives, il est donc recommandé d'utiliser une chaîne vide pour éviter que le contenu de l'émoji ne soit interprété, par exemple par un lecteur d'écran.
{% endaside %}

Et voici le résultat :

{% codepen "https://codepen.io/bcalou/pen/eYqYMJg" %}

Maintenant, la même chose, mais avec 100 émojis ! Bon, on s'amuse bien mais on va utiliser une [boucle SASS](https://sass-lang.com/documentation/at-rules/control/for/), on a pas que ça à faire...

```scss
$emojis: "💥", "💋", "🫀", "👓", "🐸", "👑", "🐰", "🐼", "👋", "🐤", "🐱", "🦊", "🐷", "🙈", "🐝", "🐌", "🐞", "🐠", "🐢", "🐫", "🦔", "🦚", "🌹", "🌼", "⭐️", "🔥", "👀", "🌈", "💧", "🍉", "🍓", "🍑", "🥝", "🍆", "🥦", "🥨", "🧀", "🍔", "🍕", "🍙", "🎂", "🍭", "🍿", "🍩", "🍺", "🍹", "🏀", "🥋", "🏆", "🎟", "🎭", "🎨", "🎬", "🎹", "🥁", "🎷", "🎸", "🪗", "🎲", "🎯", "🎰", "🎳", "🚨", "🚇", "🚀", "🛸", "🛟", "🗺", "⛱", "🌋", "💻", "🖨", "💾", "🕹", "💿", "📼", "📸", "📽", "📠", "📺", "🧭", "⏰", "⏳", "💡", "💵", "💰", "💎", "🔮", "🧬", "🧻", "🎁", "🎈", "🎉", "🪩", "📫", "📚", "🔎", "🩵", "💯", "🔔", "👁‍🗨";

@keyframes emojis {
  @for $i from 1 through list.length($emojis) {
    #{($i - 1) * (100% / (list.length($emojis) - 1))} {
      content: list.nth($emojis, $i) / "";
    }
  }
}
```

Et quand 100 émojis défilent en quelques secondes seulement, eh bien ça donne ça :

{% codepen "https://codepen.io/bcalou/pen/xxvxYNL" %}

Le plus dur est fait. L'astuce réside dans le fait d'arrêter cette roulette infernale au survol.

```css
div:hover::before {
  animation-play-state: paused;
}
```

{% aside %}
L'élément concerné sur le site étant un lien, je peux aussi appliquer l'effet lorsque ce dernier obtient le focus. Une personne naviguant au clavier « profitera » ainsi de l'effet.
{% endaside %}

Survolez l'élément : l'animation est arrêtée net, et un emoji est ainsi « sélectionné ».

{% codepen "https://codepen.io/bcalou/pen/JjgjLWL" %}

Vous l'aurez compris, l'aléatoire ici réside dans l'action de survol elle-même, et plus précisément dans son timing.

La touche finale, c'est bien sûr de cacher le pseudo-élément jusqu'à ce que le survol ait lieu :

```css
div::before {
  opacity: 0;
}

div:hover::before {
  opacity: 1;
  animation-play-state: paused;
}
```

Notre roulette invisible est prête !

{% codepen "https://codepen.io/bcalou/pen/mdNdxwg" %}

En appliquant les mêmes règles au pseudo-élément `after` et quelques tests de positionnement plus tard, le résultat est là.

## Invisible... et pourtant, elle tourne

Même si je trouve cette technique intéressante à partager, j'étais un peu gêné une fois la mise en place effectuée.

C'est qu'il y a quelque chose d'un peu contre-nature à changer de très nombreuses fois par seconde un contenu qu'on ne voit pas, non ?

Faisons une analyse de performance de la page, sur une minute, pour bien voir.

{% figure "perf1.png", "Analyse de performance de la démo. On y voit d'innombrables barres verticales symbolisant les opérations.", "Chaque barre verticale est une opération sollicitant la carte graphique." %}

Le navigateur est au repos 99% du temps. Pas la fin du monde, donc. Mais ces milliers de petites barres vertes, ce sont des milliers d'opérations parfaitement inutiles, exécutées en permanence. Sur le principe, ça me gêne !

C'est un peu l'équivalent de préparer une pizza, de la jeter directement à la poubelle puis d'en préparer une autre, et ainsi de suite jusqu'à ce qu'un client ait enfin envie d'en profiter.

Alors, pour alléger un peu cette technique de gros bourrin, il y a une piste. Au lieu d'animer la propriété `content`, nous pouvons animer le contenu d'une variable CSS `--emoji`, et nous en servir pour générer le `content` uniquement lorsque l'élément est survolé.

```scss
div:hover::before {
  opacity: 1;
  animation-play-state: paused;
  content: var(--emoji);
}

@keyframes emojis {
  @for $i from 1 through list.length($emojis) {
    #{($i - 1) * (100% / (list.length($emojis) - 1))} {
      --emoji: "#{list.nth($emojis, $i)}" / "";
    }
  }
}
```

Résultat ?

{% figure "perf2.png", "Analyse de performance de la démo ajustée. Il y a moins de barres verticales.", "La carte graphique est beaucoup moins sollicitée, mais il y a toujours énormément d'opérations." %}

Côté performance, c'est maintenant à 99,6% du temps que le navigateur est au repos. Beaucoup mieux !

Mais, fondamentalement, cela revient au même : le navigateur doit suivre l'état de cette variable en permanence, provoquant des milliers d'opérations superflues. J'aimerais savoir s'il est possible d'obtenir une version « propre » de cette approche. Mais j'en doute.

## La solution raisonnable

Mon cerveau est câblé depuis longtemps pour commencer par envisager une solution purement CSS à ce genre de problème. Même quand ça ne marche pas, je découvre toujours quelque chose.

Mais ici, c'est bien JavaScript qui nous apporte une solution simple et performante. Le code est sans grande surprise, en voici la partie principale :

```js
const emojis = ["💥", "💋", "🫀", "👓", "🐸", "👑", "🐰", "🐼", ...];

function setRandomEmoji() {
  $target.style.setProperty(
    "--emoji",
    `"${emojis[Math.floor(Math.random() * emojis.length)]}" / ""`
  );
}

$target.addEventListener("mouseenter", setRandomEmoji);
```

Plus d'opérations inutiles !

Certes, CSS reste à privilégier lorsque c'est possible. Mais il ne faut surtout pas rester bloqué sur un langage ou un autre lorsqu'il devient évident qu'une meilleure solution est à chercher ailleurs.

## CSS n'a pas dit son dernier mot

Et [Houdini](https://developer.mozilla.org/en-US/docs/Web/API/Houdini_APIs), alors ? Cette API native permet de définir, en JavaScript, des algorithmes de rendus invoquables par la suite en CSS.

Et effectivement, dans ce contexte-ci, l'aléatoire est possible !

Voici la définition d'une règle `circle`, qui va générer aléatoirement un cercle rouge ou vert.

```js
registerPaint('circle', class {
  paint(ctx, geom) {
    const x = geom.width / 2;
    const y = geom.height / 2;
    const radius = Math.min(x, y);

    ctx.fillStyle = Math.random() > 0.5 ? "red" : "green";

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
});
```

On l'utilise ainsi :

```css
div:hover {
  background: paint(circle);
}
```

Sympathique, car on laisse le navigateur s'occuper de la logique de survol, et les possibilités ouvertes par Houdini sont bien plus vastes que mon simple exemple.

Malheureusement, ni Firefox ni Safari ne supportent cette API à l'heure actuelle. Si vous êtes sur un navigateur compatible, vous pourrez voir le résultat en survolant le composant ci-dessous :

{% codepen "https://codepen.io/bcalou/pen/QWeWmop" %}

{% aside %}
Cela doit faire 5 ans que j'ai entendu parler d'Houdini, mais j'ai l'impression que le projet <a href="https://ishoudinireadyyet.com/">peine à se concrétiser pleinement</a>. En tout cas, il semble avancer lentement. Il faut dire qu'un travail énorme a été effectué ces dernières années sur des aspects bien plus fondamentaux de CSS !
{% endaside %}

Pour ma petite animation, le support limité d'Houdini passe encore : c'est une fonctionnalité « bonus » dont personne ne souffrira de l'absence.

Bien plus embêtant, impossible de trouver comment rendre du texte, et encore moins un émoji. On dirait bien que cela est impossible...

## `random-item()` en CSS : c'est prévu !

Les choses sont bien faites. Alors que je réfléchissais à cet article, je suis tombé sur [cet article d'Alvaro Montoro](https://alvaromontoro.com/blog/68062/new-values-and-functions-in-CSS), qui détaille les nouveautés à venir concernant les valeurs et les fonctions en CSS (le niveau 5 du module <i>Values and Units</i>).

Et vous l'avez compris : parmi tout un tas de fonctionnalités très prometteuses se trouve la tant fantasmée fonction `random-item()`.

Voici à quoi pourrait ressembler mon code mis à jour :

```css
div:hover:before {
  content: random-item(--x, "💥", "💋", "🫀", "👓", "🐸", "👑",...);
}
```

{% aside %}
Si j'ai bien compris, le <code>--x</code> servira à « identifier » le générateur. Tous les appels à <code>random-item()</code> possédant le même identifiant et la même liste génèreront la même valeur sur la page.
{% endaside %}

Plus simplement, la fonction `random()` permettra d'obtenir une valeur aléatoire entre deux bornes :

```css
div {
  width: random(0vw, 100vw);
}
```

Encore une très bonne nouvelle pour CSS, donc.

Quand cela sera-t-il disponible ? Pour nous autres mortels, cela aussi relève du domaine de l'aléatoire...
<!-- 
<iframe src="https://piaille.fr/@bcalou/113163065917919388/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://piaille.fr/embed.js" async="async"></script> -->