import { StableUi } from "./views/_stables";
import { AboutSect } from "./views/about";

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "Please Work With Me!";
  } else {
    document.title = "SHUBOMI V1";
  }
});
