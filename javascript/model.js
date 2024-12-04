// model.js
export class Model {
  constructor() {
    this.history = JSON.parse(localStorage.getItem("history")) || [];
  }

  saveExpression(expression, result) {
    this.history.push({ expression, result });
    localStorage.setItem("history", JSON.stringify(this.history));
  }

  clearData() {
    localStorage.clear();
    this.history = [];
  }

  getHistory() {
    return this.history;
  }
}
