/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((node) => node.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((node) => {
  node.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });

    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/

const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

let modal = (modalClick) => {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modal(index);
  });
});

modalCloses.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    modalViews.forEach((modal) => {
      modal.classList.remove("active-modal");
    });
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  grabCursor: true,
  spaceBetween: 48,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/

function scrollHeader() {
  const nav = document.getElementById("header");

  this.scrollY >= 80
    ? nav.classList.add("scroll-header")
    : nav.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/

function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");

  this.scrollY >= 560
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

const getViewCount = () => {
  const options = {
    method: "POST",
    body: JSON.stringify({ identifier: Math.random() }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("https://web-production-53d4.up.railway.app/portfolio/addView", options)
    .then((res) => res.json())
    .then((json) => {
      document.getElementById(
        "views"
      ).innerHTML = `This portfolio has been viewed ${json.data} times`;
    });
};

const addDownloadCount = () => {
  const options = {
    method: "POST",
    body: JSON.stringify({ identifier: Math.random() }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(
    "https://web-production-53d4.up.railway.app/portfolio/addDownload",
    options
  )
    .then((res) => res.json())
    .then((json) => {
      document.getElementById(
        "download-resume"
      ).innerHTML = `This resume has been downloaded ${json.data} times`;
    });
};

const getDownloadCount = () => {
  fetch("https://web-production-53d4.up.railway.app/portfolio/getDownloads")
    .then((res) => res.json())
    .then((json) => {
      document.getElementById(
        "download-resume"
      ).innerHTML = `This resume has been downloaded ${json.data} times`;
    });
};

const addResponse = (e) => {
  e.preventDefault();
  console.log(initialFormData);
  const options = {
    method: "POST",
    body: JSON.stringify({ ...initialFormData }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(
    "https://web-production-53d4.up.railway.app/portfolio/addResponse",
    options
  )
    .then((res) => res.json())
    .then((json) => {
      alert(json.message);
    });
};

var initialFormData = {
  name: "",
  email: "",
  project: "",
  message: "",
};

const onInput = (e) => {
  initialFormData = {
    ...initialFormData,
    [e.target.name]: e.target.value,
  };
};

getViewCount();
getDownloadCount();

document
  .getElementById("download-btn")
  .addEventListener("click", addDownloadCount);

document.getElementById("contact-form").addEventListener("submit", addResponse);

document.getElementById("input_name").addEventListener("change", onInput);
document.getElementById("input_email").addEventListener("change", onInput);
document.getElementById("input_project").addEventListener("change", onInput);
document.getElementById("input_message").addEventListener("change", onInput);
