import { gsap } from "gsap";
import { getPlaylists } from "../actions/auth";
import { StableUi } from "./_stables";

class Playlist {
  section3 = document.querySelector(".section-3");
  playlistImageCont = document.querySelector(".playlist-image");
  innerSection = this.section3.querySelector(".inner-section");

  playlistImg = this.playlistImageCont.querySelector("img");

  constructor() {
    console.log(this.playlistImg);

    this.showPlayLists();

    console.log(document.querySelector(".playlist-1"));
  }

  async showPlayLists() {
    const { items: playlistData } = await getPlaylists();

    this.parseHtml(playlistData);
  }

  parseHtml(playlistData) {
    let playHtml = "";
    for (let x = 0; x < playlistData.length; x++) {
      playHtml += ` <a
    href="${playlistData[x].external_urls.spotify}"
    target="_blank" data-image="${playlistData[x].images[0].url}"
    class="playlist-${x + 1} playlist"
  >
    <p class="playlist-name">${playlistData[x].name}</p>
  </a> 
`;
    }

    //add the html to the section
    this.innerSection.insertAdjacentHTML("beforeend", playHtml);

    //add the event listeners
    this.playlistEventListeners();
  }

  playlistEventListeners() {
    const playlists = this.section3.querySelectorAll(".playlist");

    playlists.forEach((c) => {
      c.addEventListener("mouseenter", () => {
        this.playlistImg.setAttribute("src", c.dataset.image);
        gsap.to(this.playlistImageCont, { opacity: 0.5 });
      });

      c.addEventListener("mouseleave", () => {
        gsap.to(this.playlistImageCont, { opacity: 0 });
      });
    });

    StableUi.mouseHoverEffect();
  }
}
export const playListUi = new Playlist();
