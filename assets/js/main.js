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
        By using pavansutzinox.com you agree to the use of cookies. You can find details on how we use cookies in our Cookie Policy.
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

// Google Analytics (GA4) - Auto-injected on all pages
document.addEventListener('DOMContentLoaded', function() {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-QGHZYHKZQ8'; // Replace with your ID
    
    document.head.appendChild(gaScript);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-QGHZYHKZQ8'); // Replace with your ID
});

// WhatsApp Floating Button - Add to main.js
document.addEventListener('DOMContentLoaded', function() {
    // Create WhatsApp button element
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/919979889220'; // Replace with your WhatsApp number
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.title = 'Chat with us on WhatsApp';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    
    // Add WhatsApp icon
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    // Append to body
    document.body.appendChild(whatsappBtn);
    
    // Add CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background-color: #25D366;
            color: white;
            border-radius: 50%;
            text-align: center;
            font-size: 30px;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        
        .whatsapp-float:hover {
            background-color: #128C7E;
            transform: scale(1.1);
        }
        
        .whatsapp-float i {
            margin-top: 2px;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        
        @media (max-width: 768px) {
            .whatsapp-float {
                width: 50px;
                height: 50px;
                font-size: 25px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
});