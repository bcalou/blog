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

On pourrait en explorer les cause et en déplorer les conséquences, mais ce n'est pas ce que je souhaite faire ici. Je veux simplement montrer tout ce que peut contenir une page web dont le poids serait la moitié du poids médian actuel.

Le poids médian actuel sur desktop est 2655 Ko. Notre objectif est donc 1237 Ko. Seules 25% des pages web sont aussi « légères ». Alors, ça donne quoi ?

## Ce que contient cette page

- Du texte, déjà. Vous êtes en train de le lire. C'est à la fois le plus important et le plus léger, ou presque. Ce texte est structuré au sein d'un document HTML, pour un total de **XX**.
- Du style ! Le CSS qui met en forme tout ça et rend votre lecture un peu plus agréable, je l'espère. **7Ko (0,6%)**
- Une chouette font pour les titres et sous-titres. J'ai mis longtemps à la trouver, je l'aime beaucoup ! Elle s'appelle « Euclid ». Grâce à un petit script qui ne conserve que les caractères réellement utiles à mon blog, le fichier qui à l'origine pèse 44Ko n'en fait plus que **15Ko (1,2%)**
- Une photo de ma tête, qui communique avec élégance une forme de sympathie professionnelle rendant irresistible l'envie de riches recruteurs de me contacter.