let locoScroll;

function toggleMenu() {
    document.querySelector('.nav-center').classList.toggle('active');
    document.querySelector('.burger-menu').classList.toggle('active');
}

function isMobile() {
    return window.innerWidth <= 768;
}

function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Only use Locomotive Scroll on desktop
    if (!isMobile()) {
        locoScroll = new LocomotiveScroll({
            el: document.querySelector(".main"),
            smooth: true,
            smartphone: {
                smooth: false
            },
            tablet: {
                smooth: false
            }
        });

        locoScroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(".main", {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
        });

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    }
    
    ScrollTrigger.refresh();
}

init();

// GSAP Animations - only use scroller on desktop
if (!isMobile()) {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1 h1",
            scroller: ".main",
            start: "top -115%",
            end: "top -120%",
            scrub: 3
        }
    });
    tl2.to(".main", {
        backgroundColor: "#fff",
    });

    var tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1 h1",
            scroller: ".main",
            start: "top -280%",
            end: "top -300%",
            scrub: 3
        }
    });

    tl3.to(".main", {
        backgroundColor: "#0F0D0D"
    });
} else {
    // Mobile versions without scroller
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1 h1",
            start: "top -115%",
            end: "top -120%",
            scrub: 3
        }
    });
    tl2.to(".main", {
        backgroundColor: "#fff",
    });

    var tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1 h1",
            start: "top -280%",
            end: "top -300%",
            scrub: 3
        }
    });

    tl3.to(".main", {
        backgroundColor: "#0F0D0D"
    });
}

// Box hover effects (desktop only)
if (!isMobile()) {
    var boxes = document.querySelectorAll(".box");
    var crsr = document.querySelector("#crsr");

    if (crsr) {
        boxes.forEach(function(elem) {
            elem.addEventListener("mouseenter", function() {
                var att = elem.getAttribute("data-image");
                crsr.style.width = "470px";
                crsr.style.height = "370px";
                crsr.style.borderRadius = "0";
                crsr.style.backgroundImage = `url(${att})`;
            });
            elem.addEventListener("mouseleave", function() {
                elem.style.backgroundColor = "transparent";
                crsr.style.width = "20px";
                crsr.style.height = "20px";
                crsr.style.borderRadius = "50%";
                crsr.style.backgroundImage = `none`;
            });
        });
    }
}

// Nav hover effects (desktop only)
if (!isMobile()) {
    var h4 = document.querySelectorAll("#nav h4");
    var purple = document.querySelector("#purple");

    if (purple) {
        h4.forEach(function(elem) {
            elem.addEventListener("mouseenter", function() {
                purple.style.display = "block";
                purple.style.opacity = "1";
            });
            elem.addEventListener("mouseleave", function() {
                purple.style.display = "none";
                purple.style.opacity = "0";
            });
        });
    }
}

// Mobile Navigation Menu
const burgerMenu = document.querySelector('.burger-menu');
const navCenter = document.querySelector('.nav-center');
const navOverlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelectorAll('.nav-center ul li a');

if (burgerMenu && navCenter && navOverlay) {
    // Toggle menu
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navCenter.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Only prevent scroll when menu is open on mobile
        if (isMobile() && navCenter.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

    // Close menu when overlay is clicked
    navOverlay.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navCenter.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    });

    // Close menu when clicking on nav-center background
    navCenter.addEventListener('click', (e) => {
        if (e.target === navCenter) {
            burgerMenu.classList.remove('active');
            navCenter.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

    // Close menu when clicking any link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navCenter.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        });
    });
}

// Handle window resize - destroy locomotive on mobile
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const nowMobile = isMobile();
        
        if (locoScroll && nowMobile) {
            // Switched to mobile - destroy locomotive
            locoScroll.destroy();
            locoScroll = null;
            document.querySelector('.main').removeAttribute('style');
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            location.reload(); // Reload to properly reset everything
        } else if (!locoScroll && !nowMobile) {
            // Switched to desktop - reinitialize
            location.reload();
        }
    }, 250);
});