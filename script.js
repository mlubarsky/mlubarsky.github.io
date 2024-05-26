document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('logo');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            logo.src = 'images/favicon-dark.png'; // Path to your dark theme logo
        } else {
            logo.src = 'images/favicon-light.png'; // Path to your light theme logo
        }
    });

    // Smooth scrolling
    const links = document.querySelectorAll('nav ul li a');

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
});
