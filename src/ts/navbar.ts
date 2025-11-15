import { subscribeToLanguageChange, getCurrentLang, Lang } from "./lang.js";

/* ---------------------- Traducciones ---------------------- */

const logoText: Record<Lang, string> = {
  es: "Mi Portfolio Profesional",
  en: "My Professional Portfolio",
  it: "Il Mio Portfolio Professionale",
  de: "Mein Professionelles Portfolio"
};

const menuTexts: Record<Lang, string[]> = {
  es: ["Home", "Sobre mí", "Proyectos", "Redes", "Contacto"],
  en: ["Home", "About Me", "Projects", "Social", "Contact"],
  it: ["Home", "Su di me", "Progetti", "Reti", "Contatto"],
  de: ["Home", "Über mich", "Projekte", "Netzwerke", "Kontakt"]
};

/* ---------------------- Elementos ---------------------- */

const logoEl = document.getElementById("nav-logo-text")!;
const menuToggle = document.getElementById("menu-toggle")!;
const menu = document.getElementById("nav-menu")!;
const menuLinks = menu.querySelectorAll("li a");

/* ---------------------- Render ---------------------- */

function renderNavbar() {
  const lang = getCurrentLang();

  /* Texto del logo */
  logoEl.textContent = logoText[lang];

  /* Texto del menú dinámico */
  const items = menuTexts[lang];
  menuLinks.forEach((link, index) => {
    link.textContent = items[index];
  });
}

document.addEventListener("DOMContentLoaded", () => {

  renderNavbar();

  menuToggle.addEventListener("click", () => {
    console.log("Menu toggle clicked");
    menu.classList.toggle("open");
  });

});

/* ---------------------- Re-render al cambiar idioma ---------------------- */

subscribeToLanguageChange(() => {
  renderNavbar();
});
/* Cerrar menú al hacer click en el botón de idioma */
const langBtn = document.querySelector(".nav-lang-btn a");

if (langBtn) {
  langBtn.addEventListener("click", () => {
    menu.classList.remove("open");
  });
}
