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
// document.addEventListener('DOMContentLoaded', () => {
//     const modal = document.getElementById('project-modal');
//     const modalTitle = document.getElementById('modal-title');
//     const modalDesc = document.getElementById('modal-description');
//     const modalLink = document.getElementById('modal-link');
//     const closeBtn = document.querySelector('.modal-close');

//     // Open modal on project card click
//     // Using data attributes to store project details
//     document.querySelectorAll('.project-card').forEach(card => {
//         card.addEventListener('click', () => {
//             const title = card.dataset.title;
//             const link = card.dataset.link;
//             const descId = card.dataset.descriptionId;
//             const descContent = document.getElementById(descId);

//             modalTitle.textContent = title;
//             modalLink.href = link;
//             modalDesc.innerHTML = descContent ? descContent.innerHTML : "<p>No description available.</p>"; // Fallback if no description is found

//             modal.style.display = 'flex';
//         });
//     });

//     // Close modal functionality
//     closeBtn.addEventListener('click', () => modal.style.display = 'none');
//         modal.addEventListener('click', e => {
//         if (e.target === modal) modal.style.display = 'none';
//         });
//     document.addEventListener('keydown', e => {
//         if (e.key === 'Escape') modal.style.display = 'none';
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const closeBtn = document.querySelector('.modal-close');

    const modalTechStack = document.getElementById('modal-tech-stack');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
        const title = card.dataset.title;
        const link = card.dataset.link;
        const descId = card.dataset.descriptionId;
        const descContent = document.getElementById(descId);

        // Parse tech stack
        const techList = card.dataset.tech ? card.dataset.tech.split(',') : [];

        modalTitle.textContent = title;
        modalLink.href = link;
        modalDesc.innerHTML = descContent ? descContent.innerHTML : "<p>No description available.</p>";

        // Clear and populate tech stack container
        modalTechStack.innerHTML = '';

        // Create badges for each technology in the tech stack
        techList.forEach(tech => {
            const img = document.createElement('img');
            const techName = tech.trim();
            const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(techName)}-informational?style=plastic&logo=${encodeURIComponent(techName)}&color=grey`;

            img.src = badgeUrl;
            img.alt = `${techName} badge`;
            img.className = 'tech-badge-img';
            modalTechStack.appendChild(img);
        });

        modal.style.display = 'flex';
    });
});

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.style.display = 'none';
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') modal.style.display = 'none';
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

// document.addEventListener('DOMContentLoaded', () => {
//   const toggleBtn = document.getElementById('theme-toggle');
//   const body = document.body;

//   // Load saved theme preference
//   if (localStorage.getItem('theme') === 'dark') {
//     body.classList.add('dark-mode');
//     toggleBtn.textContent = '☀️';
//   }

//   toggleBtn.addEventListener('click', () => {
//     body.classList.toggle('dark-mode');
//     const isDark = body.classList.contains('dark-mode');
//     toggleBtn.textContent = isDark ? '☀️' : '🌙';
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
//   });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const toggle = document.getElementById('theme-toggle');
//   const body = document.body;

//   toggle.addEventListener('click', () => {
//     body.classList.toggle('dark-mode');
//   });
// });
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const body = document.body;

  function updateIcon() {
    if (body.classList.contains('dark-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  toggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateIcon();
  });

  updateIcon(); // Set correct icon on page load
});

