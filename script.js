// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(17, 24, 39, 0.95)";
    navbar.style.backdropFilter = "blur(8px)";
    navbar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.backgroundColor = "transparent";
    navbar.style.backdropFilter = "none";
    navbar.style.boxShadow = "none";
  }
});

// Add animation to project cards when they come into view
const projectCards = document.querySelectorAll(".project-card");
const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

projectCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

// Animated year in footer
const animateYear = () => {
  const yearElement = document.querySelector(".animated-year");
  let currentYear = 2024;
  const targetYear = 2025;

  const updateYear = () => {
    yearElement.style.animation = "numberTransition 1s forwards";

    setTimeout(() => {
      currentYear++;
      yearElement.textContent = currentYear;
      yearElement.style.animation = "none";
      yearElement.offsetHeight; // Trigger reflow
      yearElement.style.animation = null;

      if (currentYear < targetYear) {
        setTimeout(updateYear, 2000);
      }
    }, 500);
  };

  setTimeout(updateYear, 2000);
};

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  animateYear();
});
