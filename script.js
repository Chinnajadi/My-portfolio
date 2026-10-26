(() => {
  const toggle = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.project-card');
  filters.forEach(button => button.addEventListener('click', () => {
    const chosen = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => card.classList.toggle('is-hidden', !(chosen === 'all' || card.dataset.category === chosen)));
  }));

  const email = document.querySelector('#email-text');
  const copy = document.querySelector('#copy-email');
  const feedback = document.querySelector('#copy-feedback');
  if (email && copy && feedback) copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email.textContent.trim());
      feedback.textContent = 'Copied!';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(email);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      feedback.textContent = 'Select and copy the email';
    }
    window.setTimeout(() => { feedback.textContent = ''; }, 2500);
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  const topButton = document.querySelector('#back-to-top');
  const updateTop = () => topButton && topButton.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateTop, {passive:true});
  updateTop();
  if (topButton) topButton.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, instance) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); instance.unobserve(entry.target); }
    }), {threshold:.12});
    reveal.forEach(el => observer.observe(el));
  } else reveal.forEach(el => el.classList.add('in-view'));
})();
