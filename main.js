import { StableUi } from "./views/_stables";
import { AboutSect } from "./views/about";
import "./actions/auth";
import { playListUi } from "./views/play";

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "Please Work With Me!";
  } else {
    document.title = "SHUBOMI V1";
  }
});

const mouseEl = document.querySelector(".mouse");
document.addEventListener("mousemove", function (e) {
  mouseEl.style.top = `${e.clientY}px`;
  mouseEl.style.left = `${e.clientX}px`;
});
