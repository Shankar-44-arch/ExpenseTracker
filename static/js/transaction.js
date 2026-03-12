/* ---- ADD MODAL ---- */
const modal = document.getElementById("transactionModal");
const categorySelect = document.getElementById("category");
const expenseBtn = document.getElementById("expenseBtn");
const incomeBtn = document.getElementById("incomeBtn");
const txnType = document.getElementById("txnType");

const categoryOptions = categorySelect.innerHTML;

document.getElementById("openAddModal").onclick = () => modal.style.display = "flex";
function closeModal() { modal.style.display = "none"; }

modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

function showExpense() {
    expenseBtn.classList.add("active");
    incomeBtn.classList.remove("active");
    txnType.value = "expense";
    categorySelect.innerHTML = categoryOptions;
    categorySelect.disabled = false;
}

function showIncome() {
    incomeBtn.classList.add("active");
    expenseBtn.classList.remove("active");
    txnType.value = "income";
    categorySelect.innerHTML = '<option value="Income">Income</option>';
    categorySelect.disabled = true;
}

/* Type switch buttons */
expenseBtn.addEventListener("click", showExpense);
incomeBtn.addEventListener("click", showIncome);

/* Cancel button */
document.querySelectorAll('#transactionModal .cancel').forEach(btn => {
    btn.addEventListener("click", closeModal);
});

/* ---- EDIT MODAL ---- */
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editCategory = document.getElementById("editCategory");
const editCategoryOptions = editCategory.innerHTML;

function openEditModal(pk, desc, cat, amount, date, type) {
    editForm.action = "/transaction/edit/" + pk + "/";
    document.getElementById("editDesc").value = desc;
    document.getElementById("editAmount").value = parseFloat(amount);
    document.getElementById("editDate").value = date;
    document.getElementById("editTxnType").value = type;

    if (type === 'income') {
        editShowIncome();
    } else {
        editShowExpense();
        editCategory.value = cat;
    }
    editModal.style.display = "flex";
}

function closeEditModal() { editModal.style.display = "none"; }
editModal.addEventListener("click", e => { if (e.target === editModal) closeEditModal(); });

function editShowExpense() {
    document.getElementById("editExpenseBtn").classList.add("active");
    document.getElementById("editIncomeBtn").classList.remove("active");
    document.getElementById("editTxnType").value = "expense";
    editCategory.innerHTML = editCategoryOptions;
    editCategory.disabled = false;
}

function editShowIncome() {
    document.getElementById("editIncomeBtn").classList.add("active");
    document.getElementById("editExpenseBtn").classList.remove("active");
    document.getElementById("editTxnType").value = "income";
    editCategory.innerHTML = '<option value="Income">Income</option>';
    editCategory.disabled = true;
}

/* Edit type switch buttons */
document.getElementById("editExpenseBtn").addEventListener("click", editShowExpense);
document.getElementById("editIncomeBtn").addEventListener("click", editShowIncome);

/* Edit cancel button */
document.querySelectorAll('#editModal .cancel').forEach(btn => {
    btn.addEventListener("click", closeEditModal);
});

/* ---- EDIT BUTTONS (data-attribute driven) ---- */
document.querySelectorAll('.edit-txn-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        openEditModal(btn.dataset.pk, btn.dataset.desc, btn.dataset.cat, btn.dataset.amount, btn.dataset.date, btn.dataset.type);
    });
});

/* ---- DELETE CONFIRMATION ---- */
document.querySelectorAll('td .inline-form').forEach(form => {
    form.addEventListener('submit', e => {
        if (!confirm('Delete this transaction?')) e.preventDefault();
    });
});

/* Prevent negative amounts */
document.querySelectorAll('input[type="number"]').forEach(inp => {
    inp.addEventListener("input", () => { if (inp.value < 0) inp.value = 0; });
});
