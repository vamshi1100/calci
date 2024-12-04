export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.operators = ["+", "-", "*", "/", "%"];
    this.expression = "";
    this.keyboard();
    this.filter();
    this.init();
  }

  init() {
    const buttons = ["+", "-", "*", "/", "%", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    this.view.renderButtons(buttons, (btnValue) =>
      this.handleButtonClick(btnValue)
    );
    this.view.updateHistoryDisplay(this.getFilteredHistory());

    document
      .getElementById("calculateResult")
      .addEventListener("click", () => this.calculateResult());
    document
      .getElementById("clearDisplay")
      .addEventListener("click", () => this.clearDisplay());
    document
      .getElementById("deletefun")
      .addEventListener("click", () => this.clearHistory());
  }

  getFilteredHistory() {
    return this.model.getHistory();
  }

  keyboard() {
    const opInput = document.getElementById("inputbox");
    const arr1 = [];

    opInput.addEventListener("keydown", (event) => {
      let key = event.key;
      console.log(`Key pressed: ${key}`);

      if ((key >= "0" && key <= "9") || this.operators.includes(key)) {
        if (
          this.operators.includes(key) &&
          arr1.length > 0 &&
          this.operators.includes(arr1[arr1.length - 1])
        ) {
          event.preventDefault();
          console.log("Can't add consecutive operators");
        } else {
          arr1.push(key);
          this.expression = arr1.join("");
        }
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        console.log("Calculating result...");
        this.calculateResult();
      } else if (key.toUpperCase() === "C") {
        event.preventDefault();
        console.log("Clearing display...");
        this.clearDisplay();
      } else if (key === "Backspace") {
        event.preventDefault();
        arr1.pop();
        this.expression = arr1.join("");
        opInput.value = this.expression;
      } else {
        event.preventDefault();
      }
    });
  }

  handleButtonClick(btnValue) {
    if (typeof btnValue === "number" || btnValue === 0) {
      this.expression += btnValue;
    } else if (this.operators.includes(btnValue)) {
      if (!this.operators.includes(this.expression.slice(-1))) {
        this.expression += btnValue;
      }
    }
    this.view.inputBox.value = this.expression;
  }

  calculateResult() {
    if (this.expression) {
      try {
        const result = eval(this.expression);
        this.model.saveExpression(this.expression, result);
        this.view.updateHistoryDisplay(this.getFilteredHistory());
        this.view.displayResult(result);
        this.expression = result.toString();
      } catch (error) {
        this.view.displayResult("Error");
        this.expression = "";
      }
    }
  }

  clearDisplay() {
    this.view.clearInput();
    this.expression = "";
  }

  clearHistory() {
    this.model.clearData();
    this.view.updateHistoryDisplay(this.getFilteredHistory());
  }

  filter() {
    const choice = document.getElementById("choice");
    const filterop = document.getElementById("filter");
    const errorDiv = document.getElementById("errorDiv");
    const historyDiv = document.getElementById("historydiv");

    const handleFilter = () => {
      const choiceop = parseInt(choice.value);
      const filteroutput = parseInt(filterop.value);
      errorDiv.innerHTML = "";

      if (isNaN(filteroutput)) return; // Exit if filter output is not a number

      let storedHistory = localStorage.getItem("history");
      historyDiv.innerHTML = "";

      if (storedHistory) {
        let parsedHistory = JSON.parse(storedHistory);
        let filterresult = [];

        switch (choiceop) {
          case 1:
            if (filteroutput <= 50) {
              errorDiv.innerHTML = "Error: Value must be greater than 50!";
            } else {
              filterresult = parsedHistory.filter((item) => item.result > 50);
            }
            break;
          case 2:
            if (filteroutput >= 150) {
              errorDiv.innerHTML = "Error: Value must be less than 150!";
            } else {
              filterresult = parsedHistory.filter((item) => item.result < 150);
            }
            break;
          case 3:
            if (filteroutput < 50 || filteroutput > 150) {
              errorDiv.innerHTML = "Error: Value must be <50 & >150";
            } else {
              filterresult = parsedHistory.filter(
                (item) => item.result > 50 && item.result < 150
              );
            }
            break;
          case 4:
            if (filteroutput < 2) {
              errorDiv.innerHTML = "Error: ";
            } else {
              let matchFound = false;
              filterresult = parsedHistory.filter((item) => {
                const operandsCount = item.expression
                  .split(/[+\-*/^()]/)
                  .filter(Boolean).length;
                if (operandsCount === filteroutput) {
                  matchFound = true;
                  return true;
                }
                return false;
              });
              if (!matchFound) {
                errorDiv.innerHTML = "No matching operands found";
              }
            }
            break;
          default:
            errorDiv.innerHTML =
              "Error: Please select a valid choice (1, 2, 3, or 4).";
        }

        filterresult.forEach((item) => {
          const p = document.createElement("p");
          p.innerText = `${item.expression} = ${item.result}`;
          historyDiv.prepend(p);
        });
      }
    };

    choice.addEventListener("input", handleFilter);
    filterop.addEventListener("input", handleFilter);
  }
}

// const model = new Model();
// const view = new View();
// const controller = new Controller(model, view);
