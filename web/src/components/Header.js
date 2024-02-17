import HomePage from "../page/HomePage.js";
import SignupPage from "../page/SignupPage.js";
import { navigate } from "../utils/route.js";
import { $ } from "../utils/selector.js";

export const Header = () => {
  const headerDom = $.create("header");
  const leftDiv = $.create("div", ["header", "header_left"]);
  const homeSpan = $.create("span", ["menu_name"]);
  const rightDiv = $.create("div", ["header", "header_right"]);
  const signupSpan = $.create("span", ["menu_name"]);

  homeSpan.id = "menu_home";
  signupSpan.id = "menu_signup";
  homeSpan.innerText = "HOME";
  signupSpan.innerText = "SIGNUP";

  homeSpan.addEventListener("click", () => {
    navigate("/web/", HomePage);
  });

  signupSpan.addEventListener("click", () => {
    navigate("/web/signup", SignupPage);
  });

  leftDiv.appendChild(homeSpan);
  rightDiv.appendChild(signupSpan);
  headerDom.appendChild(leftDiv);
  headerDom.appendChild(rightDiv);

  return headerDom;
};
