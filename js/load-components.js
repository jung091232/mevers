
document.addEventListener("DOMContentLoaded", function() {
  // Load Navigation
  fetch("nav.html")
    .then(res => res.text())
    .then(data => document.getElementById("navbar-placeholder").innerHTML = data);

  // Load Footer
  fetch("footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer-placeholder").innerHTML = data);

  // Load Header (head tag only applicable at page creation, so not dynamically injected)

  // Load Language Selector
  fetch("language.html")
    .then(res => res.text())
    .then(data => document.getElementById("language-placeholder").innerHTML = data);
});
