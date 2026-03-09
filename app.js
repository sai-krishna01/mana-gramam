function openlogin() {
  let login = document.getElementById('login-form');
  let hero = document.getElementById('hero');
  let cont = document.getElementById('content');
  cont.style.display = 'none';
  hero.style.display = 'none';
  login.style.display = 'block';
}

function closelogin() {
  let close = document.getElementById('login-form');
  let card = document.getElementById('hero');
  let cont = document.getElementById('content');
  cont.style.display = 'block';
  card.style.display = 'block';
  close.style.display = 'none';
}

function contact() {
  let card = document.getElementById('hero');
  let contactus = document.getElementById('contactus');
  let cont = document.getElementById('content');
  cont.style.display = 'none';
  card.style.display = 'none';
  contactus.style.display = 'block';
}

function closecontact() {
  let card = document.getElementById('hero');
  let contactus = document.getElementById('contactus');
  let cont = document.getElementById('content');
  cont.style.display = 'block';
  card.style.display = 'block';
  contactus.style.display = 'none';
}

function signup() {
  let card = document.getElementById('hero');
  let signup = document.getElementById('signup-form');
  let cont = document.getElementById('content');
  cont.style.display = 'none';
  card.style.display = 'none';
  signup.style.display = 'block';
}

function closesignup() {
  let card = document.getElementById('hero');
  let signup = document.getElementById('signup-form');
  let cont = document.getElementById('content');
  cont.style.display = 'block';
  card.style.display = 'block';
  signup.style.display = 'none';
}

const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function (event) {
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
    },
  );
});

const images = [
  'green (1).jpg',
  'green (2).jpg',
  'green (3).jpg',
  'green (4).jpg',
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

const textUpdates = [
  'ప్లాస్టిక్ వినియోగాన్ని తగ్గించి, పునర్వినియోగాన్ని పెంచితే గ్రామం మరింత శుభ్రంగా ఉంటుంది.',
  'వైద్య వ్యర్థాలను వేరు చేసి సురక్షితంగా నిర్వాహించడం ప్రజల ఆరోగ్యానికి అవసరం.',
  'పశువుల వ్యర్థాలను ఎరువుగా మార్చితే వ్యవసాయానికి మేలు, కాలుష్యానికి అడ్డుకట్ట.',
  'ప్రతి ఇంటి వద్ద తడి, పొడి చెత్తను వేర్వేరుగా సేకరించడం మంచి ప్రారంభం.',
  'మన గ్రామం, మన బాధ్యత — శుభ్రతను అలవాటుగా మార్చుదాం.',
];

const imageElements = document.querySelectorAll('.rotating-image');
const textElements = document.querySelectorAll('.rotating-text');
let activeCardIndex = 0;
let activeImageIndex = 0;
let activeTextIndex = 0;

function updateOneByOne() {
  if (!imageElements.length || !textElements.length) {
    return;
  }

  const imageElement = imageElements[activeCardIndex % imageElements.length];
  const textElement = textElements[activeCardIndex % textElements.length];

  imageElement.src = images[activeImageIndex % images.length];
  textElement.textContent = textUpdates[activeTextIndex % textUpdates.length];

  activeCardIndex = (activeCardIndex + 1) % imageElements.length;
  activeImageIndex = (activeImageIndex + 1) % images.length;
  activeTextIndex = (activeTextIndex + 1) % textUpdates.length;
}

updateOneByOne();
setInterval(updateOneByOne, 2000);
