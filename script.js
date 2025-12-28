// ==========================================
// LOCOMOTIVE SCROLL & GSAP ANIMATION
// ==========================================
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const main = document.querySelector("#main");

    // Check if mobile/tablet
    const isMobile = window.innerWidth <= 768;

    // INIT LOCOMOTIVE SCROLL
    const locoScroll = new LocomotiveScroll({
        el: main,
        smooth: !isMobile, // Disable smooth scroll on mobile for better compatibility
        multiplier: 1,
        smartphone: { 
            smooth: false, // Changed to false for better mobile scrolling
            breakpoint: 768
        },
        tablet: { 
            smooth: false, // Changed to false for better tablet scrolling
            breakpoint: 1024
        },
        reloadOnContextChange: true,
        touchMultiplier: 2.5, // Better touch scrolling on mobile
        firefoxMultiplier: 50
    });

    // UPDATE SCROLLTRIGGER ON LOCOSCROLL (only if smooth scroll is enabled)
    if (!isMobile) {
        locoScroll.on("scroll", () => {
            ScrollTrigger.update();
        });
    }

    // SET SCROLLERPROXY (only for desktop with smooth scroll)
    if (!isMobile) {
        ScrollTrigger.scrollerProxy(main, {
            scrollTop(value) {
                if (arguments.length) {
                    locoScroll.scrollTo(value, { duration: 0, disableLerp: true });
                } else {
                    return locoScroll.scroll.instance.scroll.y;
                }
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: main.style.transform ? "transform" : "fixed"
        });

        // FIX: UPDATE LOCOSCROLL AFTER REFRESH
        ScrollTrigger.addEventListener("refresh", () => {
            locoScroll.update();
        });
    }

    // FIX: DELAY REFRESH TO PREVENT FREEZE
    setTimeout(() => {
        if (!isMobile) {
            ScrollTrigger.refresh();
        }
        locoScroll.update();
    }, 200);

    // FIX: RESIZE ISSUE ON MOBILE / SAFARI
    window.addEventListener("resize", () => {
        setTimeout(() => {
            locoScroll.update();
            if (!isMobile) {
                ScrollTrigger.refresh();
            }
        }, 100);
    });

    // Return locoScroll instance and isMobile flag
    return { locoScroll, isMobile };
}

