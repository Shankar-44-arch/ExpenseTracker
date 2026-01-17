/* MODALS */
const profileModal = document.getElementById("profileModal");
const passwordModal = document.getElementById("passwordModal");

document.getElementById("editProfileBtn").onclick = () =>
    profileModal.style.display = "flex";

document.getElementById("changePassBtn").onclick = () =>
    passwordModal.style.display = "flex";

document.querySelectorAll(".closeModal").forEach(btn =>
    btn.onclick = () => {
        profileModal.style.display = "none";
        passwordModal.style.display = "none";
    }
);

/* IMAGE VALIDATION */
document.getElementById("profileUpload").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type) || file.size > 2_000_000) {
        alert("Only JPG/PNG images under 2MB allowed");
        return;
    }

    document.getElementById("profilePreview").src =
        URL.createObjectURL(file);
});

/* DARK MODE */
const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("dark") === "on") {
    document.body.classList.add("dark");
    toggle.checked = true;
}

toggle.onchange = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", toggle.checked ? "on" : "off");
};
