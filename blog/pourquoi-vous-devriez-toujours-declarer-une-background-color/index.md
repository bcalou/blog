---
title: "Pourquoi vous devriez toujours déclarer une background-color"
slug: pourquoi-vous-devriez-toujours-declarer-une-background-color
description: Le fond d'un site par défaut n'est pas blanc mais transparent, et cela peut impacter le rendu de la page dans certains contextes.
date: 2020-06-03
tags:
  - CSS
  - Accessibilité
layout: layouts/post.njk
originalPost: https://dev.to/bcalou/why-you-should-always-set-a-background-color-2gb1
series: Aventures CSS au pays du canvas
---

Raphael Schweikert a commenté le premier article de cette série avec quelques points particulièrement intéressants :

{% blockquote
  "Je me souviens des années 1990 où la plupart des navigateurs avaient une couleur de fond grise. Internet Explorer était le seul à avoir un fond blanc par défaut. Les autres ont suivi.",
  "Raphael Schweikert",
  "Commentaire sur l'article « Quelle est la couleur d'une page blanche ? »",
  "https://dev.to/sabberworm/comment/pgbd"
%}

{% figure
  "netscape.png",
  "Le navigateur Netscape et son fond gris.",
  "Même si comme moi vous n'avez pas connu cette époque, vous avez probablement déjà croisé ces aperçus grisâtres du passé."
%}

Internet Explorer a donc pris une décision fondatrice pour le web tel que nous le connaissons aujourd'hui : le blanc.

## Et aujourd'hui ?

Raphael a aussi expliqué que cette couleur pouvait être modifiée. Dans Firefox, c'est simple :

<ol>
  <li>ouvrez la page <code>about:config</code> ;</li>
  <li>cherchez le paramètre <code>browser.display.<wbr>background_color</code> ;</li>
  <li>la valeur par défaut est <code>#ffffff</code>. Changez-la !</li>
</ol>

