import { Model } from "./model.js";
import { View } from "./view.js";
import { Controller } from "./controller.js";

(() => {
  const containerId = "calculatorsContainer";
  const model = new Model();
  const view = new View(containerId, 1);
  new Controller(model, view);
})();

(() => {
  const containerId = "calculatorsContainer";
  const model = new Model();
  const view = new View(containerId, 2);
  new Controller(model, view);
})();

// (() => {
//   const containerId = "calculatorsContainer";
//   const model = new Model();
//   const view = new View(containerId, 3);
//   new Controller(model, view);
// })();
