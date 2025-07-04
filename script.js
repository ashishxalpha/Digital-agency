document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(function () {
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    }, 500);
  });

  // Progress Bar on Scroll
  const progressBar = document.getElementById("scrollProgress");
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  // Improved Typewriter Effect
  const typewriterElements = document.querySelectorAll(".typewriter");

  function startTypewriter(element) {
    const text = element.getAttribute("data-text");
    const typeSpeed = 100;

    if (!element.classList.contains("typing-active")) {
      element.classList.add("typing-active");
      element.textContent = "";

      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          element.textContent += text.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          element.classList.remove("typing-active");
          // Remove the cursor after typing is complete
          element.classList.add("typing-complete");
        }
      }, typeSpeed);
    }
  }

  // Counter Animation for Stats
  const counters = document.querySelectorAll(".counter");
  const counterSpeed = 200;

  function startCounter(counter) {
    const target = parseInt(counter.getAttribute("data-target"));
    let count = 0;
    const updateCount = () => {
      const increment = target / counterSpeed;
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  }

  // Fix visibility issues with service cards, process steps, and team members
  document
    .querySelectorAll(".service-card, .process-step, .team-member, .work-item")
    .forEach((item) => {
      item.style.opacity = "1";
      item.style.visibility = "visible";
      item.style.display = "block";
    });

  // Improve visibility of sections with white space issues
  document
    .querySelectorAll(".services-grid, .process-steps, .team-grid")
    .forEach((grid) => {
      grid.style.opacity = "1";
      grid.style.visibility = "visible";
      grid.style.display = "grid";
    });

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1, // Reduced threshold to detect elements earlier
    rootMargin: "0px",
  };

  // Observer for animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Handle different types of animations
        if (entry.target.classList.contains("typewriter")) {
          startTypewriter(entry.target);
        } else if (entry.target.classList.contains("counter")) {
          startCounter(entry.target);
        } else if (entry.target.hasAttribute("data-aos")) {
          entry.target.classList.add("aos-animate");
        }

        // Only trigger once for efficiency
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animations
  typewriterElements.forEach((element) => {
    animationObserver.observe(element);
  });

  counters.forEach((counter) => {
    animationObserver.observe(counter);
  });

  // AOS (Animate On Scroll) Elements with improved visibility
  const animateElements = document.querySelectorAll("[data-aos]");

  animateElements.forEach((element) => {
    element.classList.add("aos-init");
    // Set initial opacity to ensure visibility
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    element.style.transition =
      "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease";

    // Add delay if specified
    const delay = element.getAttribute("data-aos-delay");
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }

    // Observe the element
    animationObserver.observe(element);
  });

  // Parallax Effect
  const parallaxWindows = document.querySelectorAll(".parallax-window");

  function handleParallax() {
    parallaxWindows.forEach(function (parallaxWindow) {
      const parallaxBg = parallaxWindow.querySelector(".parallax-bg");
      if (!parallaxBg) return;

      const scrollPosition = window.scrollY;
      const windowTop = parallaxWindow.offsetTop;
      const windowHeight = parallaxWindow.offsetHeight;

      // Check if section is in view
      if (
        scrollPosition + window.innerHeight > windowTop &&
        scrollPosition < windowTop + windowHeight
      ) {
        // Calculate parallax amount
        const yPos = (scrollPosition - windowTop) * 0.3;

        // Apply transform using translate3d for hardware acceleration
        parallaxBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });
  }

  // Initialize parallax
  handleParallax();

  // Update parallax on scroll
  window.addEventListener("scroll", handleParallax);

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Back to Top Button
  const backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Active Navigation Links
  const sections = document.querySelectorAll("section");
  const navLi = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLi.forEach((li) => {
      li.classList.remove("active");
      if (li.getAttribute("href") === "#" + current) {
        li.classList.add("active");
      }
    });
  });

  // Enhanced Portfolio Filter with improved transitions
  const filterButtons = document.querySelectorAll(".filter-btn");
  const workItems = document.querySelectorAll(".work-item");

  // Force all work items to display immediately on page load
  workItems.forEach((item) => {
    item.style.display = "block";
    item.style.opacity = "1";
    item.style.transform = "scale(1)";
    item.style.visibility = "visible";
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Enhanced smooth transitions
      workItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          // Show with improved animation
          item.style.display = "block";
          item.style.visibility = "visible";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1) translateY(0)";
          }, 10);
        } else {
          // Hide with improved animation
          item.style.opacity = "0";
          item.style.transform = "scale(0.95) translateY(10px)";
          setTimeout(() => {
            item.style.display = "none";
            item.style.visibility = "hidden";
          }, 400); // Longer transition to smooth the effect
        }
      });
    });
  });

  // Advanced Testimonial Slider with improved transitions
  const testimonialSlider = document.getElementById("testimonial-slider");
  const testimonialItems =
    testimonialSlider.querySelectorAll(".testimonial-item");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.getElementById("prev-testimonial");
  const nextButton = document.getElementById("next-testimonial");

  let currentSlide = 0;
  const totalSlides = testimonialItems.length;
  let isAnimating = false; // Flag to prevent rapid clicks

  // Set initial state for all slides
  testimonialItems.forEach((item, index) => {
    if (index === 0) {
      item.classList.add("active");
      item.style.display = "block";
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    } else {
      item.classList.remove("active");
      item.style.display = "none";
      item.style.opacity = "0";
      item.style.transform = "translateX(50px)";
    }
  });

  function showSlide(index, direction = "next") {
    if (isAnimating) return;
    isAnimating = true;

    // Calculate new index
    let newIndex;
    if (index < 0) {
      newIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      newIndex = 0;
    } else {
      newIndex = index;
    }

    // Set transform direction based on navigation
    const currentTransform =
      direction === "next" ? "translateX(-50px)" : "translateX(50px)";
    const nextTransform =
      direction === "next" ? "translateX(50px)" : "translateX(-50px)";

    // Hide current slide with animation
    testimonialItems[currentSlide].style.opacity = "0";
    testimonialItems[currentSlide].style.transform = currentTransform;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.remove("active");
      if (i === newIndex) {
        dot.classList.add("active");
      }
    });

    // Show new slide after a brief delay
    setTimeout(() => {
      testimonialItems[currentSlide].style.display = "none";
      testimonialItems[currentSlide].classList.remove("active");

      // Prepare next slide
      testimonialItems[newIndex].style.display = "block";
      testimonialItems[newIndex].style.transform = nextTransform;
      testimonialItems[newIndex].style.opacity = "0";

      // Trigger reflow
      testimonialSlider.offsetHeight;

      // Animate in the new slide
      testimonialItems[newIndex].style.opacity = "1";
      testimonialItems[newIndex].style.transform = "translateX(0)";
      testimonialItems[newIndex].classList.add("active");

      // Update current slide index
      currentSlide = newIndex;

      // Reset animation flag after transition completes
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }, 300);
  }

  // Event listeners for controls
  prevButton.addEventListener("click", () => {
    showSlide(currentSlide - 1, "prev");
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1, "next");
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (currentSlide === index) return;
      showSlide(index, index > currentSlide ? "next" : "prev");
    });
  });

  // Auto slide testimonials
  const autoSlideInterval = setInterval(() => {
    if (!isAnimating) {
      showSlide(currentSlide + 1, "next");
    }
  }, 6000);

  // Pause auto-slide on hover
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  // Fix service cards, process steps and team members visibility
  window.addEventListener("scroll", function () {
    const serviceCards = document.querySelectorAll(".service-card");
    const processSteps = document.querySelectorAll(".process-step");
    const teamMembers = document.querySelectorAll(".team-member");

    serviceCards.forEach((card) => {
      card.style.opacity = "1";
      card.style.visibility = "visible";
    });

    processSteps.forEach((step) => {
      step.style.opacity = "1";
      step.style.visibility = "visible";
    });

    teamMembers.forEach((member) => {
      member.style.opacity = "1";
      member.style.visibility = "visible";
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      // For demonstration, we'll just show an alert
      alert(
        `Thank you ${name} for contacting us! We will get back to you soon.`
      );

      // Reset the form
      contactForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');

      if (emailInput.value) {
        alert(
          `Thank you for subscribing to our newsletter with email: ${emailInput.value}`
        );
        emailInput.value = "";
      }
    });
  }

  // Enhanced Dynamic Floating Shapes with Scroll Response
  const floatingShapes = document.querySelectorAll(".floating-shapes .shape");
  const particles = document.querySelectorAll(".particle-system .particle");

  // Initialize shape positions and properties
  floatingShapes.forEach((shape, index) => {
    // Set initial positions for shapes that don't have CSS positioning
    if (!shape.style.left && !shape.style.right) {
      const randomX = Math.random() * 80 + 10; // 10-90% range
      const randomY = Math.random() * 80 + 10; // 10-90% range
      shape.style.left = `${randomX}%`;
      shape.style.top = `${randomY}%`;
    }
    
    // Add scroll-responsive behavior
    shape.setAttribute('data-scroll-factor', (Math.random() * 0.5 + 0.2).toFixed(2));
    shape.setAttribute('data-initial-x', shape.style.left || '0%');
    shape.setAttribute('data-initial-y', shape.style.top || '0%');
  });

  // Enhanced scroll-responsive animations
  function updateDynamicElements() {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;

    // Update floating shapes with scroll influence
    floatingShapes.forEach((shape) => {
      const scrollFactor = parseFloat(shape.getAttribute('data-scroll-factor'));
      const baseTransform = shape.style.transform || '';
      
      // Apply subtle scroll-based movement
      const xOffset = Math.sin(scrollProgress * Math.PI * 2) * 20 * scrollFactor;
      const yOffset = Math.cos(scrollProgress * Math.PI * 3) * 15 * scrollFactor;
      const rotation = scrollProgress * 180 * scrollFactor;
      
      // Combine with existing animation
      shape.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
      
      // Dynamic opacity based on scroll
      const opacity = 0.3 + Math.abs(Math.sin(scrollProgress * Math.PI * 4)) * 0.5;
      shape.style.opacity = opacity;
    });

    // Update particles with scroll influence
    particles.forEach((particle, index) => {
      const scrollFactor = (index + 1) * 0.1;
      const xOffset = Math.sin(scrollProgress * Math.PI * 4 + index) * 30;
      const yOffset = scrollProgress * 50 * scrollFactor;
      
      particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      particle.style.opacity = 0.2 + Math.abs(Math.sin(scrollProgress * Math.PI * 6 + index)) * 0.6;
    });
  }

  // Add scroll listener for dynamic elements
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    // Throttle scroll events for better performance
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(updateDynamicElements);
  });

  // Initialize dynamic elements
  updateDynamicElements();

  // Add mouse movement interaction for enhanced dynamism
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingShapes.forEach((shape, index) => {
      const influence = 0.5 + index * 0.1;
      const xOffset = (mouseX - 0.5) * 20 * influence;
      const yOffset = (mouseY - 0.5) * 15 * influence;
      
      // Apply subtle mouse influence
      const currentTransform = shape.style.transform || '';
      if (currentTransform.includes('translate')) {
        // Update existing transform
        const newTransform = currentTransform.replace(
          /translate\([^)]+\)/,
          `translate(${xOffset}px, ${yOffset}px)`
        );
        shape.style.transform = newTransform;
      } else {
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px) ${currentTransform}`;
      }
    });
  });

  // Current date display
  const dateElement = document.createElement("div");
  dateElement.classList.add("current-date");
  dateElement.textContent = "Tuesday, April 8, 2025";
  const footerBottom = document.querySelector(".footer-bottom");
  if (footerBottom) {
    footerBottom.prepend(dateElement);
  }
});
