 // Toggle Grid/List Views
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

        // --- New Modal Code ---
        const modal = document.getElementById('addCategoryModal');
        const openModalBtn = document.getElementById('addCategoryBtn');
        const closeModalX = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');

        // Open Modal
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        // Close Modal functions
        const closeModal = () => {
            modal.style.display = 'none';
        };

        closeModalX.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        // Close if user clicks outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                closeModal();
            }
        });

        // Handle Form Submission
        document.getElementById('addCategoryForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('categoryName').value;
            const icon = document.getElementById('categoryIcon').value;
            const color = document.getElementById('categoryColor').value;

            // This is where you would normally send data to your Django backend
            console.log("New Category Added:", { name, icon, color });

            alert(`Category "${name}" added successfully!`);
            closeModal();
            e.target.reset(); // Clear form for next time
        });

        const descArea = document.getElementById('categoryDesc');
        const presetIcons = document.querySelectorAll('.icon-option');
        const fileInput = document.getElementById('categoryIconFile');
        const uploadBtn = document.getElementById('uploadBtn');
        const fileNameDisplay = document.getElementById('fileNameDisplay');

        let selectedIcon = "💰"; // Default

        // 1. Auto-Resize Description
        descArea.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // 2. Handle Preset Icon Selection
        presetIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                presetIcons.forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                selectedIcon = icon.getAttribute('data-icon');
                fileInput.value = ""; // Clear file if emoji is picked
                fileNameDisplay.innerText = "";
            });
        });

        // 3. Handle File Upload Trigger
        uploadBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                presetIcons.forEach(i => i.classList.remove('active'));
                selectedIcon = "custom-file";
                fileNameDisplay.innerText = "Selected: " + e.target.files[0].name;
            }
        });

        // 4. Form Submit
        document.getElementById('addCategoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                name: document.getElementById('categoryName').value,
                description: descArea.value,
                icon: selectedIcon === "custom-file" ? fileInput.files[0] : selectedIcon
            };
            console.log("Saving Category Data:", data);
            alert("Category Saved!");
            modal.style.display = 'none';
            e.target.reset();
            descArea.style.height = 'auto';
        });
