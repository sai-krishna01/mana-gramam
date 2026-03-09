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
  if (content) content.style.display = 'grid';

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
        btn.value = 'Raise your issue';
        alert('Form submitted successfully! We will contact you soon.');
        form.reset();
      },
      () => {
        btn.value = 'Raise your issue';
        alert('Something went wrong while sending your request. Please try again.');
      }
    );
  });
}
