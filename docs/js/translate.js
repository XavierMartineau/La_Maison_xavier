// Détermine la langue choisie (FR par défaut)
let currentLang = localStorage.getItem("lang") || "fr";

// Détecte automatiquement le bon chemin vers lang.json
function getLangPath() {
  // Cherche le fichier dans le dossier js, peu importe la profondeur
  const depth = window.location.pathname.split("/").length - 1;
  // Si la page est dans docs/html → ../js/lang.json
  // Si elle est dans docs/ → ./js/lang.json
  return depth > 3 ? "../../js/lang.json" : "../js/lang.json";
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
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (langData[key]) {
      // innerText pour le texte simple, innerHTML si tu veux garder les balises
      el.innerText = langData[key];
    }
  });
}

// Gestion du bouton de bascule de langue
const langToggle = document.getElementById("lang-toggle");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    localStorage.setItem("lang", currentLang);
    loadLang();
  });
}

// Lance la traduction au chargement
loadLang();
