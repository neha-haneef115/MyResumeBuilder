document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById('image-input') as HTMLInputElement;
    const imageCircle = document.querySelector('.image-circle') as HTMLElement;
    const skillsInput = document.getElementById("skills") as HTMLInputElement;

    const requiredFields = [
        document.getElementById("name") as HTMLInputElement,
        document.getElementById("phone") as HTMLInputElement,
        document.getElementById("education") as HTMLInputElement,
        document.getElementById("experience") as HTMLInputElement,
    ];

    const optionalFields = [
        document.getElementById("certification") as HTMLInputElement,
        document.getElementById("summary") as HTMLInputElement,
        document.getElementById("email") as HTMLInputElement,
        document.getElementById("country") as HTMLInputElement,
        document.getElementById("languageBox") as HTMLElement,
        document.getElementById("postalcode") as HTMLInputElement,
        document.getElementById("address") as HTMLInputElement,
        imageInput,
        skillsInput,
    ];

    const generateButton = document.getElementById("download") as HTMLButtonElement;

   
    const resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
    if (resumeData) {
        (document.getElementById("name") as HTMLInputElement).value = resumeData.name || "";
        (document.getElementById("phone") as HTMLInputElement).value = resumeData.phone || "";
        (document.getElementById("education") as HTMLInputElement).value = resumeData.education || "";
        (document.getElementById("experience") as HTMLInputElement).value = resumeData.experience || "";
        (document.getElementById("certification") as HTMLInputElement).value = resumeData.certification || "";
        (document.getElementById("summary") as HTMLInputElement).value = resumeData.summary || "";
        (document.getElementById("email") as HTMLInputElement).value = resumeData.email || "";
        (document.getElementById("country") as HTMLInputElement).value = resumeData.country || "";
        (document.getElementById("postalcode") as HTMLInputElement).value = resumeData.postalcode || "";
        (document.getElementById("address") as HTMLInputElement).value = resumeData.address || "";

        const skillsInput = document.getElementById("skills") as HTMLInputElement;
        skillsInput.value = resumeData.skills || "";

        // Load the profile image if it exists
        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
            imageCircle.style.backgroundImage = `url('${storedImage}')`;
            imageCircle.style.backgroundSize = 'cover';
            imageCircle.style.backgroundPosition = 'center';
            const placeholderText = imageCircle.querySelector('h6') as HTMLElement;
            if (placeholderText) placeholderText.style.display = 'none';
        }
    }

    imageInput.addEventListener('change', function () {
        const file = imageInput.files ? imageInput.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target?.result) {
                    const result = e.target.result as string;
                    imageCircle.style.backgroundImage = `url('${result}')`;
                    imageCircle.style.backgroundSize = 'cover';
                    imageCircle.style.backgroundPosition = 'center';
                    const placeholderText = imageCircle.querySelector('h6') as HTMLElement;
                    if (placeholderText) placeholderText.style.display = 'none';
                    localStorage.setItem("profileImage", result);
                }
            };
            reader.readAsDataURL(file);
        }
        updateButtonState();
    });

    function checkRequiredFields(): boolean {
        return requiredFields.every(field =>
            field && (field.type === "file" ? (field.files?.length || 0) > 0 : field.value.trim() !== "")
        );
    }

    function updateButtonState(): void {
        generateButton.disabled = !checkRequiredFields();
    }

    requiredFields.forEach(field => {
        if (field) {
            field.addEventListener("input", updateButtonState);
        }
    });

    generateButton.addEventListener("click", function () {
        if (!checkRequiredFields()) {
            alert("Please fill all required fields!");
            return;
        }

        const skillsContent = skillsInput.value.trim().split("\n").map(skill => skill.replace(/^•\s*/, "")).join(", ");

        const resumeData = {
            name: (document.getElementById("name") as HTMLInputElement).value,
            phone: (document.getElementById("phone") as HTMLInputElement).value,
            education: (document.getElementById("education") as HTMLInputElement).value,
            experience: (document.getElementById("experience") as HTMLInputElement).value,
            certification: (document.getElementById("certification") as HTMLInputElement).value,
            summary: (document.getElementById("summary") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
            country: (document.getElementById("country") as HTMLInputElement).value,
            postalcode: (document.getElementById("postalcode") as HTMLInputElement).value,
            address: (document.getElementById("address") as HTMLInputElement).value,
            skills: skillsContent,
        };

        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        window.location.href = "myresume.html";
    });

    updateButtonState();
});
