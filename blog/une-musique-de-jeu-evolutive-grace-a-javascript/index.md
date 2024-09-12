---
title: Une musique de jeu évolutive grâce à JavaScript
description: Comment JavaScript transforme une simple boucle de 4 accords en musique réactive aux événements d'une partie.
date: 2022-04-07
tags:
  - JavaScript
  - Audio
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/une-musique-de-jeu-evolutive-grace-a-javascript-4568
---

Le week-end dernier, j'ai eu le plaisir de composer la musique de <cite>Blobby Zombie</cite>, un jeu créé en 48h seulement par mon ami Simon et son camarade Pierre-Yves, lors d'une Game Jam organisée par [Hitbox Makers](http://www.hitboxmakers.fr).

Concevoir et coder un jeu en 48h n'étant visiblement pas assez difficile, ils ont créé un jeu multijoueur en ligne fonctionnel. Bravo à eux !

[Pour jouer, c'est par ici !](https://glop.legeay.dev/)

Il faut être plusieurs, chacun sur un ordinateur, et tout le monde partage la même partie. Les règles et commandes sont disponibles [ici](https://github.com/GJLOP/gjlop_front/blob/master/README.md#comment-jouer).

De mon côté, ces deux jours se sont divisés ainsi :

- 7h le premier jour pour la composition de la bande-son ;
- 7h le deuxième jour pour la "programmation musicale".

## La musique

Le jeu repose sur un mécanisme de dernier survivant. Il va donc falloir monter en pression progressivement pour que ruissellent les gouttes de sueur des joueuses et joueurs.

Avec un brief aussi complet que les trois mots « arcade »,  « horreur » et  « fun », je me lance.

{% soundcloud "1243942870" %}

Anticipant sur la programmation à venir, j'utilise une structure la plus simple possible : une boucle de 4 accords. À chaque nouveau cycle, un instrument se rajoute.

Voici un schéma, c'est important pour la suite, et j'aime les schémas.

{% figure
  "schema.png",
  "Schéma de la structure du morceau.",
  "Les instruments s'empilent de cycle en cycle pour faire monter la pression."
%}

Mais comment adapter cette montée en pression de plusieurs minutes à une partie qui pourrait se dérouler beaucoup plus vite ?

## La programmation

Commençons par une adaptation simple : j'avais choisi **130 BPM** pour la bande son. Passer à **128 BPM** est un changement quasi-inaudible qui me permet en revanche d'obtenir des cycles de 15 secondes exactement, ce qui sera bien plus sympathique pour coder et déboguer. C'est toujours ça de pris.

Bon, il nous faut un moyen de sauter de cycle en cycle, par exemple lorsqu'un nouveau joueur se transforme en zombie.

{% figure
  "saut.png",
  "Passage d'une section à une autre.",
  "Passer d'une section à l'autre permet d'adapter la situation à l'évolution du jeu."
%}

Puisque mes cycles font 15 secondes, c'est assez facile à calculer.

Si je suis au cycle 2 et que je souhaite avancer au cycle 3, je peux calculer qu'il faut avancer à 30 secondes dans le morceau (le cycle 1 commençant à 0 seconde, et le cycle 2 à 15 secondes).

C'est exactement ce que fait cette première démo. À chaque fois que vous cliquerez sur le bouton « Sauter », vous serez emmené au début de la section suivante :

{% codepen "https://codepen.io/bcalou/pen/XWVZJKR" %}

### Fludifier les sauts de cycles

Si vous jouez un peu avec, vous pouvez probablement entendre que le résultat n'est pas très satisfaisant.

Il y a deux raisons à cela :

- sauter au début du cycle interrompt le rythme que vous pouvez entendre dès le début et tout au long du morceau (cette note unique et répétitive) ;
- sauter au début du cycle suivant interrompt la **progression d'accords** et la fait recommencer au début, ce qui n'est pas du tout naturel.

La progression d'accords, c'est simplement l'enchaînement des 4 accords qui donne sa structure au morceau. On entend cette progression à partir du deuxième cycle.

{% figure
  "accords.png",
  "La progression d'accords du morceau.",
  "Voici un cycle au complet : 4 accords qui font peur s'enchaînent sur 8 mesures."
%}

On va simplifier un peu (beaucoup) le nom des accords et les appeler C, G, C et F (do, sol, do et fa).

On peut ainsi mettre à jour notre schéma, pour représenter cette progression à partir du deuxième cycle :

{% figure
  "grille.png",
  "Shéma de la structure du morceau et de la progression d'accords.",
  "À l'exception de la note unique à la basse et de la batterie qui est uniquement rythmique, chaque nouveau cycle se base sur la même progression d'accords."
%}

Le problème, donc, c'est que si nous passons du milieu du cycle 3 au début du cycle 4, par exemple, nous risquons de faire ça :

{% figure
  "rupture.png",
  "Saut de sol vers do.",
  "On saute du deuxième accord de la section 3 vers le premier accord de la section 4."
%}

Patatra, la progression d'accords est cassée. Alors que nous nous préparions à entendre C puis F pour finir le cycle 3, nous reprenons la progression au départ : C, puis G à nouveau ! Et si on enchaîne vite les cycles, on entend quasiment le premier accord en permanence.

Or le cerveau est très doué pour s'habituer à une progression d'accords bien spécifique, et toute déviation est troublante pour l'auditeur (ce que certains compositeurs peuvent utiliser à leur avantage, mais c'est une autre histoire).

Pour remédier à cette violation rythmique et harmonique intolérable à l'oreille, le remède est simple : il ne faut pas aller au début du cycle suivant, mais à l'instant du cycle suivant qui correspond à l'instant actuellement joué.

{% figure
  "fluide.png",
  "Saut de sol vers sol.",
  "Cette fois, on part du deuxième accord du cycle pour arriver sur le deuxième accord du suivant."
%}

Techniquement, c'est presque plus simple que la première version : au lieu de calculer le début de la section suivante, nous allons ajouter 15 secondes – la durée d'un cycle – à la position de lecture.

Par exemple, si la musique a commencé depuis 5 secondes, nous pouvons sauter jusqu'à `5 + 15 = 20` secondes (alors que le début du cycle 2 est à 15 secondes).

Essayez et comparez. Le résultat vous semble-t-il moins abrupt ?

{% codepen "https://codepen.io/bcalou/pen/JjMpGzm" %}

Alors, attention, j'ai dit que les transitions étaient moins abruptes, pas parfaites ! Selon le moment où vous avancez, l'arrivée de tel ou tel instrument peut tout de même sauter aux oreilles. Mais la structure rythmique et harmonique est sauve, et c'est déjà beaucoup.

### Masquer la transition

Pour améliorer encore l'effet, voici la botte secrète : un bon gros son bien énergique, qui va venir déguiser notre saut dans le morceau, en plus d'annoncer à tous les joueurs qu'il vient d'y avoir du grabuge.

Ce son, c'est ce que j'appelle le _hit_. En jouant le _hit_ au bon moment, ce dernier occupe tout l'espace sonore et va permettre aux sauts de s'effectuer « discrètement ». Tous les coups sont permis...

Voici le résultat.

{% codepen "https://codepen.io/bcalou/pen/JjMpKjd" %}

Ce n'est pas encore parfait, mais compte tenu du timing serré, c'est déjà pas mal !

### Harmoniser le hit

Finissons avec une petite touche cosmétique.

Actuellement, le _hit_ est toujours le même son. Ce ne sont pas n'importe quelles notes qui sont jouées : elles correspondent précisément à celle du premier accord de la progression.

Autrement dit, elles sonnent très bien sur le premier accord.

Sur les autres accords, le rendu n'est pas choquant, car le _hit_ est un élément bien séparé du reste de la musique. Mais qu'est ce que ça donnerait si le _hit_ était harmonisé avec l'accord actuellement joué ?

Pour cela, j'ai exporté 4 _hits_ différents. Ensuite, il suffit de faire correspondre le _hit_ avec l'accord courant. Si on est dans le dernier quart d'un cycle, c'est qu'il faut jouer le _hit_ qui correspond au dernier accord.

C'est parti !

{% codepen "https://codepen.io/bcalou/pen/gOovMez" %}

Cette amélioration passe sans doute inaperçue, c'est d'ailleurs son but, mais je pense qu'elle rajoute une petite couche de satisfaction auditive à l'ensemble.

## Musique + code = ❤️

Voici un court extrait du jeu (le dernier saut est assez brusque, mais c'est comme ça !) :

{% video
  "video.webm",
  "Une partie de jeu. La musique évolue lorsqu'un adversaire est touché."
%}

C'est la première fois que je combine ma passion pour la musique et mes connaissances en programmation, et en seulement 48h j'ai pu voir à quel point les possibilités étaient grandes.

C'est l'occasion de recommander une excellente chaîne YouTube : [8-bit Music Theory](https://www.youtube.com/channel/UCeZLO2VgbZHeDcongKzzfOw). Je ne comprends pas la moitié de ce qu'il raconte, mais ses analyses de bande-sons vidéoludiques me fascinent et m'ont fortement influencé pour cette petite expérience.

Quelques liens pour finir :

- [Blobby Zombie](https://glop.legeay.dev/), le jeu
- [Le code source](https://github.com/GJLOP/gjlop_front)
- [La bande-son](https://soundcloud.com/bastien-calou/blobby-zombie)
