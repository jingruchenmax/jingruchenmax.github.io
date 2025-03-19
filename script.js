document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("theme-toggle");
    const root = document.documentElement;

    // Detect system theme preference
    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // Get user preference from localStorage OR fallback to system theme
    let savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        savedTheme = getSystemTheme();
    }

    // Apply saved or system theme
    if (savedTheme === "dark") {
        root.classList.add("dark-mode");
        root.setAttribute("data-theme", "dark");
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        root.classList.remove("dark-mode");
        root.setAttribute("data-theme", "light");
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle theme manually
    toggleButton.addEventListener("click", function () {
        if (root.classList.contains("dark-mode")) {
            root.classList.remove("dark-mode");
            root.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            root.classList.add("dark-mode");
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});
