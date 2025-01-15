---
title: Cette page est 75% moins lourde que la médiane des pages web
slug: cette-page-est-75-pourcents-moins-lourde-que-la-mediane-des-pages-web
description: "TODO"
date: 2025-01-16
tags:
  - Performance
layout: layouts/post.njk
---

C'est une constante depuis des lustres : le poids médian des pages web ne fait qu'augmenter. D'après le site <a href="https://httparchive.org/reports/page-weight#bytesTotal">HTTP Archive</a>, cette augmentation se situe entre 5 et 10% par an et ne montre aucun signe de ralentissement.

{% figure
  "mediane.png",
  "Un graphique montre l'augmentation constante du poids médian des pages web entre 2011 et 2024 : c'est presque une ligne droite",
  "Vers l'infini et au-delà !"
%}

On pourrait en explorer les cause et en déplorer les conséquences, mais ce n'est pas ce que je souhaite faire ici. Je veux simplement montrer tout ce que peut contenir une page web dont le poids serait **un quart du poids médian actuel**.

Le poids médian actuel sur desktop est 2676 Ko. **Notre objectif est donc 669 Ko**. Seules 10% des pages web sont aussi « légères ».

Qu'est ce qu'on peut bien faire avec « si peu » de data ? Une pauvre page de connexion avec deux champs, peut-être ? Sans doute une page sans image, sans vidéo, sans interactivité, triste comme tout... Les autres pages ne sont pas si lourdes pour rien, si ?

Essayons voir.

## Ce que contient cette page

- Du texte, déjà. Vous êtes en train de le lire. C'est à la fois le plus important et le plus léger, ou presque. Ce texte est structuré au sein d'un document HTML, pour un total de **XX**.
- Du style ! Le CSS qui met en forme tout ça et rend votre lecture un peu plus agréable, je l'espère. **7 Ko (0,6%).**
- Une chouette font pour les titres et sous-titres. J'ai mis longtemps à la trouver, je l'aime beaucoup ! Elle s'appelle « Euclid ». Grâce au script [glyphanger](https://github.com/zachleat/glyphhanger), qui permet de ne conserver que les caractères réellement utiles à mon blog, le fichier qui à l'origine pèse 44 Ko ne fait plus que **15 Ko (1,2%)**.
- Une photo de ma tête, qui communique avec élégance une forme de sympathie professionnelle rendant l'envie de me contacter irrésistible à de riches recruteurs. Elle pèse **24 Ko (1,9%)**.
- La capture d'écran du site HTTP Archive qui introduit l'article. Elle est affichée avec une largeur de `780px`, mais si vous êtes sur un écran à haute densité de pixels, le fichier original est deux fois plus grand (`1560px`) pour le plaisir des yeux. Le format `.avif`, désormais très bien supporté, permet de limiter son poids à **24 Ko (1,9%)**.
- Un fichier JavaScript, qui a trois missions à l'heure actuelle : gérer l'animation de survol de la photo susnommée, l'obfuscation de mon adresse mail et le formulaire de commentaires en bas d'article. Il fait gentiment tout ça pour le modeste poids de **3 Ko (0,2%)**.
- Un favicon, le petit truc bleu dans l'onglet du navigateur, la haut. C'est important. **5 Ko (0,4%)**.

{% aside %}Le nombre de requête compte aussi énormément dans la performance d'un site. Aujourd'hui, la médiane est de 76. Cette page s'en tient à 24. L'inclusion de codepen en ajoute beaucoup en cascade...{% endaside %}

## Seulement XX Ko ???

Ça ne va pas du tout. Ce post est déjà d'une longueur respectable, et pourtant, nous n'avons atteint que **XX Ko**. C'est riducule.

Dois-je rappeler que l'objectif est **669 Ko** ? Il va falloir se ressaisir.

Ci-dessous, voici un web component qui me permet de présenter les compatibilités de différentes fonctionnalités. Voici par exemple celle pour le format `.avif` évoqué précédemment.

{% baseline "avif" %}

Son inclusion et l'appel API associé représentent **71 Ko (1,9%)**. On continue !

Une iframe codepen ? Chapeau pour cet outil : il nous en coûte seulement **75 Ko (6,1%)**. Une grosse partie de notre budget, certes, mais pour une grande plus-value.

