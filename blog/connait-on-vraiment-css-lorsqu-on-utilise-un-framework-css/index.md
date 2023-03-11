---
title: Connaît-on vraiment CSS lorsqu'on utilise un framework CSS ?
date: 2022-12-09
tags:
  - css
  - accessibilité
  - tailwind
  - bootstrap
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/do-css-framework-users-actually-know-css-we-might-have-some-data-22o2
---

Le sondage <i>State of CSS</i> de l'année 2022 propose un excellent outil appelé le [Data Explorer](https://2022.stateofcss.com/en-US/explorer).

Par exemple, voici un tableau croisant l'usage des propriétés <code>scroll-snap</code> avec l'usage de Bootstrap.

{% img "scrollsnap.png", "Un tableau croisant l'usage des propriétés scroll-snap avec l'usage de Bootstrap" %}

Cela peut sembler un peu compliqué, mais je vais clarifier dans quelques instants.

Nous avons toutes et tous des idées préconçues sur CSS :

{% blockquote "Si tu utilises Tailwind, c'est parce que tu ne veux pas apprendre CSS" %}
{% blockquote "Mais Tailwind a résolu CSS, c'est LA bonne façon !" %}

Comme toujours, la réalité est plus complexe, et j'ai trouvé que cet outil était une bonne opportunité pour explorer les relations entre les frameworks CSS et le CSS natif.

Peut-être pouvons nous commencer par nous mettre d'accord sur deux points :

- Il n'est pas nécessaire de connaître chaque propriété CSS pour écrire un CSS de qualité. Ce qui compte est de construire un bon modèle mental du fonctionnement de CSS.
- En même temps, il est utile de connaître une bonne quantité de propriétés CSS pour pouvoir s'en servir lorsque cela est nécessaire, comme une boîte à outils.

En espérant que cela ne soit pas controversé. C'est parti !

## Bootstrap, la méthodologie

Bootsrap a déjà été utilisé par 81% des devs ayant répondu à ce sondage. Historiquement, c'est <em>le</em> framework CSS.

Définissons quelques catégories :

| %      	| Opinion  	| Nom de code 	|
|-------	|-------	|------	
| 51.7% 	| Ont utilisé, mais ne l'utiliseront plus	| Les ex |
| 29% 	| Ont utilisé et utiliseront de nouveau   	| Les fans |
| 16.3% | Connaissent mais ne souhaitent pas essayer | Les non merci |
| 2.7% | Connaissent et souhaitent essayer | Les pourquoi pas |
| 0.5% | Ne connaissent pas | Les késako |

Qui selon vous aura la meilleure connaissance du CSS natif ?

Regardons donc ce que le <i>Data Explorer</i> peut nous apprendre, avec l'exemple des propriétés <code>scroll-snap</code>. Voici un zoom sur une cellule spécifique :

{% img "zoom.png", "Les utilisations croisées de Bootstrap et scroll-snap" %}

Voici comment lire cette cellule : dans l'ensemble 34% des devs a répondu avoir déjà utilisé les propriétés <code>scroll-snap</code>. Cependant, si l'on regarde uniquement les fans de Bootstrap, seulement 26% utilisent <code>scroll-snap</code>, soit 8 points de moins.

Voici donc ce que j'ai entrepris : dans un [horrible document](https://docs.google.com/spreadsheets/d/1R_FNL93XDzFRNXLUYo4IYuCKu5lIYFWIBmVmeJ2ln9M/edit?usp=sharing) que vous n'avez pas besoin d'ouvrir, j'ai répertorié ces variations pour les 54 propriétés CSS présentées et pour nos 5 profils.

{% figure
  "sheet.png",
  "Les variations pour la propriété scroll-snap et les 5 profils",
  "Comme expliqué précédemment, les fans de Bootstrap utilisent moins les propriétés scroll-snap (-8 points). Mais les ex et les non merci l'utilisent plus que la moyenne"
%}

## Bootstrap, les résultats

Et voici nos 5 profils, du moins familier avec le CSS natif au plus familier :

| Nom de code     | Variation de connaissance du CSS natif  	| 
|-------	|-------	|
| Les késako | -11 points |
| Les pourquoi pas | -9 points |
| Les fans | -2 points |
| Les non merci | pas de variation |
| Les ex | +2 points |

