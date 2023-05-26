---
title: "Paris Web 2022 — Jour 2, le récap !"
intro: Suite et fin de cette rétrospective, avec 8 autres conférences de grande qualité.
date: 2022-10-14
tags:
  - html
  - css
  - accessibilité
  - design
  - écosystème
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/paris-web-2022-jour-2-le-recap--47nj
series: Paris Web 2022
---

Suite et fin de mes aventures chez Paris Web, avec les 8 conférences du deuxième jour (et toujours des petites étoiles **subjectives** pour démarquer mes préférées).

Voir [le programme complet du jour 2](https://www.paris-web.fr/2022/07.php).

## 1. Bien doser l'utilisation d'ARIA pour éviter les catastrophes&nbsp;⭐⭐

Une première présentation donnée par deux personnes : une voyante et une non-voyante (utilisant pour la présentation une barette braille).

{% blockquote "Nous sommes collègues. Il nous arrive souvent de regarder le même site mais de ne pas voir la même chose." %}

<aside>Note : Les citations sont basées sur ma prise de notes. Elle reflètent le propos mais la formulation exacte peut varier.</aside>

Sophie et Bart définissent ARIA comme un moyen permettant de modifier l'<i>accessibility tree</i> (que vous pouvez voir dans le dev tools au même titre que le <i>DOM tree</i>).

Mais son utilisation est bien souvent maladroite : `aria-label` qui masque le contenu réel, `aria-live` sur un carrousel qui interrompt en permanence le flux normal de lecture...

Jusqu'au paroxysme : le site d'un hôpital belge dont le `body` possédait un attribut `aria-hidden`...

{% blockquote "Dans les audits, on demande plus souvent d'effacer de l'ARIA que d'en ajouter." %}

Et donc un énième rappel : ARIA complète les informations du HTML, mais c'est bien la bonne écriture de ce dernier à la base qui garantit la bonne accessibilité.

{% youtube "https://www.youtube.com/watch?v=gq_y9PDQgLw&t=697" %}

## 2. DesignGouv : insuffler une culture du design au sein de l'État&nbsp;⭐

L'occasion d'abord de découvrir le nouveau site présentant le [référentiel général d'amélioration de l'accessibilité](https://accessibilite.numerique.gouv.fr/), beaucoup plus sympathique que l'ancien.

Une autre ressource intéressante : [l'observatoire de la qualité des démarches en ligne](https://observatoire.numerique.gouv.fr/observatoire/).

Depuis 2021, l'équipe de DesignGouv est intervenu sur 112 projets, auprès de 14 ministères. Une belle performance dont on aurait aimé voir plus de détails concrets.

Et un rappel simple mais important :

{% blockquote "Plus on créé de nouveaux outils, plus il y en a à maintenir." %}

Un passage à noter lors des questions-réponses : le gouvernement recommande-t-il les outils de surcouche d'accessibilité (que certains spécialistes avait osé critiqué, avant d'être poursuivis par les éditeurs) ? La réponse est donnée : non. Applaudissements nourris.

{% youtube "https://www.youtube.com/watch?v=ym2sI8Jlu6A&t=4314" %}

## 3. Le making-of du RGESN : tout savoir sur le référentiel d’écoconception des services numériques&nbsp;⭐⭐

Une conférence très spécifique, non pas sur ce nouveau référentiel lui-même, mais sur les coulisses de sa conception.

Plus de cent bénévoles, des centaines de critères ramenés au nombre final de 79, pour une version 1 qui devrait sortir ce mois-ci (en voici la [version bêta](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/)).

Le format est très proche du RGAA (le référentiel pour l'accessibilité), et pour cause : les deux projets ont des intervenants communs.

La [loi visant à réduire l'empreinte du numérique en France de 2021](https://www.vie-publique.fr/loi/278056-loi-15-novembre2021-reen-reduire-empreinte-environnementale-du-numerique) n'impose pas encore le respect de ce nouveau référentiel. Il n'y a encore aucune obligation légale à ce sujet.

Et enfin, pour vous donner une idée, le nouveau site de l'ADEME (Agence de la transition écologique) respecte ce référentiel à 70%.

{% youtube "https://www.youtube.com/watch?v=gq_y9PDQgLw&t=7824" %}

## 4. Designer l'urgence&nbsp;⭐⭐⭐

{% blockquote "Designer dans l'urgence en mode pompier VS designer l'urgence <em>avec</em> des pompiers." %}

Une conférence drôle et passionnante pour répondre à une question très sérieuse : comment aborder le design lorsque des vies sont en jeu ?

Pour reprendre en main le système d'information des pompiers, Julien s'est immergé dans le métier, et après son témoignage, vous ne pourrez plus dire que la recherche UX est trop difficile à mettre en œuvre dans votre secteur.

Le monde de l'urgence est fait de contraintes physiques et mentales imprédictibles. Sous le choc d'un accident, même une interface applicative d'apparence simple (« êtes-vous témoin ou victime ? ») n'a plus rien d'évident.

L'occasion également de tordre le cou au mythe du « produit minimum viable » (MVP). Une méthode excellente dans nombre de cas, mais tout simplement inapplicable lors de la refonte d'un service aussi critique : quand on sauve des vies, on ne peut pas commencer par la « version simple ».

{% blockquote "Move fast and don't break things." %}
{% youtube "https://www.youtube.com/watch?v=gq_y9PDQgLw&t=10167" %}

## 5. Comment Canal+ travaille et intègre l’accessibilité numérique ?&nbsp;⭐

Depuis un an, Amélien a eu la délicate tâche de sensibiliser les équipes de Canal+ aux enjeux et aux techniques de l'accessibilité.

Les améliorations sont là, mais on ne peut s'empêcher de constater que même dans une si grosse entreprise, les bases ne sont pas acquises : comment peut-on encore être en charge de l'intégration d'un service massivement utilisé tel que myCanal sans se soucier des problèmes de focus, une des bases de l'accessibilité ? Le chemin est long et le recrutement (et donc les formations) doivent évoluer.

Enfin, je suis interpellé par ce rôle étrange chez Canal+ : <i>Legal Product Manager</i>, en charge de la vie privée, l'accessibilité et l'éco-conception. Une si grosse entreprise pense-t-elle que ces trois domaines, qui n'ont de commun que l'obligation légale et/ou l'image de l'entreprise, ne mérite pas au moins 3 emplois distincts ?

Force et courage à Amélien, donc ;)

{% youtube "https://www.youtube.com/watch?v=gq_y9PDQgLw&t=17964" %}

## 6. Numérique et éthique : l'impossible équation&nbsp;?&nbsp;⭐⭐

Même si Audrey et Agnès avouent prêcher un public déjà convaincu (« c'est la première fois qu'on m'applaudit parce que je critique Amazon »), le sinistre tour d'horizon offert ici est nécessaire et percutant.

200 composants, 50 minerais et 75 kilos de matière première pour produire un téléphone (la production représente 75% des émissions), téléphone dont la durée de vie atteindra en moyenne 2 ou 3 ans et ne sera probablement pas recyclé... Sans parler du travail des enfants.

Et ce n'est que la partie production : saviez-vous que même si vous n'avez pas de profil Facebook, vous possédez malgré tout un <i>shadow account</i> ? Que des drônes étaient capables de suivre des manifestants jusqu'à leur domicile, en France ? Que Facebook, encore lui, a joué un rôle déterminant dans le génocide des Rohingya ? Et la liste semble sans fin.

L'invervention se clôture avec quelques conseils élémentaires : gardez votre téléphone (au moins 7 ans, idéalement). Utilisez le nouvel [indice de réparabilité](https://www.ecologie.gouv.fr/indice-reparabilite) lors d'un achat. Réparez, et, si vraiment vous devez vous séparer de votre appareil encore en fonctionnement, ne le laissez pas traîner dans un tiroir : vendez ou donnez-le.

{% youtube "https://www.youtube.com/watch?v=gq_y9PDQgLw&t=20357" %}

## 7. Thémiser un design system&nbsp;⭐

Nous atteignons la fin d'après-midi de ce deuxième jour et je ne vous cache pas que mon cerveau commence à se transformer en compote. 16 conférences, c'est beaucoup.

En écoutant Matthieu, développeur responsable du design system des outils Proton (Mail, Drive...), je réalise à quel point mon propre travail (puisque je fais la même chose, à plus petite échelle) est difficile à expliquer <em>techniquement</em>.

Car oui, les variables CSS sont géniales, mais quand on rajoute à cela des valeurs par défaut, des valeurs optionnelles, des valeurs configurables par les utilisateurs... Ça devient complexe !

Matthieu a ainsi théorisé un modèle pour les noms de variables :

```
--usage-location-state-impact-property
```

Une idée m'a particulièrement parlé : un design system est une « rationalisation » du design, et devient ainsi un outil objectif pour challenger toute nouvelle modification des designers ou managers. Pas pour stagner, mais pour assurer au projet de ne pas partir dans tous les sens, ce qui est essentiel à cette échelle.

{% youtube "https://www.youtube.com/watch?v=ym2sI8Jlu6A&t=25385" %}

## 8. URL ; reprenons les bases&nbsp;⭐⭐

Là, il n'y a plus personne dans ma boîte crânienne, ou plutôt il y a trop de choses, mais cette dernière conférence va fournir son lot d'informations passionnantes.

Même si vous connaissez les 5 parties d'une URL, les subtitilités d'écriture de chacune d'entre elles réservent des surprises.

Quels sont les pièges tendus aux utilisateurs grâce aux homoglyphes ? Pourquoi Chrome devrait gentiment s'abstenir de modifier les URLs affichées ? Qu'est ce que le test du bouton du milieu de la souris ?

On réfléchit rarement aux URLs, qu'on prend pour acquises, mais elles constituent la base du web et on a tendance à minimiser leurs capacités.

{% youtube "https://www.youtube.com/watch?v=gq_y9PDQgLw&t=28739" %}

## 8 bonnes raisons de venir à Paris Web 2023

- Les conférences (une trentaine !) sont de top qualité, j'ai appris beaucoup.
- Le choix des conférences par les équipes est savamment équilibré entre design, accessibilité et technique pour vous tenir en haleine.
- Les orateurs et oratrices viennent de tout horizon, vous n'entendrez pas 10 patrons de start-ups à la suite.
- Une accessibilité remarquable, en cohérence avec le contenu : traduction LSF, vélotypie, traduction de l'anglais vers le français... Et cela a effectivement permis à de nombreuses personnes en situation de handicap d'être présentes.
- Le prix est plutôt accessible pour un événement de ce type (surtout si vous demandez à votre boîte de participer).
- Pardonnez-moi d'être terre à terre, mais l'on y mange très bien, même en tant que végétarien, et ce n'est pas négligeable pour mobiliser toute cette concentration.
- Vous serez en immersion parmi tout un tas de gens qui veulent bien faire comme vous, et ça fait du bien.
- On pourra se dire bonjour :)

À l'année prochaine !