// Function to highlight the active section in the navbar
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function highlightNav() {
    let scrollPosition = window.scrollY + 150; // Offset to activate earlier

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active"); // Remove active class from all
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active"); // Add active class to current section
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav);
});

document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal");

  modals.forEach((modal) => {
    modal.addEventListener("show.bs.modal", () => {
      modal.classList.add("fade", "show");
    });

    modal.addEventListener("hidden.bs.modal", () => {
      modal.classList.remove("show");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hero = document.querySelector(".hero");
  const overlay = document.querySelector(".hero::before");

  function updateOverlayHeight() {
    let heroHeight = hero.offsetHeight;
    document.documentElement.style.setProperty(
      "--hero-height",
      `${heroHeight}px`
    );
  }

  // Run on page load & when window resizes
  updateOverlayHeight();
  window.addEventListener("resize", updateOverlayHeight);
});

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("wrestleQuestVideo");
  const modal = document.getElementById("projectModal1");

  // Play with sound on hover
  video.addEventListener("mouseenter", function () {
    video.muted = false;
    video.play();
  });

  // Mute again when not hovering
  video.addEventListener("mouseleave", function () {
    video.muted = true;
  });

  // Play video when modal is opened
  modal.addEventListener("shown.bs.modal", function () {
    video.play();
    video.muted = true; // You can set to true if you want it muted initially
  });

  // Pause video and reset when modal is closed
  modal.addEventListener("hidden.bs.modal", function () {
    video.pause();
    video.currentTime = 0; // Reset video to the start
  });

  // Ensure video stops when the modal closes
  document
    .getElementById("projectModal1")
    .addEventListener("hidden.bs.modal", function () {
      video.pause();
      video.currentTime = 0; // Reset video when closing
      video.muted = true; // Mute sound when modal is closed
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  const sendBtn = document.getElementById("send-btn");
  const sendText = document.getElementById("send-text");
  const loadingSpinner = document.getElementById("loading-spinner");

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Apply Loading State
    sendBtn.disabled = true;
    sendBtn.classList.add("loading"); // Apply white button + accent spinner
    sendText.style.display = "none";
    loadingSpinner.style.display = "inline-block";

    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // Show "Sent!" text instead of a pop-up
      sendText.textContent = "Sent!";
    } else {
      sendText.textContent = "Failed!";
    }

    // Show the text and hide spinner
    loadingSpinner.style.display = "none";
    sendText.style.display = "inline";

    // Keep "Sent!" message for 2 seconds, then revert to "Send"
    setTimeout(() => {
      sendText.textContent = "Send";
      sendBtn.disabled = false;
      sendBtn.classList.remove("loading");
    }, 2000);
  });
});
