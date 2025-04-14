// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const currentYear = document.getElementById('year');
const contactForm = document.getElementById('contactForm');

// Initialize the portfolio
function initPortfolio() {
    setCurrentYear();
    setupThemeToggle();
    setupMobileNavigation();
    setupHeaderScroll();
    setupContactForm();
    setupModal();
    setupSmoothScrolling();
    setupAnimations();
}

// Set current year in footer
function setCurrentYear() {
    currentYear.textContent = new Date().getFullYear();
}

// Theme Toggle Functionality
function setupThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or default to light
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Mobile Navigation Toggle
function setupMobileNavigation() {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Header Scroll Effect
function setupHeaderScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Contact Form Handling
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    contactForm.reset();
                    alert('Message sent successfully!');
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again later.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
}

// Support Modal Functionality
function setupModal() {
    const supportModal = document.getElementById('support-modal');
    const closeModal = document.querySelector('.close-modal');
    const supportButtons = document.querySelectorAll('[href="#support"]');

    if (supportModal && closeModal && supportButtons.length > 0) {
        // Open modal when clicking support buttons
        supportButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                supportModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            supportModal.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Close when clicking outside modal content
        supportModal.addEventListener('click', (e) => {
            if (e.target === supportModal) {
                supportModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && supportModal.classList.contains('show')) {
                supportModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
}

// Copy M-Pesa Details to Clipboard
function copyMpesaDetails() {
    const mpesaDetails = `+254792255308`;
    
    navigator.clipboard.writeText(mpesaDetails)
        .then(() => {
            alert('M-Pesa details copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy M-Pesa details. Please copy manually.');
        });
}



// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

// Animation on Scroll Functionality
function setupAnimations() {
    const animateElements = document.querySelectorAll('.animate');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with 'animate' class
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Add animation classes to elements
function addAnimationClasses() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const headings = section.querySelectorAll('h2, h3, h4');
        const content = section.querySelectorAll('p, ul, .btn');
        
        headings.forEach(heading => {
            heading.classList.add('animate', 'fade-in-up');
        });
        
        content.forEach(element => {
            element.classList.add('animate', 'fade-in-up');
        });
    });
    
    // Special animation for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroChildren = heroContent.children;
        Array.from(heroChildren).forEach((child, index) => {
            child.classList.add('animate', 'fade-in-up');
            child.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addAnimationClasses();
    setupAnimations();
});