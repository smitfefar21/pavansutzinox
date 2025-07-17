document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize first testimonial
    if (testimonials.length > 0) {
        showTestimonial(0);
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Smooth scrolling for anchor links
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

    // Sticky header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Form validation for contact form (to be added later)
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         // Validation logic here
    //     });
    // }
});

// === Google Analytics Consent Notice - Auto-injected === //
document.addEventListener('DOMContentLoaded', function() {
    // Create the consent notice element
    const consentNotice = document.createElement('div');
    consentNotice.id = 'ga-consent-notice';
    consentNotice.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        text-align: center;
        font-size: 14px;
        z-index: 1000;
    `;
    consentNotice.innerHTML = `
        This website uses Google Analytics to collect anonymous traffic data, helping us improve your browsing experience. By continuing to use this site, you consent to our use of cookies and tracking technologies
        <a href="www.pavansutzinox.com/privacy-policy.html" style="color: #4da6ff; text-decoration: none;">Learn more</a>
    `;

    // Append the notice to the body
    document.body.appendChild(consentNotice);

    // Optional: Add a close button (remove if not needed)
    const closeButton = document.createElement('span');
    closeButton.textContent = ' × ';
    closeButton.style.cssText = `
        margin-left: 15px;
        cursor: pointer;
        font-size: 16px;
    `;
    closeButton.onclick = function() {
        consentNotice.style.display = 'none';
        // Optional: Set a cookie to remember dismissal (requires additional logic)
    };
    consentNotice.appendChild(closeButton);
});