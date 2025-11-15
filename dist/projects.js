import { subscribeToLanguageChange, getCurrentLang } from "./lang.js";
/* ---------- Projects Section Title Translations ---------- */
const projectsSectionTitle = {
    es: "> Proyectos",
    en: "> Projects",
    it: "> Progetti",
    de: "> Projekte"
};
/* ---------- Projects Section Cards Translations ---------- */
const projects = [
    {
        title: {
            es: "Encriptador",
            en: "Encrypter",
            it: "Criptatore",
            de: "Verschlüssler"
        },
        image: "src/assets/images/encrypter.png",
        link: "https://github.com/Nags394/Portfolio"
    },
    {
        title: {
            es: "Ahorcado",
            en: "Hangman",
            it: "Impiccato",
            de: "Galgenmännchen"
        },
        image: "src/assets/images/hangman.png",
        link: "https://github.com/Nags394/Portfolio"
    },
    {
        title: {
            es: "Rastreador de humor",
            en: "Mood Tracker",
            it: "Tracciatore dell’umore",
            de: "Stimmungstracker"
        },
        image: "src/assets/images/moodTracker.png",
        link: "https://github.com/Nags394/Portfolio"
    },
    {
        title: {
            es: "Juego de memoria",
            en: "Memory Game",
            it: "Gioco di memoria",
            de: "Memory-Spiel"
        },
        image: "src/assets/images/memoryGame.png",
        link: "https://github.com/Nags394/Portfolio"
    },
    {
        title: {
            es: "E-commerce",
            en: "E-commerce",
            it: "E-commerce",
            de: "E-Commerce"
        },
        image: "src/assets/images/ecommerceLogo.png",
        link: "https://github.com/Nags394/Portfolio"
    }
];
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;
let intervalId = null;
/* ---------------------- Dynamic Render ---------------------- */
function renderProjects() {
    const lang = getCurrentLang();
    track.innerHTML = projects.map(p => `
    <div class="card">
      <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="card-inner">
        <img src="${p.image}" alt="${p.title[lang]}">
        <h3>${p.title[lang]}</h3>
      </a>
    </div>
  `).join('');
}
/* ---------------------- Carrousel ---------------------- */
function updateCarousel() {
    const card = track.querySelector('.card');
    if (!card)
        return;
    const total = projects.length;
    const cardWidth = card.offsetWidth;
    const visibleCards = window.innerWidth < 768 ? 1 : 4;
    const offset = -currentIndex * cardWidth;
    track.style.transform = `translateX(${offset}px)`;
}
function next() {
    const total = projects.length;
    const visibleCards = window.innerWidth < 768 ? 1 : 4;
    currentIndex = (currentIndex + 1) % (total - visibleCards + 1);
    updateCarousel();
}
function prev() {
    const total = projects.length;
    const visibleCards = window.innerWidth < 768 ? 1 : 4;
    currentIndex = (currentIndex - 1 + (total - visibleCards + 1)) % (total - visibleCards + 1);
    updateCarousel();
}
/* ---------------------- Auto-slide ---------------------- */
function startAutoSlide() {
    stopAutoSlide();
    intervalId = window.setInterval(next, 4000);
}
function stopAutoSlide() {
    if (intervalId)
        clearInterval(intervalId);
}
function renderProjectsTitle(lang) {
    const titleEl = document.getElementById('projects-title');
    if (titleEl) {
        titleEl.textContent = projectsSectionTitle[lang];
    }
}
/* ---------------------- Init ---------------------- */
function initCarousel() {
    const lang = getCurrentLang();
    renderProjectsTitle(lang); // <-- agregar aquí
    renderProjects();
    updateCarousel();
    startAutoSlide();
    nextBtn.addEventListener('click', () => {
        next();
        startAutoSlide();
    });
    prevBtn.addEventListener('click', () => {
        prev();
        startAutoSlide();
    });
    window.addEventListener('resize', updateCarousel);
}
/* ---------------------- Language change subcription ---------------------- */
subscribeToLanguageChange((lang) => {
    const previousScroll = currentIndex;
    renderProjectsTitle(lang); // <-- agregar aquí
    renderProjects();
    currentIndex = previousScroll;
    updateCarousel();
});
document.addEventListener('DOMContentLoaded', initCarousel);
