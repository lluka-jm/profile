const ENABLE_SHOW_HIDE_DETAILS = true;
const ENABLE_MOBILE_MENU_TOGGLE = false;
const ENABLE_ACTIVE_SECTION_INDICATOR = false;
const ENABLE_FORM_CONFIRMATION = false;

// This runs when the HTML page has finished loading
document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ Week 3 JavaScript connected.");

if (ENABLE_SHOW_HIDE_DETAILS) setupShowHideDetails();
if (ENABLE_MOBILE_MENU_TOGGLE) setupMobileMenuToggle();
if (ENABLE_ACTIVE_SECTION_INDICATOR) setupActiveSectionIndicator();
if (ENABLE_FORM_CONFIRMATION) setupFormConfirmation();


});

// ------------------------------------------------------
// 1) Show / Hide research details
// ------------------------------------------------------


function setupShowHideDetails() {
  // Select all buttons that control details panels
  const buttons = document.querySelectorAll(".toggle-details");

  buttons.forEach((btn) => {
    // aria-controls tells us which details panel this button controls
    const controlsId = btn.getAttribute("aria-controls");
    const details = document.querySelector(`#${controlsId}`);
    if (!details) return;

    btn.addEventListener("click", () => {
      // hidden attribute makes content accessible and simple to toggle
      const isHidden = details.hasAttribute("hidden");

      if (isHidden) {
        details.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      } else {
        details.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// ------------------------------------------------------
// 2) Mobile menu toggle (accessible)
// ------------------------------------------------------
function setupMobileMenuToggle() {
  const menuBtn = document.querySelector("#menuButton");
  const nav = document.querySelector("#siteNav");

  if (!menuBtn || !nav) return;

  // Start collapsed (simple mobile behaviour)
  nav.classList.add("is-collapsed");

  menuBtn.addEventListener("click", () => {
    // Toggle collapse class
    const isCollapsed = nav.classList.toggle("is-collapsed");
    const isOpen = !isCollapsed;

    // Update aria-expanded for screen readers
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

// ------------------------------------------------------
// 3) Active section indicator
// ------------------------------------------------------
function setupActiveSectionIndicator() {
  const statusEl = document.querySelector("#sectionStatus");
  const sections = document.querySelectorAll("main section[id]");

  if (!statusEl || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((e) => e.isIntersecting);
      if (visible) {
        // textContent is safe (treats content as plain text)
        statusEl.textContent = `You are viewing: ${visible.target.id}`;
      }
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
}

// ------------------------------------------------------
// 4) Accessible form confirmation (no backend)
// ------------------------------------------------------
function setupFormConfirmation() {
  const form = document.querySelector("#contactForm");
  const feedback = document.querySelector("#formFeedback");

  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Safe update: use textContent (no HTML injection risk)
    feedback.textContent = "✅ Thanks — your message has been recorded (demo only).";

    form.reset();
  });
}

