import { gsap } from "gsap";
import { authVars } from "../actions/auth";
import { StableUi } from "./_stables";

class Playlist {
  section3 = document.querySelector(".section-3");
  playlistImageCont = document.querySelector(".playlist-image");
  innerSection = this.section3.querySelector(".inner-section");
  currentlyPlaying = this.section3.querySelector(".currently-playing");

  playlistImg = this.playlistImageCont.querySelector("img");

  errorSection = document.querySelector(".error-section");
  errorText = this.errorSection.querySelector(".error-text");
  errorBtn = this.errorSection.querySelector(".retry-btn");
  userInfo;

  constructor() {
    this.showPlayLists();

    this.errorBtn.addEventListener("click", this.handleError.bind(this));

    //PREVIOUS JAVASCRIPT CODE USING SPOTIFY AUTHORIZATION FLOW TO ACCESS currently playing (uncomment to use)

    // this.refreshCurrentlyPlaying();
  }

  //gets the playlists and shows them on our html
  async showPlayLists() {
    const { playlistData, playingData } = await this.getPlaylistAndPlaying(
      authVars.SPOTIFY_ID
    );

    //show what i a currently listening to in user interface
    this.parsePlayingHtml(playingData);

    //show my playlists in user interface
    this.parsePlaylistHtml(playlistData);
  }

  //get my playlists and the song im currenty listening to(if i am listening to one)
  async getPlaylistAndPlaying(spotifyId) {
    try {
      //receives the token
      const token = await authVars.getToken();

      //fetches both playing and playlist data
      const request = await Promise.all([
        fetch(
          `https://api.spotify.com/v1/users/${spotifyId}/playlists?limit=3`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!request[0].ok && !request[1].ok) {
        throw new Error(`An error occurred ${error.status}`);
      }

      const [playLists, playing] = request;

      //gets json of playingData
      const playingDatas = await this.handlePlayingFetch(playing);

      //converts playlist data to json
      const playlistData = await playLists.json();

      return {
        playingData: playingDatas.item ? playingDatas.item : playingDatas,
        playlistData: playlistData.items,
      };
    } catch (err) {
      this.errorText.textContent = err;
      gsap.to(this.innerSection, { display: "none" });
      gsap.to(this.errorSection, { display: "flex" });

      throw err;
    }
  }

  //spotify does not return a json when a user is not listening to anything. so we test if it is a json
  async handlePlayingFetch(playing) {
    let playingDatas;

    //test if the settled promise is a json. This only occurs when i am not listening to anything
    try {
      //if it is a json, the data is extracted and is made available for access in the outer scope
      const playingData2 = await playing.json();

      //if it is not a json, it short-circuits and skips this step,the error is caught in the catch block
      playingDatas = playingData2;
    } catch (err) {
      //here we set the outer playingData variable to this string indicating that nothing is currently being played
      playingDatas = "i am not listening to anything at the moment";
    }

    return playingDatas;
  }

  parsePlayingHtml(playingData) {
    //if i am not listening to anything or whats currently playing is not a song, do this
    if (typeof playingData === "string" || playingData?.type !== "track") {
      this.currentlyPlaying.innerHTML = "";
      this.currentlyPlaying.insertAdjacentHTML(
        "beforeend",
        `<p>i am not listening to anything at the moment</p>`
      );
    } else {
      this.currentlyPlaying.innerHTML = "";
      this.currentlyPlaying.insertAdjacentHTML(
        "beforeend",
        ` <a class="inner-playing" target="_blank" href="${playingData.external_urls.spotify}">LISTENING TO - ${playingData.name} by ${playingData.artists[0].name}</a>`
      );
    }
  }

  //converts our playlist data to html
  parsePlaylistHtml(playlistData) {
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

  //checks what i am listening to every 30 seconds
  async refreshCurrentlyPlaying() {
    setInterval(async () => {
      await this.checkIfTokenIsValid();
    }, 1000 * 30);
  }

  //checks if access token is valid then checks what i am currently listening to with it
  async checkIfTokenIsValid() {
    const dat = await authVars.base("spotData").find("recWBanJS64gcwbvL");

    //get the total time elapsed since our last access token was created
    const timeNow = new Date();
    const elapsedTime =
      Math.floor(timeNow - new Date(dat.fields.CREATED)) / 1000;

    //if the totaltime passed since we created our last access token has not passed 3600(1 hour), keep using that access token
    if (elapsedTime < dat.fields.TIME) {
      const playingData = await this.getCurrentlyPlaying(authVars.token);
      console.log(playingData);
      this.parsePlayingHtml(playingData.item);
    }
  }

  //gets the track i am currently listening to
  async getCurrentlyPlaying(token) {
    try {
      const request = await fetch(
        `https://api.spotify.com/v1/me/player/currently-playing`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!request.ok) {
        throw new Error(`An error occurred ${error.status}`);
      }
      const playingData = await this.handlePlayingFetch(request);

      return playingData;
    } catch (err) {
      this.currentlyPlaying.innerHTML = "";
      this.currentlyPlaying.insertAdjacentHTML("beforeend", `<p>${err}</p>`);
      throw err;
    }
  }

  handleError() {
    //check if there is an access token already
    this.getPlaylistAndPlaying(authVars.SPOTIFY_ID);
  }
}
export const playListUi = new Playlist();
