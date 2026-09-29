/* =========================================================
   GANG DOMESTIK
   OFFICIAL MOVIE WEBSITE
========================================================= */

"use strict";


/* =========================================================
   PROJECT DATA
========================================================= */

const TOTAL_SCENES = 25;

/*
  Nou rive sou Scene 05 nan production prompts yo.
  Lè nou fini yon lòt scene, chanje nimewo sa a.
*/

let completedScenes = 5;


const scenes = [
  {
    number: 1,
    title: "4:47 AM — MAX LEVE",
  },
  {
    number: 2,
    title: "FANMI AN AYITI",
  },
  {
    number: 3,
    title: "WOUT POU TRAVAY",
  },
  {
    number: 4,
    title: "APÈL 8:38 PM",
  },
  {
    number: 5,
    title: "MESAJ SEKRÈ A",
  },
  {
    number: 6,
    title: "3 MWA APRE",
  },
  {
    number: 7,
    title: "RIVE AYITI",
  },
  {
    number: 8,
    title: "RESEPSYON FANMI",
  },
  {
    number: 9,
    title: "KONBYEN W AP ENVESTI?",
  },
  {
    number: 10,
    title: "REYINYON FANMI",
  },
  {
    number: 11,
    title: "NOU WÈ DOLA A",
  },
  {
    number: 12,
    title: "2:13 AM — DOSYE A",
  },
  {
    number: 13,
    title: "PREMYE DOUT",
  },
  {
    number: 14,
    title: "PREMYE SABOTAJ",
  },
  {
    number: 15,
    title: "PA AKIZE. VERIFYE.",
  },
  {
    number: 16,
    title: "FO TRAYIZAN",
  },
  {
    number: 17,
    title: "PREMYE GWO PÈT",
  },
  {
    number: 18,
    title: "KIYÈS KI TE DI W?",
  },
  {
    number: 19,
    title: "MOUN KI KONNEN TWÒP",
  },
  {
    number: 20,
    title: "YO VLE PWOJÈ A",
  },
  {
    number: 21,
    title: "YO PANSE MAX ALE",
  },
  {
    number: 22,
    title: "PYÈJ LA",
  },
  {
    number: 23,
    title: "VERITE A",
  },
  {
    number: 24,
    title: "KONSEKANS",
  },
  {
    number: 25,
    title: "NOU KÒMANSE BATI",
  },
];


/* =========================================================
   DOM
========================================================= */

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");

const sceneGrid =
  document.getElementById("sceneGrid");

const progressText =
  document.getElementById("progressText");

const progressFill =
  document.getElementById("progressFill");

const backToTop =
  document.getElementById("backToTop");

const copyright =
  document.getElementById("copyright");

const trailerVideo =
  document.getElementById("trailerVideo");

const trailerPlaceholder =
  document.getElementById("trailerPlaceholder");

const playTrailer =
  document.getElementById("playTrailer");


/* =========================================================
   MOBILE MENU
========================================================= */

function openMenu() {

  mainNav.classList.add("open");

  document.body.classList.add("menu-open");

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  menuToggle.textContent = "✕";
}


function closeMenu() {

  mainNav.classList.remove("open");

  document.body.classList.remove("menu-open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.textContent = "☰";
}


function toggleMenu() {

  const isOpen =
    mainNav.classList.contains("open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}


if (menuToggle && mainNav) {

  menuToggle.addEventListener(
    "click",
    toggleMenu
  );


  mainNav
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });

}


/* =========================================================
   CREATE SCENE CARDS
========================================================= */

function renderScenes() {

  if (!sceneGrid) {
    return;
  }

  sceneGrid.innerHTML = "";


  scenes.forEach((scene) => {

    const card =
      document.createElement("article");

    const completed =
      scene.number <= completedScenes;


    card.className =
      completed
        ? "scene-card completed"
        : "scene-card";


    card.dataset.scene =
      String(scene.number);


    const formattedNumber =
      String(scene.number)
        .padStart(2, "0");


    card.innerHTML = `
      <div>
        <span class="scene-number">
          ${formattedNumber}
        </span>

        <h3 class="scene-title">
          ${scene.title}
        </h3>
      </div>

      <span class="scene-status">
        ${
          completed
            ? "PRODUCTION ACTIVE"
            : "UPCOMING"
        }
      </span>
    `;


    sceneGrid.appendChild(card);

  });

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

  const safeCompleted =
    Math.min(
      Math.max(completedScenes, 0),
      TOTAL_SCENES
    );


  const percentage =
    (
      safeCompleted /
      TOTAL_SCENES
    ) * 100;


  if (progressText) {

    progressText.textContent =
      `${safeCompleted} / ${TOTAL_SCENES}`;

  }


  if (progressFill) {

    progressFill.style.width =
      `${percentage}%`;

  }

}


/* =========================================================
   TRAILER
========================================================= */

function showTrailerMessage() {

  if (!trailerPlaceholder) {
    return;
  }

  const heading =
    trailerPlaceholder
      .querySelector("h3");

  const paragraph =
    trailerPlaceholder
      .querySelector("p");

  const status =
    trailerPlaceholder
      .querySelector("span");


  if (heading) {
    heading.textContent =
      "GANG DOMESTIK";
  }

  if (paragraph) {
    paragraph.textContent =
      "TRAILER AP PREPARE";
  }

  if (status) {
    status.textContent =
      "PAFWA, DANJE A PA SOTI DEYÒ.";
  }

}


if (
  playTrailer &&
  trailerVideo &&
  trailerPlaceholder
) {

  playTrailer.addEventListener(
    "click",
    async () => {

      /*
        Si trailer MP4 la deja nan:
        assets/trailer/gang-domestik-trailer.mp4

        browser la ap eseye jwe li.
      */

      try {

        trailerPlaceholder
          .classList
          .add("hidden");


        await trailerVideo.play();

      } catch (error) {

        trailerPlaceholder
          .classList
          .remove("hidden");

        showTrailerMessage();

      }

    }
  );


  trailerVideo.addEventListener(
    "error",
    () => {

      trailerPlaceholder
        .classList
        .remove("hidden");

      showTrailerMessage();

    }
  );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".main-nav a"
  );


function updateActiveNavigation() {

  let currentSection = "";


  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 150;


    if (
      window.scrollY >=
      sectionTop
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });


  navLinks.forEach((link) => {

    link.classList.remove("active");


    const href =
      link.getAttribute("href");


    if (
      href ===
      `#${currentSection}`
    ) {

      link.classList.add("active");

    }

  });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function updateBackToTop() {

  if (!backToTop) {
    return;
  }


  if (window.scrollY > 650) {

    backToTop
      .classList
      .add("visible");

  } else {

    backToTop
      .classList
      .remove("visible");

  }

}


if (backToTop) {

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }
  );

}


/* =========================================================
   SCROLL EVENTS
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    updateActiveNavigation();
    updateBackToTop();

  },
  {
    passive: true,
  }
);


/* =========================================================
   COPYRIGHT
========================================================= */

function setCopyright() {

  if (!copyright) {
    return;
  }


  const year =
    new Date().getFullYear();


  copyright.textContent =
    `© ${year} GANG DOMESTIK`;

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeGangDomestik() {

  renderScenes();

  updateProgress();

  updateActiveNavigation();

  updateBackToTop();

  setCopyright();

}


document.addEventListener(
  "DOMContentLoaded",
  initializeGangDomestik
);
