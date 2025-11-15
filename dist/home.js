import { subscribeToLanguageChange, getCurrentLang } from "./lang.js";
/* ---------------------- Traducciones ---------------------- */
const homeTexts = {
    es: {
        line1: "Hola! Soy Naguib... ¿Puedo ayudarte en algo?",
        line2: "<span class='yes'>Sí</span> <span class='no'>No</span>"
    },
    en: {
        line1: "Hi! I'm Naguib... Can I help you with anything?",
        line2: "<span class='yes'>Yes</span> <span class='no'>No</span>"
    },
    it: {
        line1: "Ciao! Sono Naguib... Posso aiutarti?",
        line2: "<span class='yes'>Sì</span> <span class='no'>No</span>"
    },
    de: {
        line1: "Hallo! Ich bin Naguib... Kann ich dir helfen?",
        line2: "<span class='yes'>Ja</span> <span class='no'>Nein</span>"
    }
};
/* ---------------------- Elementos ---------------------- */
const line1El = document.getElementById("home-line-1");
const line2El = document.getElementById("home-line-2");
/* Cursor intermitente estilo terminal */
let cursorInterval = null;
/* ---------------------- Función de tipeo ---------------------- */
function typeText(element, text, minSpeed = 90, maxSpeed = 120) {
    return new Promise(resolve => {
        element.innerHTML = ""; // limpiamos
        let i = 0;
        function typeChar() {
            element.innerHTML = text.slice(0, i) + `<span class="cursor">|</span>`;
            i++;
            if (i <= text.length) {
                const speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
                setTimeout(typeChar, speed);
            }
            else {
                resolve();
            }
        }
        typeChar();
    });
}
/* ---------------------- Cursor parpadeante ---------------------- */
function startBlinkingCursor() {
    // evitar múltiples intervalos
    if (cursorInterval !== null)
        return;
    cursorInterval = window.setInterval(() => {
        const cursors = document.querySelectorAll(".cursor");
        cursors.forEach(c => {
            c.classList.toggle("invisible");
        });
    }, 500);
}
function stopBlinkingCursor() {
    if (cursorInterval !== null) {
        clearInterval(cursorInterval);
        cursorInterval = null;
    }
}
/* ---------------------- Render principal ---------------------- */
async function renderHome() {
    stopBlinkingCursor(); // por si venía de antes
    const lang = getCurrentLang();
    const { line1, line2 } = homeTexts[lang];
    // Tipear línea 1
    await typeText(line1El, line1, 40);
    const cursor1 = line1El.querySelector(".cursor");
    if (cursor1)
        cursor1.remove();
    // Tipear línea 2
    await typeText(line2El, line2, 40);
    startBlinkingCursor();
}
/* ---------------------- Inicialización ---------------------- */
document.addEventListener("DOMContentLoaded", () => {
    renderHome();
});
/* ---------------------- Re-render al cambiar idioma ---------------------- */
subscribeToLanguageChange(() => {
    renderHome();
});
