import { ContentTitle } from "../components/ContentTitle.js";
import { $ } from "../utils/selector.js";

const HomePage = () => {
  const contentDom = $("#page_content");

  const cardsContainer = $.create("div", ["card_container"]);
  cardsContainer.id = "cards_container";

  contentDom.appendChild(ContentTitle({ title: "Grate People" }));
  contentDom.appendChild(cardsContainer);

  (async () => {
    const res = await fetch("/web/src/data/new_data.json");
    const profiles = await res.json();

    window.localStorage.setItem(
      "personalInfo",
      JSON.stringify(profiles.map((profile, idx) => ({ idx, ...profile })))
    );

    profiles.forEach((profile, idx) => {
      const card = $.create("div", ["card"]);

      card.idx = idx;
      card.innerHTML = `
            <div class="card_plane card_plane--front">${profile.name}</div>
            <div class="card_plane card_plane--back">${profile.mbti}</div>
        `;
      card.addEventListener("click", (e) => {
        card.classList.toggle("is-flipped");
      });
      cardsContainer.appendChild(card);
    });
  })();
};

export default HomePage;
