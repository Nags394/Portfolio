import { getCurrentLang, subscribeToLanguageChange } from "./lang.js";
/* ---------- Section Title Translations ---------- */
const contactSectionTitle = {
    es: "> Contáctame",
    en: "> Contact Me",
    it: "> Contattami",
    de: "> Kontaktieren Sie mich"
};
/* ---------- Placeholder Translations ---------- */
const placeholders = {
    name: {
        es: "Nombre",
        en: "Name",
        it: "Nome",
        de: "Name"
    },
    lastname: {
        es: "Apellido / Compañía",
        en: "Surname / Company",
        it: "Cognome / Azienda",
        de: "Nachname / Firma"
    },
    subject: {
        es: "Asunto",
        en: "Subject",
        it: "Oggetto",
        de: "Betreff"
    },
    message: {
        es: "Mensaje",
        en: "Message",
        it: "Messaggio",
        de: "Nachricht"
    }
};
/* ---------- Label Text (SPAN) Translations ---------- */
const labelTexts = {
    name: {
        es: "Nombre",
        en: "Name",
        it: "Nome",
        de: "Name"
    },
    lastname: {
        es: "Apellido / Compañía",
        en: "Surname / Company",
        it: "Cognome / Azienda",
        de: "Nachname / Firma"
    },
    subject: {
        es: "Asunto",
        en: "Subject",
        it: "Oggetto",
        de: "Betreff"
    },
    message: {
        es: "Mensaje",
        en: "Message",
        it: "Messaggio",
        de: "Nachricht"
    }
};
/* ---------- Submit Button Translations ---------- */
const submitTexts = {
    es: "Enviar",
    en: "Send",
    it: "Invia",
    de: "Senden"
};
/* ---------- RENDER TITLE ---------- */
function renderContactTitle(lang) {
    const titleEl = document.getElementById("contact-title");
    if (titleEl)
        titleEl.textContent = contactSectionTitle[lang];
}
/* ---------- RENDER PLACEHOLDERS ---------- */
function renderPlaceholders(lang) {
    const inputName = document.querySelector('input[name="name"]');
    const inputLastname = document.querySelector('input[name="lastname"]');
    const inputSubject = document.querySelector('input[name="subject"]');
    const textareaMessage = document.querySelector('textarea[name="message"]');
    if (inputName)
        inputName.placeholder = placeholders.name[lang];
    if (inputLastname)
        inputLastname.placeholder = placeholders.lastname[lang];
    if (inputSubject)
        inputSubject.placeholder = placeholders.subject[lang];
    if (textareaMessage)
        textareaMessage.placeholder = placeholders.message[lang];
}
/* ---------- RENDER LABEL SPANS ---------- */
function renderLabelTexts(lang) {
    const spanName = document.getElementById("label-name");
    const spanLastname = document.getElementById("label-lastname");
    const spanSubject = document.getElementById("label-subject");
    const spanMessage = document.getElementById("label-message");
    if (spanName)
        spanName.textContent = labelTexts.name[lang];
    if (spanLastname)
        spanLastname.textContent = labelTexts.lastname[lang];
    if (spanSubject)
        spanSubject.textContent = labelTexts.subject[lang];
    if (spanMessage)
        spanMessage.textContent = labelTexts.message[lang];
}
/* ---------- RENDER SUBMIT BUTTON ---------- */
function renderSubmitButton(lang) {
    const button = document.getElementById("contact-submit");
    if (button)
        button.textContent = submitTexts[lang];
}
/* ---------- INIT ---------- */
function initContact() {
    const lang = getCurrentLang();
    renderContactTitle(lang);
    renderPlaceholders(lang);
    renderLabelTexts(lang);
    renderSubmitButton(lang);
    setupFormSubmitHandler();
    subscribeToLanguageChange((newLang) => {
        renderContactTitle(newLang);
        renderPlaceholders(newLang);
        renderLabelTexts(newLang);
        renderSubmitButton(newLang);
    });
}
// --- Agregar en contact.ts (cliente) ---
function setupFormSubmitHandler() {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("contact-submit");
    if (!form)
        return;
    form.addEventListener("submit", async (e) => {
        var _a;
        e.preventDefault();
        // 1) Obtener token de reCAPTCHA
        const token = (_a = window.grecaptcha) === null || _a === void 0 ? void 0 : _a.getResponse();
        if (!token) {
            alert("Por favor completa el CAPTCHA");
            return;
        }
        // 2) Recolectar datos del formulario
        const formData = new FormData(form);
        const payload = {};
        formData.forEach((v, k) => {
            payload[k] = String(v);
        });
        payload["g-recaptcha-response"] = token;
        // 3) Enviar al endpoint serverless/backend que verificará el captcha
        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Enviando...";
            }
            const resp = await fetch("/.netlify/functions/verify-recaptcha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await resp.json();
            if (!resp.ok || !data.success) {
                alert("Captcha inválido o error en el servidor. Intenta nuevamente.");
                // opcional: grecaptcha.reset();
            }
            else {
                // Éxito: aquí podés mostrar mensaje de éxito, limpiar formulario, etc.
                alert("Mensaje enviado correctamente. ¡Gracias!");
                form.reset();
                window.grecaptcha.reset(); // resetea el widget
            }
        }
        catch (err) {
            console.error(err);
            alert("Error de conexión. Intenta de nuevo más tarde.");
        }
        finally {
            if (submitBtn) {
                // restaurar texto del botón (deberías traducirlo según idioma si lo haces)
                submitBtn.disabled = false;
                // renderSubmitButton(getCurrentLang()); // si preferís volver a texto traducido
            }
        }
    });
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContact);
}
else {
    initContact();
}
