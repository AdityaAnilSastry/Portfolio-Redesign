document.addEventListener("DOMContentLoaded", function() {
    // Dynamic typing text effect
    const textArray = [
        "Data Engineer Apprentice",
        "M.Tech CSE @ IIT Jammu",
        "Full-Stack Developer"
    ];
    let index = 0;
    const spanElement = document.getElementById("typedText");

    function typeText() {
        if (!spanElement || textArray.length === 0) return;
        const currentText = textArray[index];
        let charIndex = 0;
        spanElement.textContent = "";
        
        const typingInterval = setInterval(() => {
            if (charIndex < currentText.length) {
                spanElement.textContent += currentText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    index = (index + 1) % textArray.length;
                    typeText();
                }, 2000);
            }
        }, 100);
    }

    if (spanElement) {
        typeText();
    }

    // Contact Form Submission
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