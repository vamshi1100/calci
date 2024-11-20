//**********************Add buttons dynamically usind dom******************** */

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

//******************************2****************************************** */
let arr = [];
let operatorsarr = ["+", "-", "*", "/", "%"];

// Function to handle button clicks (numbers and operators)
function clickedbutton(btnvalue) {
  let op = document.getElementById("inputbox");

  if (typeof btnvalue === "number" || btnvalue === 0) {
    arr.push(btnvalue);
    op.value = arr.join("");
  } else if (operatorsarr.includes(btnvalue)) {
    if (arr.length > 0 && operatorsarr.includes(arr[arr.length - 1])) {
      console.log("Can't add consecutive operators");
    } else {
      arr.push(btnvalue);
      op.value = arr.join("");
    }
  }
  // Handle other button inputs (e.g., clear or other operations)
  else {
    op.value = arr.join("");
  }
}

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
        arr.length > 0 &&
        operatorsarr.includes(arr[arr.length - 1])
      ) {
        event.preventDefault(); // Don't add consecutive operators
        console.log("Can't add consecutive operators");
      } else {
        arr.push(key);
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
      arr.pop();
      op.value = arr.join("");
    }
    // Prevent any other non-numeric or non-operator key from being typed
    else {
      event.preventDefault();
    }
  });

// Function to calculate the result of the expression
function calculateResult() {
  let op = document.getElementById("inputbox");

  try {
    // Join the array to form the expression and evaluate it
    let expression = arr.join("");
    if (expression) {
      console.log(expression);

      var result = eval(expression);
      console.log(result);

      // Save expression and result to localStorage
      saveExpression(expression, result);
    } else {
      console.log("ooops wrong");
    }

    function clearDisplay() {
      document.getElementById("inputbox").value = "";
      arr = [];
    }

    // Display the result in the input box
    op.value = result;

    // Reset arr to hold the result for further calculations
    arr = [result.toString()];
  } catch (error) {
    op.value = "Error";
    arr = [];
  }

  return result;
}

// Function to save an expression and result to localStorage
function saveExpression(expression, result) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({ expression, result });
  localStorage.setItem("history", JSON.stringify(history));
  updateHistoryDisplay(); // Update the displayed history immediately
}

// Function to update the displayed history from localStorage
function updateHistoryDisplay() {
  let storedHistory = localStorage.getItem("history");
  if (storedHistory) {
    let parsedHistory = JSON.parse(storedHistory);
    let historyDiv = document.getElementById("historydiv");
    historyDiv.innerHTML = ""; // Clear existing history to avoid duplicates

    parsedHistory.forEach((item) => {
      let p = document.createElement("p");

      p.addEventListener("click", () => {
        arr = item.expression.split("");
        document.getElementById("inputbox").value = arr.join("");

        // console.log(parsedHistory); //parsed history is an array [{…}, {…}, {…}]
        for (let i = 0; i < parsedHistory.length; i++) {
          // Check if the expression matches
          if (parsedHistory[i].expression === arr.join("")) {
            // Remove the element from the array at the current index
            parsedHistory.splice(i, 1);
            // Break out of the loop once the item is removed
            break;
          }
        }
        console.log(item.expression);
        // Update localStorage with the modified history array
        localStorage.setItem("history", JSON.stringify(parsedHistory));
      });
      // console.log(item.expression); // Log the original expression
      p.innerText = `${item.expression} = ${item.result}`; // Display the expression and result
      historyDiv.prepend(p); // Prepend to show most recent calculations first
    });
  }
}

//function to handle filter >50
function filterg50() {
  let storedHistory = localStorage.getItem("history");
  let historyDiv = document.getElementById("historydiv");
  historyDiv.innerHTML = "";
  if (storedHistory) {
    let parsedHistory = JSON.parse(storedHistory);
    // console.log(parsedHistory);
    let filterresult = parsedHistory.filter((items) => {
      return items.result > 50;
    });
    filterresult.forEach((items) => {
      let p = document.createElement("p");
      p.innerText = `${items.expression} = ${items.result}`;
      historyDiv.prepend(p);
    });
    console.log(filterresult);
  }
}

function filterl150() {
  let storedHistory = localStorage.getItem("history");
  let historyDiv = document.getElementById("historydiv");
  historyDiv.innerHTML = "";
  if (storedHistory) {
    let parsedHistory = JSON.parse(storedHistory);
    // console.log(parsedHistory);
    let filterresult = parsedHistory.filter((items) => {
      return items.result < 150;
    });
    filterresult.forEach((items) => {
      let p = document.createElement("p");
      p.innerText = `${items.expression} = ${items.result}`;
      historyDiv.prepend(p);
    });
    console.log(filterresult);
  }
}

function filterlg50() {
  let storedHistory = localStorage.getItem("history");
  let historyDiv = document.getElementById("historydiv");
  historyDiv.innerHTML = "";
  if (storedHistory) {
    let parsedHistory = JSON.parse(storedHistory);
    // console.log(parsedHistory);
    let filterresult = parsedHistory.filter((items) => {
      return items.result > 50 && items.result < 150;
    });
    filterresult.forEach((items) => {
      let p = document.createElement("p");
      p.innerText = `${items.expression} = ${items.result}`;
      historyDiv.prepend(p);
    });
    console.log(filterresult);
  }
}

function operands() {
  let storedHistory = localStorage.getItem("history");
  let historyDiv = document.getElementById("historydiv");

  // Clear the historyDiv once before appending
  historyDiv.innerHTML = "";

  if (storedHistory) {
    let parsedHistory = JSON.parse(storedHistory);
    console.log(parsedHistory);

    parsedHistory.forEach((items) => {
      // Count the number of operands in the expression
      let operandsCount = items.expression
        .split(/[+\-*/^()]/)
        .filter(Boolean).length;

      // Only display the expression if it has more than 3 operands
      if (operandsCount > 2) {
        let p = document.createElement("p");
        p.innerText = `${items.expression} = ${items.result}`;
        historyDiv.prepend(p); // Prepend to show the most recent calculations first
      }
    });
  }
}

// Function to clear the input display and reset the array
function clearDisplay() {
  document.getElementById("inputbox").value = "";
  arr = [];
}

// Function to clear the history from localStorage and the display
function deletefun() {
  localStorage.clear();
  document.getElementById("historydiv").innerHTML = "";
}

// Initial call to display history when the page loads
document.addEventListener("DOMContentLoaded", updateHistoryDisplay);
