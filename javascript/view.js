// view.js
export class View {
  constructor() {
    this.historyDiv = document.getElementById("historydiv");
    this.inputBox = document.getElementById("inputbox");
  }

  renderButtons(buttons, onClick) {
    const buttonsDiv = document.getElementsByClassName("buttons")[0];
    buttons.forEach((button) => {
      const btn = document.createElement("button");
      btn.textContent = button;
      buttonsDiv.prepend(btn);
      btn.addEventListener("click", () => onClick(button));
    });
  }

  updateHistoryDisplay(history) {
    this.historyDiv.innerHTML = "";
    history.forEach((item) => {
      const p = document.createElement("p");
      p.innerText = `${item.expression} = ${item.result}`;
      this.historyDiv.prepend(p);
    });
  }

  clearInput() {
    this.inputBox.value = "";
  }

  displayResult(result) {
    this.inputBox.value = result;
  }
}
