// Get page containers
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");

// Switch to LOGIN page
document.getElementById("toLogin").onclick = () => {
    document.body.className = "login"; // Change background state
    signupPage.classList.remove("active");
    loginPage.classList.add("active");
};

// Switch to SIGNUP page
document.getElementById("toSignup").onclick = () => {
    document.body.className = "signup"; // Change background state
    loginPage.classList.remove("active");
    signupPage.classList.add("active");
};
