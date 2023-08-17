import { StableUi } from "./views/_stables";
import { AboutSect } from "./views/about";
import "./actions/auth";
import { playListUi } from "./views/play";

//PREVIOUS JAVASCRIPT CODE USING SPOTIFY AUTHORIZATION FLOW TO ACCESS currently playing (uncomment to use)

/** 
const params = new URLSearchParams(window.location.search).get("code");

//if there is no code in the url, get code from spotify
//after we have gotten a code spotify redirects to url

 if (!params) {
   document.location.href =
    "https://accounts.spotify.com/authorize?response_type=code&client_id=d1ea2b45fa074764af0f2a9ba2dcb9d0&scope=playlist-read-collaborative%20playlist-read-private%20user-read-currently-playing&redirect_uri=https://olashubomi.netlify.app/";
 } else {
  //when spotify redirects to our url, remove all search params from our url

  // Get the current URL and create a URL object
   const currentUrl = new URL(window.location.href);

   // Create a new empty URLSearchParams object
   const newSearchParams = new URLSearchParams();

   // Update the URL search params with the new empty object
  currentUrl.search = newSearchParams.toString();

  // Replace the current URL with the updated one (removing search params)
  window.history.replaceState({}, document.title, currentUrl);
 }

**/

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "Please Work With Me!";
  } else {
    document.title = "SHUBOMI V1";
  }
});

//our mouse styles
const mouseEl = document.querySelector(".mouse");
document.addEventListener("mousemove", function (e) {
  mouseEl.style.top = `${e.clientY}px`;
  mouseEl.style.left = `${e.clientX}px`;
});
