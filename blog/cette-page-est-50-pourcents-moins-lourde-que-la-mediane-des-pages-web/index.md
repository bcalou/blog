---
title: Cette page est 50% moins lourde que la médiane des pages web
slug: cette-page-est-50-pourcents-moins-lourde-que-la-mediane-des-pages-web
description: "TODO"
date: 2024-12-22
tags:
  - Performance
layout: layouts/post.njk
---

C'est une constante depuis des lustres : le poids médian des pages web ne fait qu'augmenter. D'après le site <a href="https://httparchive.org/reports/page-weight">HTTP Archive</a>, cette augmentation se situe entre 5 et 10% par an et ne montre aucun signe de ralentissement.

{% figure
  "mediane.png",
  "Un graphique montre l'augmentation constante du poids médian des pages web entre 2011 et 2024 : c'est presque une ligne droite",
  "Vers l'infini et au-delà !"
%}

On pourrait en explorer les cause et en déplorer les conséquences, mais ce n'est pas ce que je souhaite faire ici. Je veux simplement montrer tout ce que peut contenir une page web dont le poids serait **la moitié du poids médian actuel**.

Le poids médian actuel sur desktop est 2655 Ko. Notre objectif est donc 1237 Ko. Seules 25% des pages web sont aussi « légères ». Alors, ça donne quoi ?

## Ce que contient cette page

- Du texte, déjà. Vous êtes en train de le lire. C'est à la fois le plus important et le plus léger, ou presque. Ce texte est structuré au sein d'un document HTML, pour un total de **XX**.
- Du style ! Le CSS qui met en forme tout ça et rend votre lecture un peu plus agréable, je l'espère. **7 Ko (0,6%).**
- Une chouette font pour les titres et sous-titres. J'ai mis longtemps à la trouver, je l'aime beaucoup ! Elle s'appelle « Euclid ». Grâce au script [glyphanger](https://github.com/zachleat/glyphhanger), qui permet de ne conserver que les caractères réellement utiles à mon blog, le fichier qui à l'origine pèse 44 Ko ne fait plus que **15 Ko (1,2%)**.
- Une photo de ma tête, qui communique avec élégance une forme de sympathie professionnelle rendant l'envie de me contacter irrésistible de riches recruteurs. Elle pèse **24 Ko (1,9%)**.
- La capture d'écran du site HTTP Archive qui introduit l'article. Elle est affichée avec une largeur de `780px`, mais si vous êtes sur un écran HD, le fichier original est deux fois plus grand (`1560px`) pour le plaisir des yeux. Le format `.avif`, désormais très bien supporté, permet de limiter son poids à **24 Ko (1,9%)**.
- Un fichier JavaScript, qui a trois missions à l'heure actuelle : gérer l'animation de survol de la photo susnommée, l'obfuscation de mon adresse mail et le formulaire de commentaires en bas d'article. Il fait gentiment tout ça pour le modeste poids de **3 Ko (0,2%)**.
- Un favicon, le petit truc bleu dans l'onglet du navigateur, la haut. C'est important. **5 Ko (0,4%)**.

## Seulement XX Ko ???

Ça ne va pas du tout. Ce post est déjà d'une longueur respectable, et pourtant, nous n'avons atteint que **XX Ko**. C'est riducule.

Dois-je rappeler que l'objectif est **1237 Ko** ? Il va falloir se ressaisir.

Ci-dessous, voici un *web component* qui me permet de présenter les compatibilités de différentes fonctionnalités. Voici par exemple celle pour le format `.avif` évoqué précédemment.

{% baseline "avif" %}

Ce *web component* pèse **23 Ko (1,9%)**. On continue !

Une iframe codepen ? Chapeau pour cet outil : il nous en coûte seulement **75 Ko (6,1%)**. Une grosse partie de notre budget, certes, mais pour une plus-value non négligeable.

{% codepen "https://codepen.io/bcalou/pen/zYvJJzY" %}

Une vidéo ? Puisqu'il le faut. **79 Ko (6,4%)**.

{% video
  "lazy.webm",
  "Un scroll vertical de la page, au fur et à mesure duquel les images sont chargées progressivement."
%}

## Ça devient lourd...

Seulement XXX Ko malgré tous mes efforts, et tous les types de contenus présents sur le blog sont représentés. Je me demande si ce post était une bonne idée.

Pas le choix, on va jusqu'au bout : il va falloir remplir ! Je vous préviens : la suite de cet article est un amoncellement de contenus sans queue ni-tête. Vous pouvez sauter directement à [la section suivante](#ce-que-ne-contient-pas-cette-page).

{% codepen "https://codepen.io/bcalou/pen/XWVpOxB" %}

{% figure
  "blend.jpg",
  "Une série d'exemples d'utilisation de mix-blend-mode pour créer différents effets visuels.",
  "Quelques exemples d'utilisation de mix-blend-mode."
%}

{% video "photo.webm", "La souris survole ma photo. À chaque survol, deux émojis aléatoires recouvrent mes yeux." %}

{% codepen "https://codepen.io/bcalou/pen/oNLqEQz" %}

{% img
  "scrollsnap.png",
  "Un tableau croisant l'usage des propriétés scroll-snap avec l'usage de Bootstrap.",
  false
%}

{% video
  "switch.webm",
  "Le passage d'un site à un autre. Pendant le temps de chargement du second site, l'écran est noir."
%}

## Ce que ne contient pas cette page

Ça y est, nous y sommes parvenus... Cette page fait enfin **la moitié du poids médian actuel**. Pas mal, non ?

C'est que cette page fait aussi de son mieux pour éviter quelques « gouffres » de ressources, qui sont malheureusment le lot de bon nombre de sites :
- `iframe` très gourmandes comme celle de *Youtube* ;
- images mal optimisées ;
- multiples typographies et variantes ;
- gros framework JavaScript ;
- videos longues et HD ;
- scripts de tracking ;
- widgets de réseaux sociaux ;
- immense librarie d'icônes utilisée à 0,1%...

Souvent, une seule de ces erreurs suffit à plomber le poids d'un projet entier ! Mais tant que vous gardez un oeil vigilant sur ce que mobilise votre page, je pense en avoir fait la démonstration : **vous avez de la marge**.

Le web est de plus en plus lourd, mais ce n'est pas une fatalité. Vous choisissez ce qui rentre dans votre page.

En attendant, vous pouvez faire grimper de quelques octets le poids de celle-ci en laissant un commentaire. Mais je ne pense pas que cela puisse rendre le titre de cet article mensonger : la médiane ne va-t-elle pas continuer à monter, elle aussi ?