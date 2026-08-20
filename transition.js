document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Fade in the page
  body.style.opacity = 0;
  requestAnimationFrame(() => {
    body.style.opacity = 1;
  });

  // Fade out on navigation
  document.querySelectorAll('a[href]:not([target="_blank"])').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore external links
      const targetUrl = new URL(href, window.location.origin);
      if (targetUrl.origin !== window.location.origin) return;

      // Same-page anchors
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          e.preventDefault();
        }
        return;
      }

      // Prevent default and fade out
      e.preventDefault();
      body.style.opacity = 0;

      setTimeout(() => {
        window.location.href = targetUrl.href;
      }, 500);
    });
  });
});