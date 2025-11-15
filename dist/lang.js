/* ----------------- Global Language Manager ----------------- */
let currentLang = 'es';
const listeners = [];
/**
 * Devuelve el idioma actual
 */
export function getCurrentLang() {
    return currentLang;
}
/**
 * Cambia el idioma, actualiza botones y notifica a los listeners
 */
export function setLanguage(lang) {
    if (lang === currentLang)
        return;
    currentLang = lang;
    // Actualizar estado visual de los botones
    document.querySelectorAll('.langBtn')
        .forEach(btn => {
        const is = btn.dataset.lang === lang;
        btn.setAttribute('aria-pressed', String(is));
    });
    // Notificar a todos los módulos suscriptos (accordion, projects, etc)
    listeners.forEach(fn => fn(lang));
}
/**
 * Permite que otros módulos (accordion, projects, etc.) reaccionen al cambio de idioma
 */
export function subscribeToLanguageChange(handler) {
    listeners.push(handler);
}
/**
 * Inicializa los botones del selector de idioma
 */
function initLangSelector() {
    const langButtons = document.querySelectorAll('.langBtn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });
}
/* ----------------- Auto-init ----------------- */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLangSelector);
}
else {
    initLangSelector();
}
