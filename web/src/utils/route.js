import { initMainContent } from "../index.js";
import { clearDom } from "./clear.js";

export const navigate = function (path, Component) {
  window.history.pushState({}, "", path);
  clearDom();
  initMainContent();
  Component();
};
