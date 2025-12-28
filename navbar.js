// =============================================
// NAVBAR MOBILE MENU FUNCTIONALITY
// =============================================

// Get all necessary elements
const burger = document.querySelector('.burger');
const navCenter = document.querySelector('.nav-center');
const navOverlay = document.querySelector('.nav-overlay');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-center ul li a');

// Toggle mobile menu
function toggleMenu() {
    burger.classList.toggle('active');
    navCenter.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navCenter.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu
function closeMenu() {
    burger.classList.remove('active');
    navCenter.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners
burger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', closeMenu);

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Only close menu on mobile
        if (window.innerWidth <= 768) {
            closeMenu();
            
            // Smooth scroll to section
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 400); // Wait for menu to close
            }
        }
    });
});

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Optional: Hide navbar on scroll down, show on scroll up
    // Uncomment below if you want this feature
    /*
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    */
    
    lastScroll = currentScroll;
});

// =============================================
// HANDLE WINDOW RESIZE
// =============================================

let resizeTimer;

window.addEventListener('resize', () => {
    // Clear existing timer
    clearTimeout(resizeTimer);
    
    // Set new timer
    resizeTimer = setTimeout(() => {
        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 768) {
            closeMenu();
        }
    }, 250);
});

// =============================================
// ACTIVE LINK HIGHLIGHTING (Optional)
// =============================================

// Highlight active section in navbar
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-center ul li a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// =============================================
// PREVENT SCROLL JUMPS ON PAGE LOAD
// =============================================

window.addEventListener('load', () => {
    // Remove any hash from URL to prevent scroll jump
    if (window.location.hash) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1);
    }
});

// =============================================
// KEYBOARD ACCESSIBILITY
// =============================================

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navCenter.classList.contains('active')) {
        closeMenu();
    }
});

// Focus trap for mobile menu
const focusableElements = '.nav-center ul li a';

navCenter.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && navCenter.classList.contains('active')) {
        const focusable = navCenter.querySelectorAll(focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});

// =============================================
// INITIALIZE
// =============================================

console.log('✅ Navbar initialized successfully');

// Optional: Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        nav.style.transition = 'all 0.6s ease';
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
    }, 100);
});