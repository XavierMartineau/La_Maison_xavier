const itemLabels = {
  bandage: "itemBandage",
  key: "itemKey",
};

const scenes = {
  accueil: {
    image: "01.jpg",
    title: "accueilTitle",
    intro: "accueilStoryTitle",
    text: "accueilStoryP1",
    extraText: "accueilStoryP2",
    choices: [
      { label: "btnEtage", target: "etage" },
      { label: "btnSousSol", target: "sous-sol", variant: "secondary" },
    ],
  },
  etage: {
    image: "05.jpg",
    title: "etageTitle",
    intro: "etageIntro",
    text: "etageText",
    choices: [
      { label: "btnBibli", target: "bibliotheque" },
      { label: "btnChambre", target: "chambre", variant: "secondary" },
    ],
  },
  bibliotheque: {
    image: "02.jpg",
    title: "bibliTitle",
    intro: "bibliIntro",
    text: "bibliText",
    choices: [
      { label: "btnBruit", target: "bruit" },
      { label: "btnEtage", target: "etage", variant: "secondary" },
    ],
  },
  bruit: {
    image: "08.jpg",
    title: "bruitTitle",
    intro: "bruitIntro",
    text: "bruitText",
    choices: [{ label: "btnMort", target: "mort", variant: "danger" }],
  },
  chambre: {
    image: "03.jpg",
    title: "chambreTitle",
    intro: "chambreIntro",
    text: "chambreText",
    choices: [
      { label: "btnFenetre", target: "fenetre" },
      { label: "btnEtagere", target: "etagere", variant: "secondary" },
    ],
  },
  fenetre: {
    image: "06.jpg",
    title: "fenetreTitle",
    intro: "fenetreIntro",
    text: "fenetreText",
    choices: [{ label: "btnMort", target: "mort", variant: "danger" }],
  },
  etagere: {
    image: "11.jpg",
    title: "etagereTitle",
    intro: "etagereIntro",
    text: "etagereText",
    extraText: "etagereChoicesIntro",
    item: "bandage",
    choices: [
      { label: "btnLavage", target: "lavage" },
      { label: "btnElectrique", target: "electrique", variant: "secondary" },
    ],
  },
  "sous-sol": {
    image: "13.jpg",
    title: "soussolTitle",
    intro: "soussolIntro",
    text: "soussolText",
    choices: [
      { label: "btnLavageSoussol", target: "lavage" },
      {
        label: "btnElectriqueSoussol",
        target: "electrique",
        variant: "secondary",
      },
    ],
  },
  lavage: {
    image: "07.jpg",
    title: "lavageTitle",
    intro: "lavageIntro",
    text: "lavageText",
    choices: [
      {
        label: "btnSoins",
        target: "soins-survie",
        fallbackTarget: "soins",
        requires: ["bandage"],
      },
      { label: "btnTunnel", target: "tunnel", variant: "secondary" },
    ],
  },
  soins: {
    image: "12.jpg",
    title: "soinsTitle",
    intro: "soinsIntro",
    text: "soinsText",
    choices: [{ label: "btnMortSoins", target: "mort", variant: "danger" }],
  },
  "soins-survie": {
    image: "12.jpg",
    title: "soinsSafeTitle",
    intro: "soinsSafeIntro",
    text: "soinsSafeText",
    choices: [{ label: "btnElectriqueTunnel", target: "electrique" }],
  },
  tunnel: {
    image: "16.jpg",
    title: "tunnelTitle",
    intro: "tunnelIntro",
    text: "tunnelText",
    choices: [{ label: "btnElectriqueTunnel", target: "electrique" }],
  },
  electrique: {
    image: "04.jpg",
    title: "elecTitle",
    intro: "elecIntro",
    text: "elecText",
    choices: [
      { label: "btnGeneratrice", target: "generatrice" },
      { label: "btnPlacard", target: "placard", variant: "secondary" },
    ],
  },
  generatrice: {
    image: "04.jpg",
    title: "generatriceTitle",
    intro: "generatriceIntro",
    text: "generatriceText",
    choices: [
      { label: "btnMortGeneratrice", target: "mort", variant: "danger" },
    ],
  },
  placard: {
    image: "17.png",
    title: "placardTitle",
    intro: "placardIntro",
    text: "placardText",
    item: "key",
    choices: [{ label: "btnSortie", target: "fin" }],
  },
  fin: {
    image: "18.png",
    title: "finTitle",
    intro: "finIntro",
    text: "finText",
    variants: [
      {
        requires: ["key", "bandage"],
        title: "finSecretTitle",
        intro: "finSecretIntro",
        text: "finSecretText",
      },
    ],
    choices: [
      { label: "btnRejouer", target: "accueil" },
      { label: "btnCredits", target: "credits", variant: "secondary" },
    ],
  },
  mort: {
    image: "10.jpg",
    title: "mortTitle",
    intro: "mortIntro",
    text: "mortText",
    choices: [{ label: "btnReessayer", target: "accueil", variant: "danger" }],
  },
};
