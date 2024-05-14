import { gsap } from "gsap";
import SplitType from "split-type";

class AboutSection {
  sectContainer = document.querySelector(".about");
  lastName = document.querySelector(".last-name");
  firstName = document.querySelector(".first-name");

  constructor() {
    this.splitText(this.lastName);
    this.splitText(this.firstName);
  }

  splitText(el) {
    const chars = new SplitType(el, { types: "chars" });
  }
}

export const AboutSect = new AboutSection();
