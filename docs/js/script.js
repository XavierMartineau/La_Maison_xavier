document.addEventListener("DOMContentLoaded", () => {
  // Liste de dégradés
  const gradients = [
    "linear-gradient(135deg, #4a148c, #7b1fa2)",
    "linear-gradient(135deg, #ff512f, #dd2476)",
    "linear-gradient(135deg, #36d1dc, #5b86e5)",
    "linear-gradient(135deg, #11998e, #38ef7d)",
    "linear-gradient(135deg, #f7971e, #ffd200)",
    "linear-gradient(135deg, #8e2de2, #4a00e0)",
    "linear-gradient(135deg, #ff416c, #ff4b2b)",
  ];

  // Choisir un gradient au hasard
  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  // Appliquer au body
  document.body.style.background = randomGradient;
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.backgroundSize = "cover";

  // Harmoniser titres
  document.querySelectorAll("h1, h2").forEach((el) => {
    el.style.color = "#fff";
    el.style.textShadow = "2px 2px 8px rgba(0,0,0,0.6)";
  });

  // Harmoniser texte
  document.querySelectorAll("p, li").forEach((el) => {
    el.style.color = "rgba(255,255,255,0.9)";
  });

  // Harmoniser boutons (SAUF Boutton-mort)
  document.querySelectorAll("button:not(.Boutton-mort)").forEach((btn) => {
    btn.style.background = randomGradient;
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "25px";
    btn.style.padding = "0.7rem 1.5rem";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "bold";
    btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    btn.style.transition = "all 0.3s ease";
  });

  // Effet hover dynamique (SAUF Boutton-mort)
  document.querySelectorAll("button:not(.Boutton-mort)").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.5)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
      btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    });
  });
});
