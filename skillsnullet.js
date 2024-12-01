var skillsBox = document.getElementById("skills");
var maxSkills = 5;

skillsBox.addEventListener("keydown", function (event) {
  var currentLines = skillsBox.innerText.trim().split("\n");

  if (event.key === "Enter" && currentLines.length < maxSkills) {
    event.preventDefault();
    var enteredText = skillsBox.innerText.trim();

    if (enteredText !== "") {
      var bulletLines = currentLines.map(line => (line.startsWith("•") ? line : "• " + line));
      bulletLines.push("• ");
      skillsBox.innerText = bulletLines.join("\n");

      var range = document.createRange();
      var selection = window.getSelection();
      range.selectNodeContents(skillsBox);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);

      skillsBox.scrollTop = skillsBox.scrollHeight;
    }
  } else if (currentLines.length >= maxSkills && event.key === "Enter") {
    event.preventDefault();
  }
});

function toggleSection(sectionId, iconElement) {
  const section = document.getElementById(sectionId);
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    iconElement.classList.replace("bx-plus", "bx-minus");
  } else {
    section.style.display = "none";
    iconElement.classList.replace("bx-minus", "bx-plus");
  }
}

document.getElementById("sect1").addEventListener("click", function () {
  const icon = this.querySelector("i");
  toggleSection("certification1", icon);
});

document.getElementById("sect2").addEventListener("click", function () {
  const icon = this.querySelector("i");
  toggleSection("language1", icon);
});

document.getElementById("sect3").addEventListener("click", function () {
  const icon = this.querySelector("i");
  toggleSection("summary1", icon);
});

document.getElementById("sect4").addEventListener("click", function () {
  const icon = this.querySelector("i");
  toggleSection("country1", icon);
});

document.getElementById("sect5").addEventListener("click", function () {
  const icon = this.querySelector("i");
  toggleSection("email1", icon);
});

document.getElementById("sect6").addEventListener("click", function () {
  const icon = this.querySelector("i");
  toggleSection("address1", icon);
});

document.getElementById("sect7").addEventListener("click", function () {
  const icon = this.querySelector("i");
  toggleSection("postalcode1", icon);
});

var languageBox = document.getElementById("languageBox");
var maxLanguages = 5;

languageBox.addEventListener("keydown", function (event) {
  var currentLines = languageBox.innerText.trim().split("\n");

  if (event.key === "Enter" && currentLines.length < maxLanguages) {
    event.preventDefault();
    var enteredText = languageBox.innerText.trim();

    if (enteredText !== "") {
      var bulletLines = currentLines.map(line => (line.startsWith("•") ? line : "• " + line));
      bulletLines.push("• ");
      languageBox.innerText = bulletLines.join("\n");

      var range = document.createRange();
      var selection = window.getSelection();
      range.selectNodeContents(languageBox);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);

      languageBox.scrollTop = languageBox.scrollHeight;
    }
  } else if (currentLines.length >= maxLanguages && event.key === "Enter") {
    event.preventDefault();
  }
});