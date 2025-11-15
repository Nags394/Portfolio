import { getCurrentLang, subscribeToLanguageChange } from "./lang.js";
/* ---------- Networks Section Title Translations ---------- */
const networksTitle = {
    es: "> Mis redes",
    en: "> My Networks",
    it: "> Le mie reti",
    de: "> Meine Netzwerke"
};
const networkItems = [
    {
        name: "GitHub",
        image: "src/assets/images/github.png",
        url: "https://github.com/Nags394"
    },
    {
        name: "LinkedIn",
        image: "src/assets/images/linkedin.png",
        url: "https://www.linkedin.com/in/nicol%C3%A1s-naguib-hanna-mascarell-7b13231a4/"
    },
    {
        name: "Instagram",
        image: "src/assets/images/instagram.png",
        url: "https://instagram.com/tuUsuario"
    },
    {
        name: "Discord",
        image: "src/assets/images/discord.png",
        url: "https://discord.com/users/554362561957724196"
    }
];
/* ---------- Rendering ---------- */
function renderNetworksTitle(lang) {
    const titleEl = document.getElementById("networks-title");
    if (titleEl)
        titleEl.textContent = networksTitle[lang];
}
function renderNetworks() {
    const container = document.getElementById("networks-container");
    if (!container)
        return;
    container.innerHTML = networkItems
        .map((n) => `
      <a href="${n.url}" target="_blank" rel="noopener noreferrer" class="network-icon">
        <img src="${n.image}" alt="${n.name}">
      </a>
    `)
        .join("");
}
/* ---------- Init ---------- */
function initNetworks() {
    const lang = getCurrentLang();
    renderNetworksTitle(lang);
    renderNetworks();
    subscribeToLanguageChange((newLang) => {
        renderNetworksTitle(newLang);
        renderNetworks();
    });
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNetworks);
}
else {
    initNetworks();
}
