// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Modal functionality for project cards
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const closeBtn = document.querySelector('.modal-close');
    const modalTechStack = document.getElementById('modal-tech-stack');

    document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const { title, link, descriptionId, tech } = card.dataset;
        const descContent = document.getElementById(descriptionId);

        const techList = tech ? tech.split(',') : [];

        modalTitle.textContent = title;
        modalLink.href = link;
        modalDesc.innerHTML = descContent ? descContent.innerHTML : "<p>No description available.</p>";

        modalTechStack.innerHTML = '';

        techList.forEach(techName => {
        const img = document.createElement('img');
        const trimmedTech = techName.trim();
        const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(trimmedTech)}-informational?style=plastic&logo=${encodeURIComponent(trimmedTech)}&color=grey`;

        img.src = badgeUrl;
        img.alt = `${trimmedTech} badge`;
        img.className = 'tech-badge-img';
        modalTechStack.appendChild(img);
        });

        modal.style.display = 'flex';
    });
    });

    const closeModal = () => { modal.style.display = 'none'; };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
    if (e.target === modal) {
        closeModal();
    }
    });
    document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
    });
});

// Toggle job details in the timeline
document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', () => {
    const item = button.closest('.timeline-item');
    const expanded = item.classList.toggle('expanded');
    button.textContent = expanded ? 'Show Less' : 'Show More';
    });
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const { body } = document;

    const updateIcon = () => {
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    };

    toggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateIcon();
    });

    updateIcon(); // Set correct icon on page load
});

// Typewriter effect for the introduction text
document.addEventListener('DOMContentLoaded', () => {
    const text = "Hi, I'm Maxwell Lubarsky";
    const container = document.getElementById('typed-text');
    let index = 0;

    const type = () => {
    if (index < text.length) {
        container.textContent += text.charAt(index);
        index++;
        setTimeout(type, 60);
    }
    };

    type();
});

// Navigation toggle for mobile view
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('show');
    });

    // Optional: Close menu when clicking a nav link
    document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('show');
    });
    });
});
