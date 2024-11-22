//******************************logic part****************************************** */
export var arr = [];
export var operatorsarr = ["+", "-", "*", "/", "%"];

// Function to save an expression and result to localStorage
export function saveExpression(expression, result) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({ expression, result });
  localStorage.setItem("history", JSON.stringify(history));
  updateHistoryDisplay(); // Update the displayed history immediately
}

// Function to update the displayed history from localStorage
export const updateHistoryDisplay = () => {
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
};

//***********************filter********************************************************//

export function filter() {
  // Get the choice input element and filter input box
  let choice = document.getElementById("choice");
  let filterop = document.getElementById("filter");
  let errorDiv = document.getElementById("errorDiv"); // Element to display error messages

  // Event listener for the choice input box
  choice.addEventListener("input", function () {
    let choiceop = parseInt(choice.value); // Parse the choice value to an integer

    // Clear previous errors whenever choice is changed
    errorDiv.innerHTML = "";

    // Add event listener for the filter input box to validate the entered value
    filterop.addEventListener("input", function () {
      let filteroutput = parseInt(filterop.value); // Parse the value entered in the filter input box

      // Check the choice value and validate accordingly
      if (choiceop === 1) {
        // Choice 1: Value in filter box must be > 50
        if (filteroutput <= 50) {
          errorDiv.innerHTML = "Error: Value must be greater than 50!";
          console.log("Error: Value must be greater than 50.");
        } else {
          // Clear error if input is valid for choice 1
          errorDiv.innerHTML = "";
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
      } else if (choiceop === 2) {
        // Choice 2: Value in filter box must be < 150
        if (filteroutput >= 150) {
          errorDiv.innerHTML = "Error: Value must be less than 150!";
          console.log("Error: Value must be less than 150.");
        } else {
          // Clear error if input is valid for choice 2
          errorDiv.innerHTML = "";
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
      } else if (choiceop === 3) {
        // Choice 2: Value in filter box must be < 150
        if (filteroutput < 50 || filteroutput > 150) {
          errorDiv.innerHTML = "Error: Value must be <50! & >150 ";
          console.log("Error: Value must be less than 150.");
        } else {
          // Clear error if input is valid for choice 2
          errorDiv.innerHTML = "";
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
      } else if (choiceop === 4) {
        // Choice 2: Value in filter box must be < 150
        if (filteroutput < 2) {
          errorDiv.innerHTML = "Error: ";
          console.log("Error");
        } else {
          errorDiv.innerHTML = ""; // Clear any previous errors at the start
          let storedHistory = localStorage.getItem("history");
          let historyDiv = document.getElementById("historydiv");

          // Clear the historyDiv once before appending
          historyDiv.innerHTML = "";

          let matchFound = false; // To track if any matching operands are found

          if (storedHistory) {
            let parsedHistory = JSON.parse(storedHistory);
            console.log(parsedHistory);

            parsedHistory.forEach((items) => {
              // Count the number of operands in the expression
              let operandsCount = items.expression
                .split(/[+\-*/^()]/)
                .filter(Boolean).length;

              // Only display the expression if it has the correct number of operands
              if (operandsCount === filteroutput) {
                let p = document.createElement("p");
                p.innerText = `${items.expression} = ${items.result}`;
                historyDiv.prepend(p); // Prepend to show the most recent calculations first
                matchFound = true; // Mark that a match was found
              }
            });

            // If no matching operands were found, show an error
            if (!matchFound) {
              errorDiv.innerHTML = "No matching operands found";
            }
          }
        }
      } else {
        // If invalid choice, reset the error message
        errorDiv.innerHTML =
          "Error: Please select a valid choice (1 or  2 or 3 or 4).";
      }
    });
  });
}
export function clearData() {
  localStorage.clear();
}
// Function to clear the history from localStorage and the display
