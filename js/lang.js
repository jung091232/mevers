
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    fetch('/lang/' + lang + '.json')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (data[key]) {
                    element.innerHTML = data[key];
                }
            });
        });
}

// Auto-apply stored language on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('language') || 'en';
    setLanguage(storedLang);

    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = storedLang;
        langSelect.addEventListener('change', function () {
            setLanguage(this.value);
        });
    }
});
