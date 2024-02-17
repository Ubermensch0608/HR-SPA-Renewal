import { ContentTitle } from "../components/ContentTitle.js";
import { CARD_STATUS_KEY, PERSONAL_PROFILE_KEY } from "../constants/key.js";
import { localStorage } from "../utils/localStorage.js";
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

    if (!localStorage.check(PERSONAL_PROFILE_KEY)) {
      localStorage.set(
        PERSONAL_PROFILE_KEY,
        profiles.map((profile, idx) => ({ idx, ...profile }))
      );
    }

    const cardStatus = localStorage.get(CARD_STATUS_KEY);
    if (!cardStatus) {
      localStorage.set(
        CARD_STATUS_KEY,
        profiles.map((profile, idx) => ({ idx, status: "card" }))
      );
    }

    localStorage.get(PERSONAL_PROFILE_KEY).forEach((profile, idx) => {
      const card = $.create(
        "div",
        cardStatus ? cardStatus[idx]?.status.split(" ") : ["card"]
      );

      card.idx = idx;
      card.innerHTML = `
            <div class="card_plane card_plane--front">${profile.name}</div>
            <div class="card_plane card_plane--back">${profile.mbti}</div>
        `;

      card.addEventListener("click", (e) => {
        card.classList.toggle("is-flipped");
        localStorage.set(
          CARD_STATUS_KEY,
          Array.from(cardsContainer.children).map((card) => ({
            idx: card.idx,
            status: card.classList.contains("is-flipped")
              ? "card is-flipped"
              : "card",
          }))
        );
      });
      cardsContainer.appendChild(card);
    });
  })();
};

export default HomePage;
