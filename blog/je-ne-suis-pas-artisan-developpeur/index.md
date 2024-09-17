---
title: Je ne suis pas « artisan développeur »
permalink: je-ne-suis-pas-artisan-developpeur
description: Pourquoi cette approche tout à fait louable me semble un peu masquer la misère.
date: 2019-08-03
tags:
  - Écosystème
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/je-ne-suis-pas-artisan-developpeur-2hc2
---

Il y a quelques jours, j'ai reçu un message dans ma boîte de réception LinkedIn. Cette fois, pas d'offre sous forme de poème, pas de blagounette pseudo-disruptive. Même pas de _Ninja_ ou de _Rockstar developer_ à l'horizon. Mais un terme que je ne connaissais pas : celui de **software craftsmanship** (comprenez « artisanat du développement »).

Après m'être imaginé quelques instants artisan développeur, accueillant les touristes dans ma petite boutique à Saint-Paul-de-Vence (<q>Entrez messieurs dames, attention ou vous mettez les pieds, il y a des frameworks un peu partout je n'ai pas encore eu le temps de ranger !</q>), j'ai quand même demandé à Google ce qu'il en pensait.

Et là, il y avait une fiche Wikipédia. Et si c'est sur Wikipédia, c'est bien que ça existe et que ça n'est pas une invention de RH dépressif. Quand on remonte à la source, on trouve un [manifeste](http://manifesto.softwarecraftsmanship.org/#/fr-fr) : celui des artisans du logiciel.

{% figure
  "manifeste.png",
  "Capture d'écran du manifeste de l'artisan développeur.",
  "Le manifeste, publié en 2009 d'après le texte, 1450 d'après le design."
%}

Ce qu'il est important de dire d'entrée de jeu, c'est que je suis **parfaitement d'accord** avec les principes énoncés ci-dessus. Je suis à peu près sûr que vous aussi. Alors pourquoi me fendre d'un article, me direz-vous ?

Prenez une seconde pour les lire. Avez-vous sourcillé une seule seconde ? Je parie que non. Est-ce que ce n'est pas étrange, un manifeste aussi évident ? Est-ce que ça ne cache pas un petit malaise quelque part ?

Pour moi, c'est simple : si ce manifeste est si banal, c'est parce que nous savons tous qu'il énonce ce que devrait être le **développement** tout court, et que _l'artisanat_ n'a rien à faire là-dedans. Nous savons tous que si nous travaillons sans suivre ces principes, notre code ne vaut pas un clou.

Ce manifeste est un aveu d'échec : il prend acte de la situation médiocre de l'industrie, et invente un terme tout beau tout nouveau pour déplacer les bonnes pratiques dans un monde mythologique où les développeurs vivent en harmonie avec le client, les tests unitaires, le vaisseau de la Vierge Marie et le Christ Cosmique.

Qu'est ce qui peut bien amener une industrie à se voiler autant la face ? Ce n'est pas sur ce manifeste que j'ai envie de tirer, car je serai bien malhonnête de prétendre que je n'ai pas fantasmé moi-même sur ce terme d'_artisan développeur_. C'est plutôt sur ce qu'il dit de la situation.

{% figure
  "violoncelle.png",
  "La couverture du livre The Software Craftsman.",
  "Du calme les gens s'il-vous-plaît, ce n'est pas un logiciel c'est la volute d'un violoncelle, faut redescendre là."
%}

Intéressons-nous au premier point, qui stipule le niveau de qualité attendu :

{% blockquote
  "Pas seulement des logiciels opérationnels, mais aussi des logiciels bien conçus.",
  "",
  "Manifeste pour l'artisan logiciel",
  "http://manifesto.softwarecraftsmanship.org/#/fr-fr"
%}

Une recherche ~~approfondie~~ Wikipédia nous permet de préciser ce qui est ici entendu : clean code, refactoring, tests automatiques, domain driven developement... Beaucoup de choses que peu de développeurs avec un minimum d'expérience remettront en cause.

Par exemple, les tests, c'est bien. C'est doux. C'est soyeux, même. Si vous n'êtes pas d'accord, on peut en discuter, mais on ne va pas en discuter, parce que vous êtes d'accord, non ?

Maintenant, deux situations personnelles :

## Des fois, ça se passe bien

J'ai travaillé sur un projet de développement front de plus d'un an, donc nécessairement assez complexe, avec des règles métier dans tous les sens, 12 zillions d'interfaces... Mais un client au top, qui savait reconnaître l'investissement temporel (et donc financier) nécessaire à l'élaboration d'une telle structure.

Et ce n'est pas facile de trouver un client qui accepte pendant quelques mois, au début, de ne pas voir grand chose, parce qu'un tiers du temps est passé à mettre en place des fondations solides, un autre tiers à écrire des tests, et qu'il ne reste qu'un tiers pour faire émerger le produit « visible ».

