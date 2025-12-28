const panels = document.querySelectorAll(".panel");
const images = document.querySelectorAll(".bg-layer .img");

panels.forEach(panel => {
    panel.addEventListener("click", () => {

        // Remove active from all panels
        panels.forEach(p => p.classList.remove("active"));

        // Add active only to clicked panel
        panel.classList.add("active");

        let id = panel.getAttribute("data-img");

        // Reset all images
        images.forEach(img => img.style.opacity = 0);

        // Show only the selected image
        document.querySelector(`.img${id}`).style.opacity = 1;
    });
});
