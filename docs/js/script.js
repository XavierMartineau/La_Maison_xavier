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

function initializePage() {
  document.documentElement.classList.add("is-ready");
  addStartButton();
  addLanguageToggle();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}