Et donc des tests, j'en ai écrit des centaines. J'ai profité de ce contexte pour en faire une contrainte forte du projet. Pas un seul composant ne serait écrit sans être accompagné de sa batterie de test (il faut aussi savoir ne pas être dogmatique, en vertu de la [loi de Pareto](https://fr.wikipedia.org/wiki/Principe_de_Pareto), mais c'est une autre histoire).

J'ai quitté le projet il y a un an, et son développement suit son cours, avec plus de 2000 tests au compteur. Bien sûr je ne dis pas que les tests seuls font la qualité d'un projet, c'est un exemple. Mais dans ce cas précis, ils ont permis d'atteindre une vitesse de développement élevée une fois la mise en place effectuée, et surtout d'assurer la stabilité du produit.

Le projet n'a pas explosé quand je suis parti, même si j'ai fait quelques incantations sur le côté pour me rassurer, il est vrai. Il n'a rencontré, à ma connaissance, aucune régression majeure. Et les personnes qui l'ont repris ont le confort de savoir que, malgré l'ampleur du projet, si les tests passent, c'est qu'elles n'ont probablement rien cassé. Elles peuvent continuer à le faire évoluer dans les conditions les plus saines possibles.

{% figure
  "dieu.jpg",
  "Un homme levant ses bras vers le ciel.",
  "Cette image vient d'un site sur Dieu, mais pour moi Dieu et 2000 tests au vert c'est pareil, donc ça passe."
%}

## Des fois, ça se passe moins bien

J'ai travaillé sur un projet (comprendre : plusieurs projets) où les contraintes étaient telles que tout cela n'avait aucune chance d'émerger, alors que les règles métier n'étaient pas plus complexes. Où chaque deadline était remplacée par une autre, où tout ce qui ne contribuait pas à facturer le client au plus vite était vu comme un mal au mieux nécessaire, au pire dispensable.

Ce genre de situation où, vous le savez bien, les tests sont les premiers sacrifiés. Où mentionner la possibilité d'en écrire, bien que ce soit notre responsabilité professionnelle, semble blasphématoire, et nous poserait presque en ennemi du livrable, en ayatollah de la qualité, en fauteur de troubles.

On osera peut-être vous répondre que les tests seront écrits plus tard, ce qui doit convaincre principalement ceux qui n'en n'ont jamais écrit. On osera peut-être remplacer dans votre esprit le Père Noël par ce fameux « sprint de stabilisation », mais si, il existe j'en suis sûr, il faut juste être patient.

Bref, ces situations existent, pour mille raisons, et il faut alors s'accrocher à son slip, car tests ou pas (et encore une fois ce n'est qu'une mince partie des bonnes pratiques), un rendu de qualité est attendu. Et donc ces bonnes pratiques, on jongle rapidement avec.

Si j'ai vite compris que certains projets ne feraient pas de place aux tests, j'ai pour ma part fait « vœu » de ne rien lâcher vis-à-vis des <i>code review</i> approfondies, dernier rempart contre le <i>spaghetti code</i> à mes yeux. Chacun sa technique pour sauver la qualité du projet en situation extrême.

{% figure
  "code-review.png",
  "Strip : comment faire une bonne revue de code.",
  "Geek and Poke",
  "http://geek-and-poke.com/"
%}

## Spoiler alert

La première situation semble malheureusement bien rare. Et des projets frustrants qui ne me permettront pas d'appliquer ce que je sais sur les tests, le clean coding, la performance, l'accessibilité... Il y en aura bien d'autres.

Étais-je pour autant « artisan » développeur dans une situation, simple développeur dans l'autre ? Aurais-je dû être payé différement ? Étais-je _meilleur_ ? Je ne crois pas.

À lire mes [collègues](https://www.jesuisundev.com/pourquoi-les-developpeureuses-codent-avec-le-cul/), il semblerait que notre industrie ait le chic pour créer ces situations ubuesques, où la qualité est attendue côté résultat sans être considérée côté production. Alors forcément, il est tentant de fantasmer sur un monde meilleur, et ce n'est pas parce que j'attaque ce terme que j'attaque ceux qui l'ont inventé : j'ai bien l'impression qu'ils partagent mon sentiment.

{% figure
  "software-craftmanship.jpg",
  "Une imagerie soviétique de l'artisan développeur.",
  "Mais quand même, je vous avais dit que ça allait trop loin cette histoire."
%}

## Développeur, un noble terme ?

Mais non, je ne suis pas artisan développeur. Je suis développeur, et mon métier est de réaliser des applications dans des contextes parfois difficiles, mais sans jamais perdre de vue la qualité.

Et je pardonnerai les codes les plus sales à un développeur, car je connais les conditions qui le produisent, et peut-être même qu'un <code>git blame</code> révélera que j'en étais l'auteur, et que mon cerveau traumatisé aura effacé ce souvenir, par dignité.

Je pardonnerai moins le fatalisme, le jemenfoutisme, le relativisme, tous les trucs en « isme ».

{% blockquote "De toute façon, vu le projet…" %}

Non.

Le projet, il est peut-être réalisé dans des conditions apocalyptiques, mais c'est notre travail. C'est notre protégé, c'est ce PNJ qu'on doit amener en sécurité, même s'il se prend un coup de sniper toutes les 30 secondes, même si on a envie de lui tirer dessus nous-même.

Je ne suis pas fier de tous les projets que j'ai réalisés, mais je n'ai pas à rougir de l'effort que j'y ai mis, et des objectifs de qualité que j'ai toujours gardé près de moi (sauf une fois mais j'avais mal dormi).

Peut-être que l'industrie va mal – je n'en sais rien, j'ai peu de repères. Mais tant qu'il y aura des articles de blog, des discussions à la machine à café pour savoir quel est le meilleur design pattern qu'on n'utilisera jamais, des sondages Twitter pour connaître la meilleure convention de codage, des conversations à rallonge sur Github, bref, tant que cette industrie continuera à employer des gens qui veulent bien faire parce qu'ils aiment cela, il y aura de l'espoir.

Le slogan des artisans développeurs est <q>Élever le niveau</q>. Alors oui, élevons-le, tous ensemble, pour que le développement garde ses lettres de noblesse et reste, qu'il soit artisanal, industriel, rigolo, ennuyeux, innovant ou profondément inutile, synonyme de qualité.

**Amis développeurs, artisans ou non, unissez-vous !**
