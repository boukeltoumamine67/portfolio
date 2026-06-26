/* ============================================
   PORTFOLIO - BOUKELTOUM AMINE
   JavaScript Module
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Preloader ----
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });
  // Fallback in case load already fired
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 2500);

  // ---- Force Light Mode ----
  const html = document.documentElement;
  html.setAttribute('data-theme', 'light');

  // ---- Mobile Navigation ----
  const navMenuBtn = document.querySelector('.nav-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const mobileLinks = document.querySelectorAll('.nav-links a');

  function toggleMobileMenu() {
    navMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  navMenuBtn.addEventListener('click', toggleMobileMenu);
  navOverlay.addEventListener('click', toggleMobileMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shrink
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNavLink();
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Active Nav Link on Scroll ----
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  // ---- Typing Animation ----
  const typingElement = document.getElementById('typingText');
  const titles = [
    'Flutter Developer',
    'Mobile App Developer',
    'Clean Architecture Enthusiast',
    'Cross-Platform Developer',
    'SaaS Builder'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const current = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingElement) {
    setTimeout(typeEffect, 1000);
  }

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Skill Bar Animation ----
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute('data-width');
        target.style.width = width + '%';
        skillObserver.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.stat-value');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-count'));
        const suffix = target.getAttribute('data-suffix') || '';
        animateCounter(target, 0, endValue, 2000, suffix);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element, start, end, duration, suffix) {
    let startTime = null;
    function update(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.floor(eased * (end - start) + start);
      element.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  // ---- Cursor Glow Effect ----
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('active');
    });
    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
  }

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      // Construct mailto link
      const mailtoLink = `mailto:boukeltoumamien67@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;

      // Show feedback
      const btn = contactForm.querySelector('.btn-primary');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Prepared!';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ---- Smooth Scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip screenshots links — they have their own handler with offset
    if (anchor.classList.contains('screenshots-link')) return;
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Tilt Effect on Project Cards ----
  const tiltCards = document.querySelectorAll('.service-card');
  if (window.innerWidth > 768) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---- Project Tab Switcher ----
  const projectTabs = document.querySelectorAll('.project-tab-btn');

  const tabImages = {
    ai: {
      left: 'medical_history.jpg',
      right: 'ai_analysis.jpg'
    },
    pharmacy: {
      left: 'maps.jpg',
      right: 'medical_history.jpg'
    },
    appointments: {
      left: 'add_appointment.jpg',
      right: 'appointments.jpg'
    },
    auth: {
      left: 'login.jpg',
      right: 'medical_history.jpg'
    },
    souq_home: {
      left: 'souq_pro_7.jpg',
      right: 'souq_pro_4.jpg'
    },
    souq_auth: {
      left: 'souq_pro_3.jpg',
      right: 'souq_pro_7.jpg'
    },
    souq_offer: {
      left: 'souq_pro_2.jpg',
      right: 'souq_pro_1.jpg'
    },
    souq_profile: {
      left: 'souq_pro_5.jpg',
      right: 'souq_pro_6.jpg'
    },
    souq_payments: {
      left: 'souq_pro_8.jpg',
      right: 'souq_pro_6.jpg'
    }
  };

  projectTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent card click or tilt events
      
      const previewContainer = tab.closest('.project-preview');
      const tabsInContainer = previewContainer.querySelectorAll('.project-tab-btn');
      
      // Remove active class from all tabs in this project
      tabsInContainer.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');

      const tabId = tab.getAttribute('data-tab');
      const images = tabImages[tabId];
      const mockupLeft = previewContainer.querySelector('.screen-left img');
      const mockupRight = previewContainer.querySelector('.screen-right img');

      if (images && mockupLeft && mockupRight) {
        mockupLeft.style.opacity = '0';
        mockupRight.style.opacity = '0';

        setTimeout(() => {
          mockupLeft.src = images.left;
          mockupRight.src = images.right;
          mockupLeft.style.opacity = '1';
          mockupRight.style.opacity = '1';
        }, 200);
      }
    });
  });

  const screenshotsLinks = document.querySelectorAll('.screenshots-link');
  if (screenshotsLinks.length > 0) {
    screenshotsLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const top = targetElement.getBoundingClientRect().top + window.scrollY - 110;
          window.history.pushState(null, '', targetId);
          window.scrollTo({ top, behavior: 'smooth' });

          // Add highlight flash to draw attention to the correct preview
          targetElement.classList.remove('highlight-flash');
          // Force reflow so re-adding the class restarts the animation
          void targetElement.offsetWidth;
          targetElement.classList.add('highlight-flash');
          setTimeout(() => {
            targetElement.classList.remove('highlight-flash');
          }, 1500);
        }
      });
    });
  }

  // ---- Download CV Button ----
  const downloadCvBtn = document.getElementById('downloadCV');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      // Check if there's an actual CV file linked
      const href = downloadCvBtn.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        alert('CV file will be available soon! Please contact me via email.');
      }
    });
  }

  // ---- Parallax Effect on Hero Orbs ----
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const orbs = document.querySelectorAll('.hero-orb');
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.15;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // ---- Language Toggle (EN/FR) ----
  const langToggle = document.getElementById('langToggle');
  const savedLang = localStorage.getItem('portfolio-lang') || 'en';
  html.setAttribute('data-lang', savedLang);

  const translations = {
    fr: {
      // Nav
      nav_home: 'Accueil',
      nav_about: 'À propos',
      nav_skills: 'Compétences',
      nav_projects: 'Projets',
      nav_experience: 'Expérience',
      nav_education: 'Formation',
      nav_services: 'Services',
      nav_contact: 'Contact',
      nav_resume: 'CV',

      // Hero
      hero_badge: 'Disponible pour Freelance & Emploi',
      hero_greeting: 'Bonjour, je suis',
      hero_description: "Je crée des applications mobiles multiplateformes performantes et élégantes avec Flutter & Dart. Passionné par l'architecture propre, les interfaces réactives et le développement de produits SaaS commerciaux.",
      hero_cta_work: 'Voir Mes Projets',
      hero_cta_contact: 'Me Contacter',
      scroll_down: 'Défiler vers le bas',

      // Stats
      stat_projects: 'Projets Réalisés',
      stat_years: "Années d'Expérience",
      stat_tech: 'Technologies',
      stat_dedication: 'Dévouement',

      // About
      about_label: 'À Propos',
      about_title: 'Faites Connaissance',
      about_subtitle: 'Un développeur mobile passionné créant des expériences numériques',
      about_years_building: 'Années de Développement',
      about_heading: 'Développeur Flutter d'<span style="color:var(--accent)">Algérie 🇩🇿</span>',
      about_text_1: "Je suis Boukeltoum Amine, développeur Flutter basé à Aïn Defla, Khemis Miliana, Algérie. J'ai choisi Flutter pour ses puissantes capacités multiplateformes — me permettant de créer des applications Android, iOS et desktop avec une interface réactive et adaptative et d'excellentes performances à partir d'une seule base de code.",
      about_text_2: "Je me spécialise dans la création d'applications mobiles commerciales avec les principes d'architecture propre. Je suis capable de créer mes propres produits SaaS, et je m'épanouis aussi bien en freelance qu'au sein d'une équipe de développement. Actuellement, j'élargis mes compétences en apprenant le développement Android natif avec Kotlin et Jetpack Compose.",
      about_text_3: "Ce qui me motive, c'est la capacité de transformer des idées en applications élégantes et conviviales qui résolvent des problèmes concrets.",
      about_location: 'Aïn Defla, Khemis Miliana, Algérie',
      about_degree: 'Licence Informatique 2026',
      about_freelance: 'Prêt pour le Freelance',
      about_language: 'Anglophone',

      // Skills
      skills_label: 'Mes Compétences',
      skills_title: 'Expertise Technique',
      skills_subtitle: 'Une boîte à outils complète pour créer des applications mobiles modernes',

      // Projects
      projects_label: 'Mes Travaux',
      projects_title: 'Projets Phares',
      projects_subtitle: 'Des applications concrètes construites avec passion et précision',
      demai_badge: 'Projet Universitaire',
      demai_subtitle: 'Application de Santé avec Intégration Gemini AI',
      demai_description: 'Une application de santé numérique moderne qui remplace les ordonnances papier et simplifie les soins aux patients. Elle intègre un <strong>Assistant Gemini AI</strong> qui lit et analyse la liste de médicaments du patient en temps réel, identifiant les erreurs critiques, les dosages incorrects et les combinaisons médicamenteuses dangereuses pour assurer la sécurité du patient.',
      souq_badge: 'Freelance / Commercial',
      souq_subtitle: 'Application de Place de Marché de Services',
      souq_description: "Une application moderne de place de marché permettant aux utilisateurs de trouver des prestataires de services, publier des demandes et recevoir des offres en temps réel. Comprend un fil d'offres robuste, des écrans de demandes détaillés, une authentification sécurisée et une interface élégante construite avec Flutter.",

      // Experience
      exp_label: 'Expérience',
      exp_title: 'Mon Parcours',
      exp_subtitle: 'Les moments forts de ma carrière de développeur',
      exp1_title: 'Développeur Mobile',
      exp1_subtitle: "Projets d'Équipe & Open Source",
      exp1_text: "Collaboration sur des projets d'équipe et contribution à l'open source. Développement d'applications mobiles avec Flutter, architecture propre, gestion d'état Bloc/Cubit et intégration d'API REST.",
      exp2_title: 'Participant au Hackathon',
      exp2_subtitle: 'Master Coding — Laghouat',
      exp2_text: 'Participation au hackathon Master Coding à Laghouat, Algérie. Démonstration de capacités de résolution de problèmes et de compétences de développement rapide sous pression compétitive.',
      exp3_title: 'DEM AI — Projet de Fin d'Études',
      exp3_subtitle: 'Université Djillali Bounaama',
      exp3_text: "Conception et développement d'une plateforme de santé complète (mobile et web) comme projet de fin d'études. Implémentation de l'authentification patient, des dossiers médicaux, du localisateur de pharmacies avec cartes et du système de gestion de rendez-vous.",
      exp4_title: 'Kotlin & Jetpack Compose',
      exp4_subtitle: 'Développement Android Natif',
      exp4_text: "Élargissement des compétences en apprenant le développement Android natif avec Kotlin et Jetpack Compose pour compléter l'expertise Flutter et élargir les opportunités de carrière.",
      exp4_date: 'En cours d'apprentissage',

      // Education
      edu_label: 'Formation',
      edu_title: 'Parcours Académique',
      edu_subtitle: 'Construire une base solide en informatique',
      edu_degree: 'Licence',
      edu_field: 'Informatique — Systèmes d'Information',
      edu_university: 'Université Djillali Bounaama — Khemis Miliana',
      edu_year: 'Diplôme prévu : 2026',
      cert_heading: 'Certifications & Activités',
      cert1_title: 'Cours Architecture Propre',
      cert1_desc: 'Principes, patterns et bonnes pratiques de l'architecture propre Flutter',
      cert2_title: 'Hackathon Master Coding',
      cert2_desc: 'Événement de programmation compétitive — Laghouat, Algérie',
      cert3_title: 'Contributeur Open Source',
      cert3_desc: 'Contributeur actif aux projets open source sur GitHub',

      // Services
      svc_label: 'Services',
      svc_title: 'Ce Que Je Propose',
      svc_subtitle: 'Services professionnels de développement mobile adaptés à vos besoins',
      svc1_title: 'Développement d'Applications Mobiles',
      svc1_text: 'Applications mobiles multiplateformes personnalisées pour Android et iOS avec Flutter, design réactif et performances fluides.',
      svc2_title: 'Implémentation UI/UX',
      svc2_text: 'Conversion pixel-perfect des designs Figma en code Flutter. Widgets personnalisés, animations, thèmes et mises en page réactives.',
      svc3_title: 'Intégration API',
      svc3_text: 'Intégration transparente d'API REST avec Dio, flux d'authentification, services Firebase et solutions de stockage local.',
      svc4_title: 'Développement SaaS',
      svc4_text: 'Développement de produits SaaS de bout en bout — de la conception architecturale au déploiement. Applications commerciales évolutives et maintenables.',

      // Contact
      contact_label: 'Contact',
      contact_title: 'Travaillons Ensemble',
      contact_subtitle: 'Vous avez un projet en tête ? Réalisons-le !',
      contact_heading: 'Me Contacter',
      contact_text: "Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités de faire partie de votre vision. Que ce soit du freelance ou un poste à temps plein, n'hésitez pas à me contacter !",
      contact_email_label: 'Email',
      contact_uni_label: 'Email Universitaire',
      contact_wa_label: 'WhatsApp',
      contact_gh_label: 'GitHub',
      contact_li_label: 'LinkedIn',
      contact_download_cv: 'Télécharger CV',

      // Form
      form_name: 'Votre Nom',
      form_email: 'Votre Email',
      form_subject: 'Sujet',
      form_message: 'Message',
      form_send: 'Envoyer le Message',

      // Footer
      footer_text: '&copy; 2026 Boukeltoum Amine. Créé avec <span class="heart">♥</span> et l'esprit Flutter.',

      // Typing titles
      typing_titles: [
        'Développeur Flutter',
        'Développeur d'Apps Mobiles',
        'Passionné d'Architecture Propre',
        'Développeur Multiplateforme',
        'Créateur de SaaS'
      ],

      // Form placeholders
      placeholder_name: 'Jean Dupont',
      placeholder_email: 'jean@exemple.com',
      placeholder_subject: 'Discussion de Projet',
      placeholder_message: 'Parlez-moi de votre projet...'
    }
  };

  function applyLanguage(lang) {
    html.setAttribute('data-lang', lang);
    localStorage.setItem('portfolio-lang', lang);

    if (lang === 'fr') {
      langToggle.textContent = 'EN';
      langToggle.title = 'Switch to English';
      html.setAttribute('lang', 'fr');
    } else {
      langToggle.textContent = 'FR';
      langToggle.title = 'Passer en français';
      html.setAttribute('lang', 'en');
    }

    // Apply text translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (lang === 'fr' && translations.fr[key]) {
        el.textContent = translations.fr[key];
      } else if (lang === 'en' && el.dataset.originalText) {
        el.textContent = el.dataset.originalText;
      }
    });

    // Apply HTML translations (for elements with embedded HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (lang === 'fr' && translations.fr[key]) {
        el.innerHTML = translations.fr[key];
      } else if (lang === 'en' && el.dataset.originalHtml) {
        el.innerHTML = el.dataset.originalHtml;
      }
    });

    // Update typing animation titles
    if (lang === 'fr' && translations.fr.typing_titles) {
      titles.length = 0;
      translations.fr.typing_titles.forEach(t => titles.push(t));
    } else {
      titles.length = 0;
      ['Flutter Developer', 'Mobile App Developer', 'Clean Architecture Enthusiast', 'Cross-Platform Developer', 'SaaS Builder'].forEach(t => titles.push(t));
    }
    // Reset typing animation
    titleIndex = 0;
    charIndex = 0;
    isDeleting = false;

    // Update form placeholders
    if (lang === 'fr') {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      if (nameInput) nameInput.placeholder = translations.fr.placeholder_name;
      if (emailInput) emailInput.placeholder = translations.fr.placeholder_email;
      if (subjectInput) subjectInput.placeholder = translations.fr.placeholder_subject;
      if (messageInput) messageInput.placeholder = translations.fr.placeholder_message;
    } else {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      if (nameInput) nameInput.placeholder = 'John Doe';
      if (emailInput) emailInput.placeholder = 'john@example.com';
      if (subjectInput) subjectInput.placeholder = 'Project Discussion';
      if (messageInput) messageInput.placeholder = 'Tell me about your project...';
    }
  }

  // Store original text content for EN restoration
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.dataset.originalText = el.textContent;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.dataset.originalHtml = el.innerHTML;
  });

  // Apply saved language on load
  applyLanguage(savedLang);

  // Toggle handler
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const currentLang = html.getAttribute('data-lang');
      const newLang = currentLang === 'en' ? 'fr' : 'en';
      applyLanguage(newLang);
    });
  }

});
