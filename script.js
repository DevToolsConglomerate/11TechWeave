// ============================================================
// DARK MODE MANAGEMENT
// ============================================================

function toggleDarkMode() {
    const html = document.documentElement;
    const toggles = document.querySelectorAll('.theme-toggle');
    
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    
    localStorage.setItem('darkMode', isDark);
    toggles.forEach(toggle => toggle.classList.toggle('active', isDark));
}

function initDarkMode() {
    const html = document.documentElement;
    const isDark = localStorage.getItem('darkMode') === 'true';
    const toggles = document.querySelectorAll('.theme-toggle');
    
    if (isDark) {
        html.classList.add('dark');
        toggles.forEach(toggle => toggle.classList.add('active'));
    }
}

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================

function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================================
// RIPPLE EFFECT BUTTON INTERACTION
// ============================================================

document.querySelectorAll('.btn-ripple').forEach(button => {
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
    });
});

// ============================================================
// MULTI-STEP CONTACT FORM
// ============================================================

let currentStep = 1;
const totalSteps = 3;

function goToStep(step) {
    if (step > 0 && step <= totalSteps) {
        document.querySelectorAll('.form-step-content').forEach(el => el.classList.add('hidden'));
        document.getElementById(`step-${step}`).classList.remove('hidden');
        
        // Update step indicators
        document.querySelectorAll('.form-step').forEach((stepEl, idx) => {
            const stepNum = idx + 1;
            stepEl.classList.remove('active', 'completed');
            if (stepNum === step) stepEl.classList.add('active');
            if (stepNum < step) stepEl.classList.add('completed');
        });
        
        currentStep = step;
    }
}

function nextStep() {
    if (currentStep < totalSteps) goToStep(currentStep + 1);
}

function prevStep() {
    if (currentStep > 1) goToStep(currentStep - 1);
}

// ============================================================
// ROUTER LOGIC (ENHANCED)
// ============================================================

function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('fade-in');
    });

    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
        void target.offsetWidth;
        target.classList.add('fade-in');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeBtns = Array.from(document.querySelectorAll('.nav-link')).filter(btn => 
        btn.getAttribute('onclick').includes(`'${pageId}'`)
    );
    activeBtns.forEach(btn => btn.classList.add('active'));

    window.scrollTo(0, 0);

    const menu = document.getElementById('mobile-menu');
    if(!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }

    triggerCounters();
    setTimeout(initScrollAnimations, 100);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Enhanced Form Handling with Validation
function handleForm(e) {
    e.preventDefault();
    const notification = document.getElementById('notification');
    const form = document.getElementById('contactForm');
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    const subject = `New Project Inquiry from ${data.name}`;
    const body = `Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Service Interest: ${data.interest}
Budget Range: ${data.budget}
Timeline: ${data.timeline}

Message:
${data.message}`;

    window.location.href = `mailto:11techweave@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    notification.classList.remove('translate-y-24');
    form.reset();
    goToStep(1);
    
    setTimeout(() => {
        notification.classList.add('translate-y-24');
    }, 3000);
}

// ============================================================
// NUMBER COUNTER ANIMATION
// ============================================================

function triggerCounters() {
    const counters = document.querySelectorAll('.page-section:not(.hidden) .counter');
    if(counters.length === 0) return;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 200;
        
        counter.innerText = '0';

        const updateCount = () => {
            const count = +counter.innerText.replace(/\D/g,'');
            const inc = target / speed;
            if (count < target) {
                const suffix = counter.innerText.replace(/[0-9]/g, '');
                counter.innerText = Math.ceil(count + inc) + suffix;
                setTimeout(updateCount, 1);
            } else {
                if(counter.getAttribute('data-target') === '98') counter.innerText = "98%";
                else if(counter.getAttribute('data-target') === '10') counter.innerText = "10+";
                else if(counter.getAttribute('data-target') === '24') counter.innerText = "24/7";
                else counter.innerText = target;
            }
        };
        updateCount();
    });
}

// ============================================================
// SCROLL ANIMATION OBSERVER
// ============================================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initScrollAnimations() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
// BACK TO TOP BUTTON
// ============================================================

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// TESTIMONIAL CAROUSEL (ENHANCED)
// ============================================================

let currentSlide = 0;
const totalSlides = 3;
let slideInterval;

function updateCarousel() {
    const track = document.getElementById('testimonial-track');
    const dots = document.getElementById('carousel-dots').children;
    
    if(!track) return;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    Array.from(dots).forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.remove('bg-slate-300', 'dark:bg-slate-600');
            dot.classList.add('bg-brand-900', 'dark:bg-brand-500', 'w-6');
        } else {
            dot.classList.add('bg-slate-300', 'dark:bg-slate-600');
            dot.classList.remove('bg-brand-900', 'dark:bg-brand-500', 'w-6');
        }
    });
}

function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateCarousel();
    resetInterval();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => moveSlide(1), 5000);
}

// ============================================================
// SERVICE CARD FLIP ANIMATION
// ============================================================

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================================
// TEAM MODAL LOGIC
// ============================================================

const teamData = {
    'wisdom': {
        name: 'Wisdom Dosoo',
        role: 'CTO & Founder',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        bio: 'Wisdom Dosoo is the Founder & CTO of 11TechWeave, driving the technical vision for enterprise-grade digital solutions. With a deep background in full-stack engineering and cloud architecture, he specializes in building scalable web applications that empower businesses to grow. Wisdom is passionate about bridging the gap between complex code and intuitive user experiencess.',
        social: {
            linkedin: 'https://www.linkedin.com/in/wisdomdosoo1',
            twitter: '#',
            email: 'mailto:dosoowisdom1@gmail.com'
        }
    },
    'sarah': {
        name: 'Sarah Johnson',
        role: 'Lead Architect',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        bio: 'Sarah specializes in cloud-native architecture and microservices. She ensures that every solution we build is secure, resilient, and ready to scale from day one. She is an active contributor to several open-source Kubernetes projects.',
        social: {
            linkedin: '#',
            twitter: '#',
            email: '#'
        }
    },
    'marcus': {
        name: 'Marcus Wright',
        role: 'Product Manager',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        bio: 'With a background in both UX design and business strategy, Marcus bridges the gap between technical feasibility and market needs. He ensures we build products that not only work flawlessly but also deliver exceptional user experiences.',
        social: {
            linkedin: '#',
            twitter: '#',
            email: '#'
        }
    }
};

function openTeamModal(memberId) {
    const member = teamData[memberId];
    if(!member) return;

    document.getElementById('modalMemberName').textContent = member.name;
    document.getElementById('modalMemberRole').textContent = member.role;
    document.getElementById('modalMemberBio').textContent = member.bio;
    document.getElementById('modalMemberImage').src = member.image;

    // Update social links
    const linkedinBtn = document.getElementById('modalMemberLinkedIn');
    const twitterBtn = document.getElementById('modalMemberTwitter');
    const emailBtn = document.getElementById('modalMemberEmail');

    if(linkedinBtn) linkedinBtn.href = member.social?.linkedin || '#';
    if(twitterBtn) twitterBtn.href = member.social?.twitter || '#';
    if(emailBtn) emailBtn.href = member.social?.email || '#';

    const modal = document.getElementById('teamModal');
    const backdrop = document.getElementById('teamModalBackdrop');
    const panel = document.getElementById('teamModalPanel');

    modal.classList.remove('hidden');
    
    // Small delay to allow display:block to apply before adding opacity classes
    requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        panel.classList.remove('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
        panel.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100');
    });
}

function closeTeamModal() {
    const modal = document.getElementById('teamModal');
    const backdrop = document.getElementById('teamModalBackdrop');
    const panel = document.getElementById('teamModalPanel');

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    panel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100');
    panel.classList.add('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // Match transition duration
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('teamModal').classList.contains('hidden')) {
        closeTeamModal();
    }
});

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    showPage('home');
    resetInterval();
    
    // Reset notification to hidden state
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('translate-y-24');
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') moveSlide(-1);
        if (e.key === 'ArrowRight') moveSlide(1);
    });
});

// ============================================================
// PRODUCT MODAL LOGIC
// ============================================================

const productData = {
    'ecommerce': {
        title: 'E-commerce Starter Kit',
        price: '$59',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Launch your online store in days, not months. This comprehensive Vue 3 & Nuxt.js starter kit comes pre-configured with Stripe payments, a shopping cart state management system, and a mobile-responsive layout optimized for conversions.',
        features: [
            'Vue 3 & Nuxt.js Architecture',
            'Stripe Payment Integration',
            'Pinia State Management',
            'Tailwind CSS Styling',
            'SEO Optimized Structure'
        ],
        link: '#',
        linkText: 'Purchase License'
    },
    'crm': {
        title: 'FastAPI Support CRM',
        price: 'Free',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'A robust, production-ready backend for Customer Relationship Management systems. Built with Python and FastAPI, it features secure authentication, ticket management logic, and a scalable database schema.',
        features: [
            'FastAPI Framework',
            'JWT Authentication',
            'Ticketing System Logic',
            'PostgreSQL Support',
            'Docker Ready'
        ],
        link: 'https://github.com/wisdom-dosoo/support-crm',
        linkText: 'View Code'
    },
    'tabzen': {
        title: 'TabZen',
        price: 'Free',
        image: 'image1.png',
        description: 'Bring peace to your browser. Tab Zen is a minimalist extension designed to help you manage tab clutter, reduce memory usage, and focus on what matters most.',
        features: [
            'Memory Optimization',
            'Tab Grouping',
            'Minimalist Interface',
            'Privacy Focused',
            'Cross-Browser Support'
        ],
        link: 'https://tab-zen.vercel.app/',
        linkText: 'Get It Now'
    }
};

function openProductModal(productId) {
    const product = productData[productId];
    if(!product) return;

    document.getElementById('productModalTitle').textContent = product.title;
    document.getElementById('productModalPrice').textContent = product.price;
    document.getElementById('productModalDesc').textContent = product.description;
    document.getElementById('productModalImage').src = product.image;
    
    const featuresList = document.getElementById('productModalFeatures');
    featuresList.innerHTML = product.features.map(f => 
        `<li class="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <i class="fas fa-check text-green-500 mr-2"></i> ${f}
        </li>`
    ).join('');

    const linkBtn = document.getElementById('productModalLink');
    linkBtn.href = product.link;
    linkBtn.textContent = product.linkText;

    const modal = document.getElementById('productModal');
    const backdrop = document.getElementById('productModalBackdrop');
    const panel = document.getElementById('productModalPanel');

    modal.classList.remove('hidden');
    
    requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        panel.classList.remove('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
        panel.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100');
    });
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    const backdrop = document.getElementById('productModalBackdrop');
    const panel = document.getElementById('productModalPanel');

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    panel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100');
    panel.classList.add('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('productModal') && !document.getElementById('productModal').classList.contains('hidden')) {
        closeProductModal();
    }
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
