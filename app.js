function openlogin() {
  const login = document.getElementById('login-form');
  const hero = document.getElementById('hero');
  const cont = document.getElementById('content');
  cont.style.display = 'none';
  hero.style.display = 'none';
  login.style.display = 'block';
}

function closelogin() {
  const close = document.getElementById('login-form');
  const card = document.getElementById('hero');
  const cont = document.getElementById('content');
  cont.style.display = 'grid';
  card.style.display = 'block';
  close.style.display = 'none';
}

function contact() {
  const card = document.getElementById('hero');
  const contactus = document.getElementById('contactus');
  const cont = document.getElementById('content');
  cont.style.display = 'none';
  card.style.display = 'none';
  contactus.style.display = 'block';
}

function closecontact() {
  const card = document.getElementById('hero');
  const contactus = document.getElementById('contactus');
  const cont = document.getElementById('content');
  cont.style.display = 'grid';
  card.style.display = 'block';
  contactus.style.display = 'none';
}

function signup() {
  const card = document.getElementById('hero');
  const signup = document.getElementById('signup-form');
  const cont = document.getElementById('content');
  cont.style.display = 'none';
  card.style.display = 'none';
  signup.style.display = 'block';
}

function closesignup() {
  const card = document.getElementById('hero');
  const signup = document.getElementById('signup-form');
  const cont = document.getElementById('content');
  cont.style.display = 'grid';
  card.style.display = 'block';
  signup.style.display = 'none';
}

const btn = document.getElementById('button');
const form = document.getElementById('form');

if (form && btn) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'service_eadh9rd';
    const templateID = 'template_4c4536t';

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = 'Send Email';
        alert('Form submitted successfully! We will contact you soon.');
      },
      (err) => {
        btn.value = 'Send Email';
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
  imgElements.forEach((img) => {
    img.src = images[currentIndex];
  });
  currentIndex = (currentIndex + 1) % images.length;
}

if (imgElements.length > 0) {
  changeImage();
  setInterval(changeImage, 3000);
}
