import {
  calculateResult,
  clickedbutton,
  clearDisplay,
  deletefun,
} from "../javascript/controller.js";

import {
  //   filterg50,
  //   filterl150,
  //   filterlg50,
  //   operands,
  updateHistoryDisplay,
} from "../javascript/model.js";

export function renderbuttons() {
  let buttonsdiv = document.getElementsByClassName("buttons")[0];
  if (buttonsdiv) {
    const buttonsdom = ["+", "-", "*", "/", "%", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    buttonsdom.forEach((operator) => {
      let button = document.createElement("button");
      button.textContent = operator;
      buttonsdiv.prepend(button);
      button.addEventListener("click", () => {
        clickedbutton(operator);
      });
    });
  } else {
    console.log("No div with class 'buttons' found.");
  }
}

// // Correct the event listener for calculateResult button
document
  .getElementById("calculateResult")
  .addEventListener("click", calculateResult);

// Correct the event listener for clearDisplay button
document.getElementById("clearDisplay").addEventListener("click", clearDisplay);

// Adding event listeners for each button
// document.getElementById("filterg50").addEventListener("click", filterg50);
// document.getElementById("filterl150").addEventListener("click", filterl150);
// document.getElementById("filterlg50").addEventListener("click", filterlg50);
// document.getElementById("operands").addEventListener("click", operands);
document.getElementById("deletefun").addEventListener("click", deletefun);

// Initial call to display history when the page loads
document.addEventListener("DOMContentLoaded", updateHistoryDisplay);
