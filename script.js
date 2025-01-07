document.addEventListener('DOMContentLoaded', () => {
    const animatedSquare = document.querySelector('.animated-square');
    const profileCard = document.querySelector('.profile-card');
    
    setTimeout(() => {
        animatedSquare.classList.add('animated');
        setTimeout(() => {
            profileCard.classList.add('animated');
        }, 1000); // Delay for square animation to finish
    }, 300); // Initial delay of the animation

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
            console.log(details);
            toggle.classList.toggle('active');
            details.classList.toggle('active');
        });
    });

    const secretButton = document.getElementById('secret-button');
    const secretOverlay = document.getElementById('secret-overlay');
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const closeButton = document.querySelector('.close-button');
    const closeSurpriseButton = document.querySelector('.close-surprise-button');
    const keypadButtons = document.querySelectorAll('.keypad-button');
    const secretInput = document.getElementById('secret-input');
    const submitSecret = document.getElementById('submit-secret');
    const correctCode = '1300'; // Secret code

    let enteredCode = '';

    secretButton.addEventListener('click', () => {
        secretOverlay.style.display = 'flex';
        document.body.classList.add('no-scroll');
    });

    closeButton.addEventListener('click', () => {
        secretOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
        enteredCode = '';
        secretInput.value = '';
    });

    closeSurpriseButton.addEventListener('click', () => {
        surpriseOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
    });

    keypadButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('delete-button')) {
                enteredCode = enteredCode.slice(0, -1);
            } else if (enteredCode.length < 4) { // Length of code
                enteredCode += button.textContent;
            }
            secretInput.value = enteredCode;
        });
    });

    submitSecret.addEventListener('click', () => {
        if (enteredCode === correctCode) {
            secretOverlay.style.display = 'none';
            surpriseOverlay.style.display = 'flex';
            document.body.classList.add('no-scroll');
            confetti();
        } else {
            alert('Incorrect code. Try again!');
            enteredCode = '';
            secretInput.value = '';
        }
    });
});
