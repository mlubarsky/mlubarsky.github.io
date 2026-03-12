// Project modal — opens on card click, renders CSS pill badges
(function () {
  const overlay    = document.getElementById('project-modal');
  const closeBtn   = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc  = document.getElementById('modal-description');
  const modalBullets = document.getElementById('modal-bullets');
  const modalTech  = document.getElementById('modal-tech-stack');
  const modalCta   = document.getElementById('modal-cta');

  if (!overlay) return;

  function openModal(card) {
    var title    = card.dataset.title    || '';
    var link     = card.dataset.link     || '#';
    var label    = card.dataset.linkLabel || 'View Project';
    var tech     = card.dataset.tech     || '';
    var desc     = card.dataset.description || '';
    var bullets  = card.dataset.bullets  || '';

    modalTitle.textContent = title;
    modalDesc.textContent  = desc;

    // Render bullets
    modalBullets.innerHTML = '';
    if (bullets) {
      bullets.split('||').forEach(function (b) {
        var li = document.createElement('li');
        li.textContent = b.trim();
        modalBullets.appendChild(li);
      });
    }

    // Render CSS pill badges (no Shields.io)
    modalTech.innerHTML = '';
    if (tech) {
      tech.split(',').forEach(function (t) {
        var span = document.createElement('span');
        span.className   = 'tech-pill';
        span.textContent = t.trim();
        modalTech.appendChild(span);
      });
    }

    modalCta.href        = link;
    modalCta.textContent = label;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind card clicks
  document.querySelectorAll('[data-modal-trigger]').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card);
    });
    // Keyboard accessibility
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
})();
