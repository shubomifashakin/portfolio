class Stables {
  timeEl = document.querySelector(".time");
  dateEl = document.querySelector(".date");
  sectionsContainer = document.querySelector(".sections");
  allDotsContainers = document.querySelectorAll(".dot-cont");

  constructor() {
    //continuously set the time and date
    setInterval(this.currentDate.bind(this), 1000);

    //when any dot container is clicked
    this.allDotsContainers.forEach((c) => {
      return c.addEventListener("click", (e) => {
        if (!e.target.classList.contains("dot")) return;
        if (e.target.classList.contains("dot")) {
          this.activePage(e.target.dataset.nav);
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

    this.timeEl.textContent = new Intl.DateTimeFormat(navigator.language, {
      timeStyle: "medium",
      hour12: true,
    })
      .format(new Date())
      .toUpperCase();
  }

  activePage(no) {
    //remove the active class from all dots
    this.allDotsContainers.forEach((c) => {
      return [...c.children].forEach((ch) => {
        ch.classList.remove("active-page");
      });
    });

    //add the active class to all the child elements of the dot container clicked
    [...document.querySelector(`.dot-cont-${no}`).children].forEach((c) => {
      c.classList.add("active-page");
    });

    //go to the section clicked
    this.goToSection(no);
  }

  goToSection(no) {
    document
      .querySelector(`.section-${no}`)
      .scrollIntoView({ behavior: "smooth" });
  }
}

export const StableUi = new Stables();
