const SAVE_KEY = "houseSave";

function readSave() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
    return saved && typeof saved === "object" ? saved : null;
  } catch {
    localStorage.removeItem(SAVE_KEY);
    return null;
  }
}

function createNewSave() {
  return {
    currentScene: "accueil",
    inventory: [],
    visitedScenes: [],
    choices: [],
  };
}

function resetSave() {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem("houseVisitedScenes");
}

function getSceneId() {
  const requestedScene = new URLSearchParams(window.location.search).get(
    "scene",
  );
  return requestedScene && scenes[requestedScene] ? requestedScene : "accueil";
}

function getSceneVariant(scene, save) {
  return scene.variants?.find((variant) =>
    variant.requires.every((item) => save.inventory.includes(item)),
  );
}

function getTarget(choice, save) {
  const meetsRequirements = (choice.requires || []).every((item) =>
    save.inventory.includes(item),
  );
  return meetsRequirements || !choice.fallbackTarget
    ? choice.target
    : choice.fallbackTarget;
}

function saveGame(save) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

function renderInventory(save) {
  const inventory = document.querySelector("[data-inventory]");
  const inventoryEmpty = document.querySelector("[data-inventory-empty]");
  if (!inventory || !inventoryEmpty) {
    return;
  }

  inventory.replaceChildren(
    ...save.inventory.map((item) => {
      const itemElement = document.createElement("li");
      itemElement.dataset.lang = itemLabels[item];
      itemElement.textContent = itemLabels[item];
      return itemElement;
    }),
  );
  inventoryEmpty.hidden = save.inventory.length > 0;
}

function renderSessionControls(save, sceneId) {
  const continueLink = document.querySelector("[data-action='continue']");
  if (continueLink) {
    const canContinue =
      save.currentScene !== "accueil" && sceneId === "accueil";
    continueLink.hidden = !canContinue;
    continueLink.href = `./jeu.html?scene=${encodeURIComponent(save.currentScene)}`;
  }
}

function getSceneLink(target) {
  return target === "credits"
    ? "./credit.html"
    : `./jeu.html?scene=${encodeURIComponent(target)}`;
}

function renderScene() {
  const sceneId = getSceneId();
  const scene = scenes[sceneId];
  let save = readSave() || createNewSave();
  save.inventory = Array.isArray(save.inventory) ? save.inventory : [];
  save.visitedScenes = Array.isArray(save.visitedScenes)
    ? save.visitedScenes
    : [];
  save.choices = Array.isArray(save.choices) ? save.choices : [];
  const isNewGame =
    new URLSearchParams(window.location.search).get("new") === "1";
  if (isNewGame) {
    save = createNewSave();
  }

  const variant = getSceneVariant(scene, save);
  const displayedScene = variant ? { ...scene, ...variant } : scene;
  save.currentScene = sceneId;
  if (!save.visitedScenes.includes(sceneId)) {
    save.visitedScenes.push(sceneId);
  }
  if (scene.item && !save.inventory.includes(scene.item)) {
    save.inventory.push(scene.item);
  }
  saveGame(save);

  const title = document.querySelector("[data-scene-title]");
  const documentTitle = document.querySelector("title");
  const image = document.querySelector("[data-scene-image]");
  const intro = document.querySelector("[data-scene-intro]");
  const text = document.querySelector("[data-scene-text]");
  const extraText = document.querySelector("[data-scene-extra]");
  const choices = document.querySelector("[data-scene-choices]");

  title.dataset.lang = displayedScene.title;
  documentTitle.dataset.lang = displayedScene.title;
  intro.dataset.lang = displayedScene.intro;
  text.dataset.lang = displayedScene.text;
  image.src = `../images/${scene.image}`;
  image.dataset.langAlt = displayedScene.title;
  image.alt = displayedScene.title;

  if (scene.extraText) {
    extraText.hidden = false;
    extraText.dataset.lang = scene.extraText;
  } else {
    extraText.hidden = true;
  }

  choices.replaceChildren(
    ...scene.choices.map((choice) => {
      const link = document.createElement("a");
      const target = getTarget(choice, save);
      link.className = `scene-choice${choice.variant ? ` ${choice.variant}` : ""}`;
      link.href = getSceneLink(target);
      link.dataset.sceneTarget = target;
      link.dataset.lang = choice.label;
      link.textContent = choice.label;
      return link;
    }),
  );

  document.title = `La Maison | ${displayedScene.title}`;
  document.body.dataset.scene = sceneId;
  renderInventory(save);
  renderSessionControls(save, sceneId);
}

document.addEventListener("click", (event) => {
  const newGameButton = event.target.closest("[data-action='new-game']");
  if (newGameButton) {
    resetSave();
    window.location.href = "./jeu.html?scene=accueil&new=1";
    return;
  }

  const choice = event.target.closest("[data-scene-target]");
  if (!choice) {
    return;
  }

  const save = readSave() || createNewSave();
  save.choices.push({
    from: save.currentScene,
    to: choice.dataset.sceneTarget,
  });
  saveGame(save);
});

renderScene();
