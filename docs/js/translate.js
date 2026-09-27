// Détermine la langue choisie (FR par défaut)
let currentLang = localStorage.getItem("lang") || "fr";

// Détecte automatiquement le bon chemin vers lang.json
function getLangPath() {
  // Cherche le fichier dans le dossier js, peu importe la profondeur
  const isGamePage = window.location.pathname.toLowerCase().includes("/html/");
  // Utilise un chemin relatif adapté aux pages de jeu.
  // Si la page est dans docs/html → ../js/lang.json
  // Si elle est dans docs/ → ./js/lang.json
  return isGamePage ? "../js/lang.json" : "./js/lang.json";
}

// Charge le fichier JSON
async function loadLang() {
  const langPath = getLangPath();
  try {
    const res = await fetch(langPath);
    if (!res.ok) {
      throw new Error(`Fichier introuvable (${res.status}) : ${langPath}`);
    }
    const data = await res.json();
    applyLang(data[currentLang]);
  } catch (error) {
    console.error("Erreur de chargement du fichier de langue :", error);
  }
}

// Applique la traduction à tous les éléments avec data-lang
function applyLang(langData) {
  if (!langData) {
    return;
  }

  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (Object.prototype.hasOwnProperty.call(langData, key)) {
      el.textContent = langData[key];
    }
  });

  document.querySelectorAll("[data-lang-alt]").forEach((el) => {
    const key = el.getAttribute("data-lang-alt");
    if (Object.prototype.hasOwnProperty.call(langData, key)) {
      el.alt = langData[key];
    }
  });

  document.querySelectorAll("[data-lang-aria]").forEach((el) => {
    const key = el.getAttribute("data-lang-aria");
    if (Object.prototype.hasOwnProperty.call(langData, key)) {
      el.setAttribute("aria-label", langData[key]);
    }
  });

  document.documentElement.lang = currentLang;
}

// Délégation pour supporter les contrôles ajoutés par script.js.
document.addEventListener("click", (event) => {
  if (!event.target.closest("#lang-toggle")) {
    return;
  }

  currentLang = currentLang === "fr" ? "en" : "fr";
  localStorage.setItem("lang", currentLang);
  loadLang();
});

window.addEventListener("navigation-ready", loadLang);

// Lance la traduction au chargement
loadLang();
