// Contact modal — opens on trigger click, submits via Formspree
(function () {
  var overlay    = document.getElementById('contact-modal');
  var trigger    = document.getElementById('contact-modal-trigger');
  var closeBtn   = document.getElementById('contact-modal-close');
  var form       = document.getElementById('contact-form');
  var statusEl   = document.getElementById('cf-status');
  var submitBtn  = document.getElementById('cf-submit-btn');

  if (!overlay || !trigger) return;

  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var firstInput = form.querySelector('input, textarea');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    // Reset button so the form is fully usable if reopened
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }

  trigger.addEventListener('click', openModal);

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      statusEl.textContent = '';
      statusEl.className = 'cf-status';

      fetch('https://formspree.io/f/xwvrrjky', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            statusEl.textContent = 'Message sent! I\'ll get back to you soon.';
            statusEl.className = 'cf-status cf-status--success';
            form.reset();
            submitBtn.textContent = 'Sent ✓';
          } else {
            return res.json().then(function (data) {
              throw new Error((data.errors || []).map(function (err) { return err.message; }).join(', ') || 'Submission failed.');
            });
          }
        })
        .catch(function (err) {
          statusEl.textContent = err.message || 'Something went wrong. Please try again.';
          statusEl.className = 'cf-status cf-status--error';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }
})();
