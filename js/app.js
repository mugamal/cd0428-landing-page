// // /**
// //  * 
// //  * Manipulating the DOM exercise.
// //  * Exercise programmatically builds navigation,
// //  * scrolls to anchors from navigation,
// //  * and highlights section in viewport upon scrolling.
// //  * 
// //  * Dependencies: None
// //  * 
// //  * JS Version: ES2015/ES6
// //  * 
// //  * JS Standard: ESlint
// //  * 
// // */

// * Define Global Variables
let sectionNames = [];
// * End Global Variables

// * Start Helper Functions

// // Extract Section Names that have data-nav attribute
function extractSectionNames() {
  const sections = document.querySelectorAll('section');
  sectionNames = []; // Clear the array for each call

  sections.forEach(section => {
    const dataNav = section.getAttribute('data-nav');
    if (dataNav) {
      sectionNames.push(dataNav);
    }
  });
}
// * End Helper Functions

// * Begin Main Functions

// // Build the navigation
function buildNavbar() {
  const navbarList = document.getElementById('navbar__list');
  sectionNames.forEach(name => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    const sectionId = name.toLowerCase().replace(/\s+/g, '');
    anchor.href = `#${sectionId}`;
    anchor.textContent = name;
    listItem.appendChild(anchor);
    navbarList.appendChild(listItem);
  });
}

// // Add class 'active' to section when near top of viewport
function setActiveSections() {
  const sections = document.querySelectorAll('section');
  const activeClass = 'your-active-class'; // Replace with your desired class name
  const offset = 150; // Adjust this offset value as needed

  sections.forEach(section => {
    const box = section.getBoundingClientRect();
    if (box.top <= offset && box.bottom >= offset) {
      section.classList.add(activeClass);
    } else {
      section.classList.remove(activeClass);
    }
  });
}

// Scroll to anchor ID using scrollTo event
function scrollToSection(targetId) {
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  }
}
// * End Main Functions

// * Begin Events

// Build menu 
window.addEventListener('DOMContentLoaded', () => {
  extractSectionNames();
  buildNavbar();

  // Scroll to section on link click
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior

      const targetId = this.getAttribute('href');
      scrollToSection(targetId); // Use the scrollToSection function for smooth scrolling
    });
  });

  // Set sections as active
  document.addEventListener("scroll", setActiveSections);
});
// * End Events

