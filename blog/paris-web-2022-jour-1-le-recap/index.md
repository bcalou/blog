---
title: "Paris Web 2022 — Jour 1, le récap !"
description: Retour sur les 8 conférences auxquelles j'ai pu assister lors la première journée de cet événement savamment orchestré.
date: 2022-10-12
tags:
  - HTML
  - CSS
  - Accessibilité
  - Design
  - Écosystème
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/paris-web-2022-jour-1-le-recap--5c82
series: Paris Web 2022
---

Il y a pile une semaine, c'était mon premier Paris Web, et quelle journée ! 8 conférences ([parmi les 16 proposées](https://www.paris-web.fr/2022/06.php)) passionnantes et variées.

En voici un récap à chaud, partiel et partial, qui j'espère vous donnera envie pour l'année prochaine !

J'ai mis des petites étoiles pour faire ressortir mes conférences préférées, mais c'est tout à fait biaisé par mes propres intérêts : je suis impressionné par la qualité de l'ensemble.

## 1. On se lève et on se casse : tour d’horizon d’un travail sans capital&nbsp;⭐⭐

Ça commence fort dès le matin avec la présentation politique de la journée.

{% blockquote "Je ne sais pas qui fait 35h par semaine dans la salle, mais moi cela m'est tout à fait insupportable." %}

<aside>Note : Les citations sont basées sur ma prise de notes. Elle reflètent le propos mais la formulation exacte peut varier.</aside>

Au-delà des phrases (et du titre) chocs, Maïtané et Thomas ont créé toute une série de visualisations astucieuses pour créer le débat et comparer différentes formes d'activités : salariat, portage salarial, micro-entreprise, coopérative d'activité et d'emploi...

Dans quelle structure peut-on parler d'argent sans tabou ? Dans laquelle choisit-on ses clients, ou ses collaborateurs ? Quelle structure participe le mieux au bien commun ? Et, pour répondre à cette notion de « sans capital », dans quelles structures les bénéfices nous reviennent-ils le plus directement possible ?

Pour ma part, une confirmation que le salariat, ce n'est pas trop pour moi, mais aussi un rappel qu'il n'y a pas que le freelance en face !

{% link
  "Voir la conférence sur YouTube",
  "https://www.youtube.com/watch?v=rI35dYvljZo&t=2705s"
%}

##  2. Concevoir des services éco-responsables en alliant Design de Services et Éco-conception Numérique&nbsp;⭐

{% blockquote "Cela fait 12 ans que je conçois des services, et 12 ans que je les conçois sans me poser la question de l'impact sur la planète." %}

La conception centrée sur les utilisateurs est devenue une telle religion qu'il est difficile de le faire entendre : tout ce qui est bon pour les clients et le chiffre d'affaire ne l'est pas forcément pour notre écosystème.

Une évidence ? Dans certains secteurs, oui, mais pas nécessairement dans le numérique et son illusion de dématérialisation.

Le design centré sur l'utilisateur est centré sur l'utilisateur... au dépend du reste. Il est temps de prendre un sacré recul pour inclure la conception des services dans une démarche beaucoup plus globale.

Et pour convaincre les entreprises qui n'y verraient que des contraintes, un seul axe : soit vous prenez le train, soit vous restez passifs face à une évolution inexorable.

{% link "Voir la conférence sur YouTube", "https://www.youtube.com/watch?v=pJuHsOi0q4Y&t=4926s" %}

## 3. Animating the Impossible&nbsp;⭐⭐ 

C'était une forte promesse, et c'est un succès !

Je ne connaissais pas la méthode FLIP, qui permet de réaliser des transitions visuelles complexes entre deux états, avec un état final difficile à prévoir (notamment la position exacte de l'élément relativement au point de départ, l'élément pouvant atterrir dans un autre endroit du DOM).

L'idée géniale est donc la suivante, en 4 étapes (FLIP) :

<ol>
  <li><strong><i>First</i></strong> : stocker la position et les dimensions de l'élément actuel.</li>
  <li><strong><i>Last</i></strong> : placer instantanément l'élément dans sa position finale dans le DOM pour en trouver les dimensions et la position finale (ceci se passe dans la phase de <i>layout</i>, on ne sollicite pas la phase de <i>paint</i> et donc c'est invisible !).
  <li><strong><i>Invert</i></strong> : Inverser l'animation prévue à la base en calculant la différence entre les états <i>First</i> et <i>Last</i>.
  <li><strong><i>Play</i></strong> : jouer l'animation finale.</li>
</ol>

Je ne sais pas si j'explique bien, mais c'est à ça que sert la vidéo, non ?

{% link "Voir la conférence sur YouTube", "https://www.youtube.com/watch?v=pJuHsOi0q4Y&t=8131s" %}

## 4. L'industrialisation des designers du web&nbsp;⭐⭐

Salle comble, c'est manifestement un sujet qui parle à beaucoup.

25 ans après la phase d'effervescence joyeuse du web, le constat n'est pas réjouissant : les écoles n'enseignent plus les bases des arts plastiques et appliqués. La SNCF mobilise 200 designers pour réaliser une application médiocre. L'esthétique, le sensible et la narration sont mis de côté face à l'assemblage de blocs.

Et c'est Figma qui va en prendre pour son grade. L'outil révolutionnaire pour les designers est aussi un outil de contrôle idéal pour les managers, assimilable à une ligne de montage surveillée.

