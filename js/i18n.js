
function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyTranslation(lang);
  document.documentElement.setAttribute("lang", lang);
  const select = document.querySelector('select#languageSelect');
  if (select) select.value = lang;
}

async function applyTranslation(lang) {
  const response = await fetch(`lang/${lang}.json`);
  const translations = await response.json();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.innerText = translations[key];
    }
  });

  // reflect selected language in dropdown
  const select = document.querySelector("select");
  if (select) {
    select.value = lang;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "en";  // default to English if none
  applyTranslation(lang);
  document.documentElement.setAttribute("lang", lang);
  const select = document.querySelector('select#languageSelect');
  if (select) select.value = lang;
});
