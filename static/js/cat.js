/* ---- GRID / LIST TOGGLE ---- */
const gridBtn = document.getElementById('gridViewBtn');
const listBtn = document.getElementById('listViewBtn');
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');

gridBtn.addEventListener('click', () => {
    gridView.style.display = 'grid';
    listView.style.display = 'none';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    gridView.style.display = 'none';
    listView.style.display = 'block';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

/* ---- ADD MODAL ---- */
const addModal = document.getElementById('addCategoryModal');
document.getElementById('addCategoryBtn').addEventListener('click', () => addModal.style.display = 'block');
document.getElementById('closeModal').addEventListener('click', () => addModal.style.display = 'none');
document.getElementById('cancelBtn').addEventListener('click', () => addModal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === addModal) addModal.style.display = 'none'; });

/* Icon selection (add) */
const presetIcons = document.querySelectorAll('#presetIcons .icon-option');
const selectedIconInput = document.getElementById('selectedIcon');
presetIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        presetIcons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
        selectedIconInput.value = icon.getAttribute('data-icon');
    });
});

/* ---- EDIT MODAL ---- */
const editModal = document.getElementById('editCategoryModal');
const editPresetIcons = document.querySelectorAll('#editPresetIcons .icon-option');
const editSelectedIconInput = document.getElementById('editSelectedIcon');

editPresetIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        editPresetIcons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
        editSelectedIconInput.value = icon.getAttribute('data-icon');
    });
});

document.getElementById('closeEditModal').addEventListener('click', () => editModal.style.display = 'none');
document.getElementById('cancelEditBtn').addEventListener('click', () => editModal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === editModal) editModal.style.display = 'none'; });

function openEditCatModal(pk, name, icon, desc) {
    document.getElementById('editCatForm').action = '/categories/edit/' + pk + '/';
    document.getElementById('editCatName').value = name;
    document.getElementById('editCatDesc').value = desc;
    editSelectedIconInput.value = icon;

    editPresetIcons.forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-icon') === icon);
    });

    editModal.style.display = 'block';
}

/* ---- EDIT BUTTONS (data-attribute driven) ---- */
document.querySelectorAll('.edit-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        openEditCatModal(btn.dataset.pk, btn.dataset.name, btn.dataset.icon, btn.dataset.desc);
    });
});

/* ---- DELETE CONFIRMATION (data-attribute driven) ---- */
document.querySelectorAll('.card-actions .inline-form, .list-actions .inline-form').forEach(form => {
    form.addEventListener('submit', e => {
        var msg = form.dataset.confirm || 'Delete this category?';
        if (!confirm(msg)) e.preventDefault();
    });
});