Les designers sont presques dépossédés de leur métier : c'est désormais tout le monde qui peut « chuchoter au curseur du designer » de déplacer ceci, d'agrandir cela.

<q>Laissez-nous commiter !</q>, demande Cécile, dans un excellent parallèle avec le processus de développement et ses phases de réflexion solitaires. Figma, c'est parfois un peu comme si les collègues de votre agence vous indiquaient que vous n'avez pas fermé la parenthèse de votre fonction alors que vous êtes encore en train de coder...

{% link "Voir la conférence sur YouTube", "https://www.youtube.com/watch?v=rI35dYvljZo?t=11467s" %}

## 5. Illectronisme et numérisation des services publics&nbsp;⭐

L'administration française donne-t-elle les moyens aux citoyens d'accéder à leurs droits et de réaliser leurs démarches obligatoires ?

Avec 9% de français n'ayant aucun équipement pour accéder à Internet et 7% d'illetrisme en France, il est clair qu'une administration totalement numérique (et même si les services en ligne continuent à s'améliorer) ne répondra pas seule au problème.

Selon Raphaël, il faut se méfier du tout-numérique, qui cache le fantasme d'un citoyen modèle, qui se fond dans le moule et remplit gentiment son formulaire en ligne. Vision laissant sur le carreau tous les cas particuliers (et ils sont nombreux) et pouvant être source d'une perte d'autonomie et d'humiliation.

{% link "Voir la conférence sur YouTube", "https://www.youtube.com/watch?v=TGnbXfyIbq8&t=324s" %}

## 6. Lost in translation&nbsp;⭐⭐⭐

Manuel me prend par les sentiments avec un sujet cher à mon cœur : HTML, et plus précisément le mystère de l'incompétence globale pour utiliser correctement ce langage.

Quelle que soit la stack, React ou intégration native, la plupart des erreurs d'accessibilité viennent du HTML. 20 ans à répéter les bases, et pourtant !

C'est précisément parce que la syntaxe de HTML est simple que ce langage est mal maîtrisé. Car la complexité ne vient pas de la syntaxe : elle vient de la compréhension des structures, de la sémantique, de tout ce qui est invisible dans un design. Et cela, c'est bien plus complexe.

{% blockquote "Some people just don't care." %}

Certaines personnes s'en fichent-elles tout simplement ? J'ai bien peur qu'il ait raison, mais Manuel ne se veut pas fataliste pour autant. Une conférence très drôle sur _le_ langage du web.

{% link "Voir la conférence sur YouTube", "https://www.youtube.com/watch?v=TGnbXfyIbq8&t=2828s" %}

##  7. Transferts de données : est-ce que je peux encore utiliser des fournisseurs américains ?&nbsp;⭐⭐

Non.

Autant le contenu de la conférence est technique pour le profane, autant la conclusion est sans appel. Même si les entreprises naviguent dans un flou règlementaire, soupesant les bénéfices et les risques d'une petite entrave à la règle, la fête est finie.

L'administration Bush a signé un mandat simple : il permet de faire usage aux USA comme bon leur semble de toute donnée présente (ou transmise) sur leur territoire, même celles récoltées par « hasard » (oui, c'est le mot utilisé). 
Alors, votre prestataire des USA (ou travaillant lui-même avec les USA) pourra vous fournir toutes les précautions contractuelles du monde, cela ne change pas grand chose : face aux contrats, c'est la loi qui gagne.

Et si une société hors USA a des liens quelconques avec le pays, ce dernier se réserve aussi l'exploitation des données qu'ils pourra récupérer. Les ramifications sont vertigineuses.

Bref, exit Google Analytics, Mailchimp et les autres. Un petit séisme, en somme.

Comme dit le diction :

{% blockquote "Il ne faut pas se demander si on va se faire hacker. Il faut se demander <em>quand</em> on va se faire hacker." %}

{% link "Voir la conférence sur YouTube", "https://www.youtube.com/watch?v=TGnbXfyIbq8&t=7667s" %}

## 8. Objectifs 2025 de l’accessibilité : quels défis nous attendent ?&nbsp;⭐

Fin de journée morose, pas à cause des intervenants mais du constat dressé : accessibilité, on n'y est pas, et loin de là.

{% blockquote "Ne faites pas accessible, vous ne serez jamais inquiété." %}

Avec une obligation récente (2021 pour le secteur public et très grosses entreprises privées) ou même future (2025 pour le reste du secteur privé) et peu ou pas d'amendes conséquentes pour le moment, le chemin pour un web accessible ne fait que commencer.

{% blockquote "Seules 20% des 250 démarches les plus utilisées par les français sont accessibles alors que c'est imposé depuis 2012." %}

Le sujet est profond et culturel : est-on prêt, en tant que société, à investir là-dessus ? Les actes ne le prouvent pas actuellement.

Une remarque est révélatrice : l'un des intervenants estime qu'une personne avec des compétences en la matière n'a pas spécialement plus de chances d'être recrutée qu'une autre. Un bonus sympathique, tout au plus.

Oui, le sujet est de plus en plus abordé. Mais c'est encore beaucoup trop anecdotique.

{% blockquote "Toutes les grosses boîtes ont un budget sécurité énorme, et le budget accessibilité ?" %}

{% link "Voir la conférence sur YouTube", "https://www.youtube.com/watch?v=TGnbXfyIbq8&t=11402s" %}