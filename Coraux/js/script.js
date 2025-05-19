document.addEventListener("DOMContentLoaded", () => {
  console.log("Script chargé pour Les Coraux !");

  // 1. Défilement fluide
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Sticky header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 80);
  });

  // 3. Effet de frappe sur le titre
  const heroTitle = document.querySelector('main h2');
  if (heroTitle) {
    const text = heroTitle.textContent.trim();
    heroTitle.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) heroTitle.textContent += text[i++];
      else clearInterval(interval);
    }, 100);
  }

  // 4. Parallaxe sur l’image
  const img = document.querySelector('main img');
  window.addEventListener('scroll', () => {
    if (img) img.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  });

  // 5. Animation des sections au scroll
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('main > *').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // 6. Accordéons dans le footer
  document.querySelectorAll('.footer-links h4').forEach(title => {
    title.style.cursor = 'pointer';
    const ul = title.nextElementSibling;
    ul.style.maxHeight = '0px';
    title.addEventListener('click', () => {
      const isOpen = ul.style.maxHeight !== '0px';
      ul.style.maxHeight = isOpen ? '0' : `${ul.scrollHeight}px`;
    });
  });

  // 7. Bouton mode sombre
  const themeBtn = document.createElement('button');
  themeBtn.id = 'theme-toggle';
  themeBtn.textContent = '🌙';
  header.appendChild(themeBtn);
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

  // 8. Bouton retour en haut
  const topBtn = document.createElement('button');
  topBtn.id = 'back-to-top';
  topBtn.textContent = '↑';
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 300);
  });

  // 9. Surbrillance dynamique du lien actif
  const sections = document.querySelectorAll('main, section');
  const navLinks = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // 10. Zoom sur les images au survol
  document.querySelectorAll('img').forEach(img => {
    img.style.transition = 'transform 0.3s ease';
    img.addEventListener('mouseover', () => {
      img.style.transform = 'scale(1.05)';
    });
    img.addEventListener('mouseout', () => {
      img.style.transform = 'scale(1)';
    });
  });

  // 11. Message de bienvenue unique
  if (!localStorage.getItem('corauxVisited')) {
    alert('Bienvenue sur notre site dédié aux coraux et à la biodiversité marine !');
    localStorage.setItem('corauxVisited', 'true');
  }
});
