function showPage(pageId) {
  const pages = document.querySelectorAll('.page-section');
  pages.forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const btn = document.getElementById('button');
const form = document.getElementById('form');
const issueImageInput = document.getElementById('issue-image');
const issuePreview = document.getElementById('issue-preview');

if (issueImageInput && issuePreview) {
  issueImageInput.addEventListener('change', (event) => {
    const [file] = event.target.files || [];
    if (!file) {
      issuePreview.src = '';
      issuePreview.style.display = 'none';
      return;
    }

  if (hero) hero.style.display = 'block';
  if (content) content.style.display = 'grid';

  [login, signup, contact].forEach((section) => {
    if (section) section.style.display = 'none';
  });
}

if (form && btn) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Sending...';

    if (!window.emailjs) {
      btn.value = 'Raise your issue';
      alert('Issue saved locally. Email service unavailable right now.');
      form.reset();
      if (issuePreview) {
        issuePreview.src = '';
        issuePreview.style.display = 'none';
      }
      return;
    }

    const serviceID = 'service_eadh9rd';
    const templateID = 'template_4c4536t';

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = 'Raise your issue';
        alert('Form submitted successfully! We will contact you soon.');
        form.reset();
        if (issuePreview) {
          issuePreview.src = '';
          issuePreview.style.display = 'none';
        }
      },
      () => {
        btn.value = 'Raise your issue';
        alert('Something went wrong while sending your request. Please try again.');
      }
    );
  });
}
