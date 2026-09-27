const sceneOrder = [
  "jeu_accueil.html",
  "jeu_etage.html",
  "jeu_bibliotheque.html",
  "jeu_bruit.html",
  "jeu_chambre.html",
  "jeu_fenetre.html",
  "jeu_etagere.html",
  "jeu_sous_sol.html",
  "jeu_lavage.html",
  "jeu_soins.html",
  "jeu_soins-survie.html",
  "jeu_mort.html",
  "jeu_tunnel.html",
  "jeu_electrique.html",
  "jeu_generatrice.html",
  "jeu_placard.html",
  "jeu_fin.html",
];

function getCurrentSceneFile() {
  const pageName = window.location.pathname.split("/").pop().toLowerCase();
  if (pageName !== "jeu.html") {
    return pageName;
  }

  const scene = new URLSearchParams(window.location.search).get("scene");
  return scene === "sous-sol"
    ? "jeu_sous_sol.html"
    : `jeu_${scene || "accueil"}.html`;
}

function addStartButton() {
  const pagePath = window.location.pathname.toLowerCase();
  const isNewGameHome =
    pagePath.endsWith("/jeu.html") &&
    (!new URLSearchParams(window.location.search).get("scene") ||
      new URLSearchParams(window.location.search).get("scene") === "accueil");

  if (
    pagePath.endsWith("/jeu_accueil.html") ||
    isNewGameHome ||
    document.querySelector(".top-return")
  ) {
    return;
  }

  const startButton = document.createElement("a");
  startButton.className = "top-return";
  startButton.href = pagePath.endsWith("/jeu.html")
    ? "./jeu.html?scene=accueil"
    : "./jeu_accueil.html";
  startButton.innerHTML =
    '<span aria-hidden="true">←</span><span data-lang="btnDepart">Retour au départ</span>';

  const footer = document.querySelector("footer");
  if (footer) {
    const footerInfo = footer.querySelector(".footer_info");
    if (footerInfo) {
      footerInfo.before(startButton);
    } else {
      footer.append(startButton);
    }
  } else {
    document.body.append(startButton);
  }
}

function addLanguageToggle() {
  if (document.getElementById("lang-toggle")) {
    return;
  }

  const toggle = document.createElement("button");
  toggle.id = "lang-toggle";
  toggle.className = "lang-toggle";
  toggle.type = "button";
  const language = localStorage.getItem("lang") || "fr";
  const languageLabel = language === "fr" ? "English" : "Français";
  toggle.innerHTML = `<span aria-hidden="true">文</span><span data-lang="langToggle">${languageLabel}</span>`;

  const topReturn = document.querySelector(".top-return");
  const header = document.querySelector("header");
  if (topReturn) {
    topReturn.after(toggle);
  } else if (header) {
    header.before(toggle);
  } else {
    document.body.prepend(toggle);
  }

  window.dispatchEvent(new Event("navigation-ready"));
}

function addProgressIndicator() {
  const pageName = getCurrentSceneFile();
  const sceneIndex = sceneOrder.indexOf(pageName);

  if (sceneIndex < 0 || document.querySelector(".story-progress")) {
    return;
  }

  let storedScenes = [];
  try {
    storedScenes = JSON.parse(
      localStorage.getItem("houseVisitedScenes") || "[]",
    );
  } catch {
    localStorage.removeItem("houseVisitedScenes");
  }
  const visitedScenes = new Set(
    Array.isArray(storedScenes) ? storedScenes : [],
  );
  visitedScenes.add(pageName);
  localStorage.setItem(
    "houseVisitedScenes",
    JSON.stringify([...visitedScenes]),
  );

  const progress = document.createElement("div");
  const percentage = Math.round((visitedScenes.size / sceneOrder.length) * 100);
  progress.className = "story-progress";
  progress.setAttribute("role", "status");
  progress.innerHTML = `<span data-lang="progressLabel">Progression</span><strong>${percentage}%</strong>`;

  const header = document.querySelector("header");
  if (header) {
    header.append(progress);
  }
}

function initializePage() {
  document.documentElement.classList.add("is-ready");
  addStartButton();
  addLanguageToggle();
  addProgressIndicator();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}
