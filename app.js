function showSection(sectionId) {
  const hero = document.getElementById('hero');
  const content = document.getElementById('content');
  const login = document.getElementById('login-form');
  const signup = document.getElementById('signup-form');
  const contact = document.getElementById('contactus');

  if (hero) hero.style.display = 'none';
  if (content) content.style.display = 'none';

  [login, signup, contact].forEach((section) => {
    if (section) section.style.display = 'none';
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = sectionId === 'contactus' ? 'flex' : 'block';
  }
}

function hideSections() {
  const hero = document.getElementById('hero');
  const content = document.getElementById('content');
  const login = document.getElementById('login-form');
  const signup = document.getElementById('signup-form');
  const contact = document.getElementById('contactus');

  if (hero) hero.style.display = 'block';
  if (content) content.style.display = 'block';
  [login, signup, contact].forEach((section) => {
    if (section) section.style.display = 'none';
  });
}

function openlogin() {
  showSection('login-form');
}

function closelogin() {
  hideSections();
}

function contact() {
  showSection('contactus');
}

function closecontact() {
  hideSections();
}

function signup() {
  showSection('signup-form');
}

function closesignup() {
  hideSections();
}

const btn = document.getElementById('button');
const form = document.getElementById('form');

if (form && btn) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!window.emailjs) {
      alert('Service is temporarily unavailable. Please try again later.');
      return;
    }

    btn.value = 'Sending...';

    const serviceID = 'service_eadh9rd';
    const templateID = 'template_4c4536t';

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = 'raise your issue';
        alert('Form submitted successfully! We will contact you soon.');
        form.reset();
      },
      (err) => {
        btn.value = 'raise your issue';
        alert(JSON.stringify(err));
      }
    );
  });
}

const images = [
  'green (1).jpg',
  'green (2).jpg',
  'green (3).jpg',
  'green (5).jpg',
  'green (6).jpg',
  'green (7).jpg',
  'green (8).jpg',
  'green (9).jpg',
  'green (10).jpg',
  'green (11).jpg',
  'green (12).jpg',
  'green (13).jpg',
  'green (14).jpg',
  'green (15).jpg',
  'green (16).jpg',
  'green (17).jpg',
  'green (18).jpg',
  'green (19).jpg',
  'green (20).jpg',
  'green (21).jpg',
  'green (22).jpg',
  'green (23).jpg',
  'green (24).jpg',
];

const imgElements = document.querySelectorAll('.img');
let currentIndex = 0;

function changeImage() {
  if (!imgElements.length) return;

  imgElements.forEach((image) => {
    image.src = images[currentIndex];
  });

  currentIndex = (currentIndex + 1) % images.length;
}

changeImage();
setInterval(changeImage, 3000);
