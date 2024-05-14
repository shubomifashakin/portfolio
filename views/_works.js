import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

class Works {
  section2 = document.querySelector(".section-2");
  allWorks = document.querySelectorAll(".work");

  constructor() {
    //if its a mobile phone or the device screen size is within this condition

    this.mobileStyle();
  }

  mobileStyle() {
    let mm = gsap.matchMedia(this.section2);
    mm.add(
      "(min-width: 651px), (max-width: 1200px), (min-height: 600px)",
      () => {
        gsap.to(this.section2, {
          scrollTrigger: {
            trigger: this.section2,
            end: "top +200px",
            scrub: true,
            onUpdate: ({ progress }) => {
              gsap.to(".work", { opacity: progress < 0.3 ? 0.3 : progress });
            },
          },
        });
      }
    );
  }
}

export const WorkSection = new Works();
