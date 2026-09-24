function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const changeColorButton = document.querySelector(".change-color");
const colorValue = document.querySelector(".color");

changeColorButton.addEventListener("click", () => {
  const nextBackgroundColor = getRandomHexColor();

  document.body.style.backgroundColor = nextBackgroundColor;
  colorValue.textContent = nextBackgroundColor;
});
