import './style.css'
import { translations } from './translations.js';

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];
        keys.forEach(k => {
            if (value) value = value[k];
        });

        if (value) {
            element.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let value = translations[lang];
        keys.forEach(k => {
            if (value) value = value[k];
        });

        if (value) {
            element.setAttribute('placeholder', value);
        }
    });

    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.lang = 'ar';
        document.body.classList.add('rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.lang = 'en';
        document.body.classList.remove('rtl');
    }
}

let currentTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    // Update Icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
        }
    }
}

// Initialize Language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    setTheme(currentTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (window.innerWidth <= 1024 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

const codeElement = document.querySelector('.code-body code');
let originalText = '';
let isTyping = false;

function typeWriter(text, element, speed = 50) {
    if (isTyping) return;
    isTyping = true;
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            isTyping = false;
        }
    }
    type();
}

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const scrollElements = document.querySelectorAll('.service-card, .work-card, .team-card, .section-header');
scrollElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

if (codeElement) {
    originalText = codeElement.innerText;
    typeWriter(originalText, codeElement);
}

const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        glowX = mouseX;
        glowY = mouseY;

        cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    }
    animate();
}

const interactiveElements = document.querySelectorAll('a, button, .why-card, .service-card, .work-card, .input, textarea');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('hovered');
    });
});

const cards = document.querySelectorAll('.why-card, .team-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const workCards = document.querySelectorAll('.work-card');

if (modal && workCards.length > 0) {
    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;
            const imageDiv = card.querySelector('.work-image');
            const gradientClass = Array.from(imageDiv.classList).find(cls => cls.startsWith('gradient-'));

            const modalH2 = modal.querySelector('h2');
            const modalH4 = modal.querySelector('h4');
            const modalP = modal.querySelector('p');
            const modalImage = modal.querySelector('.modal-image');

            if (modalH2) modalH2.textContent = title;
            if (modalH4) modalH4.textContent = "Project Details";
            if (modalP) modalP.textContent = desc;

            modalImage.className = 'modal-image';
            if (gradientClass) modalImage.classList.add(gradientClass);

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const botToken = import.meta.env.TBOT_TOKEN;
        const chatId = import.meta.env.TCHAT_ID;

        if (!botToken || !chatId) {
            alert('Please configure TBOT_TOKEN and TCHAT_ID in .env file');
            return;
        }

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        const text = `
New Project Request:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
        `;

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        try {
            submitButton.disabled = true;
            const currentLang = localStorage.getItem('lang') || 'en';
            let sendingText = 'Sending...';
            if (translations[currentLang] && translations[currentLang].contact && translations[currentLang].contact.sending) {
                sendingText = translations[currentLang].contact.sending;
            }
            submitButton.textContent = sendingText;

            const response = await fetch(`/telegram/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text
                })
            });

            if (response.ok) {
                alert('Message sent successfully!');
                const nameInput = contactForm.querySelector('input[name="name"]');
                const emailInput = contactForm.querySelector('input[name="email"]');
                const phoneInput = contactForm.querySelector('input[name="phone"]');
                const messageInput = contactForm.querySelector('textarea[name="message"]');

                if (nameInput) nameInput.value = '';
                if (emailInput) emailInput.value = '';
                if (phoneInput) phoneInput.value = '';
                if (messageInput) messageInput.value = '';
            } else {
                const errorData = await response.json();
                console.error('Telegram Error:', errorData);
                alert('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Network Error:', error);
            alert('An error occurred. Please check your connection.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}
