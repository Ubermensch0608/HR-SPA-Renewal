import { Header } from "./components/Header.js";
import { $ } from "./utils/selector.js";

import HomePage from "./page/HomePage.js";

import SignupPage from "./page/SignupPage.js";

export const initialHtml = `
    <main id="page_content">
        <div class="content_title"></div>
    </main>
`;

export const initMainContent = () => {
  const appRoot = $(".app");

  appRoot.innerHTML = initialHtml;
  appRoot.prepend(Header());
};

const pathName = {
  home: "/web/",
  signup: "/web/signup",
};

const BrowseRouter = () => {
  initMainContent();

  const { pathname } = window.location;
  if (pathname === pathName.home) {
    HomePage();
  } else if (pathname === pathName.signup) {
    SignupPage();
  }
};

BrowseRouter();
