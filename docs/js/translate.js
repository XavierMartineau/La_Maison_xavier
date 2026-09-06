// Détermine la langue choisie (FR par défaut)
let currentLang = localStorage.getItem("lang") || "fr";

// Charge le fichier JSON
async function loadLang() {
  try {
    const res = await fetch("../js/lang.json");
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
      el.innerText = langData[key];
    }
  });
}

// Si un bouton de langue existe sur la page
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
