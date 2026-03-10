// Get card containers
const loginCard = document.getElementById("loginCard");
const signupCard = document.getElementById("signupCard");

// Switch to SIGNUP card
document.getElementById("toSignup").addEventListener("click", (e) => {
    e.preventDefault();
    loginCard.classList.remove("active");
    signupCard.classList.add("active");
});

// Switch to LOGIN card
document.getElementById("toLogin").addEventListener("click", (e) => {
    e.preventDefault();
    signupCard.classList.remove("active");
    loginCard.classList.add("active");
});

// ========== PASSWORD VISIBILITY TOGGLE ==========
document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
        const input = document.getElementById(btn.dataset.target);
        const eyeIcon = btn.querySelector(".eye-icon");
        const eyeOffIcon = btn.querySelector(".eye-off-icon");

        if (input.type === "password") {
            input.type = "text";
            eyeIcon.style.display = "block";
            eyeOffIcon.style.display = "none";
        } else {
            input.type = "password";
            eyeIcon.style.display = "none";
            eyeOffIcon.style.display = "block";
        }
    });
});
