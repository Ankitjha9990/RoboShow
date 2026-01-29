// ============================================
// RoboShow - Render Functions
// ============================================

// Render a single project card
function renderProjectCard(project) {
    return `
    <div class="card">
      <img src="${project.image}" alt="${project.title}" class="card-image">
      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-subtitle">👥 ${project.team}</p>
        <p class="card-description">${truncateText(project.description, 100)}</p>
        <div class="card-footer">
          <div class="rating">
            ${renderRatingStars(project.avgRating)}
            <span class="rating-value">${project.avgRating > 0 ? `${project.avgRating} (${project.totalRatings})` : 'No ratings yet'}</span>
          </div>
          <a href="detail.html?id=${project.id}" class="btn btn-primary btn-sm">View Details</a>
        </div>
      </div>
    </div>
  `;
}

// Render top-rated project card with rank
function renderTopRatedCard(project, rank) {
    return `
    <div class="card top-rated-card" data-rank="${rank}">
      <img src="${project.image}" alt="${project.title}" class="card-image">
      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-subtitle">👥 ${project.team}</p>
        <div class="card-footer">
          <div class="rating">
            ${renderRatingStars(project.avgRating)}
            <span class="rating-value">${project.avgRating}</span>
          </div>
          <a href="detail.html?id=${project.id}" class="btn btn-primary btn-sm">View</a>
        </div>
      </div>
    </div>
  `;
}

// Render testimonial card
function renderTestimonialCard(testimonial) {
    const initials = testimonial.name.split(' ').map(n => n[0]).join('');
    return `
    <div class="testimonial-card">
      <p class="testimonial-text">"${testimonial.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${initials}</div>
        <div class="testimonial-info">
          <h4>${testimonial.name}</h4>
          <p>${testimonial.college}</p>
        </div>
      </div>
      <div class="rating" style="margin-top: 1rem;">
        ${renderRatingStars(testimonial.rating)}
      </div>
    </div>
  `;
}

// Render FAQ item
function renderFaqItem(faq, index) {
    return `
    <div class="faq-item" data-faq-index="${index}">
      <button class="faq-question">
        <span>${faq.question}</span>
        <span class="faq-icon">▼</span>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-content">
          ${faq.answer}
        </div>
      </div>
    </div>
  `;
}

// Render feedback item
function renderFeedbackItem(feedback) {
    const initials = feedback.name.split(' ').map(n => n[0]).join('');
    return `
    <div class="feedback-item">
      <div class="feedback-header">
        <div class="feedback-author">
          <div class="feedback-avatar">${initials}</div>
          <div class="feedback-author-info">
            <h4>${feedback.name}</h4>
            <p class="feedback-date">${formatDate(feedback.date)}</p>
          </div>
        </div>
        <div class="feedback-rating">
          ${renderRatingStars(feedback.rating)}
        </div>
      </div>
      <p class="feedback-comment">${feedback.comment}</p>
    </div>
  `;
}

// Render technology tags
function renderTechTags(technologies) {
    return technologies.map(tech => `<span class="tag">${tech}</span>`).join('');
}

// Utility: Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Utility: Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Show empty state
function showEmptyState(container, message = 'No projects found') {
    container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">🤖</div>
      <h3>${message}</h3>
      <p>Be the first to upload a robotics project!</p>
      <a href="upload.html" class="btn btn-primary">Upload Project</a>
    </div>
  `;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderProjectCard,
        renderTopRatedCard,
        renderTestimonialCard,
        renderFaqItem,
        renderFeedbackItem,
        renderTechTags,
        truncateText,
        formatDate,
        getUrlParameter,
        showEmptyState
    };
}
