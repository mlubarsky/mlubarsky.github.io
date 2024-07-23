document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            logo.src = 'images/ml-logo-dark.svg'; // Path to dark theme logo
        } else {
            logo.src = 'images/ml-logo-light.svg'; // Path to light theme logo
        }
    });

    const links = document.querySelectorAll('nav ul li a'); // Smooth scrolling

    for (const link of links) {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    }

    const toggleDetails = document.querySelectorAll('.toggle-details');

    toggleDetails.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const details = toggle.parentElement.querySelector('.details');
            console.log(details); // Check if the .details element is correctly targeted
            toggle.classList.toggle('active');
            details.classList.toggle('active');
        });
    });

    const secretButton = document.getElementById('secret-button');
    const overlay = document.getElementById('secret-overlay');
    const closeButton = document.querySelector('.close-button');
    const keypadButtons = document.querySelectorAll('.keypad-button');
    const secretInput = document.getElementById('secret-input');
    const submitButton = document.getElementById('submit-secret');
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const closeSurpriseButton = document.querySelector('.close-surprise-button');

    const secretCode = '1234'; // Secret code
    let inputCode = '';

    secretButton.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
        inputCode = '';
        secretInput.value = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
            inputCode = '';
            secretInput.value = '';
        } else if (event.target === surpriseOverlay) {
            surpriseOverlay.style.display = 'none';
        }
    });

    keypadButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (inputCode.length < 4) { // 4-digit code
                inputCode += button.textContent;
                secretInput.value = inputCode;
            }
        });
    });

    submitButton.addEventListener('click', () => {
        if (inputCode === secretCode) {
            overlay.style.display = 'none';
            surpriseOverlay.style.display = 'flex';
        } else {
            alert('Incorrect code. Please try again.');
            inputCode = '';
            secretInput.value = '';
        }
    });

    closeSurpriseButton.addEventListener('click', () => {
        surpriseOverlay.style.display = 'none';
    });

    // Work-in-progress
    // function confetti() {
    //     var duration = 5 * 1000;
    //     var end = Date.now() + duration;

    //     (function frame() {
    //         confetti({
    //             particleCount: 3,
    //             angle: 60,
    //             spread: 55,
    //             origin: { x: 0 }
    //         });
    //         confetti({
    //             particleCount: 3,
    //             angle: 120,
    //             spread: 55,
    //             origin: { x: 1 }
    //         });

    //         if (Date.now() < end) {
    //             requestAnimationFrame(frame);
    //         }
    //     }());
    // }
});
