// Toggle expand/collapse for service details
function toggleExpand(button) {
    const expandableContent = button.nextElementSibling;
    const isActive = expandableContent.classList.contains('active');
    
    // Close all other expanded sections
    document.querySelectorAll('.expandable-content.active').forEach(content => {
        content.classList.remove('active');
        const btn = content.previousElementSibling;
        if (btn && btn.classList.contains('expand-btn')) {
            btn.classList.remove('active');
            btn.querySelector('span:last-child').textContent = 'View Details';
        }
    });
    
    // Toggle current section
    if (!isActive) {
        expandableContent.classList.add('active');
        button.classList.add('active');
        button.querySelector('span:last-child').textContent = 'Hide Details';
    } else {
        expandableContent.classList.remove('active');
        button.classList.remove('active');
        button.querySelector('span:last-child').textContent = 'View Details';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Here you would typically send the data to your backend
        // For now, we'll just show a success message
        alert('Thank you for your interest! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});
