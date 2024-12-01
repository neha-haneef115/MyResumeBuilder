const skillsBox = document.getElementById("skills") as HTMLElement;
const maxSkills = 5;

skillsBox.addEventListener("keydown", (event: KeyboardEvent) => {
  const currentLines = skillsBox.innerText.trim().split("\n");

  if (event.key === "Enter" && currentLines.length < maxSkills) {
    event.preventDefault();
    const enteredText = skillsBox.innerText.trim();

    if (enteredText !== "") {
      const bulletLines = currentLines.map(line => (line.startsWith("•") ? line : "• " + line));
      bulletLines.push("• ");
      skillsBox.innerText = bulletLines.join("\n");

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(skillsBox);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);

      skillsBox.scrollTop = skillsBox.scrollHeight;
    }
  } else if (currentLines.length >= maxSkills && event.key === "Enter") {
    event.preventDefault();
  }
});

function toggleSection(sectionId: string, iconElement: HTMLElement) {
  const section = document.getElementById(sectionId) as HTMLElement;
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    iconElement.classList.replace("bx-plus", "bx-minus");
  } else {
    section.style.display = "none";
    iconElement.classList.replace("bx-minus", "bx-plus");
  }
}

const sectionIds = ["sect1", "sect2", "sect3", "sect4", "sect5", "sect6", "sect7"];
sectionIds.forEach((sectionId) => {
  const sectionElement = document.getElementById(sectionId) as HTMLElement;
  sectionElement.addEventListener("click", () => {
    const icon = sectionElement.querySelector("i") as HTMLElement;
    toggleSection(`${sectionId.replace('sect', '')}1`, icon);
  });
});

const languageBox = document.getElementById("languageBox") as HTMLElement;
const maxLanguages = 5;

languageBox.addEventListener("keydown", (event: KeyboardEvent) => {
  const currentLines = languageBox.innerText.trim().split("\n");

  if (event.key === "Enter" && currentLines.length < maxLanguages) {
    event.preventDefault();
    const enteredText = languageBox.innerText.trim();

    if (enteredText !== "") {
      const bulletLines = currentLines.map(line => (line.startsWith("•") ? line : "• " + line));
      bulletLines.push("• ");
      languageBox.innerText = bulletLines.join("\n");

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(languageBox);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);

      languageBox.scrollTop = languageBox.scrollHeight;
    }
  } else if (currentLines.length >= maxLanguages && event.key === "Enter") {
    event.preventDefault();
  }
});
