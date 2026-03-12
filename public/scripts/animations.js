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
(function () {
  const elements = document.querySelectorAll('.animate-on-scroll');
  // Also trigger skills section visibility for staggered badge animation
  const skillsSection = document.querySelector('.skills');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
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
            skillsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    skillsObserver.observe(skillsSection);
  }
})();
