document.addEventListener("DOMContentLoaded", function() {
    // 1. Dynamic typing text effect (Repeatedly types/deletes ONLY "M.Tech CSE @ IIT Jammu")
    const typingText = "M.Tech CSE @ IIT Jammu";
    const spanElement = document.getElementById("typedText");
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!spanElement) return;

        if (!isDeleting && charIndex <= typingText.length) {
            spanElement.textContent = typingText.substring(0, charIndex);
            charIndex++;
            if (charIndex > typingText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2200);
                return;
            }
            setTimeout(typeEffect, 80);
        } else if (isDeleting && charIndex >= 0) {
            spanElement.textContent = typingText.substring(0, charIndex);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                charIndex = 0;
                setTimeout(typeEffect, 600);
                return;
            }
            setTimeout(typeEffect, 40);
        }
    }

    if (spanElement) {
        typeEffect();
    }

    // 2. Light / Dark Mode Toggle with localStorage persistence
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function applyTheme(theme) {
        if (theme === "light") {
            document.documentElement.classList.add("light-theme");
            document.body.classList.add("light-theme");
            if (themeIcon) {
                themeIcon.className = "fa-solid fa-moon";
            }
        } else {
            document.documentElement.classList.remove("light-theme");
            document.body.classList.remove("light-theme");
            if (themeIcon) {
                themeIcon.className = "fa-solid fa-sun";
            }
        }
    }

    // Check saved theme preference on load
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function() {
            const isLight = document.documentElement.classList.contains("light-theme");
            const newTheme = isLight ? "dark" : "light";
            localStorage.setItem("portfolio-theme", newTheme);
            applyTheme(newTheme);
        });
    }

    // 3. Mobile Hamburger Navigation
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("#nav-menu a");

    function closeMobileMenu() {
        if (navMenu && navMenu.classList.contains("nav-open")) {
            navMenu.classList.remove("nav-open");
            if (hamburgerBtn) {
                hamburgerBtn.setAttribute("aria-expanded", "false");
            }
            if (hamburgerIcon) {
                hamburgerIcon.className = "fa-solid fa-bars";
            }
        }
    }

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", function() {
            const isOpen = navMenu.classList.toggle("nav-open");
            hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            if (hamburgerIcon) {
                hamburgerIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
            }
        });
    }

    // Close menu when any nav link is tapped
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
        if (navMenu && navMenu.classList.contains("nav-open")) {
            if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });

    // 4. Contact Form Submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxwEOH1NF7kLOOYK0hswxiPmTiiSJahpx-r92kXuWZRDIx16fJ2WNiBBdSMadJOF_OJ/exec';
    const form = document.forms['submit-to-google-sheet'];
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }
            if (formStatus) {
                formStatus.style.color = "#ff004f";
                formStatus.textContent = "Sending message...";
            }

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    console.log('Success!', response);
                    if (formStatus) {
                        formStatus.style.color = "#4BB543";
                        formStatus.textContent = "Message sent successfully!";
                    }
                    form.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Send Message";
                    }
                    setTimeout(() => {
                        if (formStatus) formStatus.textContent = "";
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    if (formStatus) {
                        formStatus.style.color = "#ff3333";
                        formStatus.textContent = "Error sending message. Please email directly to adityaanil180@gmail.com";
                    }
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Send Message";
                    }
                });
        });
    }
});