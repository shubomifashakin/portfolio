import { gsap } from "gsap";

class Stables {
  timeEl = document.querySelector(".time");
  dateEl = document.querySelector(".date");
  mobileDateEl = document.querySelector(".mobile-date");
  sectionsContainer = document.querySelector(".sections");
  allDotsContainers = document.querySelectorAll(".dot-cont");
  sidebBarInner = document.querySelector(".current-page-inner");
  sidebarName = document.querySelector(".page-name");

  constructor() {
    //continuously set the time and date
    setInterval(this.currentDate.bind(this), 1000);

    //when any dot container is clicked
    this.allDotsContainers.forEach((c) => {
      return c.addEventListener("click", (e) => {
        if (!e.target.classList.contains("dot")) return;
        if (e.target.classList.contains("dot")) {
          this.activePage(e.target);
        }
      });
    });
  }

  currentDate() {
    this.dateEl.textContent = new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "full",
    })
      .format(new Date())
      .toUpperCase();

    this.mobileDateEl.textContent = new Intl.DateTimeFormat(
      navigator.language,
      {
        dateStyle: "short",
      }
    )
      .format(new Date())
      .toUpperCase();

    this.timeEl.textContent = new Intl.DateTimeFormat(navigator.language, {
      timeStyle: "medium",
      hour12: true,
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
