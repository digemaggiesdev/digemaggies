document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const loaderDelay = 180;
  const minimumLoaderTime = 500;
  let loaderStartedAt = 0;
  let loaderShown = false;
  let loaderTimer;
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-live', 'polite');
  loader.innerHTML = `
    <div class="page-loader-spinner" aria-hidden="true"></div>
    <p>Dig 'Em Aggies</p>
    <span>Loading</span>
  `;
  body.appendChild(loader);

  const hideLoader = () => {
    window.clearTimeout(loaderTimer);

    if (!loaderShown) {
      loader.remove();
      return;
    }

    const remainingTime = Math.max(0, minimumLoaderTime - (performance.now() - loaderStartedAt));
    window.setTimeout(() => {
      loader.classList.remove('is-visible');
      window.setTimeout(() => loader.remove(), 500);
    }, remainingTime);
  };

  loaderTimer = window.setTimeout(() => {
    loaderShown = true;
    loaderStartedAt = performance.now();
    loader.classList.add('is-visible');
  }, loaderDelay);

  if (document.readyState === 'complete') {
    window.requestAnimationFrame(hideLoader);
  } else {
    window.addEventListener('load', hideLoader, { once: true });
  }

  document.querySelectorAll('a[href]:not([target="_blank"])').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href) return;

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.hasAttribute('download')) return;

      const targetUrl = new URL(href, window.location.origin);
      if (targetUrl.origin !== window.location.origin) return;

      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          e.preventDefault();
        }
        return;
      }

      e.preventDefault();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.location.href = targetUrl.href;
        return;
      }

      body.classList.add('page-leaving');
      window.setTimeout(() => {
        window.location.href = targetUrl.href;
      }, 600);
    });
  });
});