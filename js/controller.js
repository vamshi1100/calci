import {
  updateHistoryDisplay,
  calculateResult,
  clearDisplay,
  filterg50,
  filterl150,
  filterlg50,
  operands,
  keydown,
  deletefun,
} from "../js/model.js";
import { renderButtons } from "../js/view.js";

keydown();
// Initial call to display history when the page loads
document.addEventListener("DOMContentLoaded", renderButtons);
document.addEventListener("DOMContentLoaded", updateHistoryDisplay);
// Correct the event listener for calculateResult button
document
  .getElementById("calculateResult")
  .addEventListener("click", calculateResult);

// Correct the event listener for clearDisplay button
document.getElementById("clearDisplay").addEventListener("click", clearDisplay);

// Adding event listeners for each button
document.getElementById("filterg50").addEventListener("click", filterg50);
document.getElementById("filterl150").addEventListener("click", filterl150);
document.getElementById("filterlg50").addEventListener("click", filterlg50);
document.getElementById("operands").addEventListener("click", operands);
document.getElementById("deletefun").addEventListener("click", deletefun);
