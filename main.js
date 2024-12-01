var imageInput = document.getElementById('image-input');
var imageCircle = document.querySelector('.image-circle');

imageCircle.addEventListener('click', function (event) {
    event.stopPropagation();
    imageInput.click();
});

document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById('image-input');
    const imageCircle = document.querySelector('.image-circle');
    const skillsInput = document.getElementById("skills");

    const requiredFields = [
        document.getElementById("name"),
        document.getElementById("phone"),
        document.getElementById("education"),
        document.getElementById("experience")
    ];

    const optionalFields = [
        document.getElementById("certification"),
        document.getElementById("summary"),
        document.getElementById("email"),
        document.getElementById("country"),
        document.getElementById("languageBox"),
        document.getElementById("postalcode"),
        document.getElementById("address"),
        imageInput,
        skillsInput
    ];

    const generateButton = document.getElementById("download");

    // Load data from localStorage if available
    const resumeData = JSON.parse(localStorage.getItem("resumeData"));
    if (resumeData) {
        document.getElementById("name").value = resumeData.name || "";
        document.getElementById("phone").value = resumeData.phone || "";
        document.getElementById("education").value = resumeData.education || "";
        document.getElementById("experience").value = resumeData.experience || "";
        document.getElementById("certification").value = resumeData.certification || "";
        document.getElementById("summary").value = resumeData.summary || "";
        document.getElementById("email").value = resumeData.email || "";
        document.getElementById("country").value = resumeData.country || "";
        document.getElementById("postalcode").value = resumeData.postalcode || "";
        document.getElementById("address").value = resumeData.address || "";
        
        const skillsInput = document.getElementById("skills");
        skillsInput.value = resumeData.skills || "";

        // Load the profile image if it exists
        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
            imageCircle.style.backgroundImage = `url('${storedImage}')`;
            imageCircle.style.backgroundSize = 'cover';
            imageCircle.style.backgroundPosition = 'center';
            imageCircle.querySelector('h6').style.display = 'none';
        }
    }

    imageInput.addEventListener('change', function () {
        var file = imageInput.files ? imageInput.files[0] : null;
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var result = e.target.result;
                imageCircle.style.backgroundImage = "url('" + result + "')";
                imageCircle.style.backgroundSize = 'cover';
                imageCircle.style.backgroundPosition = 'center';
                imageCircle.querySelector('h6').style.display = 'none';
                localStorage.setItem("profileImage", result);
            };
            reader.readAsDataURL(file);
        }
        updateButtonState();
    });

    function checkRequiredFields() {
        return requiredFields.every(field =>
            field && (field.type === "file" ? field.files.length > 0 : field.value.trim() !== "")
        );
    }

    function updateButtonState() {
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

        const skillsContent = skillsInput ? skillsInput.innerText.trim().split("\n").map(skill => skill.replace(/^•\s*/, "")).join(", ") : "";

        const resumeData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            education: document.getElementById("education").value,
            experience: document.getElementById("experience").value,
            image: imageInput.files.length > 0 ? imageInput.files[0] : null,
            certification: document.getElementById("certification").value,
            summary: document.getElementById("summary").value,
            email: document.getElementById("email").value,
            country: document.getElementById("country").value,
            language: document.getElementById("languageBox").innerText,
            postalcode: document.getElementById("postalcode").value,
            address: document.getElementById("address").value,
            skills: skillsContent
        };

        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        window.location.href = "myresume.html";
    });

    updateButtonState();
});
