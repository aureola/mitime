document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Initialize Icons (Safe Check) ---
  if (window.lucide) {
    lucide.createIcons();
  } else {
    console.warn("Lucide icons library not loaded.");
  }

  // --- 2. Mobile Menu Logic ---
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // --- 3. Hero Slider Logic ---
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0 && dots.length > 0) {
    function showSlide(index) {
      // Handle wrapping
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;

      currentSlide = index;

      // Update Slides
      slides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.classList.add("active");
          slide.classList.remove("opacity-0", "z-0", "pointer-events-none");
          slide.classList.add("opacity-100", "z-10", "pointer-events-auto");
        } else {
          slide.classList.remove("active");
          slide.classList.remove("opacity-100", "z-10", "pointer-events-auto");
          slide.classList.add("opacity-0", "z-0", "pointer-events-none");
        }
      });

      // Update Dots
      dots.forEach((dot, i) => {
        // Reset styles for all dots
        dot.classList.remove("bg-primary", "scale-125", "before:w-5", "before:h-5", "before:inline-block", "before:border", "before:border-0.5", "before:border-primary", "before:rounded-xl", "before:-translate-y-1", "before:-translate-x-1");
        dot.classList.add("bg-primary");
        dot.innerHTML = ""; // Clear existing content (numbers)

        if (i === currentSlide) {
          // Active dot styles
          dot.classList.remove("bg-primary");
          dot.classList.add("bg-primary", "scale-125", "before:w-5", "before:h-5", "before:inline-block", "before:border", "before:border-0.5", "before:border-primary", "before:rounded-xl", "before:-translate-y-1", "before:-translate-x-1");

          // // Add number label
          // const numberSpan = document.createElement("span");
          // numberSpan.className =
          //   "absolute left-6 top-1/2 -translate-y-1/2 text-white text-[10px] font-bold tracking-wider opacity-100 whitespace-nowrap";
          // numberSpan.innerText = `0${i + 1}`;
          // dot.appendChild(numberSpan);
        }
      });
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function startInterval() {
      // Clear existing to be safe
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }

    // Add Click Events to Dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetInterval();
      });
    });

    // Initialize
    showSlide(0);
    startInterval();
  }

  // --- 4. Timeline Logic ---
  const scrollLeftBtn = document.getElementById("scroll-left");
  const scrollRightBtn = document.getElementById("scroll-right");
  const timelineContainer = document.getElementById("timeline-container");
  const yearButtons = document.querySelectorAll(".timeline-year");

  if (timelineContainer) {
    // Scroll Buttons
    if (scrollLeftBtn) {
      scrollLeftBtn.addEventListener("click", () => {
        timelineContainer.scrollBy({ left: -320, behavior: "smooth" });
      });
    }

    if (scrollRightBtn) {
      scrollRightBtn.addEventListener("click", () => {
        timelineContainer.scrollBy({ left: 320, behavior: "smooth" });
      });
    }

    // Year Navigation
    yearButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Visual update for buttons
        yearButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Scroll to specific card
        const targetId = btn.getAttribute("data-target");
        if (targetId) {
          const targetCard = document.getElementById(targetId);
          if (targetCard) {
            // Using scrollIntoView with smooth behavior
            targetCard.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }
        }
      });
    });
  }
});