// ==========================================
// BURGER MENU FUNCTIONALITY
// ==========================================
function initBurgerMenu(locoScroll, isMobile) {
    // Create overlay element if it doesn't exist
    if (!document.querySelector('.nav-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    const burger = document.querySelector('.burger');
    const navCenter = document.querySelector('.nav-center');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-center ul li a');

    // Toggle menu function
    function toggleMenu() {
        burger.classList.toggle('active');
        navCenter.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Stop/Start locomotive scroll when menu opens/closes (only on desktop)
        if (navCenter.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            if (locoScroll && !isMobile) locoScroll.stop();
        } else {
            document.body.style.overflow = '';
            if (locoScroll && !isMobile) locoScroll.start();
        }
    }

    // Close menu function
    function closeMenu() {
        burger.classList.remove('active');
        navCenter.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (locoScroll && !isMobile) locoScroll.start();
    }

    // Burger click event
    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    // Overlay click event - close menu when clicking outside
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // If it's an anchor link, handle smooth scroll
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    closeMenu();
                    // Use setTimeout to ensure menu closes before scrolling
                    setTimeout(() => {
                        if (locoScroll && !isMobile) {
                            // Use Locomotive scroll on desktop
                            locoScroll.scrollTo(target, {
                                offset: -90, // Adjust for navbar height
                                duration: 1000,
                                easing: [0.25, 0.0, 0.35, 1.0]
                            });
                        } else {
                            // Use native scroll on mobile
                            const targetPosition = target.offsetTop - 90; // Adjust for navbar
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            } else {
                closeMenu();
            }
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navCenter.classList.contains('active')) {
            closeMenu();
        }
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navCenter.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ==========================================
// SWIPER INITIALIZATION
// ==========================================
function initSwiper() {
    // Check if Swiper library is loaded
    if (typeof Swiper !== 'undefined') {
        const swiperElement = document.querySelector('.mySwiper');
        
        if (swiperElement) {
            const swiper = new Swiper('.mySwiper', {
                // Basic parameters
                slidesPerView: 1.2,
                spaceBetween: 30,
                loop: false,
                grabCursor: true,
                centeredSlides: false,
                
                // Responsive breakpoints
                breakpoints: {
                    // When window width is >= 480px
                    480: {
                        slidesPerView: 1.5,
                        spaceBetween: 25
                    },
                    // When window width is >= 768px
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 30
                    },
                    // When window width is >= 1024px
                    1024: {
                        slidesPerView: 3.5,
                        spaceBetween: 35
                    },
                    // When window width is >= 1440px
                    1440: {
                        slidesPerView: 4.2,
                        spaceBetween: 40
                    }
                },
                
                // Smooth scrolling
                freeMode: {
                    enabled: true,
                    sticky: false,
                    momentum: true,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5,
                },
                
                // Enable keyboard control
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                
                // Enable mousewheel control
                mousewheel: {
                    forceToAxis: true,
                    sensitivity: 0.5,
                },
                
                // Speed of transition
                speed: 600,
                
                // Prevent clicks during transition
                preventClicks: true,
                preventClicksPropagation: true,
                
                // Touch settings
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: true,
                shortSwipes: true,
                longSwipes: true,
                longSwipesRatio: 0.5,
                longSwipesMs: 300,
            });

            // Optional: Custom mover element interaction (the orange circle)
            const mover = document.querySelector('.mover');
            const swiperContainer = document.querySelector('.mySwiper');
            
            if (mover && swiperContainer) {
                // Show mover on mouse enter
                swiperContainer.addEventListener('mouseenter', function() {
                    mover.style.opacity = '1';
                    mover.style.scale = '1';
                    mover.innerHTML = '<p style="color: white; font-weight: bold; font-size: 14px;">DRAG</p>';
                });
                
                // Hide mover on mouse leave
                swiperContainer.addEventListener('mouseleave', function() {
                    mover.style.opacity = '0';
                    mover.style.scale = '0';
                });
                
                // Follow mouse movement
                swiperContainer.addEventListener('mousemove', function(e) {
                    mover.style.left = e.clientX + 'px';
                    mover.style.top = e.clientY + 'px';
                });
                
                // Change cursor when dragging
                swiper.on('touchStart', function() {
                    if (mover) {
                        mover.innerHTML = '<p style="color: white; font-weight: bold; font-size: 14px;">DRAGGING</p>';
                    }
                });
                
                swiper.on('touchEnd', function() {
                    if (mover) {
                        mover.innerHTML = '<p style="color: white; font-weight: bold; font-size: 14px;">DRAG</p>';
                    }
                });
            }
            
            console.log('Swiper initialized successfully!');
            return swiper;
        }
    } else {
        console.error('Swiper library not loaded. Please include Swiper CSS and JS files in your HTML.');
        console.log('Add these to your <head> section:');
        console.log('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />');
        console.log('<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>');
    }
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Locomotive Scroll
    const { locoScroll, isMobile } = locomotiveAnimation();
    
    // Initialize Burger Menu with locomotive scroll instance and mobile flag
    initBurgerMenu(locoScroll, isMobile);
    
    // Initialize Swiper
    initSwiper();
});

// ==========================================
// ADDITIONAL UTILITIES (Optional)
// ==========================================

// Smooth scroll to top button (if you have one)
const scrollToTopBtn = document.querySelector('.scroll-to-top');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        const locoInstance = document.querySelector('#main').locomotive;
        if (locoInstance) {
            locoInstance.scrollTo(0, {
                duration: 1000,
                easing: [0.25, 0.0, 0.35, 1.0]
            });
        }
    });
}

// Active nav link on scroll (Optional)
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-center ul li a');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-90px 0px -50% 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Uncomment to enable active nav links
// updateActiveNavLink();


const burgerMenu = document.querySelector('.burger-menu');
const navCenter = document.querySelector('.nav-center');
const navOverlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelectorAll('.nav-center ul li a');

// Toggle menu
burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  navCenter.classList.toggle('active');
  navOverlay.classList.toggle('active');
});

// Close menu when overlay is clicked
navOverlay.addEventListener('click', () => {
  burgerMenu.classList.remove('active');
  navCenter.classList.remove('active');
  navOverlay.classList.remove('active');
});

// Close menu when clicking X (before pseudo-element)
navCenter.addEventListener('click', (e) => {
  if (e.target === navCenter) {
    burgerMenu.classList.remove('active');
    navCenter.classList.remove('active');
    navOverlay.classList.remove('active');
  }
});

// Close menu when clicking any link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    navCenter.classList.remove('active');
    navOverlay.classList.remove('active');
  });
});