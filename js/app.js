/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sectionsList = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();
let options = {
  root: null,
  rootMargin: "-150px",
  threshold: 0.05,
};

/**
 * End Global Variables
 * 
 */
/**
 * 
 * creating navbar dynamically
 * 
 */

for (let i = 0; i < sectionsList.length; i++) {
  const section = sectionsList[i];
  const sectionId = section.getAttribute("id");
  const sectionTitle = section.getAttribute("data-nav");
  const newLi = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.textContent = sectionTitle;
  anchor.setAttribute("href", "#" + sectionId);
  anchor.setAttribute("class", "menu__link");

  /**
   * adding event listener to the links
   */
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
  newLi.appendChild(anchor);
  fragment.appendChild(newLi);
}
navList.appendChild(fragment);
/**
 * creating observer to observe the sections
 */

let allLinks = document.querySelectorAll("li");
allLinks[0].classList.add("your-active-class");
const observer = new IntersectionObserver(function callBack(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sectionsList.forEach((sec) => {
        allLinks.forEach((link) => {
          link.classList.remove("your-active-class");
          if (entry.target.getAttribute("data-nav") === link.innerText) {
            link.classList.add("your-active-class");
          } else {
            return;
          }
        });
        sec.classList.remove("your-active-class");
        entry.target.classList.add("your-active-class");
      });
    } else {
      return;
    }
  });
}, options);

for (let i = 0; i < sectionsList.length; i++) {
  observer.observe(sectionsList[i]);
}
