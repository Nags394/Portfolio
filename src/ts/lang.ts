/* ----------------- Global Language Manager ----------------- */

export type Lang = 'es' | 'en' | 'it' | 'de';

let currentLang: Lang = 'es';
const listeners: Array<(lang: Lang) => void> = [];

/**
 * Devuelve el idioma actual
 */
export function getCurrentLang(): Lang {
  return currentLang;
}

/**
 * Cambia el idioma, actualiza botones y notifica a los listeners
 */
export function setLanguage(lang: Lang): void {
  if (lang === currentLang) return;

  currentLang = lang;

  // Actualizar estado visual de los botones
  document.querySelectorAll<HTMLButtonElement>('.langBtn')
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
export function subscribeToLanguageChange(handler: (lang: Lang) => void): void {
  listeners.push(handler);
}

/**
 * Inicializa los botones del selector de idioma
 */
function initLangSelector(): void {
  const langButtons = document.querySelectorAll<HTMLButtonElement>('.langBtn');

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang as Lang;
      setLanguage(lang);
    });
  });
}

/* ----------------- Auto-init ----------------- */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLangSelector);
} else {
  initLangSelector();
}
