import { $ } from "./selector.js";

export const clearDom = () => {
  $("#page_content").innerHTML = null;
};
