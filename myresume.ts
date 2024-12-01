import html2pdf from "html2pdf.js";

interface ResumeData {
  name?: string;
  phone?: string;
  education?: string;
  experience?: string;
  certification?: string;
  summary?: string;
  language?: string;
  skills?: string;
  email?: string;
  country?: string;
  postalcode?: string;
}


const resumeData: ResumeData | null = JSON.parse(localStorage.getItem("resumeData") || "null");

if (resumeData) {

  const setElementText = (id: string, text?: string) => {
    const element = document.getElementById(id);
    if (element && text) {
      element.textContent = text;
    }
  };


  setElementText("name", resumeData.name);
  setElementText("phone", resumeData.phone);
  setElementText("education", resumeData.education);
  setElementText("experience", resumeData.experience);
  setElementText("certification", resumeData.certification);
  setElementText("summary", resumeData.summary);
  setElementText("language", resumeData.language);
  setElementText("email", resumeData.email);
  setElementText("country", resumeData.country);
  setElementText("postalcode", resumeData.postalcode);

  if (resumeData.skills) {
    const skillsElement = document.getElementById("skills");
    if (skillsElement) {
      const skillsArray = resumeData.skills.split(',');
      skillsElement.innerHTML = skillsArray
        .map(skill => `<li style="list-style-type: disc; margin-bottom: 5px;">${skill.trim()}</li>`)
        .join('');
    }
  }

  const profileImage = document.getElementById("profile-image") as HTMLImageElement | null;
  const storedImage = localStorage.getItem("profileImage");
  if (profileImage && storedImage) {
    profileImage.src = storedImage;
  }
}

// Function to change the color theme
const changeColorTheme = (color: string): void => {
  document.documentElement.style.setProperty('--main-color1', color);
};

// Set up event listeners for color theme buttons
const addColorChangeListener = (id: string, color: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener('click', () => changeColorTheme(color));
  }
};

addColorChangeListener('color1', '#f6911e');
addColorChangeListener('color2', '#23169e');
addColorChangeListener('color3', '#19ab62');
addColorChangeListener('color4', '#e22424');


const downloadButton = document.querySelector('.download1');
if (downloadButton) {
  downloadButton.addEventListener('click', () => {
    const element = document.querySelector('.resume-template') as HTMLElement | null;
    if (element) {
      html2pdf()
        .set({
          filename: 'My_Resume.pdf',
          html2canvas: { scale: 3, useCORS: true },
          jsPDF: { format: [594, 847.25], orientation: 'portrait', unit: 'pt' },
        })
        .from(element)
        .save();
    }
  });
}

const editButton = document.getElementById("edit-button");
if (editButton) {
  editButton.addEventListener("click", () => {
    const resumeDataToEdit: ResumeData = {
      name: document.getElementById("name")?.textContent || "",
      phone: document.getElementById("phone")?.textContent || "",
      education: document.getElementById("education")?.textContent || "",
      experience: document.getElementById("experience")?.textContent || "",
      certification: document.getElementById("certification")?.textContent || "",
      summary: document.getElementById("summary")?.textContent || "",
      language: document.getElementById("language")?.textContent || "",
      skills: document.getElementById("skills")?.textContent || "",
      email: document.getElementById("email")?.textContent || "",
      country: document.getElementById("country")?.textContent || "",
      postalcode: document.getElementById("postalcode")?.textContent || "",
    };

    localStorage.setItem("resumeData", JSON.stringify(resumeDataToEdit));
    window.location.href = "index.html";
  });
}


const loadDataForEditing = (): void => {
  const resumeData: ResumeData | null = JSON.parse(localStorage.getItem("resumeData") || "null");

  if (resumeData) {
    const setValue = (id: string, value?: string) => {
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (input) input.value = value || "";
    };

    setValue("name", resumeData.name);
    setValue("phone", resumeData.phone);
    setValue("education", resumeData.education);
    setValue("experience", resumeData.experience);
    setValue("certification", resumeData.certification);
    setValue("summary", resumeData.summary);
    setValue("language", resumeData.language);
    setValue("skills", resumeData.skills);
    setValue("email", resumeData.email);
    setValue("country", resumeData.country);
    setValue("postalcode", resumeData.postalcode);
  }
};

if (window.location.pathname.includes("index.html")) {
  loadDataForEditing();
}


const saveButton = document.getElementById("save-button");
if (saveButton) {
  saveButton.addEventListener("click", () => {
    const editedData: ResumeData = {
      name: (document.getElementById("name") as HTMLInputElement)?.value || "",
      phone: (document.getElementById("phone") as HTMLInputElement)?.value || "",
      education: (document.getElementById("education") as HTMLInputElement)?.value || "",
      experience: (document.getElementById("experience") as HTMLInputElement)?.value || "",
      certification: (document.getElementById("certification") as HTMLInputElement)?.value || "",
      summary: (document.getElementById("summary") as HTMLInputElement)?.value || "",
      language: (document.getElementById("language") as HTMLInputElement)?.value || "",
      skills: (document.getElementById("skills") as HTMLInputElement)?.value || "",
      email: (document.getElementById("email") as HTMLInputElement)?.value || "",
      country: (document.getElementById("country") as HTMLInputElement)?.value || "",
      postalcode: (document.getElementById("postalcode") as HTMLInputElement)?.value || "",
    };

    localStorage.setItem("resumeData", JSON.stringify(editedData));
    window.location.href = "myresume.html";
  });
}
