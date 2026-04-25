function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const controls = document.querySelector("#controls");
const amountInput = controls.querySelector("input");
const createButton = controls.querySelector("[data-create]");
const destroyButton = controls.querySelector("[data-destroy]");
const boxesContainer = document.querySelector("#boxes");

createButton.addEventListener("click", () => {
  const amount = Number(amountInput.value);

  if (amount < 1 || amount > 100) {
    return;
  }

  createBoxes(amount);
  amountInput.value = "";
});

destroyButton.addEventListener("click", () => {
  destroyBoxes();
});

function createBoxes(amount) {
  destroyBoxes();

  const boxElements = [];
  let boxSize = 30;

  for (let index = 0; index < amount; index += 1) {
    const boxElement = document.createElement("div");
    boxElement.style.width = `${boxSize}px`;
    boxElement.style.height = `${boxSize}px`;
    boxElement.style.backgroundColor = getRandomHexColor();

    boxElements.push(boxElement);
    boxSize += 10;
  }

  boxesContainer.append(...boxElements);
}

function destroyBoxes() {
  boxesContainer.replaceChildren();
}
