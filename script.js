const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 35);
});

menuToggle?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header?.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.project-card').forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

const projects = {
  horizon: {
    title: 'Maison Horizon',
    description: "Une maison familiale ouverte sur les reliefs d'Annecy. Matière brute, cadrages précis et circulation fluide entre intérieur et extérieur pour 240 m² livrés en 14 mois.",
    meta: 'Architecture · Annecy · 2024',
    visual: 'project-horizon',
  },
  atelier: {
    title: 'Atelier M',
    description: "La transformation d'un ancien atelier parisien en un espace de vie lumineux, où le bois, la pierre et les volumes existants composent un intérieur intemporel.",
    meta: 'Intérieur · Paris · 2023',
    visual: 'project-atelier',
  },
  patio: {
    title: 'Patio Saint-Paul',
    description: "Une réhabilitation attentive au cœur du Vieux Lyon : ouverture des circulations, restauration des matières et création d'un patio comme nouveau centre de gravité.",
    meta: 'Rénovation · Lyon · 2022',
    visual: 'project-patio',
  },
};

const modal = document.querySelector('[data-modal]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalDescription = document.querySelector('[data-modal-description]');
const modalMeta = document.querySelector('[data-modal-meta]');
const modalVisual = document.querySelector('[data-modal-visual]');

function openProject(key) {
  const project = projects[key];
  if (!project || !modal) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalMeta.textContent = project.meta;
  modalVisual.className = `modal-visual ${project.visual}`;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('[data-modal-close]')?.focus();
}

function closeProject() {
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-project]').forEach((trigger) => {
  trigger.addEventListener('click', () => openProject(trigger.dataset.project));
});
document.querySelectorAll('[data-modal-close]').forEach((trigger) => trigger.addEventListener('click', closeProject));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeProject();
});

const quoteForm = document.querySelector('[data-quote-form]');
const feedback = document.querySelector('[data-form-feedback]');
quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.textContent = 'Merci. Votre demande a bien été enregistrée — nous revenons vers vous sous 48 heures.';
  quoteForm.reset();
});