{% codepen "https://codepen.io/bcalou/pen/zYBWzdo" %}

Une vidéo ? Puisqu'il le faut. **79 Ko (6,4%)**.

{% video
  "lazy.webm",
  "Un scroll vertical de la page, au fur et à mesure duquel les images sont chargées progressivement."
%}

Un extrait de code ? En réalité, il ne rajoute que son poids en caractères. En effet, la coloration syntaxique est faite lors du pré-rendu côté serveur. Et les styles sont déjà dans notre unique fichier CSS.

```js
try {
  const $form = document.querySelector("form:has(textarea)");

  if ($form) {
    $form.addEventListener("submit", () => {...})
  }
} catch (error) {
  console.error(error);
}
```

D'autres composants peuvent facilement être mobilisés « gratuitement », puisqu'ils ne s'agit que du CSS déjà chargé. Allons-y, histoire de représenter l'ensemble des contenus présents sur le blog.

Un citation passionnante ?

{% blockquote "Les jeux de 52 cartes sont basés sur le calendrier grégorien : il y a 4 couleurs pour les quatre saisons de l'année, 12 figures pour les 12 mois, 52 cartes pour les 52 semaines et la somme de tous les points d'un jeu de 52 cartes plus le joker est de 365 pour les 365 jours de l'année.", "", "Se coucher moins bête", "http://secouchermoinsbete.fr/21775-le-symbolisme-du-jeu-de-52-cartes" %}

Un tableau ? Voici la répartition du poids des ressources sur une page web (les vidéos sont exclues car beaucoup de pages en sont dénuées).

<table>
  <caption>Répartition du poids des ressources sur une page web (vidéos exclues)</caption>
  <tr>
    <th scope="col">Type de ressource</th>
    <th scope="col">% du total</th>
  </tr>
  <tr>
    <td>Images 🖼️</td>
    <td>39,9 %</td>
  </tr>
  <tr>
    <td>JavaScript ⚡</td>
    <td>23,2 %</td>
  </tr>
  <tr>
    <td>Fonts 🇦</td>
    <td>5 %</td>
  </tr>
  <tr>
    <td>CSS 💄</td>
    <td>2,96 %</td>
  </tr>
  <tr>
    <td>HTML ✍️</td>
    <td>0,7 %</td>
  </tr>
</table>

Source : [Web Almanac 2024](https://almanac.httparchive.org/en/2024/page-weight#content-type-and-file-formats).

## Ça devient lourd...

Seulement XXX Ko malgré tous mes efforts, et tous les types de contenus présents sur le blog sont représentés. Je me demande si ce post était une bonne idée.

Pas le choix, on va jusqu'au bout : il va falloir remplir ! Je vous préviens : la suite de cet article est un amoncellement de contenus sans queue ni-tête. Vous pouvez sauter directement à [la section suivante](#ce-que-ne-contient-pas-cette-page).



## Ce que ne contient pas cette page

Ça y est, nous y sommes parvenus... Cette page fait enfin **un quart du poids médian actuel**. Pas mal, non ?

C'est que cette page fait aussi de son mieux pour éviter quelques « gouffres » de ressources, qui sont malheureusement le lot de bon nombre de sites :
- `iframe` très gourmandes comme celle de *Youtube* ;
- images mal optimisées ;
- multiples typographies et variantes ;
- gros framework JavaScript ;
- videos longues et HD ;
- scripts de tracking ;
- widgets de réseaux sociaux ;
- immense librarie d'icônes utilisée à 0,1%...

Souvent, une seule de ces erreurs suffit à plomber le poids d'un projet entier. Mais tant que vous gardez un oeil vigilant sur ce que mobilise votre page, je pense en avoir fait la démonstration : **vous avez de la marge**.

Le web est de plus en plus lourd, mais ce n'est pas une fatalité. Vous choisissez ce qui rentre dans votre page.

En attendant, vous pouvez faire grimper de quelques octets le poids de celle-ci en laissant un commentaire. Mais je ne pense pas que cela puisse rendre le titre de cet article mensonger : la médiane ne va-t-elle pas continuer à monter, elle aussi ?