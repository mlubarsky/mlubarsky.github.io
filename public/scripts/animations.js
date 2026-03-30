// Cursor spotlight on featured cards
(function () {
  function updateSpotlight(e) {
    var card = e.currentTarget;
    var rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  }

  function attachSpotlight() {
    document.querySelectorAll('.featured-card').forEach(function (card) {
      card.addEventListener('mousemove', updateSpotlight);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachSpotlight);
  } else {
    attachSpotlight();
  }
})();

// Scroll-entrance animation using IntersectionObserver
// Elements animate in when entering the viewport and reset when scrolled back below it
(function () {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const skillsSection = document.querySelector('.skills');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else if (entry.boundingClientRect.top > 0) {
          // Element is below the viewport — reset so it re-animates on next scroll-down
          entry.target.classList.remove('is-visible');
        }
        // If top < 0 (above viewport, already scrolled past) — leave visible
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });

  // Skills badge stagger trigger
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    skillsObserver.observe(skillsSection);
  }
})();
