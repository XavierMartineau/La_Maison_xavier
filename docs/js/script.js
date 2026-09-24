function addStartButton() {
  const pagePath = window.location.pathname.toLowerCase();

  if (
    pagePath.endsWith("/jeu_accueil.html") ||
    document.querySelector(".top-return")
  ) {
    return;
  }

  const startButton = document.createElement("a");
  startButton.className = "top-return";
  startButton.href = "./jeu_accueil.html";
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

function initializePage() {
  document.documentElement.classList.add("is-ready");
  addStartButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}
