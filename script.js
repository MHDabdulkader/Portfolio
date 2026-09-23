// script.js — Project data, dynamic galleries, modal controls & interactive behavior

const projectsData = {
  chunky: {
    title: "Chunky – Real-Time Service Tracking & Booking App",
    type: "React Native • WebSockets • Laravel Reverb",
    badge: "Real-Time Tracking",
    description: "High-performance on-demand service tracking platform built with React Native. Leverages ultra-low-latency WebSockets (Laravel Reverb) to deliver real-time booking lifecycle synchronization — from provider acceptance and live en-route transit tracking to dynamic estimated cost recalculation.",
    tags: ["React Native", "WebSockets", "Laravel Reverb", "Live GPS Tracking", "Dynamic Pricing", "React Navigation"],
    features: [
      "Ultra-fast real-time booking status sync via Laravel Reverb WebSockets",
      "Live provider transit & en-route progress tracking with instant map updates",
      "Dynamic cost calculation adjusting to live service duration and provider specs",
      "Instant push-style event broadcasting for accepted, started, and completed states",
      "Optimized mobile state architecture preventing re-render lags during active streams"
    ],
    imgPrefix: "image/project_chunky_",
    imgCount: 11
  },
  layoverly: {
    title: "Layoverly – International Layover & Flight Tracking Platform",
    type: "React Native • Next.js • Travel APIs",
    badge: "Global Travel & Transit",
    description: "Comprehensive cross-platform travel companion connecting international passengers with verified local layover service providers. Features live commercial airplane/flight tracking, multi-timezone itinerary schedules, and seamless multi-currency checkout.",
    tags: ["React Native", "Next.js", "Flight Radar API", "International Travel", "Multi-Currency", "Tailwind CSS"],
    features: [
      "Real-time commercial flight & airplane status tracking with delay alerts",
      "Curated marketplace for airport layover services, transit tours, and lounge access",
      "Multi-timezone synchronization ensuring accurate rendezvous and departure timings",
      "Secure multi-currency payment integration supporting global travelers",
      "Dual client interface: passenger booking app and provider dispatch dashboard"
    ],
    imgPrefix: "image/project_layoverly_",
    imgCount: 9
  },
  bespoke: {
    title: "Bespoke – Custom Tailoring & Alteration Booking App",
    type: "React Native • Next.js • E-Commerce",
    badge: "Bespoke Fashion & Services",
    description: "Modern bespoke clothing alteration and custom tailoring booking application. Enables clients to schedule fitting appointments, input detailed garment measurement profiles, track alteration milestones, and manage custom wardrobe commissions.",
    tags: ["React Native", "Next.js", "Booking Flow", "Custom Measurement UI", "Order Tracking", "SaaS Dashboard"],
    features: [
      "Interactive garment alteration booking workflow with customizable service tiers",
      "Custom measurement profile management saving tailored dimensions for clients",
      "Step-by-step alteration progress tracking from intake to final fitting",
      "Comprehensive administration dashboard for tailor scheduling and order queueing",
      "High-fidelity mobile UI with smooth multi-step checkout and photo annotations"
    ],
    imgPrefix: "image/project_bespoke_",
    imgCount: 9
  },
  mise: {
    title: "Mise – Interactive Recipe Platform & Creator Studio",
    type: "React Native • Next.js • Creator Analytics",
    badge: "Culinary & Creator Studio",
    description: "Full-scale culinary platform bridging recipe discovery with an interactive guided cooking assistant. Empowers food creators and culinary providers to publish recipes with rich media while monitoring real-time view counts, audience retention, and cook engagement.",
    tags: ["React Native", "Next.js", "Creator Analytics", "Interactive Cooking", "Video Streaming", "REST APIs"],
    features: [
      "Distraction-free step-by-step interactive cooking mode with integrated timers",
      "Creator Studio analytics dashboard tracking view count, audience reach, and saves",
      "Dynamic ingredient recalculator scaling portions automatically per serving count",
      "Rich media recipe builder supporting high-res photography and instructional clips",
      "Cross-platform synchronization between web recipe catalog and mobile kitchen app"
    ],
    imgPrefix: "image/project_mise_",
    imgCount: 10
  }
};

// Current active modal state
let currentProjectId = null;
let currentImageIndex = 0;
let currentImages = [];

// Auto-build the image array
function getProjectImages(project) {
  return Array.from(
    { length: project.imgCount },
    (_, i) => `${project.imgPrefix}${i + 1}.png`
  );
}

