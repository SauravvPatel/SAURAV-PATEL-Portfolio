document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".nav-links");
  const header = document.querySelector("header");
  const projectCards = document.querySelectorAll(".project-card");
  const skillCards = document.querySelectorAll(".skill-card");
  const contactForm = document.querySelector(".contact-form");

  // Add scroll progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  // Scroll Progress Bar
  window.addEventListener("scroll", function () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";

    // Header scroll effect
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Parallax Effect
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    document.querySelector(".hero").style.backgroundPositionY = -(scrolled * 0.5) + "px";
  });

  // Smooth Scrolling with Active Section Detection
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth"
        });
        
        // Update active link
        navLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");

        // Close mobile menu if open
        if (mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active");
          hamburger.classList.remove("active");
        }
      }
    });
  });

  // Mobile Navigation
  hamburger.addEventListener("click", function () {
    mobileNav.classList.toggle("active");
    hamburger.classList.toggle("active");
    document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : "";
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target) && mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Project Card Hover Effects
  projectCards.forEach(card => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.style.setProperty("--mouse-x", `${x}px`);
      this.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Skill Cards Animation
  skillCards.forEach(card => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
    });
    
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Form Validation with Microinteractions
  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea");
    
    inputs.forEach(input => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
      });
      
      input.addEventListener("blur", function () {
        if (!this.value) {
          this.parentElement.classList.remove("focused");
        }
      });
      
      input.addEventListener("input", function () {
        if (this.value) {
          this.classList.add("valid");
        } else {
          this.classList.remove("valid");
        }
      });
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      if (isValid) {
        // Show success animation
        this.classList.add("submitted");
        setTimeout(() => {
          this.reset();
          this.classList.remove("submitted");
        }, 2000);
      }
    });
  }

  // Scroll Animation
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach(element => {
    observer.observe(element);
  });

  // Context-Aware Navigation
  window.addEventListener("scroll", function () {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Easter Egg: Konami Code
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let konamiIndex = 0;

  document.addEventListener("keydown", function (e) {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Trigger easter egg
        document.body.classList.add("easter-egg");
        setTimeout(() => {
          document.body.classList.remove("easter-egg");
        }, 5000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Scroll Animation
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add('visible');
      }
    });
  };

  // Initial check for elements in view
  window.addEventListener('load', animateOnScroll);
  // Check for elements in view on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Project Modal
  const modal = document.querySelector('.project-modal');
  const closeModal = document.querySelector('.close-modal');
  const modalContent = document.querySelector('.modal-content');

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Close modal when clicking close button
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Add click event to project cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent;
      const description = card.querySelector('p').textContent;
      const image = card.querySelector('img').src;
      const tags = Array.from(card.querySelectorAll('.project-tags span')).map(tag => tag.textContent);
      
      const modalBody = document.querySelector('.modal-body');
      modalBody.innerHTML = `
        <div class="modal-image">
          <img src="${image}" alt="${title}" />
        </div>
        <div class="modal-info">
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="modal-tags">
            ${tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <div class="modal-links">
            ${card.querySelector('.project-links').innerHTML}
          </div>
        </div>
      `;
      
      modal.classList.add('active');
    });
  });

  // Contact Form Interactions
  const form = document.querySelector('.contact-form');
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    // Remove focus effect when empty
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });

    // Add input validation
    input.addEventListener('input', () => {
      if (input.value) {
        input.parentElement.classList.add('valid');
      } else {
        input.parentElement.classList.remove('valid');
      }
    });
  });

  // Form submission animation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state
    const submitButton = form.querySelector('button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
      // Reset form
      form.reset();
      inputs.forEach(input => {
        input.parentElement.classList.remove('focused', 'valid');
      });
      
      // Show success message
      submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      
      // Reset button after 2 seconds
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 2000);
    }, 1500);
  });

  // Contact item hover effects
  const contactItems = document.querySelectorAll('.contact-item');

  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const icon = item.querySelector('i');
      icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    item.addEventListener('mouseleave', () => {
      const icon = item.querySelector('i');
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Social links hover effects
  const socialLinks = document.querySelectorAll('.contact-social a');

  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const icon = link.querySelector('i');
      icon.style.transform = 'scale(1.2) rotate(360deg)';
    });
    
    link.addEventListener('mouseleave', () => {
      const icon = link.querySelector('i');
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});
