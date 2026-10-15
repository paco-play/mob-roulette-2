/**
 * Everything the red panda can say. Templates may use {name}, {pct}, {minutes}.
 * Kept as plain data so adding a joke never touches logic. The tone is dry and deadpan: short lines, no forced puns.
 */
export type QuoteTopic =
  | 'welcome'
  | 'spinStart'
  | 'prediction'
  | 'predictionHit'
  | 'predictionMiss'
  | 'picked'
  | 'pickedDigestion'
  | 'idle'
  | 'poke'
  | 'pokeAngry'
  | 'pokeHR'
  | 'timerStart'
  | 'timerDone'
  | 'breakStart'
  | 'breakDone'
  | 'memberAdded'
  | 'memberBenched'
  | 'teamLoaded'
  | 'wateredThanks'
  | 'wateredThirsty'
  | 'catSpin'
  | 'catReset'
  | 'tripWatch'
  | 'tripAfter'
  | 'roomba'
  | 'plane'
  | 'pigeon'
  | 'disco'
  | 'sleepy'
  | 'wake'
  | 'friday'
  | 'lonely'
  | 'newRound'
  | 'logo'

export const QUOTES: Record<QuoteTopic, readonly string[]> = {
  welcome: [
    'Bonjour. La roue est prête, vous beaucoup moins.',
    'On commence ? Je ne juge personne. Enfin, pas à voix haute.',
    'Tout le monde est là ? Non ? Tant mieux, ça fait moins de monde à départager.',
    'Café pris, bambou pris. Je suis opérationnel.',
    'Nouvelle journée, mêmes tickets.',
  ],
  spinStart: [
    'On ne triche pas sur son pomodoro.',
    'Je précise que je ne touche pas à la roue.',
    'Chut. La roue réfléchit.',
    'Personne n’a rien préparé, évidemment.',
    'C’est parti. Les mains loin du clavier, tout le monde.',
    'Je rappelle que tout ceci est parfaitement aléatoire.',
    'Allez, un petit tour. Pas de pression.',
    'Ceux qui ouvrent Slack maintenant, je les vois.',
  ],
  prediction: [
    'Je sens que ça va tomber sur {name}.',
    'Mon pari : {name}. Je ne dis pas que je sais, je dis que je parie.',
    'Je suis sûr que le prochain sera {name}.',
    'Si ça tombe sur {name}, vous n’aurez rien vu.',
    'Mon petit doigt dit {name}.',
  ],
  predictionHit: ['Je l’avais dit.', 'Évidemment. Je vais finir par demander une prime.', 'Trop facile.'],
  predictionMiss: [
    'Je disais ça pour la forme.',
    'Ça s’appelle une feinte.',
    'La roue n’a pas lu mes notes.',
    'J’avais prévu ça, en fait. Je me suis trompé exprès.',
  ],
  picked: [
    '{name}, c’est à toi.',
    '{name} au clavier. Les autres, vous relisez.',
    'Voilà : {name}. Pas de panique, c’est juste du code.',
    'Pas de mise à jour de Mac prévue aujourd’hui, {name}. Enfin j’espère.',
    '{name}, si ça compile du premier coup, je démissionne.',
    '{name}, on t’écoute. Et on te regarde taper.',
    'Ça tombe sur {name}. Je n’y suis pour rien.',
    '{name} : {minutes} minutes. On ne lance pas de refacto à 3 minutes de la fin.',
    '{name}, pense à agrandir la police. Les navigateurs te remercient.',
    'Ah, {name}. Surprenant. Enfin non.',
    'Que {name} tape, que les autres réfléchissent. C’est le principe.',
    '{name}, rappel : copier-coller n’est pas une architecture.',
    '{name} a la main. Le build est avec lui.',
    '{name}, ne push pas sur main. Je dis ça, je dis rien.',
    '{name} : ton heure de gloire dure {minutes} minutes. Profites-en.',
    'Hop, {name}. Respire, tout est sous contrôle. Ou presque.',
    '{name} prend le clavier. Les autres, rangez vos téléphones.',
    'Le sort a choisi {name}. Les tests décideront du reste.',
  ],
  // Said when the turn being drawn lands on the sleepy moment after lunch
  pickedDigestion: [
    'Ah voilà, la digestion.',
    '{name}. Évidemment que c’est toi, il est l’heure de la sieste.',
    'La digestion a trouvé sa victime : {name}.',
    '{name}, garde les yeux ouverts. On compte sur toi.',
    'Le créneau sieste tombe sur {name}. Le sort est cruel.',
    '{name}, il y avait un dessert, hein.',
    'Heure creuse, {name}. Même moi je lutte.',
  ],
  idle: [
    'Un standup qui dépasse quinze minutes n’est plus un standup.',
    'Je regarde votre dernier commit. Je ne dis rien.',
    'Pensez à boire de l’eau. Les plantes aussi, d’ailleurs.',
    'Si ça marche, ne touchez à rien.',
    'Quelqu’un a vu mon bambou ? Non, c’est une vraie question.',
    'La dette technique, c’est comme le reste : ça s’accumule quand on ne regarde pas.',
    'Je ne dors pas. Je réfléchis les yeux fermés.',
    'Pas de mise en prod le vendredi. C’est dit.',
    'Le mob, c’est de la réunion avec du code dedans.',
    'Si le build est rouge depuis ce matin, c’est peut-être un signe.',
    'Le café refroidit toujours quand on le regarde.',
    'Il existe deux types de devs : ceux qui sauvegardent, et ceux qui vont apprendre.',
    'Un bon message de commit est plus rare qu’un bon café de bureau.',
    'Petite pensée pour celui qui a écrit ce TODO en 2019.',
    'Un jour je réécrirai tout. Mais pas aujourd’hui.',
    'Quelqu’un devrait vraiment documenter ça. Pas moi, je suis un panda.',
    'Les pandas roux ne sont pas des pandas géants. Merci de ne pas confondre.',
    'Je suis arrivé avant vous. Les plantes peuvent témoigner.',
    'Rappel : les tests ne s’écrivent pas tout seuls.',
    'On a deux sprints de retard et cinq plantes en avance.',
    'Il y a toujours un git reflog. Toujours. Respirez.',
    'La meilleure idée de la journée arrive à 17 h 58.',
    'Je parie que quelqu’un a oublié de sauvegarder.',
    'Les microservices, c’est comme les chats : on en prend un, et soudain il y en a douze.',
    'Si vous lisez ceci, c’est que le build est long.',
    'Ce silence, c’est de la concentration ou du Slack ?',
    'N’oubliez pas de lever les yeux de l’écran. Moi, je vous regarde.',
    'Quand je serai grand, je ferai de la revue de code.',
  ],
  poke: [
    'Oui ?',
    'Je suis en réunion. Avec moi-même.',
    'Ça chatouille. Ne le répétez pas.',
    'Je n’ai pas de bouton, cherchez ailleurs.',
    'J’ai l’air disponible ?',
    'Hé.',
    'Si vous cherchez la roue, elle est juste là.',
  ],
  pokeAngry: ['Ça suffit. J’ai des plantes à arroser.', 'Je compte les clics. Pour le rapport.', 'Dernier avertissement.', 'Vous avez fini ?'],
  pokeHR: ['Vingt clics. J’appelle les RH.', 'C’est noté dans mon rapport hebdomadaire.', 'Je rédige un post-mortem sur cet incident.'],
  timerStart: ['Chrono lancé. Concentrez-vous, ou faites semblant.', '{minutes} minutes. Les messages attendront.', 'C’est parti. Je surveille, discrètement.'],
  timerDone: [
    'Temps écoulé. On passe le clavier, poliment.',
    'Fin du tour. Commitez, même si c’est moche.',
    'C’est fini. Lâchez le clavier. Voilà.',
    'Pomodoro terminé. Pas de rab, sauf si le build est cassé.',
    'Stop. Une gorgée d’eau, et on relance la roue.',
  ],
  breakStart: [
    'Pause. Levez-vous, vraiment.',
    'Tour terminé. Un verre d’eau, quelques minutes, et on reprend.',
    'Pause. On ne regarde pas le build pendant la pause.',
  ],
  breakDone: ['Pause terminée. On relance la roue ?', 'Fin de la pause. Le clavier vous attend.', 'On reprend. Doucement.'],
  memberAdded: [
    '{name} rejoint le mob. Je présenterai les plantes plus tard.',
    'Bienvenue {name}. La roue a pris note.',
    '{name} est dans le jeu. Il ou elle ne sait pas encore dans quoi.',
    'Un de plus : {name}. Les chances de tomber dessus ont baissé pour les autres.',
  ],
  memberBenched: [
    '{name} passe sur le banc. Je garde sa place au chaud.',
    '{name} sort du jeu. Il reste sauvegardé, ne vous inquiétez pas.',
    'À tout à l’heure, {name}.',
  ],
  teamLoaded: ['Équipe chargée. Tout le monde à son poste, ou presque.', 'La bande est de retour.', 'Voilà, tout le monde est là. On peut commencer.'],
  wateredThanks: [
    'Merci. Elle grandira dans un mois. Peut-être.',
    'Arrosée. Ça pousse doucement, mais ça pousse.',
    'Les plantes, elles au moins, ne se plaignent pas.',
    'Une plante arrosée ne juge personne.',
  ],
  wateredThirsty: [
    'Une plante avait soif. Le système d’arrosage s’en est chargé.',
    'Arrosage automatique. Je n’y suis pour rien, mais je prends le crédit.',
    'Elle avait l’air d’avoir soif. Ça va mieux.',
  ],
  catSpin: ['Hein ? La roue !', 'Non non non. Qui a laissé entrer le chat ?', 'Le chat. Encore.'],
  catReset: [
    'On remet la roue en place. Personne n’a rien vu.',
    'Tour annulé. Le chat n’a aucune légitimité démocratique.',
    'Voilà. Comme si de rien n’était.',
  ],
  tripWatch: ['Oh non, pas lui…', 'Mon collègue arrive. Il porte un café. Je le sens mal.', 'Ne bougez pas, ça va aller très vite.'],
  tripAfter: [
    'Il va bien. Le café, moins.',
    'Troisième fois ce mois-ci.',
    'Je n’ai rien vu. Pour la fiche d’incident, j’étais ailleurs.',
    'Le sol était pourtant plat.',
  ],
  roomba: ['Le robot aspirateur fait sa ronde. Levez les pieds.', 'Le collègue le plus productif de l’étage.', 'Il passe plus de temps par terre que moi.'],
  plane: ['Un avion en papier. Quelqu’un s’ennuie en réunion.', 'Ce sont sûrement les specs finales.', 'Il vole mieux que mon dernier prototype.'],
  pigeon: ['Un pigeon. Il vient sûrement pour la revue de code.', 'Il vient prendre des nouvelles du sprint.', 'On ne le dérange pas, il est de la maison.'],
  disco: ['Mode disco. Je ne sais pas qui a trouvé le bouton.', 'On ne m’avait pas dit qu’il y aurait soirée.', 'Bon. Cinq minutes, pas plus.'],
  sleepy: ['Zzz…', 'Pause. J’ai besoin de fermer les yeux, rien de plus.', 'Réveillez-moi si la roue tourne.'],
  wake: ['Je ne dormais pas.', 'Je méditais. Reprise.', 'Hm ? Oui, j’écoutais.'],
  friday: ['Vendredi. Pas de mise en prod, c’est écrit quelque part.', 'Dernier jour de la semaine : on ne casse rien.', 'C’est vendredi. Je dis ça, je dis rien.'],
  lonely: [
    'Personne ? Ajoutez des gens à droite, la roue s’ennuie.',
    'Une roue sans équipe, c’est juste un grand cercle.',
    'Il me faut au moins un développeur. Un seul, ça ira.',
  ],
  newRound: ['Tout le monde est passé. On repart pour un tour.', 'Fin du tour de table. On recommence, pas de jaloux.', 'Nouvelle manche. Reprenez des forces.'],
  logo: ['Oui, c’est bien le logo. Il tourne tout seul.', 'Il adore qu’on le touche. Pas moi.', 'Roulette, mob. On a compris le concept.'],
}

/** Names that make the panda raise an eyebrow. Lowercase, matched as substrings. */
export const NAME_EASTER_EGGS: ReadonlyArray<readonly [string, string]> = [
  ['claude', 'Un LLM dans le mob ? Lui, au moins, ne réclame pas de pause café.'],
  ['panda', 'Un autre panda ? Il va falloir partager les bambous.'],
  ['kevin', 'Kevin. Je dis simplement : Kevin.'],
  ['gpt', 'Je ne parle pas aux concurrents. Mais bienvenue.'],
  ['bug', 'Un bug dans l’équipe ? C’est de l’auto-dérision, j’adore.'],
  ['stagiaire', 'Le stagiaire ! Ne lui confiez pas les clés de la prod.'],
  ['boss', 'Le chef passe au clavier ? Fais comme si on ne le voyait pas.'],
]
