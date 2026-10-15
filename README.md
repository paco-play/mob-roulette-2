# Mob Roulette v2

La roue du mob programming, tenue par un panda roux qui troll. Nuxt 4 + CSS, rien d'autre. Site 100 % statique, tout est stocké dans le `localStorage`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # génère .output/public (hébergement statique)
npm run typecheck
```

## Architecture : cerveau / composants bêtes

| Dossier | Rôle |
| --- | --- |
| `app/composables/` | Le cerveau. `useGame` assemble tout ; chaque fonctionnalité a son petit composable (`useRound`, `useWheel`, `useTeam`, `useGarden`, `usePanda`, `useStageEvents`…). |
| `app/components/` | Composants bêtes (props + events), rangés par thème. Seuls `stage/*` et `team/SidePanel` parlent au cerveau. |
| `app/data/` | Données pures : ~130 phrases du panda, avatars pixel art, couleurs, plantes. |
| `app/utils/` | Fonctions pures (digestion, géométrie, sprites, stockage). |
| `app/types/` | Types partagés. |

## Fonctionnalités

- **Roue** avec rotation (tout le monde passe avant de rejouer), élan avant le lancer, flou de vitesse, ampoules qui chassent, pointeur qui claque, puis rayons, bandeau « au clavier » et slice gagnante mise en avant. Espace pour lancer.
- **Digestion** : l'icône ⚠ (sur la roue et sur chaque membre en attente) donne le risque de passer entre déjeuner + 1 h et + 3 h. Il monte quand l'heure approche et que le nombre de personnes restantes diminue.
- **Équipe** : 34 avatars pixel art (22 humains, 12 animaux), 12 couleurs pâles, banc (les retirés restent sauvegardés), équipes nommées rechargeables en un clic.
- **Pomodoro** pour chaque tour (3 à 25 min).
- **Panda** en pixel art (sprite peint par calques dans `data/pandaSprite.ts`) qui parle (prédictions, trolls, réactions à la digestion et à certains prénoms), suit le curseur des yeux, s'endort si on l'oublie.
- **Événements** : chat qui fait tourner la roue (le panda la remet en place), collègue qui trébuche avec son café, aspirateur robot, avion en papier, pigeon. Cliquer sur la fenêtre en déclenche un.
- **Plantes** : 5 plantes qui poussent en ~5 semaines, seulement quand elles sont arrosées. Chaque tour de roue remplit le réservoir ; l'arrosage automatique s'en sert, ou on clique sur une plante.
- **Sons** : de petits bruitages synthétisés (aucun fichier audio), coupables d'un clic en haut à droite. Pas de musique.
- **Mobile** : version simplifiée (roue, panda, chrono, équipe).
- **Easter eggs** : à toi de chercher (indice : un code très classique, et un panda qui n'aime pas qu'on l'embête).

## Déploiement

Netlify : `netlify.toml` est déjà configuré (`.output/public`).
# mob-roulette-2
