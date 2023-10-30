// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Load the "Profile" section by default
    loadSection("profile");

    // Event listener for navigation links
    document.querySelector("nav").addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            const targetSectionId = event.target.getAttribute("href").substring(1); // Remove the '#' character
            loadSection(targetSectionId);
        }
    });

    // Function to load a specific section
    // function loadSection(sectionId) {
    //     const sections = document.querySelectorAll("main section");
    //     sections.forEach(function (section) {
    //         section.style.display = "none";
    //     });

    //     const selectedSection = document.getElementById(sectionId);
    //     if (selectedSection) {
    //         selectedSection.style.display = "block";
    //     }

    //     // Load content for each section here (you can fetch data via AJAX, etc.)
    //     switch (sectionId) {
    //         case "profile":
    //             // Load profile content
    //             break;
    //         case "assignments":
    //             // Load assignments content
    //             break;
    //         case "internal-marks":
    //             // Load internal marks content
    //             break;
    //         case "progress-tracking":
    //             // Load progress tracking content
    //             break;
    //         case "result-section":
    //             // Load result section content
    //             break;
    //     }
    // }
});
