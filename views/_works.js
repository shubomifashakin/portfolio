import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

class Works {
  section2 = document.querySelector(".section-2");
  allWorks = document.querySelectorAll(".work");

  constructor() {
    //if its a mobile phone or the device screen size is within this condition

    this.mobileStyle();

    //if the window is resized and it satisfies dimensions in the function, add the style
    window.addEventListener("resize", this.mobileStyle.bind(this));
  }

  mobileStyle() {
    if (
      (innerWidth < 650 && innerHeight < 950) ||
      (innerHeight < 650 && innerWidth < 950) ||
      innerHeight < 599
    ) {
      gsap.to(this.section2, {
        scrollTrigger: {
          trigger: this.section2,
          end: "top +200px",
          onUpdate: ({ progress }) => {
            gsap.to(".work", { opacity: progress < 0.5 ? 0.5 : progress });
          },
        },
      });
    }
  }
}

export const WorkSection = new Works();
