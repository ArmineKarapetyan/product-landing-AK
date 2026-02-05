// Update year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Active section highlight in navbar
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

function updateActiveNavLink() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Update on scroll
window.addEventListener('scroll', updateActiveNavLink);
// Update on page load
updateActiveNavLink();

// Modal functionality
const modal = document.getElementById('modal');
const ctaBtn = document.getElementById('ctaBtn');
const modalClose = document.querySelector('.modal-close');
const modalForm = document.getElementById('modalForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

// Open modal
ctaBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  nameInput.focus();
});

// Close modal function
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  modalForm.reset();
  // Clear error states
  nameInput.classList.remove('error');
  emailInput.classList.remove('error');
  nameError.classList.remove('show');
  emailError.classList.remove('show');
}

// Close modal with close button
modalClose.addEventListener('click', closeModal);

// Close modal when clicking backdrop
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form validation and submission
modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isValid = true;
  
  // Clear previous errors
  nameInput.classList.remove('error');
  emailInput.classList.remove('error');
  nameError.classList.remove('show');
  emailError.classList.remove('show');
  
  // Validate name
  const nameValue = nameInput.value.trim();
  if (!nameValue) {
    nameInput.classList.add('error');
    nameError.classList.add('show');
    isValid = false;
  }
  
  // Validate email
  const emailValue = emailInput.value.trim();
  if (!emailValue) {
    emailInput.classList.add('error');
    emailError.textContent = 'Email is required';
    emailError.classList.add('show');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    emailInput.classList.add('error');
    emailError.textContent = 'Please enter a valid email address';
    emailError.classList.add('show');
    isValid = false;
  }
  
  // If form is valid, handle submission
  if (isValid) {
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name: nameValue, email: emailValue });
    alert(`Thank you, ${nameValue}! We'll be in touch soon.`);
    closeModal();
  }
});

// Pricing button interaction
const pricingMessage = document.getElementById("pricingMessage");
document.querySelectorAll(".priceBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan;
    pricingMessage.textContent = `You selected: ${plan}. (Demo interaction ✅)`;
  });
});
