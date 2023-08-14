class AboutSection {
  sectContainer = document.querySelector(".about");
  lastName = document.querySelector(".last-name");
  firstName = document.querySelector(".first-name");

  constructor() {
    this.splitText(this.lastName);
    this.splitText(this.firstName);
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
}

export const AboutSect = new AboutSection();