function updateModalImage(index) {
  if (index < 0 || index >= currentImages.length) return;
  currentImageIndex = index;
  
  const mainImg = document.getElementById("modal-main-img");
  const counter = document.getElementById("modal-img-counter");
  const thumbs = document.querySelectorAll(".modal__thumb");
  
  if (mainImg) {
    mainImg.src = currentImages[currentImageIndex];
  }
  
  if (counter) {
    counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
  }
  
  thumbs.forEach((thumb, i) => {
    if (i === currentImageIndex) {
      thumb.classList.add("active");
      thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    } else {
      thumb.classList.remove("active");
    }
  });
}

function openProjectModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  currentProjectId = projectId;
  currentImages = getProjectImages(project);
  currentImageIndex = 0;

  const modal = document.getElementById("project-modal");
  const body = document.getElementById("modal-body-content");

  body.innerHTML = `
    <div class="modal__header-info">
      <div class="modal__meta-row">
        <span class="project__type">${project.type}</span>
        <span class="modal__badge-pill">${project.badge}</span>
      </div>
      <h2 class="modal__project-title">${project.title}</h2>
      <p class="modal__project-summary">${project.description}</p>
    </div>

    <div class="modal__gallery-wrapper">
      <div class="modal__gallery-main">
        <button class="modal__nav-btn modal__nav-btn--prev" id="modal-prev-btn" aria-label="Previous image">
          <i class='bx bx-chevron-left'></i>
        </button>
        <img src="${currentImages[0]}" id="modal-main-img" alt="${project.title}">
        <button class="modal__nav-btn modal__nav-btn--next" id="modal-next-btn" aria-label="Next image">
          <i class='bx bx-chevron-right'></i>
        </button>
        <span class="modal__img-counter" id="modal-img-counter">1 / ${currentImages.length}</span>
      </div>

      <div class="modal__thumbnails-wrapper">
        <div class="modal__thumbnails">
          ${currentImages.map((src, i) => `
            <div class="modal__thumb ${i === 0 ? "active" : ""}" data-index="${i}">
              <img src="${src}" alt="${project.title} screenshot ${i + 1}" loading="lazy">
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <div class="modal__details-grid">
      <div class="modal__features-col">
        <h3 class="modal__section-heading"><i class='bx bx-check-shield'></i> Core Architecture & Highlights</h3>
        <ul class="modal__features-list">
          ${project.features.map(f => `<li><i class='bx bx-check-circle'></i> <span>${f}</span></li>`).join("")}
        </ul>
      </div>
      <div class="modal__tech-col">
        <h3 class="modal__section-heading"><i class='bx bx-code-alt'></i> Technologies Used</h3>
        <div class="project__tags">
          ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  // Attach thumbnail clicks
  body.querySelectorAll(".modal__thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const idx = parseInt(thumb.dataset.index, 10);
      updateModalImage(idx);
    });
  });

  // Attach Prev/Next buttons
  document.getElementById("modal-prev-btn").addEventListener("click", () => {
    const nextIdx = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateModalImage(nextIdx);
  });

  document.getElementById("modal-next-btn").addEventListener("click", () => {
    const nextIdx = (currentImageIndex + 1) % currentImages.length;
    updateModalImage(nextIdx);
  });

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // restore background scroll
  currentProjectId = null;
}

// Global modal close handlers
document.getElementById("modal-close").addEventListener("click", closeProjectModal);
document.getElementById("modal-overlay").addEventListener("click", closeProjectModal);

// Keyboard arrow & Escape navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("project-modal");
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeProjectModal();
  } else if (e.key === "ArrowLeft") {
    if (currentImages.length > 0) {
      const nextIdx = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      updateModalImage(nextIdx);
    }
  } else if (e.key === "ArrowRight") {
    if (currentImages.length > 0) {
      const nextIdx = (currentImageIndex + 1) % currentImages.length;
      updateModalImage(nextIdx);
    }
  }
});

// Wire up open buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".open-modal-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openProjectModal(btn.dataset.project);
    });
  });

  // Make entire project cards clickable
  document.querySelectorAll(".project__card").forEach(card => {
    card.addEventListener("click", (e) => {
      const projectId = card.dataset.project;
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });

  // Mobile navigation toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show-menu");
    });

    document.querySelectorAll(".nav__link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
      });
    });
  }

  // Scroll active link detection
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      const navItem = document.querySelector(`.nav__menu a[href*='${sectionId}']`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add("active-link");
        } else {
          navItem.classList.remove("active-link");
        }
      }
    });

    // Scroll up button visibility
    const scrollUp = document.getElementById("scroll-up");
    if (scrollUp) {
      if (scrollY >= 400) {
        scrollUp.classList.add("show-scroll");
      } else {
        scrollUp.classList.remove("show-scroll");
      }
    }
  });

  // Simple form submission demo handler
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "<i class='bx bx-check-circle'></i> Message Sent!";
      submitBtn.style.background = "#22c55e";
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = "";
      }, 3000);
    });
  }
});