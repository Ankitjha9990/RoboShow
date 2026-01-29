// ============================================
// RoboShow - Rating System
// ============================================

// Create interactive star rating UI
function createStarRating(container, currentRating = 0, interactive = true, size = 'normal') {
    const starsContainer = document.createElement('div');
    starsContainer.className = size === 'large' ? 'rating-stars-large' : 'rating-stars';

    let selectedRating = 0;

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        star.dataset.value = i;

        if (i <= Math.round(currentRating)) {
            star.classList.add('filled');
        }

        if (interactive) {
            // Hover effect
            star.addEventListener('mouseenter', () => {
                updateStarDisplay(starsContainer, i);
            });

            // Click to select
            star.addEventListener('click', () => {
                selectedRating = i;
                updateStarDisplay(starsContainer, i);

                // Trigger custom event
                const event = new CustomEvent('ratingSelected', { detail: { rating: i } });
                container.dispatchEvent(event);
            });
        }

        starsContainer.appendChild(star);
    }

    // Reset on mouse leave if interactive
    if (interactive) {
        starsContainer.addEventListener('mouseleave', () => {
            const ratingToShow = selectedRating > 0 ? selectedRating : currentRating;
            updateStarDisplay(starsContainer, ratingToShow);
        });
    }

    container.appendChild(starsContainer);
    return starsContainer;
}

// Update star display
function updateStarDisplay(starsContainer, rating) {
    const stars = starsContainer.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

// Render static rating stars (non-interactive)
function renderRatingStars(rating) {
    let starsHTML = '<div class="rating-stars">';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= Math.round(rating) ? 'filled' : '';
        starsHTML += `<span class="star ${filled}">★</span>`;
    }
    starsHTML += '</div>';
    return starsHTML;
}

// Calculate average rating from feedback array
function calculateAverageRating(feedbackArray) {
    if (!feedbackArray || feedbackArray.length === 0) {
        return 0;
    }

    const total = feedbackArray.reduce((sum, feedback) => sum + feedback.rating, 0);
    return (total / feedbackArray.length).toFixed(1);
}

// Get rating text
function getRatingText(rating) {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.0) return 'Good';
    if (rating >= 2.0) return 'Fair';
    return 'Needs Improvement';
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createStarRating,
        updateStarDisplay,
        renderRatingStars,
        calculateAverageRating,
        getRatingText
    };
}
