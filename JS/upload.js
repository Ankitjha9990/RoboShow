// ============================================
// RoboShow - Upload Page Script
// ============================================

// Initialize upload page
function initUploadPage() {
    const form = document.getElementById('upload-form');
    const resetBtn = document.getElementById('reset-btn');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', handleFormReset);
    }

    // Set active nav
    setActiveNav('upload');

    // Initialize technologies input handler
    initializeTechInput();
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const formData = {
        title: document.getElementById('project-title').value.trim(),
        team: document.getElementById('team-name').value.trim(),
        description: document.getElementById('description').value.trim(),
        category: document.getElementById('category').value,
        technologies: getTechnologies(),
        image: 'assets/placeholder.png'
    };

    // Validate form
    const errors = validateForm(formData);

    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return;
    }

    // Add project to storage
    try {
        const newProject = addProject(formData);

        // Show success message
        alert('🎉 Project uploaded successfully!\n\nProject ID: ' + newProject.id);

        // Redirect to home page
        window.location.href = 'index.html';
    } catch (error) {
        alert('Error uploading project. Please try again.');
        console.error(error);
    }
}

// Handle form reset
function handleFormReset(e) {
    e.preventDefault();

    if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
        document.getElementById('upload-form').reset();
        document.getElementById('tech-tags').innerHTML = '';
    }
}

// Validate form data
function validateForm(data) {
    const errors = [];

    if (!data.title || data.title.length < 3) {
        errors.push('• Project title must be at least 3 characters long');
    }

    if (!data.team || data.team.length < 2) {
        errors.push('• Team name must be at least 2 characters long');
    }

    if (!data.description || data.description.length < 20) {
        errors.push('• Description must be at least 20 characters long');
    }

    if (!data.category) {
        errors.push('• Please select a project category');
    }

    if (!data.technologies || data.technologies.length === 0) {
        errors.push('• Please add at least one technology');
    }

    return errors;
}

// Initialize technology input handling
function initializeTechInput() {
    const techInput = document.getElementById('technologies');
    const techTags = document.getElementById('tech-tags');

    if (!techInput || !techTags) return;

    techInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTechnology(this.value.trim(), techTags);
            this.value = '';
        }
    });

    // Add button for adding tech
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'btn btn-sm btn-outline';
    addButton.textContent = '+ Add';
    addButton.style.marginTop = '0.5rem';

    addButton.addEventListener('click', function () {
        const value = techInput.value.trim();
        if (value) {
            addTechnology(value, techTags);
            techInput.value = '';
        }
    });

    techInput.parentElement.appendChild(addButton);
}

// Add technology tag
function addTechnology(tech, container) {
    if (!tech) return;

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `${tech} <span style="cursor: pointer; margin-left: 0.25rem;" onclick="this.parentElement.remove()">×</span>`;

    container.appendChild(tag);
}

// Get all technologies from tags
function getTechnologies() {
    const techTags = document.getElementById('tech-tags');
    const tags = techTags.querySelectorAll('.tag');

    return Array.from(tags).map(tag => {
        return tag.textContent.replace('×', '').trim();
    });
}

// Set active navigation
function setActiveNav(page) {
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'upload.html' && page === 'upload') {
            link.classList.add('active');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUploadPage);
} else {
    initUploadPage();
}
