document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-toggle').forEach(button => {
    const navigation = button.parentElement.querySelector('.nav-links');
    if (!navigation) return;

    const closeMenu = () => {
      button.classList.remove('active');
      navigation.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
    };

    button.addEventListener('click', () => {
      const isOpen = button.classList.toggle('active');
      navigation.classList.toggle('active', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
    });

    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  });

  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/') || '/';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/index\.html$/, '/') || '/';
    if (linkPath === currentPath) link.setAttribute('aria-current', 'page');
  });
});
