export const $ = (selector) => (() => document.querySelector(selector))();

$.create = function (tag, classList) {
  const newDom = document.createElement(tag);
  if (classList) {
    for (const className of classList) {
      newDom.classList.add(className);
    }
  }
  return newDom;
};

$.style = function (el, styles) {
  Object.assign(el.style, styles);
};

$.all = function (selector) {
  return document.querySelectorAll(selector);
};

$.click = function (el, callback) {
  el.addEventListener("click", callback);
};
