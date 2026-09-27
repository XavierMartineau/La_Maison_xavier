# La Maison

Jeu d'exploration narratif en HTML, CSS et JavaScript. Le joueur est enferme dans une maison abandonnee et doit observer les indices, faire les bons choix et trouver la cle de sortie.

Le projet est disponible en francais et en anglais. Il fonctionne entierement dans le navigateur et ne necessite aucun serveur backend.

## Sommaire

- [Fonctionnalites](#fonctionnalites)
- [Lancer le projet](#lancer-le-projet)
- [Jouer](#jouer)
- [Architecture](#architecture)
- [Fonctionnement du moteur](#fonctionnement-du-moteur)
- [Ajouter ou modifier une scene](#ajouter-ou-modifier-une-scene)
- [Modifier les traductions](#modifier-les-traductions)
- [Sauvegarde et donnees locales](#sauvegarde-et-donnees-locales)
- [Validation](#validation)
- [Compatibilite et limites](#compatibilite-et-limites)
- [Historique du projet](#historique-du-projet)

## Fonctionnalites

- Exploration narrative a embranchements
- Parcours principal gere par une page de scene unique
- Choix conditionnels selon les objets possedes
- Inventaire local avec bandages et cle de sortie
- Sauvegarde automatique dans le navigateur
- Reprise de la derniere partie
- Nouvelle partie avec remise a zero de la sauvegarde
- Progression des scenes visitees
- Fin normale et fin alternative
- Interface francaise et anglaise
- Images d'ambiance pour chaque scene
- Navigation utilisable au clavier
- Mise en page responsive pour ordinateur et mobile
- Prise en compte de `prefers-reduced-motion`

## Lancer le projet

### Option recommandee : serveur local

Le jeu charge le fichier de traduction avec `fetch`. Un serveur local est donc recommande pour eviter les restrictions du navigateur sur les fichiers `file://`.

Avec Python installe :

```powershell
py -m http.server 8000 --directory docs
```

Puis ouvrir :

```text
http://localhost:8000/
```

Avec l'extension **Live Server** de VS Code, ouvrir `docs/index.html` avec **Open with Live Server**.

### Ouvrir directement le fichier

Il est possible d'ouvrir `docs/index.html` directement, mais le chargement des traductions peut etre bloque par les regles de securite du navigateur. Le serveur local reste preferable.

## Jouer

1. Ouvrir `docs/index.html` ou l'URL du serveur local.
2. Choisir le francais ou l'anglais.
3. Cliquer sur **Demarrer la partie**.
4. Observer les descriptions et choisir un chemin.
5. Recuperer les objets utiles.
6. Revenir a l'accueil pour reprendre une sauvegarde ou commencer une nouvelle partie.

Le parcours conseille pour decouvrir la fin alternative est le suivant :

```text
Chambre -> Etagere -> Salle de lavage -> Soins
-> Salle electrique -> Placard -> Sortie
```

Le joueur doit recuperer les bandages dans l'etagere et la cle dans le placard pour debloquer la fin alternative.

## Architecture

```text
La_Maison_xavier/
|- README.md
|- docs/
|  |- index.html              # Choix de la langue
|  |- style.css               # Styles de la page d'entree
|  |- html/
|  |  |- accueil.html         # Presentation du projet
|  |  |- jeu.html             # Moteur principal des scenes
|  |  |- credit.html          # Credits
|  |  |- jeu_*.html           # Anciennes pages conservees pour compatibilite
|  |- css/
|  |  |- accueil.css
|  |  |- credit.css
|  |  |- jeu.css
|  |- js/
|     |- scene-data.js        # Donnees des scenes et des choix
|     |- scene-app.js         # Rendu, sauvegarde et inventaire
|     |- script.js            # Navigation commune et progression
|     |- translate.js         # Chargement des traductions
|     |- lang.json            # Textes francais et anglais
|  |- images/                 # Images utilisees par les scenes
|- Maquette-Filaire/          # Maquettes du projet
```

## Fonctionnement du moteur

Le parcours principal utilise une seule page :

```text
docs/html/jeu.html?scene=accueil
```

Le parametre `scene` determine la scene affichee. Quelques exemples :

```text
docs/html/jeu.html?scene=etage
docs/html/jeu.html?scene=sous-sol
docs/html/jeu.html?scene=placard
docs/html/jeu.html?scene=fin
```

### `scene-data.js`

Chaque scene contient les informations necessaires a son rendu :

```javascript
nouvelleScene: {
  image: "nouvelle-scene.jpg",
  title: "nouvelleTitle",
  intro: "nouvelleIntro",
  text: "nouvelleText",
  choices: [
    { label: "btnContinuer", target: "scene-suivante" },
  ],
}
```

Proprietes disponibles :

| Propriete   | Role                                                 |
| ----------- | ---------------------------------------------------- |
| `image`     | Nom du fichier dans `docs/images/`                   |
| `title`     | Cle du titre de la scene                             |
| `intro`     | Cle du sous-titre narratif                           |
| `text`      | Cle du texte principal                               |
| `extraText` | Cle d'un paragraphe supplementaire optionnel         |
| `choices`   | Liste des liens proposes au joueur                   |
| `item`      | Objet ajoute a l'inventaire en entrant dans la scene |
| `variants`  | Version alternative selon l'inventaire               |

Une destination speciale nommee `credits` ouvre `credit.html`.

### Choix conditionnel

Un choix peut demander un objet et utiliser une autre destination si l'objet manque :

```javascript
{
  label: "btnSoins",
  target: "soins-survie",
  fallbackTarget: "soins",
  requires: ["bandage"],
}
```

### Fin alternative

Une scene peut changer de titre et de texte lorsque certaines conditions sont remplies :

```javascript
variants: [
  {
    requires: ["key", "bandage"],
    title: "finSecretTitle",
    intro: "finSecretIntro",
    text: "finSecretText",
  },
],
```

## Ajouter ou modifier une scene

1. Ajouter l'image dans `docs/images/`.
2. Ajouter l'objet scene dans [scene-data.js](docs/js/scene-data.js).
3. Ajouter toutes les cles de texte dans [lang.json](docs/js/lang.json), dans `fr` et `en`.
4. Verifier les destinations des choix.
5. Ouvrir l'URL `jeu.html?scene=...` avec un serveur local.
6. Tester le parcours en francais et en anglais.

Il ne faut pas creer une nouvelle page HTML pour une scene standard. La page `jeu.html` est le point d'entree du moteur actuel.

## Modifier les traductions

Les traductions sont dans `docs/js/lang.json` :

```json
{
  "fr": {
    "nouvelleTitle": "Nouvelle piece"
  },
  "en": {
    "nouvelleTitle": "New room"
  }
}
```

Les elements HTML ou crees par JavaScript utilisent l'attribut `data-lang` :

```html
<h1 data-lang="nouvelleTitle">Nouvelle piece</h1>
```

Pour une image, utiliser `data-lang-alt`. Pour un label ARIA, utiliser `data-lang-aria`.

## Sauvegarde et donnees locales

Les donnees sont conservees uniquement dans le navigateur avec `localStorage`.

| Cle                  | Contenu                                            |
| -------------------- | -------------------------------------------------- |
| `houseSave`          | Scene actuelle, inventaire et historique des choix |
| `houseVisitedScenes` | Scenes decouvertes pour la progression             |
| `lang`               | Langue choisie, `fr` ou `en`                       |

La sauvegarde n'est pas partagee entre les navigateurs et n'est pas envoyee vers un serveur.

Pour reinitialiser manuellement une partie, utiliser le bouton **Nouvelle partie**. En cas de besoin, les donnees peuvent aussi etre supprimees depuis les outils de developpement du navigateur, dans **Application > Local Storage**.

## Validation

Le projet ne contient pas de suite de tests automatisee. Les controles rapides suivants permettent de verifier les fichiers JavaScript :

```powershell
node --check docs/js/scene-data.js
node --check docs/js/scene-app.js
node --check docs/js/script.js
node --check docs/js/translate.js
```

Verifier aussi que le fichier JSON est valide :

```powershell
Get-Content -Raw docs/js/lang.json | ConvertFrom-Json | Out-Null
```

Avant une publication, tester manuellement :

- le demarrage en francais ;
- le demarrage en anglais ;
- le changement de langue pendant une scene ;
- la sauvegarde et le bouton **Continuer** ;
- la remise a zero avec **Nouvelle partie** ;
- le parcours avec et sans bandages ;
- la fin normale et la fin alternative ;
- l'affichage sur mobile.

## Compatibilite et limites

- Le projet fonctionne sans compilation et peut etre heberge comme site statique.
- Un serveur local est recommande pour le chargement de `lang.json`.
- `localStorage` doit etre active dans le navigateur pour conserver la partie.
- Les anciennes pages `jeu_*.html` sont encore conservees pour les anciens liens, mais elles ne constituent plus la source principale du parcours.
- Les anciennes pages peuvent donc avoir une presentation ou des textes differents de ceux du nouveau moteur.
- Il n'y a pas encore de musique, de systeme backend, de comptes utilisateurs ou de sauvegarde cloud.

## Historique du projet

Le projet a ete commence en 2024 dans le cadre d'un exercice de conception multimedia au Cegep Montmorency. Il a ensuite ete remanie pour centraliser les scenes, ajouter la sauvegarde, l'inventaire, les fins alternatives et le support bilingue.

Les images du jeu ont ete produites avec de l'IA generative, comme indique dans la page des credits.

## Auteur

Projet realise par Xavier Martineau.

Le projet est pret a etre lance localement avec la commande indiquee plus haut.
