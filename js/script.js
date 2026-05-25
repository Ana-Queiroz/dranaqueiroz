(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---- Header shadow on scroll ----
  const header = $('#header');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav ----
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');

  const closeNav = () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  };
  const openNav = () => {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu');
  };

  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    if (open) closeNav(); else openNav();
  });

  // Close nav when clicking a link
  $$('.nav a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close nav on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      if (navMenu.classList.contains('is-open')) closeNav();
    }
  });

  // ---- Reveal on scroll ----
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ---- Footer year ----
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Areas tabs (auto-cycling) ----
  const areaTabs = $$('.areas-tab');
  const areaDetails = $$('.area-detail');
  const areaTabsContainer = $('.areas-tabs');
  const AREA_CYCLE_MS = 5000;

  let areaCycleTimer = null;
  let areaPaused = false;

  const areaDots = $$('.areas-dot');

  const activateArea = (key) => {
    areaTabs.forEach(tab => {
      const isActive = tab.dataset.area === key;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    areaDots.forEach(dot => dot.classList.toggle('is-active', dot.dataset.area === key));
    areaDetails.forEach(detail => {
      const isActive = detail.dataset.area === key;
      detail.classList.toggle('is-active', isActive);
      if (isActive) {
        detail.style.animation = 'none';
        void detail.offsetWidth;
        detail.style.animation = '';
      }
    });
  };

  const getActiveIndex = () => {
    const idx = areaTabs.findIndex(t => t.classList.contains('is-active'));
    return idx === -1 ? 0 : idx;
  };

  const advanceArea = () => {
    if (areaPaused || !areaTabs.length) return;
    const next = (getActiveIndex() + 1) % areaTabs.length;
    activateArea(areaTabs[next].dataset.area);
  };

  const startAreaCycle = () => {
    stopAreaCycle();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    areaCycleTimer = setInterval(advanceArea, AREA_CYCLE_MS);
  };
  const stopAreaCycle = () => {
    if (areaCycleTimer) {
      clearInterval(areaCycleTimer);
      areaCycleTimer = null;
    }
  };

  const onUserPick = (key) => {
    activateArea(key);
    stopAreaCycle();
    setTimeout(startAreaCycle, 12000);
  };

  areaTabs.forEach(tab => tab.addEventListener('click', () => onUserPick(tab.dataset.area)));
  areaDots.forEach(dot => dot.addEventListener('click', () => onUserPick(dot.dataset.area)));

  if (areaTabsContainer) {
    areaTabsContainer.addEventListener('mouseenter', () => { areaPaused = true; });
    areaTabsContainer.addEventListener('mouseleave', () => { areaPaused = false; });

    // Start cycling only when the section is visible
    if ('IntersectionObserver' in window) {
      const visObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) startAreaCycle();
          else stopAreaCycle();
        });
      }, { threshold: 0.3 });
      visObserver.observe(areaTabsContainer);
    } else {
      startAreaCycle();
    }
  }

  // ---- Depoimentos slider ----
  const depoTrackEl  = $('#depoTrack');
  const depoDotsEl   = $('#depoDots');
  const depoSlides   = $$('.depo-slide');
  let depoPage       = 0;
  let depoTimer      = null;

  const isMobile     = () => window.innerWidth <= 720;
  const cpp          = () => isMobile() ? 1 : 4;
  const totalPages   = () => isMobile()
    ? depoSlides.length
    : Math.max(1, depoSlides.length - cpp() + 1);

  const buildDepoDots = () => {
    if (!depoDotsEl) return;
    depoDotsEl.innerHTML = '';
    const pages = totalPages();
    for (let i = 0; i < pages; i++) {
      const btn = document.createElement('button');
      btn.className = 'depo-dot' + (i === depoPage ? ' is-active' : '');
      btn.setAttribute('aria-label', `Grupo ${i + 1}`);
      btn.addEventListener('click', () => {
        goToDepoPage(i);
        stopDepoTimer();
        setTimeout(startDepoTimer, 8000);
      });
      depoDotsEl.appendChild(btn);
    }
  };

  const goToDepoPage = (page) => {
    if (!depoTrackEl || !depoSlides.length) return;
    depoPage = Math.max(0, Math.min(page, totalPages() - 1));
    const slideW = depoSlides[0].offsetWidth + 20;
    depoTrackEl.style.transform = `translateX(-${depoPage * slideW}px)`;
    $$('.depo-dot', depoDotsEl).forEach((dot, i) => {
      dot.classList.toggle('is-active', i === depoPage);
    });
  };

  const startDepoTimer = () => {
    stopDepoTimer();
    depoTimer = setInterval(() => {
      goToDepoPage((depoPage + 1) % totalPages());
    }, 4000);
  };

  const stopDepoTimer = () => {
    if (depoTimer) { clearInterval(depoTimer); depoTimer = null; }
  };

  const depoSliderEl = $('.depo-slider');
  if (depoSliderEl && depoSlides.length) {
    buildDepoDots();

    window.addEventListener('resize', () => {
      depoPage = 0;
      buildDepoDots();
      goToDepoPage(0);
    });

    depoSliderEl.addEventListener('mouseenter', stopDepoTimer);
    depoSliderEl.addEventListener('mouseleave', startDepoTimer);

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting ? startDepoTimer() : stopDepoTimer());
      }, { threshold: 0.3 });
      obs.observe(depoSliderEl);
    } else {
      startDepoTimer();
    }
  }

  // ---- Active link highlight on scroll ----
  const sections = $$('main section[id]');
  const navLinks = $$('.nav a[href^="#"]');
  if ('IntersectionObserver' in window && sections.length) {
    const setActive = (id) => {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isActive);
      });
    };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0.5 });
    sections.forEach(s => sectionObserver.observe(s));
  }
})();
