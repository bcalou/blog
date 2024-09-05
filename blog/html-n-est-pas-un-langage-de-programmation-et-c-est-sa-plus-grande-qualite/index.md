---
title: HTML n'est pas un langage de programmation et c'est sa plus grande qualité
description: La permissivité de ce langage déclaratif, beaucoup plus riche qu'il n'y paraît, masque une robustesse très précieuse pour nos pages web.
date: 2020-10-21
tags:
  - HTML
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/html-is-not-a-programming-language-and-that-s-the-best-thing-about-it-4202
---

<aside>
  <p>Mise à jour 2023 : Mon avis sur la question a évolué. HTML n'est certes pas un langage de programmation <strong>impératif</strong>, mais <a href="https://briefs.video/videos/is-html-a-programming-language/" title="Vidéo: HTML est-il un langage de programmation ? (en anglais)">les arguments</a> pour le considérer comme un langage de programmation <strong>déclaratif</strong> me semblent tout à fait fondés.</p>
  <p>Je ne souhaite pas modifier l'article car il correspond à mes vues de l'époque, mais gardez cette disctinction sémantique en tête : j'ai utilisé le terme « langage de programmation » incorrectement à la place de « langage de programmation <strong>impératif</strong> ».<p/>
  <p>Les autres points sont toujours d'actualité !</p>
</aside>

J'adore HTML. Plus j'en apprends à son sujet, plus je trouve que c'est un travail de génie. Par dessus tout, j'adore qu'il ne s'agisse pas d'un langage de programmation.

