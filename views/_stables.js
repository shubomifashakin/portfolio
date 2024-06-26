import { gsap } from "gsap";
import { polyfill } from "seamless-scroll-polyfill";

polyfill();

class Stables {
  mouseEl = document.querySelector(".mouse");
  timeEl = document.querySelector(".time");
  dateEl = document.querySelector(".date");
  mobileDateEl = document.querySelector(".mobile-date");
  sectionsContainer = document.querySelector(".sections");
  allDotsContainers = document.querySelectorAll(".dot-cont");
  sidebBarInner = document.querySelector(".current-page-inner");
  sidebarName = document.querySelector(".page-name");
  dotinfoCont = document.querySelector(".dot-info");

  constructor() {
    //continuously set the time and date
    setInterval(this.currentDate.bind(this), 1000);

    this.mouseHoverEffect();

    //when any dot container is clicked
    this.allDotsContainers.forEach((c) => {
      c.addEventListener("click", (e) => {
        if (!e.target.classList.contains("dot")) return;
        if (e.target.classList.contains("dot")) {
          this.activePage(e.target);
        }
      });

      let tl;
      c.querySelector(".dot").addEventListener("mouseenter", () => {
        const timeline = gsap.timeline({ defaults: { duration: 0.5 } });

        tl = timeline;

        timeline
          .to(this.mouseEl, {
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            padding: "0.5rem",
          })
          .to(".page-name", { color: "red" }, "<");
      });

      c.querySelector(".dot").addEventListener("mouseleave", () => {
        tl.timeScale(2.5);
        tl.reverse();
      });
    });

    //when mouse is in the document show mouse
    document.addEventListener("mousemove", (e) => {
      gsap.to(this.mouseEl, { opacity: 1 });
      this.mouseEl.style.top = `${e.clientY}px`;
      this.mouseEl.style.left = `${e.clientX}px`;
    });

    //when mouse leaves doc hide mouse
    document.addEventListener("mouseleave", (e) => {
      gsap.to(this.mouseEl, { opacity: 0 });
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        document.title = "Please Work With Me!";
      } else {
        document.title = "SHUBOMI V1";
      }
    });
  }

  mouseHoverEffect() {
    document.querySelectorAll("a").forEach((c) => {
      c.addEventListener("mouseenter", () => {
        gsap.to(this.mouseEl, {
          background: "rgba(255, 255, 255, 0.3)",
          borderStyle: "dashed",
          borderRadius: "50%",
          padding: "1rem",
          boxShadow: "0px 0px 15px #fff",
        });
      });

      c.addEventListener("mouseleave", () => {
        gsap.to(this.mouseEl, {
          background: "rgba(255, 0, 0, 0.3)",
          borderRadius: "0",
          padding: "0",
          borderStyle: "solid",
          boxShadow: "none",
        });
      });
    });
  }

  currentDate() {
    this.dateEl.textContent = new Intl.DateTimeFormat("en-NG", {
      dateStyle: "full",
    })
      .format(new Date())
      .toUpperCase();

    this.mobileDateEl.textContent = new Intl.DateTimeFormat("en-NG", {
      dateStyle: "short",
    })
      .format(new Date())
      .toUpperCase();

    this.timeEl.textContent = new Intl.DateTimeFormat("en-NG", {
      timeStyle: "medium",
      hourCycle: "h12",
      // hour12: true,
    })
      .format(new Date())
      .toUpperCase();
  }

  activePage(e) {
    //remove the active class from all dots
    this.allDotsContainers.forEach((c) => {
      return [...c.children].forEach((ch) => {
        ch.classList.remove("active-page");
      });
    });

    //add the active class to all the child elements of the dot container clicked
    [...document.querySelector(`.dot-cont-${e.dataset.nav}`).children].forEach(
      (c) => {
        c.classList.add("active-page");
      }
    );

    //go to the section clicked
    this.goToSection(e.dataset.nav);

    //change the text of the sidebar
    this.changeSideBarText(e.dataset.sectionName);
  }

  goToSection(no) {
    document
      .querySelector(`.section-${no}`)
      .scrollIntoView({ behavior: "smooth" });
  }

  changeSideBarText(sectionName) {
    const timeline = gsap.timeline({
      defaults: { duration: 0.75, ease: "ease-in-out" },
    });

    timeline
      .to(this.sidebarName, {
        filter: "blur(13px)",
        color: "red",

        onUpdate: () => {
          this.sidebarName.textContent = sectionName;
        },
      })
      .to(this.sidebarName, {
        filter: "blur(0)",
        color: "#fff",
      });
  }
}

export const StableUi = new Stables();
