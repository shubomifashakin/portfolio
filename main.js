import { StableUi } from "./views/_stables";
import { AboutSect } from "./views/about";
import "./actions/auth";
import { playListUi } from "./views/play";

import { gsap } from "gsap";

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "Please Work With Me!";
  } else {
    document.title = "SHUBOMI V1";
  }
});

//our mouse styles
const mouseEl = document.querySelector(".mouse");
//when mouse is in the document show mouse
document.addEventListener("mousemove", function (e) {
  gsap.to(mouseEl, { opacity: 1 });
  mouseEl.style.top = `${e.clientY}px`;
  mouseEl.style.left = `${e.clientX}px`;
});

//when mouse leaves doc hide mouse
document.addEventListener("mouseleave", function (e) {
  gsap.to(mouseEl, { opacity: 0 });
});
