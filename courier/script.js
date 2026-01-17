// Configuration - Add your WhatsApp webhook URL here
const WHATSAPP_WEBHOOK_URL = 'https://hook.eu1.make.com/mv5i7q68l8kaatngkl987v9gsqths91w'; // Replace with your webhook URL from Make.com or Zapier

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inquiryForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable submit button to prevent double submission
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            // Get form data
            const formData = new FormData(form);

            // Extract form values for WhatsApp message
            const formValues = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company') || 'N/A',
                serviceType: formData.get('serviceType'),
                pickupAddress: formData.get('pickupAddress'),
                deliveryAddress: formData.get('deliveryAddress'),
                packageWeight: formData.get('packageWeight') || 'N/A',
                deliveryDate: formData.get('deliveryDate') || 'N/A',
                message: formData.get('message') || 'N/A'
            };

            // Send to Formspree (email notification)
            const formspreeSubmission = fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Send WhatsApp notification (if webhook is configured)
            let whatsappNotification = Promise.resolve();
            if (WHATSAPP_WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
                const whatsappMessage = `🔔 *New Inquiry Received!*\n\n` +
                    `👤 *Name:* ${formValues.fullName}\n` +
                    `📧 *Email:* ${formValues.email}\n` +
                    `📱 *Phone:* ${formValues.phone}\n` +
                    `🏢 *Company:* ${formValues.company}\n` +
                    `📦 *Service:* ${formValues.serviceType}\n` +
                    `📍 *Pickup:* ${formValues.pickupAddress}\n` +
                    `📍 *Delivery:* ${formValues.deliveryAddress}\n` +
                    `⚖️ *Weight:* ${formValues.packageWeight}\n` +
                    `📅 *Date:* ${formValues.deliveryDate}\n` +
                    `💬 *Message:* ${formValues.message}`;

                whatsappNotification = fetch(WHATSAPP_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: whatsappMessage,
                        formData: formValues
                    })
                }).catch(error => {
                    console.warn('WhatsApp notification failed:', error);
                    // Don't fail the whole form if WhatsApp fails
                });
            }

            // Wait for both requests to complete
            Promise.all([formspreeSubmission, whatsappNotification])
                .then(([formspreeResponse]) => {
                    if (formspreeResponse.ok) {
                        // Hide form and show success message
                        form.style.display = 'none';
                        successMessage.style.display = 'block';

                        // Scroll to success message
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        return formspreeResponse.json().then(data => {
                            throw new Error(data.error || 'Form submission failed');
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error submitting your inquiry. Please try again or contact us directly at info@maspa.com');

                    // Re-enable submit button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Submit Inquiry';
                    }
                });
        });
    }

    // Set minimum date for delivery date picker to today
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const today = new Date().toISOString().split('T')[0];
        deliveryDateInput.setAttribute('min', today);
    }

    // Add scroll animations for service cards and other elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-card, .about-item, .section-title').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-inquiry');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Form input animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

    formInputs.forEach(input => {
        // Add focus/blur animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });

        // Real-time validation feedback
        input.addEventListener('input', function() {
            if (this.validity.valid && this.value) {
                this.parentElement.classList.add('valid');
                this.parentElement.classList.remove('invalid');
            } else if (!this.validity.valid && this.value) {
                this.parentElement.classList.add('invalid');
                this.parentElement.classList.remove('valid');
            } else {
                this.parentElement.classList.remove('valid', 'invalid');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    // Add typing indicator for form submission
    if (form && submitButton) {
        form.addEventListener('submit', function() {
            let dots = 0;
            setInterval(() => {
                dots = (dots + 1) % 4;
                submitButton.textContent = 'Sending' + '.'.repeat(dots);
            }, 300);
        });
    }
});
