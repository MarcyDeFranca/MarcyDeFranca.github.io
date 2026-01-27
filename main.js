// main.js

// Wartet, bis das HTML geladen ist (sicher auch ohne defer)
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".js-reveal");
  
    // Falls es keine Elemente gibt, nichts tun
    if (!elements.length) return;
  
    // Falls der Browser IntersectionObserver nicht kann: alles direkt anzeigen
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // nur einmal animieren
          }
        });
      },
      {
        threshold: 0.15, // startet, wenn ca. 15% sichtbar sind
        rootMargin: "0px 0px -10% 0px", // etwas früher triggern
      }
    );
  
    elements.forEach((el) => observer.observe(el));
  });

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("timelineSlider");
    if (!root) return;
  
    const track = root.querySelector(".my-slider__track");
    const slides = Array.from(root.querySelectorAll(".my-slide"));
    const prevBtn = root.querySelector(".my-slider__btn--prev");
    const nextBtn = root.querySelector(".my-slider__btn--next");
  
    if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;
  
    let index = 0;
  
    const update = () => {
      track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
  
      // Buttons: erster nur rechts, letzter nur links
      prevBtn.style.display = (index === 0) ? "none" : "";
      nextBtn.style.display = (index === slides.length - 1) ? "none" : "";
    };
  
    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index -= 1;
        update();
      }
    });
  
    nextBtn.addEventListener("click", () => {
      if (index < slides.length - 1) {
        index += 1;
        update();
      }
    });
  
    // Optional: Keyboard (links/rechts)
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });
    root.tabIndex = 0; // macht die Sektion fokussierbar für Tastatur
  
    update();
  });
  
  