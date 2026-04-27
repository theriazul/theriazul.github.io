const body = document.body;

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  
  // Apply theme to body
  if (isDark) {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
  
  // Update button icon and label
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) {
      if (isDark) {
        // Sun icon for dark theme (switch to light)
        icon.innerHTML = '<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" fill="currentColor"/>';
      } else {
        // Moon icon for light theme (switch to dark)
        icon.innerHTML = '<path fill-rule="evenodd" clip-rule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor"/>';
      }
    }
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  // Update logo glow based on theme
  const logo = document.querySelector('.brand-logo');
  if (logo) {
    if (isDark) {
      logo.style.setProperty('--glow-color1', 'rgba(102, 217, 255, 0.4)');
      logo.style.setProperty('--glow-color2', 'rgba(139, 92, 255, 0.2)');
      logo.style.setProperty('--glow-hover1', 'rgba(102, 217, 255, 0.7)');
      logo.style.setProperty('--glow-hover2', 'rgba(139, 92, 255, 0.5)');
      logo.style.setProperty('--glow-hover3', 'rgba(255, 105, 180, 0.3)');
    } else {
      logo.style.setProperty('--glow-color1', 'rgba(255, 165, 0, 0.4)');
      logo.style.setProperty('--glow-color2', 'rgba(255, 69, 0, 0.2)');
      logo.style.setProperty('--glow-hover1', 'rgba(255, 165, 0, 0.7)');
      logo.style.setProperty('--glow-hover2', 'rgba(255, 69, 0, 0.5)');
      logo.style.setProperty('--glow-hover3', 'rgba(255, 20, 147, 0.3)');
    }
  }

  localStorage.setItem('preferred-theme', theme);
};

const initTheme = () => {
  const savedTheme = localStorage.getItem('preferred-theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(savedTheme || systemTheme);
};

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const themeToggle = document.getElementById("theme-toggle");

  const closeMobileMenu = () => {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    body.classList.remove('menu-open');
  };

  const toggleMobileMenu = () => {
    if (!mobileMenu || !navToggle) return;
    const isOpen = !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', isOpen);
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    body.classList.toggle('menu-open', isOpen);
  };

  const pageSections = Array.from(document.querySelectorAll('section[id]'));
  const desktopNavLinks = Array.from(document.querySelectorAll('.nav-link'));
  const mobileMenuLinks = Array.from(document.querySelectorAll('.mobile-nav-items a'));
  const allNavLinks = [...desktopNavLinks, ...mobileMenuLinks];

  const setActiveLink = (targetHash) => {
    allNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === targetHash);
    });
  };

  const updateActiveNavLinks = () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.18;
    let activeId = pageSections[0]?.id || '';

    pageSections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        activeId = section.id;
      }
    });

    setActiveLink(activeId ? `#${activeId}` : '');
  };

  const handleNavLinkClick = (event) => {
    const target = event.currentTarget;
    if (target.hash) {
      setActiveLink(target.hash);
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  };

  allNavLinks.forEach(link => {
    link.addEventListener('click', handleNavLinkClick);
  });

  updateActiveNavLinks();

  if (navToggle) {
    navToggle.addEventListener('click', event => {
      event.preventDefault();
      toggleMobileMenu();
    });
  }

  document.addEventListener('click', event => {
    const target = event.target;
    if (navToggle?.contains(target) || target === navToggle) {
      return;
    }

    if (!mobileMenu || !navToggle) return;
    if (!mobileMenu.contains(target) && !navToggle.contains(target)) {
      closeMobileMenu();
    }
  });

  // Throttle scroll event for better performance
  let lastScrollTime = 0;
  const scrollThrottle = 150;

  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime >= scrollThrottle) {
      lastScrollTime = now;
      updateActiveNavLinks();
      if (window.innerWidth <= 767.98 && mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Add rotation animation
      const icon = themeToggle.querySelector('.theme-icon');
      if (icon) {
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
          icon.style.transform = 'rotate(0deg)';
        }, 300);
      }
      
      const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  mobileMenu?.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Counter animation logic
let counterSectionVisible = false;
let counterFrameIds = new Map();
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

const resetCounters = (counterElements) => {
  counterFrameIds.forEach(frameId => {
    cancelAnimationFrame(frameId);
  });
  counterFrameIds.clear();

  counterElements.forEach(el => {
    el.textContent = '0';
  });
};

const animateCounter = (el, target) => {
  const duration = 1500;
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeOutCubic(progress);
    const currentValue = Math.floor(eased * target);
    el.textContent = String(currentValue);

    if (progress < 1) {
      const frameId = requestAnimationFrame(step);
      counterFrameIds.set(el, frameId);
    } else {
      el.textContent = String(target);
      counterFrameIds.delete(el);
    }
  };

  const frameId = requestAnimationFrame(step);
  counterFrameIds.set(el, frameId);
};

const startCounters = (counterElements) => {
  counterElements.forEach(el => {
    const target = parseInt(el.dataset.number, 10) || 0;
    if (target > 0) {
      animateCounter(el, target);
    }
  });
};

// Add fade-in class to sections for animation
// and initialize observers after the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('fade-in');
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  const counterSection = document.getElementById('section-counter');
  const counterElements = counterSection ? counterSection.querySelectorAll('.number') : [];

  if (counterSection && counterElements.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterSectionVisible) {
          counterSectionVisible = true;
          startCounters(counterElements);
        } else if (!entry.isIntersecting && counterSectionVisible) {
          counterSectionVisible = false;
          resetCounters(counterElements);
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '0px 0px -10px 0px'
    });

    counterObserver.observe(counterSection);
  }
});

// Cursor Follow Effect
document.addEventListener('DOMContentLoaded', () => {
  const cursorGlow = document.getElementById('cursor-glow');
  const heroSection = document.querySelector('.hero');
  
  if (!cursorGlow || !heroSection) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  let animationId = null;
  let isHovering = false;
  
  // Check if device is mobile/tablet
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  if (isMobile) {
    // Disable cursor effect on mobile devices
    cursorGlow.style.display = 'none';
    return;
  }
  
  const updateGlowPosition = () => {
    // Smooth easing for natural movement
    const easing = 0.12;
    glowX += (mouseX - glowX) * easing;
    glowY += (mouseY - glowY) * easing;
    
    cursorGlow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;
    
    if (isHovering) {
      animationId = requestAnimationFrame(updateGlowPosition);
    }
  };
  
  const handleMouseMove = (e) => {
    const rect = heroSection.getBoundingClientRect();
    
    // Check if mouse is within hero section bounds
    if (e.clientX >= rect.left && e.clientX <= rect.right && 
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
      
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      if (!isHovering) {
        isHovering = true;
        cursorGlow.style.opacity = '1';
        updateGlowPosition();
      }
    } else {
      if (isHovering) {
        isHovering = false;
        cursorGlow.style.opacity = '0';
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      }
    }
  };
  
  const handleMouseLeave = () => {
    isHovering = false;
    cursorGlow.style.opacity = '0';
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
  
  // Add event listeners
  heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
  heroSection.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      if (newIsMobile) {
        cursorGlow.style.display = 'none';
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      } else {
        cursorGlow.style.display = '';
        heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
        heroSection.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      }
    }
  }, { passive: true });
});