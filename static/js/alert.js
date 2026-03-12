// Set progress bar widths from data attributes
document.querySelectorAll('.progress-fill').forEach(function(bar) {
    bar.style.width = bar.dataset.percent + '%';
});

// Add Alert modal
document.getElementById('addAlertBtn').addEventListener('click', function() {
    document.getElementById('addAlertModal').classList.add('active');
});

// Edit Alert modal via data attributes
document.querySelectorAll('.edit-alert-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.getElementById('editAlertCategory').value = btn.dataset.category;
        document.getElementById('editAlertLimit').value = btn.dataset.limit;
        document.getElementById('editAlertForm').action = '/alerts/edit/' + btn.dataset.pk + '/';
        document.getElementById('editAlertModal').classList.add('active');
    });
});

// Delete confirmation via data attributes
document.querySelectorAll('.card-actions .inline-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
        var cat = form.querySelector('.delete').dataset.category;
        if (!confirm('Remove alert for "' + cat + '"?')) {
            e.preventDefault();
        }
    });
});

// Close modal
function closeAlertModal(id) {
    document.getElementById(id).classList.remove('active');
}

// Cancel buttons
document.querySelectorAll('.modal .cancel-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var overlay = btn.closest('.modal-overlay');
        if (overlay) overlay.classList.remove('active');
    });
});

// Close modal when clicking overlay
document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.classList.remove('active');
    });
});
