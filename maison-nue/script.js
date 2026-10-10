const header = document.querySelector('.mn-header');
const menu = document.querySelector('.mn-menu');
menu?.addEventListener('click', () => {
  const open = header.classList.toggle('mn-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});
document.querySelectorAll('.mn-header nav a').forEach((link) => link.addEventListener('click', () => header.classList.remove('mn-open')));

const form = document.querySelector('.mn-form');
const feedback = document.querySelector('.mn-feedback');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.textContent = "Merci ! Ce site est une démonstration : votre demande n'a pas été envoyée.";
  form.reset();
});

const wipe = document.querySelector('.mn-wipe');
requestAnimationFrame(() => document.body.classList.add('mn-ready'));
document.querySelectorAll('a[href]').forEach((link) => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
  let destination;
  try { destination = new URL(href, window.location.href); } catch { return; }
  if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.body.classList.add('mn-leaving');
    window.setTimeout(() => { window.location.href = destination.href; }, 530);
  });
});