Ce n'est pas une option secrète de développeur : toutes les options mentionnées dans cet article peuvent être configurée par n'importe qui, en utilisant [une interface plus sympathique](https://support.mozilla.org/en-US/kb/change-fonts-and-colors-websites-use).

{% figure
  "panel.png",
  "Une série de paramètres pour changer la couleur du texte et de l'arrière-plan du navigateur.",
  "Le panneau de configuration des couleurs sous Firefox."
%}

Tous les navigateurs ne gèrent pas cela de la même façon : Chrome, par exemple, vous encourage à utiliser des [extensions et des thèmes](https://support.google.com/chrome/answer/7040464?hl=en). Dans tous les cas, voici l'idée : l'utilisateur n'aura pas nécessairement un arrière-plan de navigateur blanc. Comme toujours, nos présuppositions sont nos ennemies. Nous ne savons rien.

## Que se passe-t-il lorsque l'arrière-plan du navigateur n'est pas blanc ?

Imaginons que je sois fan des modes sombres et que je définisse la couleur de l'arrière-plan de mon navigateur en utilisant la valeur `#000000`.

Le premier effet, c'est que lorsque rien n'est montré, car je suis en train de passer d'un site vers un autre en cours de chargement, mon écran est noir.

{% video
  "switch.webm",
  "Le passage d'un site à un autre. Pendant le temps de chargement du second site, l'écran est noir."
%}

Un utilisateur de Reddit a expliqué cette astuce dans un post intitulé « [Comment ne pas être aveuglé à l'ouverture d'un nouveau site ?](https://www.reddit.com/r/firefox/comments/e89nmg/how_to_not_get_blinded_by_white_light_when/) » C'est en effet une amélioration immédiate, mais l'histoire n'est pas si simple.

Un autre post dont j'adore le titre complète le tableau : « [J'ai changé l'arrière-plan pour du noir. Je ne vois plus rien.](https://support.mozilla.org/en-US/questions/1229066) »

Oups ! En utilisant du noir pour la couleur d'arrière-plan, cet utilisateur a rendu le web... invisible.

{% img
  "invisible.jpg",
  "Un ordinateur dont l'écran est complètement invisible, laissant apparaître le mur derrière lui."
%}

Rappelons-nous de ce qu'explique le W3C :

{% blockquote
  "Si l'arrière-plan du canvas n'est pas opaque, ce qui est visible en dessous dépendra de l'agent utilisateur.",
  "W3C",
  "The Canvas Background and the HTML &lt;body&gt; Element",
  "https://www.w3.org/TR/css-backgrounds-3/#body-background"
%}

Cela signifie que si vous ne donnez pas de couleur d'arrière-plan à votre page (couleur qui remplira le canvas), le fond du navigateur sera visible.

{% figure
  "schema.png",
  "Les quatres couches du navigateur : body, html, canvas et fond du navigateur.",
  "Il est possible de voir le fond du navigateur si le canvas est transparent à cause de l'absence d'une couleur de fond sur la page."
%}

Bien qu'une majorité de site déclare explicitement une couleur de fond blanche, ce n'est pas toujours le cas, et c'est ainsi que le web peut devenir invisible.

Voici ce à quoi TechCrunch ressemble avec le fond de mon navigateur en noir :

{% img
  "black.jpeg",
  "Le site de TechCrunch avec un arrière-plan noir. Le texte, noir également, est invisible."
%}

Le correctif est très simple :

```css
body {
  background-color: white;
}
```

{% img
  "white.jpeg",
  "Le site de TechCrunch avec un arrière-plan blanc. Le texte noir est bien visible."
%}

Et voici donc un conseil de Raphael :

{% blockquote
  "J'ai donné à mon navigateur une couleur d'arrière-plan grise pour vérifier si je n'ai pas accidentellement oublié de déclarer <code>background: white</code> sur une page qui devrait avoir un fond blanc.",
  "Raphael Schweikert",
  "Commentaire sur l'article « Quelle est la couleur d'une page blanche ? »",
  "https://dev.to/sabberworm/comment/pgbd"
%}

Cela semble être une très bonne astuce et m'a donné envie d'écrire ce nouvel article.
Le désavantage est que vous verrez un fond gris sur TechChrunch et les autres « sites transparents » (sauf si vous utilisez un environnement différent pour le développement et la navigation classique, bien sûr).

## Y a-t-il beaucoup de sites transparents ?

Bien que cela ne soit pas représentatif du « web », j'ai testé les 100 sites les plus visités, et **14% d'entre eux ont un canvas transparent**, laissant apparaître la couleur de fond jaune que j'ai utilisée pour mener mon enquête.

{% figure
  "yellow.png",
  "Le site de l'organisation mondiale de la santé avec un fond jaune.",
  "Une couleur de fond pas si bonne que ça pour la santé."
%}

Parmi eux : le Wall Street Journal, Paypal, Vimeo, AOL, la BBC...

Cela fait quelques jours que je garde cet horrible fond jaune comme arrière-plan et ce chiffre de 14% me semble cohérent avec ma navigation quotidienne. Je peux vous assurer que lire du texte sur ce fond est une excellente motivation pour terminer cet article.

## Et l'utilisateur, alors ?

Vous pensez peut-être :

{% blockquote
  "Si l'utilisateur décide d'avoir du noir en tant que couleur d'arrière-plan, peut-être a t-il ses raisons et peut-être ne faut-il pas interférer ?"
%}

C'est compliqué. Qui peut bien changer ce fond blanc « universel » ?

Cela pourrait être l'utilisateur. Cela pourrait être l'agent utilisateur lui-même (qui pourrait être un ordinateur, un téléphone, mais aussi [tout un tas d'autres choses](https://deviceatlas.com/blog/which-devices-have-browsers)).

Il est peut-être impossible d'avoir des statistiques à ce propos, mais nous pouvons être sûr d'une chose : une fraction indeterminée d'utilisateurs n'aura _pas_ un fond blanc. Et un site transparent ne s'affichera pas correctement.

Sauf si l'utilisateur ou le navigateur change également la couleur par défaut du texte. Dans Firefox, c'est simple : il faut changer le paramètre `browser.display.foreground_color`.

Tous les textes dont la couleur n'est pas spécifiée en CSS utiliseront cette valeur. Retournons sur TechCrunch :

{% img
  "middle.jpeg",
  "Le site de TechCrunch avec un arrière-plan noir. Une partie du texte est en blanc et donc lisible, mais une grande partie est toujours en noir et illisible."
%}

Ce n'est pas génial. Oui, une partie du texte est désormais affichée en blanc. Mais il ne s'agit que du texte dont la couleur n'a pas été spécifiée en CSS. Et comme il est courant pour le texte d'avoir une couleur légèrement différente du noir, il y a toujours une grande partie du contenu qui ne peut être lue.

Pour que cela fonctionne, il faudrait un site **sans couleur de fond ni couleur de texte explicite**.

{% figure
  "motherfucking.png",
  "Un site présentant un texte simple, blanc sur noir et lisible.",
  "Il n'y a pas de CSS sur <a href=\"http://motherfuckingwebsite.com/\">motherfuckingwebsite.com</a>, cela fonctionne donc très bien."
%}

Notez que vous pouvez également définir la couleur des liens, du texte recevant le focus, etc... Mais la même règle s'applique : cela ne fonctionnera que si aucun CSS ne s'applique, ce qui est improbable sur la plupart des sites. Un clash de couleur est inévitable.

Nous avons donc deux solutions :

- ne rien spécifier et avoir un design extrêmement simple qui s'adaptera aux couleurs définies par le navigateur ;
- spécifier une couleur de fond **et** une couleur de texte.

C'est pourquoi vous pourriez vouloir ajouter les lignes suivantes à votre kit de base :

```css
body {
  background-color: white;
  color: black;
}
```

Cela me semble rentrer dans la catégorie des situations « très spécifiques mais si simples à résoudre qu'il serait bien dommage de ne pas le faire ». On ne sait jamais sur quelle étrange combinaison de caractéristiques navigateur notre site va tomber.

## Alors quel est l'intérêt de changer les couleurs du navigateur ?

Je suis un grand partisan du fait de respecter les choix de l'utilisateur (ou de son navigateur). Le CSS que nous écrivons ne devrait pas être une série d'ordres impératifs pour générer une page au pixel près, mais un ensemble d'indications que le navigateur peut utiliser, entre autres choses, pour savoir à quoi doit ressembler le résultat.

D'un autre côté, il me semble avoir établi qu'il est plus sûr de « forcer » la couleur de l'arrière-plan et du texte d'un site, sans quoi il pourrait rapidement devenir illisible.

Heureusement, les deux approches peuvent être réconciliées, car nos navigateurs sont malins. Et c'est le dernier paramètre que je souhaite aborder : `browser.display.document_color_use`.

Quand ce paramètre vaut `2`, Firefox supplantera **toutes les couleurs CSS** et utilisera celles définies par l'utilisateur ou Firefox lui-même. En d'autres termes :

{% blockquote "Je me fiche de ton CSS, utilise ces couleurs !" %}

Essayons à nouveau ce mode sombre improvisé en donnant à Firefox un arrière-plan noir et des textes blancs. Cette fois, le CSS ne pourra pas écraser nos choix, grâce au paramètre `document_color_use`.

{% img
  "success.jpeg",
  "Le site de TechCrunch avec un arrière-plan noir et un texte clair, bien lisible."
%}

Cela fonctionne enfin ! J'ai même changé la couleur des liens pour utiliser quelque chose qui me convient mieux. Le CSS n'a pas changé, mais Firefox l'a supplanté.

Maintenant que le navigateur ne peut qu'utiliser l'ensemble de couleurs que nous avons défini, il est plus probable que les sites s'affichent de façon convenable.

J'ai testé les 14 sites transparents du top 100, et chacun d'entre-eux s'affichait correctement. J'estime qu'environ 95% du contenu présentait une très bonne lisibilité avec mes couleurs customisées. Mais bien sûr, cela n'est pas parfait.

{% figure
  "vimeo.png",
  "La page d'accueil de Vimeo. La plupart des contenus sont lisibles, blanc sur noir.",
  "La page d'accueil de Vimeo présente une bonne lisibilité... Avec des exceptions notables pour le logo et les liens en haut à droite."
%}

Notez que lorsque vous utilisez le paramètre `document_color_use`, tous les sites sont impactés, pas seulement les transparents.

{% figure
  "devto.jpeg",
  "Le site dev.to avec un fond noir et un texte clair.",
  "Le site dev.to a une couleur d'arrière-plan, qui est supplantée par mes paramètres Firefox."
%}

Cela ne remplacera pas un mode sombre intégré (et dev.to en possède un), mais la plupart du temps le résultat est correct.

De manière plus générale, cette option est également très intéressante pour l'accessibilité. Voici TechCrunch avec le paramètre `document_color_use` activé et les couleurs par défaut de Firefox :

{% img
  "default.png",
  "La page d'accueil de TechChrunch. Les liens sont bleus (couleur par défaut de Firefox) et ressortent très bien."
%}

Wow, ça fait beaucoup de liens. Presque tout le texte se trouve dans une balise `<a>`, d'où la couleur bleue. Scrollons un peu et comparons l'original avec ce que nous avons désormais :

{% figure
  "comparison.png",
  "Le schéma de couleurs par défaut de Firefox force les textes à s'afficher en noir plus lisible que le gris original, et les liens en bleu, ce qui permet de les différencier du texte.",
  "En haut : l'affichage par défaut. En bas : les couleurs par défaut de Firefox."
%}

Quand les couleurs par défaut de Firefox sont imposées, on voit du pur noir pour le texte (au lieu du gris léger du design original) et du bleu pour les liens. C'est un peu brutal mais excellent pour l'accessibilité.

En fait, c'est ce que fait automatiquement Windows si vous activez le mode « contraste élevé » du système d'exploitation. Aucune manipulation sur le navigateur n'est nécessaire.

Ceci étant dit, **cela ne peut pas remplacer un design pensé pour l'accessibilité**. On pourrait dire que c'est _parce que_ le web n'est pas très accessible que de telles options sont nécessaires.

## Montrez toujours votre vraie couleur

Voici donc ce que nous avons appris :

- toujours spécifier une couleur de fond et une couleur de texte sur les pages car les « valeurs universelles » n'existent pas ;
- si un utilisateur ou un appareil a besoin de les supplanter, ils le peuvent et c'est très bien !

Quant à moi, je jure que je ne regarderai plus le moindre pixel blanc de la même façon.
