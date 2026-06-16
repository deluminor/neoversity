import { concatenation } from "./concatenation.js";

const message: string = concatenation("Hello", "TypeScript", "world!");

console.log(message);

const output = document.querySelector<HTMLParagraphElement>("#output");

if (output) {
  output.textContent = message;
}
