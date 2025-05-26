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

////// NAVBAR ANIMATION

  const stickyNavbar = document.getElementById("sticky-navbar");
  const logo = document.querySelector(".logo");
  const headerLinks = document.querySelector(".header-links");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Afficher navbar fixe au-delà de 500px
    if (scrollY > 500) {
      stickyNavbar.classList.add("visible");
    } else {
      stickyNavbar.classList.remove("visible");
    }

    // Animation progressive entre 0 et 500px
    const progress = Math.min(scrollY / 500, 1);

    // Logo réduit et se déplace à gauche
    if (logo) {
        logo.style.transform = `translate(${ -200 * progress }px, ${ 100 * progress }px) scale(${1 - 0.5 * progress})`;
      logo.style.opacity = `${1 - progress}`;
    }

    if (headerLinks) {
      headerLinks.style.transform = `translateX(${200 * progress}px)`;
      headerLinks.style.opacity = `${1 - progress}`;
    }
  });

function generateSmartResponse(input) {
  const smartResponses = {
    corail: [
      "Les coraux sont des animaux marins qui vivent en colonies.",
      "Les coraux construisent des récifs en symbiose avec des algues.",
      "Ce sont des invertébrés très sensibles aux changements environnementaux."
    ],
    blanchissement: [
      "Le blanchissement se produit quand les coraux expulsent leurs algues en cas de stress.",
      "C’est un phénomène causé par le réchauffement de l’eau.",
      "Sans leurs algues, les coraux perdent leur couleur et leur source d’énergie."
    ],
    biodiversité: [
      "Les récifs coralliens abritent plus de 25 % de la biodiversité marine.",
      "On y trouve des milliers d’espèces de poissons, invertébrés et algues.",
      "Ils sont des réservoirs de vie marine très précieux."
    ],
    menace: [
      "Les coraux sont menacés par la pollution, la surpêche et le réchauffement climatique.",
      "Le tourisme non contrôlé abîme aussi les récifs.",
      "Les activités humaines ont un impact direct sur la survie des coraux."
    ],
    protection: [
      "On peut protéger les coraux par la création d’aires marines protégées.",
      "Réduire les émissions de CO₂ est crucial pour limiter le réchauffement.",
      "La sensibilisation du public est essentielle pour leur préservation."
    ]
  };

  input = input.toLowerCase();
  for (const topic in smartResponses) {
    if (input.includes(topic)) {
      const responses = smartResponses[topic];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  return "Je ne suis pas sûr de comprendre. Parlez-moi des coraux, du blanchissement ou de la biodiversité.";
}

// Chatbot DOM Elements
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

// Interaction utilisateur
if (chatbotInput && chatbotMessages) {
  chatbotInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && chatbotInput.value.trim()) {
      const userMsg = chatbotInput.value.trim();
      appendChatMessage("Vous", userMsg);
      const reply = generateSmartResponse(userMsg);
      appendChatMessage("Bot", reply);
      chatbotInput.value = "";
    }
  });
}

// Fonction pour afficher un message dans la boîte de chat
function appendChatMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender} :</strong> ${text}`;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}



document.addEventListener("DOMContentLoaded", () => {
  const botImg = document.getElementById("bot-image");
  const chatbot = document.getElementById("chatbot");
  const closeBtn = document.getElementById("chatbot-close");

  if (botImg && chatbot && closeBtn) {
    botImg.addEventListener("click", () => {
      chatbot.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
      chatbot.classList.add("hidden");
    });
  }
});


// ...existing code...

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    createBubble();
  }
});

function createBubble() {
  const container = document.getElementById('bubble-container');
  if (!container) return;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  // Taille et position aléatoires
  const size = Math.random() * 20 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 98}vw`;
  bubble.style.background = `rgba(173,216,230,${Math.random() * 0.5 + 0.3})`;
  container.appendChild(bubble);
  // Supprime la bulle après l'animation
  bubble.addEventListener('animationend', () => bubble.remove());
}
// ...existing code...
    // Accordéon FAQ
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            answer.classList.toggle('open');
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });
