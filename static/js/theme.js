// ================= GLOBAL DARK MODE =================

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkModeToggle");
    if (!toggle) return;

    toggle.checked = localStorage.getItem("darkMode") === "enabled";
});


document.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("darkMode") === "enabled";

    if (isDark) {
        document.body.classList.add("dark");
    }
});

function toggleDarkMode(checkbox) {
    if (checkbox.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("darkMode", "enabled");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", "disabled");
    }
}
