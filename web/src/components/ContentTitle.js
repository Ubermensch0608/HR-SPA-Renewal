import { $ } from "../utils/selector.js";

export const ContentTitle = ({ title, style }) => {
  const wrapperDom = $(".content_title");
  const titleDom = $.create("h1");
  titleDom.innerText = title;
  titleDom.style = {
    ...titleDom.style,
    ...style,
  };

  wrapperDom.appendChild(titleDom);

  return wrapperDom;
};