### Les késako

Le profil **késako** (qui ne sait pas ce qu'est Bootstrap) est corrélé avec une plus faible connaissance du CSS natif : **-11 points**.

Théorie personnelle : Bootstrap est tant utilisé que si vous ne le connaissez pas (seulement 0,5% des réponses), vous êtes probablement en train de découvrir CSS. Il est donc logique que vous ayez encore une connaissance du CSS lacunaire.

_Note : Merci de garder à l'esprit que les théories personnelles sont des théories... et qu'elles sont personnelles._

### Les pourquoi pas

Le profil **pourquoi pas** (qui est intéressé par la découverte de l'outil) est également corrélé avec une plus faible connaissance du CSS natif : **-9 points**.

Théorie personnelle : ces profils pourraient également être ceux de personnes débutantes n'ayant pas encore eu le temps de tester Bootstrap. Elles souhaiteraient l'essayer car c'est un outil très utilisé et qu'il est encore trop tôt pour elle pour décider ou non de s'en passer.

### Les fans

Le profil des **fans** (qui ont utilisé Bootstrap et l'utiliseraient de nouveau) obtiennent un bien meilleur résultat, mais toujours **-2 points** en-dessous de la moyenne.

Théorie personnelle : ces personnes ont bien plus de connaissances que les _késako_ et les _pourquoi pas_ car elles ont peut être codé avec Bootstrap (entre autres outils) depuis des années et accumulé des savoirs en cours de route. Cela étant dit, l'usage de Bootstrap ne facilite pas la découverte de nouvelles fonctionnalités CSS, ou Bootstrap est suffisant pour ce qu'elles font et elles ne se préocuppent pas tant que ça des nouveautés (ou n'en ont pas le temps !)

### Les non merci

Les **non merci** (qui connaissent Bootstrap mais ne souhaitent pas l'utiliser) obtiennent un résultat dans la **moyenne**.

Théorie personnelle : décider qu'un outil n'est pas pour vous requiert une compréhension suffisante des challenges posés par CSS. D'autres outils pourraient également récupérer l'attention de ces profils, mais cela ne semble pas gêner la découverte de fonctionnalités CSS natives.

### Les ex

Les **ex** (qui ont utilisé Bootstrap mais ne souhaitent plus l'utiliser) font mieux que la moyenne : **+2 points**.

Théorie personnelle : apprendre à maîtriser un framework puis décider d'en arrêter l'utilisation est un processus long, ces personnes ont donc une experiences substantielle. Elles ont abandonné Bootstrap car leur approche du CSS a évolué (et CSS aussi, permettant ce départ pour certaines personnes). Elles ont peut être même été témointes de la longue transformation de CSS au cours des années. Elles ont décidé que Bootstrap n'était plus pour elle et d'utiliser le CSS natif davantage. Par ailleurs, on ne choisit pas toujours ses outils : elles ont peut être été contraintes d'utiliser Boostrap pour un employeur ou un client, tout en investissant dans le CSS natif en parallèle.

Voici les détails groupés par catégories :

{% img "bootstrap.png", "Détails des résultats groupés par catégories de fonctionnalités CSS" %}

Le plus grand écart (-8 points) entre les ex et les fans se situe au niveau des fonctionnalités d'interaction (_scroll-snap_, interactions tactiles, _overscroll-behavior_...).

Je pense qu'il faut aussi noter que les catégorie des fans est correlée avec une moins bonne connaissance des fonctionnalités liées à l'accessibilité (-5 points par rapport aux exs).

## Tailwind, la méthodologie

Parlons maintenant du nouveau roi de la récré.

D'abord, nos 5 profils :

| %      	| Opinion  	| Nom de code 	|
|-------	|-------	|------	|
| 36.4% 	| Ont utilisé et utiliseront de nouveau   	| Les fans |
| 25% | Connaissent mais ne souhaitent pas essayer | Les non merci |
| 25% | Connaissent et souhaitent essayer | Les pourquoi pas |
| 9.8% 	| Ont utilisé, mais ne l'utiliseront plus	| Les ex |
| 4.1% | Ne connaissent pas | Les késako |

D'après-vous, qui aura le meilleur score cette fois-ci ?

## Tailwind, les résultats

L'ordre a changé ! En effet, les _fans_ obtiennent maintenant un meilleur résultat que les _pourquoi pas_.

Et les résultat eux-même ont aussi fortement changé.

| Nom de code     | Variation de connaissance du CSS natif  	| 
|-------	|-------	|
| Les késako | -9 points |
| Les pourquoi pas | -5 points |
| Les non merci | +1 point |
| Les fans | +2 points |
| Les ex | +6 points |

## Les késako

Le profil **késako** (qui ne sait pas ce qu'est Tailwind) est correlé avec une faible connaissance du CSS natif : **-9 points**.

Théorie personnelle : comme pour les personnes qui ne connaissent pas Bootstrap. Si vous ne connaissez pas Tailwind, vous êtes possiblement en train de découvrir l'écosystème CSS. Mais vous pourriez aussi avoir des années d'expérience et ne pas être au courant des dernières actualités CSS, ce qui pourrait expliquer pourquoi ce profil n'est « que » 9 points en dessous de la moyenne (tandis que pour Bootstrap, c'était 11).

## Les pourquoi pas

Le profil **pourquoi pas** (qui aimerait découvrir Tailwind) est correlé avec une baisse de **-5 points** par rapport à la moyenne.

Théorie personnelle : c'est une baisse moins importante que pour Bootstrap (-9 points), mais la logique pourrait être la même. Si vous n'avez pas utilisé cet outil très répandu ou que vous n'avez pas encore le recul nécessaire pour décider de vous en passer, vous êtes peut-être en phase de découverte de CSS, il est donc logique que vous ne connaissiez pas le CSS natif parfaitement non plus. C'est tout de même avec un meilleur score qu'avec Bootstrap. Si vous avez entendu parler de Tailwind, cela signifie que vous vous intéressez aux évolutions récentes de CSS, tandis que vous pourriez avoir entendu parler de Bootstrap il y a longtemps de cela.

## Les non merci

Le profil **non merci** (qui a entendu parler de Tailwind mais n'est pas intéressé) dépasse legèrement la moyenne : **+1 point**.

Théorie personnelle : comme pour Bootstrap. Ces personnes ont assez d'expérience pour juger qu'un outil leur correspond ou non. Cette expérience s'accompagne d'une bonne connaissance du CSS natif, juste au dessus de la moyenne. Mais...

## Les fans

Les **fans** (qui ont utilisé Tailwind et l'utiliseront de nouveau) sont dans une position très différente. Avec Bootstrap, ces personnes connaissaient moins (-2 points), mais avec Tailwind, elles en connaissent plus : **+2 points** ! Encore mieux que les _non merci_.

Théorie personnelle : contrairement à ce que l'on lit parfois, aimer Tailwind n'est pas corrélé avec une moindre connaissance du CSS natif. Tout d'abord, rappelons-nous qu'avec ses classes utilitaires, Tailwind utilise une approche plus proche du CSS natif que Bootstrap. Les devs Tailwind connaissent par exemple les concept tels que _flex_, là où les devs Bootstrap utiliseraient une classe <code>column</code> (qui utilise en réalité _flexbox_ en coulisse et n'a rien à voir avec les vraies colonnes CSS...) Enfin, il y a le fait que Tailwind soit un outil récent. Si vous lisez des articles sur Tailwind, il est presque impossible que vous ne lisiez pas aussi des articles sur les améliorations natives de CSS. Tailwind fait partie de l'écosystème moderne. Ceci étant dit...

## Les exs

Le profil des **exs** (ayant utilisé Tailwind mais ne souhaitant plus l'utiliser) fait bien mieux que la moyenne : **+6 points**.

Théorie personnelle : bien que les devs utilisant Tailwind fassent partie de l'écosystème moderne et connaissent leur CSS, les devs ayant tourné leur dos à Tailwind semblent en savoir plus. Premièrement, Tailwind ne résoud pas (et ne prétend pas résoudre) et ne couvre pas tout. Certains fonctionnalités modernes, comme `:has`, les _container queries_, les _cascade layers_, les _@supports queries_... nécessitent de les connaître nativement pour les utiliser à leur plein potentiel. Cela ne signifie pas que les fans de Tailwind ne les connaissent pas et ne peuvent pas utiliser les deux, mais les personnes déçues par l'approche de Tailwind semblent simplement investir plus de temps dans la compréhension du CSS natif. Cela n'en fait pas de meilleures personnes, mais leur boîte à outil semble un peu plus étendue.

Voici le détail des résultats par catégories de fonctionnalités :

{% img "tailwind.png", "Détail des résultats pour Tailwind" %}

Ici, le plus gros écart entre les _exs_ et les _fans_ (-8 points) concerne la catégorie des sélecteurs, qui contient `::marker`, `:has` et `:where`. Les fans de Tailwind ne les utilisent pas beaucoup.

Encore une fois, il y a un gros écart au rayon accessibilité : si les personnes utilisant Tailwind font mieux que la moyenne (+2 points), les _exs_ font bien mieux avec +9 points.

## Conclusion

J'espère que cette petite expérience vous a intéressé. Ce n'est pas une publication scientifique revue par les pairs, alors prenez-là avec du recul, mais j'ai fait de mon mieux avec ce que j'avais. N'oublions pas le biais d'échantillonnage : les personnes répondant à un sondage sur CSS ne peuvent pas représenter tout le monde.

Voici quelques conclusions que je vous soumets :

### À propos de Bootstrap

Bootstrap est sur le déclin, et ce n'est peut être pas bien grave. Il a fait partie du voyage de nombreuses et nombreux devs, mais l'utiliser aujourd'hui est correlé avec une moindre connaissance de précieuses fonctionnalités CSS natives. Ce n'est pas un mauvais outil et il a sauvé bien du monde par le passé, mais il a aujourd'hui du mal à rester pertinent.

Je ne souhaite pas que les gens abandonnent Bootstrap si l'outil leur convient : la seule chose qui compte est la qualité de ce qu'on construit. Il faut juste être conscient que CSS est bien plus étendu que cela aujourd'hui (et beaucoup le sont déjà, j'en suis sûr).

### À propos de Tailwind

Non, l'utilisation de Tailwind ne rend pas quelqu'un ignorant vis-à-vis du « vrai CSS ». Ces personnes utilisent un outil moderne et ont accumulé une connaissance substantielle de CSS au cours de leur apprentissage. Elles ont peut être appris le CSS natif récemment et pourraient être plus à jour que quelqu'un qui connaissait bien CSS il y a dix ans mais n'est pas resté à jour.

Cependant, elles devraient être conscientes que maîtriser Tailwind n'est pas et ne peut pas être maîtriser CSS, si une telle chose existe. Certaines fonctionnalités ne se transposent tout simplement pas à Tailwind. Cela n'empêche pas d'écrire du CSS de qualité mais réduit la taille théorique de la boîte à outils. Les personnes apprenant Tailwind et désireuses de continuer à apprendre pourraient réinvestir cette motivation et continuer à découvrir des fonctionnalités CSS natives, qui sont là pour durer et se transféreront d'un outil à un autre.

### À propos du CSS natif

[2022 a été une excellente année pour CSS](https://bastiencalou.fr/blog/l-ere-du-no-hacks-css) et je pense que connaître ces capacités natives est un atout puissant. Bien sûr, cela ne remplace pas une compréhension profonde de la logique CSS, qui n'est pas juste une liste de propriétés, mais cela fournit une vaste boîte à outil dans laquelle piocher pour faire face à divers obstacles.

Pour Bootstrap et Tailwind, les personnes connaissant le plus de CSS natif étaient celles qui avaient testé le framework. Alors ne rejetez pas forcément tous ces outils sur un principe de pureté : découvrir de nouvelles façons d'écrire du CSS — même pour réaliser qu'elles ne vous conviennent pas au final — est potentiellement précieux et pourrait donner un nouvel éclairage à la façon dont vous écrivez du CSS natif.

Que pensez-vous de tout cela ? Si vous parvenez à des conclusions différentes, n'hésitez pas à les partager (en respectant tout le monde, ce n'est que du CSS !)
