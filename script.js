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

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
      themeToggle.title = 'Switch to Light Mode';
    } else {
      icon.className = 'fas fa-moon';
      themeToggle.title = 'Switch to Dark Mode';
    }
  }

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
  const mockupLeft = document.getElementById('mockup-left');
  const mockupRight = document.getElementById('mockup-right');

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
    }
  };

  projectTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent card click or tilt events
      
      // Remove active class from all tabs
      projectTabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');

      const tabId = tab.getAttribute('data-tab');
      const images = tabImages[tabId];

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

  const screenshotsLink = document.querySelector('.screenshots-link');
  const projectScreenshots = document.getElementById('projectScreenshots');
  if (screenshotsLink && projectScreenshots) {
    screenshotsLink.addEventListener('click', (e) => {
      e.preventDefault();
      const top = projectScreenshots.getBoundingClientRect().top + window.scrollY - 110;
      window.history.pushState(null, '', '#projectScreenshots');
      window.scrollTo({ top, behavior: 'smooth' });
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

});
