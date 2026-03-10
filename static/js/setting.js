/* MODALS */
const profileModal = document.getElementById("profileModal");
const passwordModal = document.getElementById("passwordModal");
const deleteModal = document.getElementById("deleteModal");

document.getElementById("editProfileBtn").onclick = () =>
    profileModal.style.display = "flex";

document.getElementById("changePassBtn").onclick = () =>
    passwordModal.style.display = "flex";

document.getElementById("deleteAccountBtn").onclick = () =>
    deleteModal.style.display = "flex";

document.querySelectorAll(".closeModal").forEach(btn =>
    btn.onclick = () => {
        profileModal.style.display = "none";
        passwordModal.style.display = "none";
        deleteModal.style.display = "none";
    }
);

/* Close modals on outside click */
[profileModal, passwordModal, deleteModal].forEach(modal => {
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });
});
