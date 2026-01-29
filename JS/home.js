// ============================================
// RoboShow - Home Page Script
// ============================================

// Testimonials data
const testimonials = [
    {
        name: 'Arjun Verma',
        college: 'IIT Delhi - RoboClub',
        text: 'RoboShow gave our team the perfect platform to showcase our autonomous drone project. The feedback we received helped us improve significantly!',
        rating: 5
    },
    {
        name: 'Meera Krishnan',
        college: 'NIT Trichy - Tech Society',
        text: 'Amazing platform for robotics enthusiasts! The rating system is fair and the interface is super clean. Highly recommend for all robotics teams.',
        rating: 5
    },
    {
        name: 'Karthik Menon',
        college: 'BITS Pilani - Innovation Lab',
        text: 'We showcased our IoT robot here and got valuable insights from peers. Great community and excellent project visibility!',
        rating: 4
    },
    {
        name: 'Ananya Das',
        college: 'VIT Vellore - RoboWars Team',
        text: 'The best place to display our robotics projects. Clean design, easy to use, and the testimonials feature builds real credibility.',
        rating: 5
    }
];

// FAQ data
const faqs = [
    {
        question: 'How do I upload a project?',
        answer: 'Click on the "Upload Project" button in the navigation menu or the "+ Add Project" button on the homepage. Fill in the project details including title, team name, description, category, and technologies used. Click Submit to publish your project.'
    },
    {
        question: 'Can I edit my project later?',
        answer: 'Currently, the platform stores projects in your browser\'s local storage. While direct editing is not available in this version, you can delete and re-upload your project with updated information.'
    },
    {
        question: 'Is registration required?',
        answer: 'No registration is required! RoboShow is designed to be lightweight and accessible. Simply upload your project and start receiving feedback immediately.'
    },
    {
        question: 'How is rating calculated?',
        answer: 'The rating is calculated as an average of all the ratings (1-5 stars) submitted through the feedback system. The more feedback your project receives, the more accurate and representative your rating becomes.'
    },
    {
        question: 'Can I delete feedback?',
        answer: 'In this version, feedback is permanent once submitted to maintain authenticity and integrity of the review system. Make sure to provide constructive and thoughtful feedback.'
    }
];

// Initialize the home page
function initHomePage() {
    // Initialize sample data if needed
    initializeSampleData();

    // Render sections
    renderTopRatedProjects();
    renderAllProjects();
    renderTestimonials();
    renderFAQs();

    // Set active nav
    setActiveNav('home');
}

// Render top-rated projects
function renderTopRatedProjects() {
    const container = document.getElementById('top-rated-grid');
    if (!container) return;

    const topProjects = getTopRatedProjects(3); // Changed from 6 to 3

    if (topProjects.length === 0) {
        container.innerHTML = '<p class="text-center text-muted" style="grid-column: 1 / -1;">No rated projects yet. Be the first to upload and get ratings!</p>';
        return;
    }

    container.innerHTML = topProjects
        .map((project, index) => renderTopRatedCard(project, index + 1))
        .join('');
}

// Render all projects in gallery
function renderAllProjects() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;

    const projects = getAllProjects();

    if (projects.length === 0) {
        showEmptyState(container);
        return;
    }

    container.innerHTML = projects
        .map(project => renderProjectCard(project))
        .join('');
}

// Render testimonials
function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;

    container.innerHTML = testimonials
        .map(testimonial => renderTestimonialCard(testimonial))
        .join('');
}

// Render FAQs
function renderFAQs() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    container.innerHTML = faqs
        .map((faq, index) => renderFaqItem(faq, index))
        .join('');

    // Add click handlers for FAQ items
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function () {
            const faqItem = this.closest('.faq-item');
            faqItem.classList.toggle('active');
        });
    });
}

// Set active navigation
function setActiveNav(page) {
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'index.html' && page === 'home') {
            link.classList.add('active');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomePage);
} else {
    initHomePage();
}
