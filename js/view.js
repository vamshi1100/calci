//**********************Add buttons dynamically usind dom******************** */
import { clickedbutton } from "../js/model.js";
export function renderButtons() {
  let buttonsdiv = document.getElementsByClassName("buttons")[0];
  if (buttonsdiv) {
    const buttonsdom = ["+", "-", "*", "/", "%", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    buttonsdom.forEach((operator) => {
      let button = document.createElement("button");
      button.textContent = operator;
      buttonsdiv.prepend(button);
      // if(operator=="+"){
      //   operator.className("plus")
      // }
      button.addEventListener("click", () => {
        clickedbutton(operator);
      });
    });
  } else {
    console.log("No div with class 'buttons' found.");
  }
}
