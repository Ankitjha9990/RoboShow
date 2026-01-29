// ============================================
// RoboShow - Project Detail Page Script
// ============================================

let currentProject = null;
let selectedRating = 0;

// Initialize detail page
function initDetailPage() {
    // Get project ID from URL
    const projectId = getUrlParameter('id');

    if (!projectId) {
        alert('No project ID provided');
        window.location.href = 'index.html';
        return;
    }

    // Load project
    currentProject = getProjectById(projectId);

    if (!currentProject) {
        alert('Project not found');
        window.location.href = 'index.html';
        return;
    }

    // Render project details
    renderProjectDetails();
    renderRatingSection();
    renderFeedbackForm();
    renderFeedbackList();
}

// Render project details
function renderProjectDetails() {
    // Update hero image
    const heroImg = document.getElementById('project-hero-img');
    if (heroImg) {
        heroImg.src = currentProject.image;
        heroImg.alt = currentProject.title;
    }

    // Update title
    const titleElement = document.getElementById('project-title');
    if (titleElement) {
        titleElement.textContent = currentProject.title;
    }

    // Update team
    const teamElement = document.getElementById('project-team');
    if (teamElement) {
        teamElement.textContent = currentProject.team;
    }

    // Update category
    const categoryElement = document.getElementById('project-category');
    if (categoryElement) {
        categoryElement.textContent = currentProject.category;
    }

    // Update date
    const dateElement = document.getElementById('project-date');
    if (dateElement) {
        dateElement.textContent = formatDate(currentProject.createdAt);
    }

    // Update description
    const descElement = document.getElementById('project-description');
    if (descElement) {
        descElement.textContent = currentProject.description;
    }

    // Update technologies
    const techList = document.getElementById('tech-list');
    if (techList) {
        techList.innerHTML = renderTechTags(currentProject.technologies);
    }
}

// Render rating section
function renderRatingSection() {
    const ratingContainer = document.getElementById('rating-container');
    if (!ratingContainer) return;

    // Display current average rating
    const avgRatingElement = document.getElementById('avg-rating');
    if (avgRatingElement) {
        avgRatingElement.textContent = currentProject.avgRating > 0
            ? currentProject.avgRating
            : 'No ratings yet';
    }

    const ratingInfo = document.getElementById('rating-info');
    if (ratingInfo) {
        ratingInfo.textContent = currentProject.totalRatings > 0
            ? `Based on ${currentProject.totalRatings} rating${currentProject.totalRatings !== 1 ? 's' : ''}`
            : 'Be the first to rate this project!';
    }

    // Create interactive star rating
    const starsContainer = document.getElementById('rating-stars');
    if (starsContainer) {
        starsContainer.innerHTML = '';
        createStarRating(starsContainer, currentProject.avgRating, true, 'large');

        // Listen for rating selection
        starsContainer.addEventListener('ratingSelected', function (e) {
            selectedRating = e.detail.rating;
        });
    }
}

// Render feedback form
function renderFeedbackForm() {
    const form = document.getElementById('feedback-form');
    if (!form) return;

    form.addEventListener('submit', handleFeedbackSubmit);
}

// Handle feedback submission
function handleFeedbackSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('feedback-name').value.trim() || 'Anonymous';
    const comment = document.getElementById('feedback-comment').value.trim();

    // Validate
    if (selectedRating === 0) {
        alert('Please select a rating (click on the stars above)');
        return;
    }

    if (!comment || comment.length < 10) {
        alert('Please provide a comment with at least 10 characters');
        return;
    }

    // Add feedback
    const feedbackData = {
        name: name,
        rating: selectedRating,
        comment: comment
    };

    try {
        currentProject = addFeedback(currentProject.id, feedbackData);

        // Reset form
        document.getElementById('feedback-form').reset();
        selectedRating = 0;

        // Re-render sections
        renderRatingSection();
        renderFeedbackList();

        // Show success
        alert('✅ Thank you for your feedback!');
    } catch (error) {
        alert('Error submitting feedback. Please try again.');
        console.error(error);
    }
}

// Render feedback list
function renderFeedbackList() {
    const container = document.getElementById('feedback-list');
    if (!container) return;

    if (!currentProject.feedback || currentProject.feedback.length === 0) {
        container.innerHTML = '<div class="no-feedback">No feedback yet. Be the first to share your thoughts!</div>';
        return;
    }

    // Sort feedback by date (newest first)
    const sortedFeedback = [...currentProject.feedback].reverse();

    container.innerHTML = sortedFeedback
        .map(feedback => renderFeedbackItem(feedback))
        .join('');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDetailPage);
} else {
    initDetailPage();
}
