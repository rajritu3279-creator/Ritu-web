import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  // Navbar Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('glass-nav');
      header.classList.remove('py-4', 'border-transparent');
    } else {
      header.classList.remove('glass-nav');
      header.classList.add('py-4', 'border-transparent');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    
    // Change icon
    const icon = mobileMenuBtn.querySelector('i');
    if (!isExpanded) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    });
  });

  // Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      el.classList.add('opacity-0');
      revealObserver.observe(el);
    } else {
      el.classList.remove('opacity-0');
    }
  });

  // Menu Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'text-[#d4af37]', 'border-[#d4af37]');
        b.classList.add('text-gray-400', 'border-transparent');
      });
      
      btn.classList.add('active', 'text-[#d4af37]', 'border-[#d4af37]');
      btn.classList.remove('text-gray-400', 'border-transparent');
      
      const filterValue = btn.getAttribute('data-filter');
      
      menuItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Lightbox functionality
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  
  let currentImageIndex = 0;
  const imageSources = Array.from(galleryItems).map(item => item.querySelector('img').src);

  const openLightbox = (index) => {
    currentImageIndex = index;
    lightboxImg.src = imageSources[currentImageIndex];
    lightbox.classList.remove('hidden');
    setTimeout(() => {
      lightbox.classList.remove('opacity-0');
      lightboxImg.classList.remove('scale-95');
      lightboxImg.classList.add('scale-100');
    }, 10);
    document.body.style.overflow = 'hidden'; // prevent bg scroll
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxClose.focus();
  };

  const closeLightboxFunc = () => {
    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightbox.setAttribute('aria-hidden', 'true');
    }, 300);
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', closeLightboxFunc);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightboxFunc();
    }
  });

  const nextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    lightboxImg.src = imageSources[currentImageIndex];
  };

  const prevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    lightboxImg.src = imageSources[currentImageIndex];
  };

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
  });
  
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightboxFunc();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });

  // Back to top
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
