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

// ================= AUTO-DISMISS MESSAGES =================

document.addEventListener("DOMContentLoaded", function () {
    var msgs = document.querySelectorAll(".messages");
    if (!msgs.length) return;

    msgs.forEach(function (container) {
        container.style.transition = "opacity 0.5s ease";
        setTimeout(function () {
            container.style.opacity = "0";
            setTimeout(function () { container.remove(); }, 500);
        }, 5000);
    });
});
