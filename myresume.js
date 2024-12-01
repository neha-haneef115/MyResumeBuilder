const resumeData = JSON.parse(localStorage.getItem("resumeData"));

if (resumeData) {
 
  const nameElement = document.getElementById("name");
  if (nameElement) nameElement.textContent = resumeData.name;

  const phoneElement = document.getElementById("phone");
  if (phoneElement) phoneElement.textContent = resumeData.phone;

  const educationElement = document.getElementById("education");
  if (educationElement) educationElement.textContent = resumeData.education;

  const experienceElement = document.getElementById("experience");
  if (experienceElement) experienceElement.textContent = resumeData.experience;

  
  if (resumeData.certification) {
    const certElement = document.getElementById("certification");
    if (certElement) certElement.textContent = resumeData.certification;
  }

  if (resumeData.summary) {
    const summaryElement = document.getElementById("summary");
    if (summaryElement) summaryElement.textContent = resumeData.summary;
  }

  if (resumeData.language) {
    const languageElement = document.getElementById("language");
    if (languageElement) languageElement.textContent = resumeData.language;
  }

  if (resumeData.skills) {
    const skillsElement = document.getElementById("skills");
    if (skillsElement) {
     
      const skillsArray = resumeData.skills.split(',');
      skillsElement.innerHTML = skillsArray
        .map(skill => `<li style="list-style-type: disc; margin-bottom: 5px;">${skill.trim()}</li>`)
        .join('');
    }
  }

  if (resumeData.email) {
    const emailElement = document.getElementById("email");
    if (emailElement) emailElement.textContent = resumeData.email;
  }

  if (resumeData.country) {
    const countryElement = document.getElementById("country");
    if (countryElement) countryElement.textContent = resumeData.country;
  }

  if (resumeData.postalcode) {
    const postalCodeElement = document.getElementById("postalcode");
    if (postalCodeElement) postalCodeElement.textContent = resumeData.postalcode;
  }

  const profileImage = document.getElementById("profile-image");
  const storedImage = localStorage.getItem("profileImage");
  if (profileImage && storedImage) {
    profileImage.src = storedImage;
  }
}

// Function to change the color theme
function changeColorTheme(color) {
  document.documentElement.style.setProperty('--main-color1', color);
}


const color1 = document.getElementById('color1');
if (color1) color1.addEventListener('click', () => changeColorTheme('#f6911e'));

const color2 = document.getElementById('color2');
if (color2) color2.addEventListener('click', () => changeColorTheme('#23169e'));

const color3 = document.getElementById('color3');
if (color3) color3.addEventListener('click', () => changeColorTheme('#19ab62'));

const color4 = document.getElementById('color4');
if (color4) color4.addEventListener('click', () => changeColorTheme('#e22424'));

const downloadButton = document.querySelector('.download1');
document.querySelector('.download1').addEventListener('click', function () {
  const element = document.querySelector('.resume-template');

  html2pdf()
  .set({
    filename: 'My_Resume.pdf',
    html2canvas: {
      scale: 3,
      useCORS: true, 
    },
    jsPDF: {
      format: [594, 847.25], 
      orientation: 'portrait',
      unit: 'pt', 
    },
  })
  .from(element)
  .save();

});

const editButton = document.getElementById("edit-button");
if (editButton) {
  editButton.addEventListener("click", () => {
    const resumeDataToEdit = {
      name: document.getElementById("name").textContent,
      phone: document.getElementById("phone").textContent,
      education: document.getElementById("education").textContent,
      experience: document.getElementById("experience").textContent,
      certification: document.getElementById("certification").textContent,
      summary: document.getElementById("summary").textContent,
      language: document.getElementById("language").textContent,
      skills: document.getElementById("skills").textContent,
      email: document.getElementById("email").textContent,
      country: document.getElementById("country").textContent,
      postalcode: document.getElementById("postalcode").textContent,
    };

    localStorage.setItem("resumeData", JSON.stringify(resumeDataToEdit));

    window.location.href = "index.html";
  });
}

const loadDataForEditing = () => {
  const resumeData = JSON.parse(localStorage.getItem("resumeData"));

  if (resumeData) {
    document.getElementById("name").value = resumeData.name || "";
    document.getElementById("phone").value = resumeData.phone || "";
    document.getElementById("education").value = resumeData.education || "";
    document.getElementById("experience").value = resumeData.experience || "";
    document.getElementById("certification").value = resumeData.certification || "";
    document.getElementById("summary").value = resumeData.summary || "";
    document.getElementById("language").value = resumeData.language || "";
    document.getElementById("skills").value = resumeData.skills || "";
    document.getElementById("email").value = resumeData.email || "";
    document.getElementById("country").value = resumeData.country || "";
    document.getElementById("postalcode").value = resumeData.postalcode || "";
  }
};

if (window.location.pathname.includes("index.html")) {
  loadDataForEditing();
}

const saveButton = document.getElementById("save-button");
if (saveButton) {
  saveButton.addEventListener("click", () => {
    const editedData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      education: document.getElementById("education").value,
      experience: document.getElementById("experience").value,
      certification: document.getElementById("certification").value,
      summary: document.getElementById("summary").value,
      language: document.getElementById("language").value,
      skills: document.getElementById("skills").value,
      email: document.getElementById("email").value,
      country: document.getElementById("country").value,
      postalcode: document.getElementById("postalcode").value,
    };

    localStorage.setItem("resumeData", JSON.stringify(editedData));

    window.location.href = "myresume.html"; 
  });
}
