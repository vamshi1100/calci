import { renderbuttons } from "../javascript/view.js";
import {
  arr,
  operatorsarr,
  saveExpression,
  filter,
  clearData,
} from "../javascript/model.js";

let arr1 = arr;

// document.addEventListener("DOMContentLoaded", function () {
//   renderbuttons();
// });
// document.addEventListener("DOMContentLoaded", function () {
//   filter();
// });

renderbuttons();
filter();

function keyboard() {
  // Listen for keydown events to handle keyboard input
  document
    .getElementById("inputbox")
    .addEventListener("keydown", function (event) {
      let key = event.key;
      let op = document.getElementById("inputbox");

      // Handle numbers (0-9) and operators (+, -, *, /, %)
      if ((key >= "0" && key <= "9") || operatorsarr.includes(key)) {
        if (
          operatorsarr.includes(key) &&
          arr1.length > 0 &&
          operatorsarr.includes(arr1[arr1.length - 1])
        ) {
          event.preventDefault(); // Don't add consecutive operators
          console.log("Can't add consecutive operators");
        } else {
          arr1.push(key); // Using arr1
        }
      }
      // Handle Enter key for calculation
      else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
      }
      // Handle = key for calculation
      else if (key === "=") {
        event.preventDefault();
        calculateResult();
      }

      // Handle "C" key to clear the display
      else if (key.toUpperCase() === "C") {
        event.preventDefault();
        clearDisplay();
      }
      // Handle Backspace to delete last character
      else if (key === "Backspace") {
        event.preventDefault();
        arr1.pop(); // Using arr1
        op.value = arr1.join("");
      }
      // Prevent any other non-numeric or non-operator key from being typed
      else {
        event.preventDefault();
      }
    });
}
keyboard();

// Function to handle button clicks (numbers and operators)
export function clickedbutton(btnvalue) {
  let op = document.getElementById("inputbox");

  if (typeof btnvalue === "number" || btnvalue === 0) {
    arr1.push(btnvalue); // Using arr1
    op.value = arr1.join("");
  } else if (operatorsarr.includes(btnvalue)) {
    if (arr1.length > 0 && operatorsarr.includes(arr1[arr1.length - 1])) {
      console.log("Can't add consecutive operators");
    } else {
      arr1.push(btnvalue); // Using arr1
      op.value = arr1.join("");
    }
  }
  // Handle other button inputs (e.g., clear or other operations)
  else {
    op.value = arr1.join(""); // Using arr1
  }
}

// Function to calculate the result of the expression
export function calculateResult() {
  let op = document.getElementById("inputbox");

  // Join the array to form the expression and evaluate it
  let expression = arr1.join(""); // Using arr1
  if (expression) {
    console.log(expression);

    var result = eval(expression);
    console.log(result);

    document.getElementById("save").addEventListener("click", () => {
      // Save expression and result to localStorage
      saveExpression(expression, result);
    });

    op.value = result;

    arr1 = [result.toString()];

    return result;
  }
}

// Function to clear the input display and reset the array
export function clearDisplay() {
  document.getElementById("inputbox").value = "";
  arr1 = []; // Using arr1
}

export function deletefun() {
  document.getElementById("historydiv").innerHTML = "";
  clearData();
}