**Les langages de programmation sont nuls**. Ils plantent en permanence (je vous jure, j'écris toujours mon JavaScript parfaitement du premier coup, et pourtant il persiste à planter !?).

Pire, quand ils plantent, la plupart du temps, l'ensemble du programme s'écrase ! Autant essayer d'empiler des cure-dents sur un viaduc par plein vent.

Mais comparez cela à la beauté qu'est HTML :

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
</nav>
```

Ceci est un magnifique et sémantique bout de HTML5. Il contribue à l'accessibilité, à la lisibilité, à l'application des styles, à la découverte du contenu par les robots.

Et il ne plante pas.

Si un vieux navigateur ne connaît pas HTML5, il traitera l'élément `<nav>` comme une bonne vieille `<div>`, et **cela fonctionnera**.

Si un développeur ou un utilisateur avec un éditeur de code (par exemple dans l'administration d'un WordPress) écrit `nax` au lieu de `nav`, **cela fonctionnera toujours**.

Prenons un autre exemple :

```html
<details>
  <summary>HTML</summary>
  HTML is an acronym for HyperText Markup Language.
  It was created by Tim Berners-Lee in 1989.
</details>
```

Tout le monde ne connaît pas l'élément `<details>`, voici donc ce qu'il produira dans un navigateur moderne :

{% codepen "https://codepen.io/bcalou/pen/oNbRWJZ" %}

Je n'ai pas _programmé_ ce comportement (les développeurs de navigateur l'ont programmé). J'ai _décrit_ le contenu du document et fait confiance au navigateur pour l'afficher du mieux qu'il pouvait. Et je pense que cela est très, très sympa.

Et cela fonctionnera aussi avec les vieux navigateurs : il n'y aura pas d'interactivité, mais le contenu sera affiché et c'est bien le plus important.

## Restez calme et arrêtez de programmer

Je ne veux pas programmer. Je dois souvent le faire, quand HTML n'est pas suffisant pour décrire ce que mon site devrait faire. Et comme beaucoup d'entre nous, mon quotidien tourne autour des frameworks JavaScript, et j'aime beaucoup certains d'entre eux.

Mais quand je pense à l'utilisateur, je sais que la pire chose que je puisse faire est de programmer.

À chaque fois que je programme, j'ai l'impression de signer une étrange décharge dans mon esprit :

{% blockquote "Par la présente, je reconnais que j'introduis un comportement non-standard dans ce site web, déchargeant le navigateur de sa responsabilité d'assurer une expérience fiable pour chaque utilisateur. Je fais cela en ayant consience de ma connaissance partielle des technologies web, de l'existence de limites dans mes implémentations, temporelles et techniques, qui ne peuvent être estimées. Je réalise que ce que je fais échouera probablement à un certain moment ou dans certaines situations. Mais je n'ai pas le choix et je promets de ne pas merder." %}

{% img
  "contract.gif",
  "La petite sirène signant un contrat diabolique en écrivant yolo en bas du document."
%}

À l'inverse, quand j'utilise HTML et les standards du web, je me repose sur la connaissance partagée de développeurs de navigateurs expérimentés et des décennies de débats ayant pour but de faire du web une plate-forme de qualité.

Et c'est pour cela qu'une connaissance profonde du HTML est infiniment précieuse : cela apporte tout simplement de la qualité à l'utilisateur, ce qui au bout du compte est la seule chose d'importance.

## Résilience

Dans une de mes meilleures lectures de cette année, Jeremy Keith nous raconte comment nous avons presque perdu l'un des aspects les plus puissants de HTML à cause de XHTML 2.0 :

{% blockquote
  "[XHTML 2.0] avait aussi pour but d'implémenter la draconienne gestion des erreurs de XML. S'il y a la moindre erreur dans un document XML – un attribut sans guillemets ou un slash de fermeture manquant – alors le <i>parser</i> doit s'arrêter immédiatement et refuser de rendre quoi que ce soit.",
  "Jeremy Keith",
  "Resilient Web Design",
  "https://resilientwebdesign.com/chapter4/"
%}

Dieu merci, nous sommes passés à côté de cela.

{% blockquote
  "XHTML 2.0 est mort prématurément. Sa pureté théorique fut fermement rejetée par les personnes qui vivaient de la création de sites web.",
  "Jeremy Keith",
  "Resilient Web Design",
  "https://resilientwebdesign.com/chapter4/"
%}

{% figure
  "xhtml.jpg",
  "Un vaisseau rebelle de Star Wars fait chuter un chasseur robot de l'empire.",
  "https://speakerdeck.com/elkraneo/html5",
  "https://speakerdeck.com/elkraneo/html5"
%}

## HTML est-il difficile ?

Bien sûr, pour qu'HTML soit un si bon langage, vous devez le connaître. Je veux dire, _vraiment_ le connaître.

La sémantique, l'accessibilité, le référencement, les compatibilités navigateurs et les styles par défaut, les nouvelles balises, et les balises obsolètes, les attributs spécifiques liés au langage et au temps, les formulaires, l'optimisation des performances, les métadonnées, les médias...

Même sans parler des « soupes de balise » générées par certains frameworks, il y a une grande différence entre un bon code HTML et un code HTML excellent.

Ce serait une erreur de considérer HTML (et CSS) comme la partie facile du développement web. Le problème est qu'il faut bien connaître ces langages pour réaliser cela.

JavaScript est difficile. Pourquoi tout le monde sait-il cela ? Parce qu'avant de réussir à faire fonctionner quoi que ce soit, vous devrez affrontez une avalanche d'erreurs rouges bloquant votre projet entier. Seul un pénible débuggage vous permettra d'avoir un code fonctionnel.

{% img
  "console.jpg",
  "Une présentatrice de télévision crie : tu a un console log... tu as un console log... tout le monde a un console log !"
%}

On ne peut pas échouer avec HTML. On peut écrire de la soupe de balises, des mauvais formulaires et ne suivre aucune bonne pratique, mais cela n'échouera pas, à cause de la résilience fondamentale de HTML.

La première fois que l'on écrit du JavaScript, cela semble être un sacré bazar. La première fois que l'on écrit du HTML, on se sent comme un génie du web.

Ce n'est qu'avec le temps et les connaissances que l'on réalise que le génie, ce n'est pas soi : les concepteurs d'HTML sont les génies, et ils nous ont donné un superbe outil qui nécessite beaucoup de pratique et de patience pour s'en servir _vraiment_ correctement.

La permissivité d'HTML a donné l'opportunité à beaucoup de personnes de contribuer au web et n'est sans doute pas pour rien dans l'expansion de l'invention de Tim Berners-Lee. Mais pour les développeurs professionnels, cette permissivité vient avec la responsabilité de ne pas se reposer sur cette simplicité apparente et de vraiment apprendre à maîtriser ce puissant langage.

## La crise d'identité des langages web

La manière dont nous nommons les choses est importante. Il est très frustrant de voir la partie HTML/CSS d'un projet dévaluée si souvent lorsqu'on en connaît l'aspect critique. Il est insoutenable d'entendre des développeurs déclarer qu'ils ne se <q>préoccupent pas du CSS</q>, alors qu'**afficher des pixels sur un écran** est quasiment la définition de notre métier.

Peut-être qu'appeler HTML un langage de programmation le rend plus digne d'attention pour certaines personnes ? Il serait naïf d'ignorer les biais salariaux et même le sexisme lié à cette affaire. Car oui, HTML/CSS est la partie présentation et cela est plus... féminin ?

{% img
"headhache.gif",
"Michael Scott se frotte le crâne avec sa main, visiblement très ennuyé."
%}

D'un autre côté, je comprends que lire que HTML est un langage de programmation peut ennuyer certains, moi compris. Pas parce que je pense que les langages de progammation sont meilleurs. Parce que **je ne veux pas qu'HTML soit un langage de programmation**.

## Nous construisons juste des choses

Durant mes cours, j'utilise souvent le terme « langage de développement ». Je ne le vois pas beaucoup utilisé en anglais, mais je trouve que c'est un très bon terme.

Avec cette appellation, on peut réunir HTML, CSS et JavaScript sans que tout le monde ne crie au scandale. D'après le dictionnaire :

{% blockquote
  "Développer : inventer quelque chose ou donner vie à quelque chose.",
  "",
  "Cambridge dictionnary",
  "https://dictionary.cambridge.org/fr/dictionnaire/anglais/develop"
%}

Alors que le débat autour d'HTML/CSS étant ou non des langages de programmation semble pouvoir durer jusqu'à la fin des temps, le fait qu'ils sont utilisés, parfois aux côtés de JavaScript, pour <q>donner vie à quelque chose</q>, ne semble pas être matière à controverse.

{% figure
  "developers.gif",
  "Un représentant de Microsoft scande le mot développeur et essaie de faire monter l'ambiance.",
  "Nous sommes toutes et tous des développeurs."
%}

Qui se soucie de si vous programmez ou non ? La seule chose d'importance est la qualité de ce que vous construisez.

Il va falloir remettre la non-programmation à la mode.
