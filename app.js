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

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    // Filter gallery items
    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentImageIndex = 0;
let visibleImages = [];

// Get all visible gallery images (for filtering support)
function getVisibleImages() {
  return Array.from(galleryItems)
    .filter(item => !item.classList.contains('hidden'))
    .map(item => item.querySelector('.gallery-image'));
}

// Open lightbox
function openLightbox(index) {
  visibleImages = getVisibleImages();
  if (visibleImages.length === 0) return;
  
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Update lightbox image
function updateLightboxImage() {
  if (visibleImages.length === 0) return;
  
  // Ensure index is within bounds
  if (currentImageIndex < 0) {
    currentImageIndex = visibleImages.length - 1;
  } else if (currentImageIndex >= visibleImages.length) {
    currentImageIndex = 0;
  }
  
  const image = visibleImages[currentImageIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
}

// Navigate to next image
function nextImage() {
  if (visibleImages.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
  updateLightboxImage();
}

// Navigate to previous image
function prevImage() {
  if (visibleImages.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
  updateLightboxImage();
}

// Open lightbox when clicking gallery images
galleryItems.forEach((item) => {
  const image = item.querySelector('.gallery-image');
  image.addEventListener('click', () => {
    visibleImages = getVisibleImages();
    const actualIndex = visibleImages.indexOf(image);
    if (actualIndex !== -1) {
      openLightbox(actualIndex);
    }
  });
});

// Close lightbox with close button
lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking backdrop
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Next/prev buttons
lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  nextImage();
});

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  prevImage();
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  switch(e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowRight':
      e.preventDefault();
      nextImage();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      prevImage();
      break;
  }
});
