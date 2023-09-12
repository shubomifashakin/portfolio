import { gsap } from "gsap";

class AboutSection {
  sectContainer = document.querySelector(".about");
  lastName = document.querySelector(".last-name");
  firstNameContainer = document.querySelector(".first-names");
  firstName1 = document.querySelector(".first-name-1");
  firstName2 = document.querySelector(".first-name-2");

  constructor() {
    this.splitText(this.lastName);
    this.splitText(this.firstName1);
    this.splitText(this.firstName2);

    this.firstNameAnim();
  }

  splitText(el) {
    const textContent = el.textContent;
    const textSplit = textContent.split("");
    const splitArray = textSplit.map((c) => {
      return c !== " "
        ? `<span class="hov-split">${c}</span>`
        : `<span>&nbsp;</span>`;
    });
    //clear the inner html of that element
    const joined = splitArray.join("");
    el.innerHTML = "";
    el.innerHTML = joined;
  }

  firstNameAnim() {
    const tl = gsap.timeline({
      defaults: { duration: 0.05, ease: "ease-in-out" },
    });

    tl.to(this.firstName1.querySelectorAll("span"), {
      stagger: 0.02,
      rotateX: "-90deg",
      color: "#000",
      delay: 0.5,
    }).to(
      this.firstName2.querySelectorAll("span"),
      { stagger: 0.03, rotateX: "0deg" },
      "<"
    );
  }
}

export const AboutSect = new AboutSection();
