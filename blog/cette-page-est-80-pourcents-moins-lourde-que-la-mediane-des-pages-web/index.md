---
title: Cette page est 80&nbsp;% moins lourde que la médiane des pages web
slug: cette-page-est-80-pourcents-moins-lourde-que-la-mediane-des-pages-web
description: "TODO"
date: 2025-01-17
tags:
  - Performance
layout: layouts/post.njk
---

C'est une constante depuis des lustres : le poids médian des pages web ne fait qu'augmenter. D'après le site <a href="https://httparchive.org/reports/page-weight#bytesTotal">HTTP Archive</a>, cette augmentation se situe entre 5 et 10 % par an et ne montre aucun signe de ralentissement.

{% figure
  "mediane.png",
  "Un graphique montre l'augmentation constante du poids médian des pages web entre 2011 et 2024 : c'est presque une ligne droite",
  "Vers l'infini et au-delà !"
%}

On pourrait en explorer les cause et en déplorer les conséquences, mais ce n'est pas ce que je souhaite faire ici. Je veux simplement montrer tout ce que peut contenir une page web dont le poids serait **20 % du poids médian actuel**.

Le poids médian actuel sur desktop est 2 676 Ko. **Notre objectif est donc 532 Ko**. Moins de 10 % des pages web sont aussi « légères ».

Qu'est ce qu'on peut bien faire avec « si peu » de data ? Une pauvre page de connexion avec deux champs, peut-être ? Sans doute une page sans image, sans vidéo, sans interactivité, triste comme tout... Les autres pages ne sont pas si lourdes pour rien, si ?

Essayons voir.

## Ce que contient cette page

### Les bases : HTML / CSS / JS

- Du texte, déjà. Vous êtes en train de le lire. C'est à la fois le plus important et parmi les ressources les plus légères. Ce texte est structuré au sein d'un document HTML, pour un total de **11 Ko (soit 2,1 % de notre budget)**.
- Du style : le CSS qui met en forme tout ça et rend votre lecture un peu plus agréable (j'espère !). Il pèse **7 Ko (1,3 %).**
- Un fichier JavaScript, qui gère quelques interactions basiques et le formulaire pour poster un commentaire. Il fait gentiment ça pour le modeste poids de **3 Ko (0,6 %)**.

### Fonts et médias

- Une chouette font pour les titres et sous-titres. Grâce au script [glyphanger](https://github.com/zachleat/glyphhanger), qui permet de ne conserver que les caractères réellement utiles à mon blog, le fichier qui à l'origine pèse 44 Ko ne fait plus que **15 Ko (2,8 %)**.
- Une photo de ma tête, qui communique avec élégance une forme de sympathie professionnelle rendant irrésistible l'envie de me contacter à de riches recruteurs. Elle pèse **4,5 Ko (0,8 %)**.
- La capture d'écran du site HTTP Archive qui introduit l'article. Elle est affichée avec une largeur de `780px`, mais si vous êtes sur un écran à haute densité de pixels, le fichier original est deux fois plus grand (`1560px`) pour le plaisir des yeux. Le format `.avif`, désormais très bien supporté, permet de limiter son poids à **22 Ko (4,1 %)**.
- Un favicon, le petit truc bleu dans l'onglet du navigateur, la haut. C'est important. Il représente **5 Ko (0,9 %)**.

{% aside %}Le nombre de requête compte aussi énormément dans la performance d'un site. Aujourd'hui, la médiane est de 76. Cette page en génère 34 — l'inclusion de codepen déclenche une bonne moitiée d'entre elles...{% endaside %}

