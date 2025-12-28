// Locomotive Scroll Animation
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: true }
    });
    
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

// Loading Animation
function loadingAnimation() {
    var tl = gsap.timeline();
    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })
    tl.from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })
}

// Navigation Animation
function navAnimation() {
    var nav = document.querySelector("nav");

    nav.addEventListener("mouseenter", function () {
        let tl = gsap.timeline();

        tl.to("#nav-bottom", {
            height: "21vh",
            duration: 0.5
        })
        tl.to(".nav-part2 h5", {
            display: "block",
            duration: 0.1
        })
        tl.to(".nav-part2 h5 span", {
            y: 0,
            stagger: {
                amount: 0.5
            }
        })
    })
    
    nav.addEventListener("mouseleave", function () {
        let tl = gsap.timeline();
        tl.to(".nav-part2 h5 span", {
            y: 25,
            stagger: {
                amount: 0.2
            }
        })
        tl.to(".nav-part2 h5", {
            display: "none",
            duration: 0.1
        })
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.2
        })
    })
}

// Page 2 Animation with Drag & Drop Integration
function page2Animation() {
    var rightElems = document.querySelectorAll(".right-elem");
    const leftArea = document.getElementById("page2-left");
    const answerArea = document.getElementById("answer-area");
    let currentAnswer = "";
    let currentTitle = "";

    rightElems.forEach(function (elem) {
        const img = elem.querySelector("img");
        
        // Mouse hover image animation using GSAP
        elem.addEventListener("mouseenter", function () {
            if (img) {
                gsap.to(img, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3
                })
            }
        })
        
        elem.addEventListener("mouseleave", function () {
            if (img) {
                gsap.to(img, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.3
                })
            }
        })
        
        elem.addEventListener("mousemove", function (dets) {
            if (img) {
                const rect = elem.getBoundingClientRect();
                gsap.to(img, {
                    x: dets.clientX - rect.left - 90,
                    y: dets.clientY - rect.top - 90,
                    duration: 0.3
                })
            }
        })

        // Drag functionality
        elem.addEventListener("dragstart", function (e) {
            currentAnswer = elem.dataset.answer;
            currentTitle = elem.querySelector("h2").textContent;
            elem.style.opacity = "0.5";
            e.dataTransfer.effectAllowed = "move";
            
            // Hide the image during drag
            if (img) {
                gsap.to(img, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.1
                });
            }
        })

        elem.addEventListener("dragend", function () {
            elem.style.opacity = "1";
        })
    })

    // Drag area logic (if elements exist)
    if (leftArea && answerArea) {
        leftArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            leftArea.classList.add("drag-over");
        });

        leftArea.addEventListener("dragleave", (e) => {
            if (!leftArea.contains(e.relatedTarget)) {
                leftArea.classList.remove("drag-over");
            }
        });

        leftArea.addEventListener("drop", (e) => {
            e.preventDefault();
            leftArea.classList.remove("drag-over");
            
            // Animate the answer reveal
            gsap.to(answerArea, {
                opacity: 0,
                duration: 0.2,
                onComplete: function() {
                    answerArea.classList.add("active");
                    answerArea.innerHTML = `
                        <div class="insight-content">
                            <h4 style="font-size: 1.3vw; font-weight: 500; margin-bottom: 1vw; color: #000;">${currentTitle}</h4>
                            <p style="font-size: 1.1vw; line-height: 1.6; margin-bottom: 1.5vw; color: #333;">${currentAnswer}</p>
                            <button id="clear-insight" style="padding: 0.8vw 1.5vw; background: #000; color: #fff; border: none; border-radius: 0.3vw; cursor: pointer; font-size: 1vw; font-weight: 500; transition: all 0.3s;">Clear & Try Another</button>
                        </div>
                    `;
                    
                    // Fade in animation
                    gsap.to(answerArea, {
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    });

                    // Clear button functionality
                    const clearBtn = document.getElementById("clear-insight");
                    if (clearBtn) {
                        clearBtn.addEventListener("mouseenter", function() {
                            gsap.to(clearBtn, {
                                scale: 1.05,
                                duration: 0.2
                            });
                        });
                        
                        clearBtn.addEventListener("mouseleave", function() {
                            gsap.to(clearBtn, {
                                scale: 1,
                                duration: 0.2
                            });
                        });

                        clearBtn.addEventListener("click", function() {
                            gsap.to(answerArea, {
                                opacity: 0,
                                duration: 0.3,
                                onComplete: function() {
                                    answerArea.classList.remove("active");
                                    answerArea.innerHTML = "Drag a topic from right to reveal insight →";
                                    gsap.to(answerArea, {
                                        opacity: 0.6,
                                        duration: 0.3
                                    });
                                }
                            });
                        });
                    }
                }
            });

            // Clear button functionality
            const clearBtn = document.getElementById("clear-insight");
            if (clearBtn) {
                clearBtn.addEventListener("mouseenter", function() {
                    gsap.to(clearBtn, {
                        scale: 1.05,
                        duration: 0.2
                    });
                });
                
                clearBtn.addEventListener("mouseleave", function() {
                    gsap.to(clearBtn, {
                        scale: 1,
                        duration: 0.2
                    });
                });

                clearBtn.addEventListener("click", function() {
                    gsap.to(answerArea, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: function() {
                            answerArea.classList.remove("active");
                            answerArea.innerHTML = "Drag a topic from right to reveal insight →";
                            gsap.to(answerArea, {
                                opacity: 0.6,
                                duration: 0.3
                            });
                        }
                    });
                });
            }
        });
    }
}

// Page 3 Video Animation
function page3VideoAnimation() {
    var page3Center = document.querySelector(".page3-center");
    var video = document.querySelector("#page3 video");

    if (page3Center && video) {
        page3Center.addEventListener("click", function () {
            video.play();
            gsap.to(video, {
                transform: "scaleX(1) scaleY(1)",
                opacity: 1,
                borderRadius: 0
            })
        })
        
        video.addEventListener("click", function () {
            video.pause();
            gsap.to(video, {
                transform: "scaleX(0.7) scaleY(0)",
                opacity: 0,
                borderRadius: "30px"
            })
        })
    }

    var sections = document.querySelectorAll(".sec-right");

    sections.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            elem.childNodes[3].style.opacity = 1;
            elem.childNodes[3].play();
        })
        elem.addEventListener("mouseleave", function () {
            elem.childNodes[3].style.opacity = 0;
            elem.childNodes[3].load();
        })
    })
}

// Page 6 Animations
function page6Animations() {
    gsap.from("#btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm6-part2",
            scroller: "#main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    })
}

// Initialize all animations
locomotiveAnimation();
navAnimation();
page2Animation();
page3VideoAnimation();
page6Animations();
loadingAnimation();