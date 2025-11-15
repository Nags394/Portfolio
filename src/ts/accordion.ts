import { Lang, getCurrentLang, subscribeToLanguageChange } from './lang.js';

/* ----------------- Accordion Translations ----------------- */

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}
/* ---------- Accordion Section Title Translations ---------- */
const accordionSectionTitle: Record<Lang, string> = {
  es: "> Sobre mí",
  en: "> About Me",
  it: "> Su di me",
  de: "> Über mich"
};
const translations: Record<Lang, AccordionItem[]> = {
  es: [
    {
      id: 'about',
      title: 'Soy un desarrollador full-stack',
      content: `Mi nombre es Naguib Hanna, soy un desarrollador full-stack localizado en Mendoza, Argentina.
A pesar de estar dando mis primeros pasos como un desarrollador profesional, ya cuento con varios proyectos en mi haber y estoy determinado a encontrar nuevos desafíos.
Me enfoco en crear diseños accesibles y con identidad para que cualquiera pueda disfrutar.`
    },
    {
      id: 'frontend',
      title: 'Mis fortalezas front-end',
      content: `Cuento con vasta experiencia trabajando como desarrollador UX/UI con HTML, CSS y Javascript (tanto con Typescript como React) además de haber trabajado con Wordpress anteriormente.
Te invito a explorar algunos de mis proyectos aquí en mi sitio!`
    },
    {
      id: 'backend',
      title: 'Mis fortalezas back-end',
      content: `En lo que a back-end respecta, he trabajado principalmente con Python y Java así como varios de sus frameworks.
Si quisieras, puedes ver varios proyectos en mi perfil de Github.`
    },
    {
      id: 'other',
      title: 'Otras habilidades',
      content: `También tengo experiencia trabajando con ciberseguridad, lo que se complementa bien con mis otras habilidades al momento de crear una app o sitio web.
Aparte del mundo digital, hablo con fluidez inglés, al igual que un poco de alemán e italiano, además de ser hablante nativo de español.`
    }
  ],
  en: [
    {
      id: 'about',
      title: 'I am a full-stack developer',
      content: `My name is Naguib Hanna. I'm a full-stack developer based in Mendoza, Argentina.
Although I'm taking the first steps of my professional career, I already have several projects and I'm determined to take on new challenges.
I focus on creating accessible designs with identity so anyone can enjoy them.`
    },
    {
      id: 'frontend',
      title: 'My front-end strengths',
      content: `I have extensive experience as a UX/UI developer using HTML, CSS and JavaScript (both TypeScript and React) and have also worked with WordPress previously.
I invite you to explore some of my projects here on my site!`
    },
    {
      id: 'backend',
      title: 'My back-end strengths',
      content: `For back-end work I have mainly used Python and Java and several of their frameworks.
If you'd like, you can check multiple projects on my GitHub profile.`
    },
    {
      id: 'other',
      title: 'Other skills',
      content: `I also have experience working in cybersecurity, which pairs well with my other skills when building an app or website.
Besides digital skills, I speak fluent English, as well as some German and Italian, and I'm a native Spanish speaker.`
    }
  ],
  it: [
    {
      id: 'about',
      title: 'Sono uno sviluppatore full-stack',
      content: `Mi chiamo Naguib Hanna, sono uno sviluppatore full-stack con sede a Mendoza, Argentina.
Anche se mi trovo ai primi passi della carriera professionale, ho già diversi progetti e sono determinato ad affrontare nuove sfide.
Mi concentro su design accessibili e con identità in modo che chiunque possa apprezzarli.`
    },
    {
      id: 'frontend',
      title: 'Le mie competenze front-end',
      content: `Ho molta esperienza come sviluppatore UX/UI con HTML, CSS e JavaScript (sia TypeScript che React) e ho lavorato anche con WordPress.
Ti invito a esplorare alcuni dei miei progetti qui nel mio sito!`
    },
    {
      id: 'backend',
      title: 'Le mie competenze back-end',
      content: `Per il back-end ho principalmente lavorato con Python e Java e diversi dei loro framework.
Se vuoi, puoi vedere vari progetti sul mio profilo GitHub.`
    },
    {
      id: 'other',
      title: 'Altre competenze',
      content: `Ho anche esperienza nel campo della cybersecurity, che si integra bene con le altre competenze nella creazione di un'app o sito web.
Oltre al mondo digitale, parlo inglese fluentemente, oltre a un po' di tedesco e italiano; sono madrelingua spagnolo.`
    }
  ],
  de: [
    {
      id: 'about',
      title: 'Ich bin ein Full-Stack-Entwickler',
      content: `Mein Name ist Naguib Hanna, ich bin ein Full-Stack-Entwickler mit Sitz in Mendoza, Argentinien. 
Obwohl ich noch am Anfang meiner beruflichen Laufbahn stehe, habe ich bereits mehrere Projekte abgeschlossen und bin entschlossen, neue Herausforderungen anzunehmen. 
Ich konzentriere mich darauf, zugängliche Designs mit einer starken Identität zu schaffen, die für jeden erlebbar sind.`
    },
    {
      id: 'frontend',
      title: 'Meine Front-End-Stärken',
      content: `Ich habe umfangreiche Erfahrung als UX/UI-Entwickler mit HTML, CSS und JavaScript (sowohl TypeScript als auch React) und habe zuvor auch mit WordPress gearbeitet. 
Ich lade dich ein, einige meiner Projekte hier auf meiner Website zu entdecken!`
    },
    {
      id: 'backend',
      title: 'Meine Back-End-Stärken',
      content: `Im Bereich Back-End habe ich hauptsächlich mit Python und Java sowie mit mehreren ihrer Frameworks gearbeitet. 
Wenn du möchtest, kannst du verschiedene Projekte in meinem GitHub-Profil ansehen.`
    },
    {
      id: 'other',
      title: 'Weitere Fähigkeiten',
      content: `Ich habe außerdem Erfahrung im Bereich Cybersicherheit, was meine anderen Fähigkeiten bei der Entwicklung einer App oder Website gut ergänzt. 
Neben der digitalen Welt spreche ich fließend Englisch, ein wenig Deutsch und Italienisch und bin spanischer Muttersprachler.`
    }]
};

