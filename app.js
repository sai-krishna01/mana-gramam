const sections = Array.from(document.querySelectorAll('.page-section'));
const navButtons = Array.from(document.querySelectorAll('[data-page-target]'));

function showPage(pageId) {
  let found = false;

  sections.forEach((section) => {
    const isActive = section.id === pageId;
    section.classList.toggle('active', isActive);
    if (isActive) found = true;
  });

  navButtons.forEach((button) => {
    const isActive = button.dataset.pageTarget === pageId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  if (!found && sections.length > 0) {
    sections[0].classList.add('active');
    navButtons[0]?.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const pageId = button.dataset.pageTarget;
    if (pageId) showPage(pageId);
  });
});

if (window.emailjs) {
  emailjs.init('QD0PyZymzpU7akMs-');
}

const btn = document.getElementById('button');
const form = document.getElementById('form');
const formStatus = document.getElementById('form-status');
const issueImageInput = document.getElementById('issue-image');
const issuePreview = document.getElementById('issue-preview');

function resetIssuePreview() {
  if (!issuePreview) return;
  issuePreview.src = '';
  issuePreview.style.display = 'none';
}

if (issueImageInput && issuePreview) {
  issueImageInput.addEventListener('change', (event) => {
    const [file] = event.target.files || [];
    if (!file) {
      resetIssuePreview();
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      issuePreview.src = String(loadEvent.target?.result || '');
      issuePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
}

if (form && btn) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    btn.value = 'Sending...';
    if (formStatus) formStatus.textContent = '';

    if (!window.emailjs) {
      btn.value = 'Submit issue';
      if (formStatus) formStatus.textContent = 'Saved locally. Email service is unavailable right now.';
      form.reset();
      resetIssuePreview();
      return;
    }

    emailjs.sendForm('service_eadh9rd', 'template_4c4536t', form).then(
      () => {
        btn.value = 'Submit issue';
        if (formStatus) formStatus.textContent = 'Submitted successfully. We will contact you soon.';
        form.reset();
        resetIssuePreview();
      },
      () => {
        btn.value = 'Submit issue';
        if (formStatus) formStatus.textContent = 'Submission failed. Please try again.';
      }
    );
  });
}
