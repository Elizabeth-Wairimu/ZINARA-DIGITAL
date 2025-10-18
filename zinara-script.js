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

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.outcome-card, .process-step, .case-card, .differentiator-card, .pricing-card, .faq-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(el);
    });
});

// Enhanced form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.goal) {
            alert('Please fill in all required fields marked with *');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success message
            alert('Thank you for your interest! We\'ll get back to you within 24 hours with your custom growth plan.');
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Track conversion (add your analytics code here)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'YOUR_CONVERSION_ID',
                    'value': 1.0,
                    'currency': 'KES'
                });
            }
        }, 1500);
    });
}

// CTA click tracking
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-light');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const section = this.closest('section')?.className || 'unknown';
        
        // Track CTA clicks (add your analytics code here)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'event_category': 'engagement',
                'event_label': buttonText,
                'section': section
            });
        }
        
        console.log(`CTA clicked: ${buttonText} in ${section}`);
    });
});

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #FF6B35 0%, #03A6A1 100%);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();