/* ----------------- Render & Logic ----------------- */

const accordionRoot = document.getElementById('accordion') as HTMLElement;
let openId: string | null = null;

/**
 * Render accordion by language
 */
function renderAccordion(lang: Lang) {
  const items = translations[lang];
  accordionRoot.innerHTML = '';

  items.forEach(item => {
    const article = document.createElement('div');
    article.className = 'ac-item';
    article.setAttribute('data-id', item.id);

    const header = document.createElement('button');
    header.className = 'ac-header';
    header.type = 'button';
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', `content-${item.id}`);

    const icon = document.createElement('span');
    icon.className = 'ac-icon';
    icon.textContent = '>';

    const title = document.createElement('div');
    title.className = 'ac-title';
    title.textContent = item.title;

    header.appendChild(icon);
    header.appendChild(title);

    const content = document.createElement('div');
    content.className = 'ac-content';
    content.id = `content-${item.id}`;
    content.setAttribute('aria-hidden', 'true');

    const inner = document.createElement('div');
    inner.className = 'ac-inner';

    item.content.split('\n').forEach(line => {
      const p = document.createElement('p');
      p.textContent = line.trim();
      inner.appendChild(p);
    });

    content.appendChild(inner);

    article.appendChild(header);
    article.appendChild(content);
    accordionRoot.appendChild(article);

    header.addEventListener('click', () => toggleItem(item.id));
  });

  if (openId) {
    const candidate = accordionRoot.querySelector<HTMLElement>(`.ac-item[data-id="${openId}"]`);
    if (candidate) openItem(openId);
    else openId = null;
  }
}

function openItem(id: string) {
  if (openId && openId !== id) {
    closeItem(openId);
  }

  const el = accordionRoot.querySelector<HTMLElement>(`.ac-item[data-id="${id}"]`);
  if (!el) return;

  el.classList.add('open');
  el.querySelector('.ac-header')!.setAttribute('aria-expanded', 'true');
  el.querySelector('.ac-content')!.setAttribute('aria-hidden', 'false');

  openId = id;
}

function closeItem(id: string) {
  const el = accordionRoot.querySelector<HTMLElement>(`.ac-item[data-id="${id}"]`);
  if (!el) return;

  el.classList.remove('open');
  el.querySelector('.ac-header')!.setAttribute('aria-expanded', 'false');
  el.querySelector('.ac-content')!.setAttribute('aria-hidden', 'true');

  if (openId === id) openId = null;
}

function toggleItem(id: string) {
  if (openId === id) closeItem(id);
  else openItem(id);
}
function renderAccordionTitle(lang: Lang) {
  const titleEl = document.getElementById('about-title');
  if (titleEl) {
    titleEl.textContent = accordionSectionTitle[lang];
  }
}
/* ----------------- Init ----------------- */

function init() {
  const lang = getCurrentLang();

  renderAccordionTitle(lang);
  renderAccordion(lang);

  // Re-render automatically when language changes
  subscribeToLanguageChange((newLang) => {
    renderAccordionTitle(newLang);
    renderAccordion(newLang);
  });
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
