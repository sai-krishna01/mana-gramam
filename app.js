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

function setStatus(message) {
  if (formStatus) formStatus.textContent = message;
}


function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

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
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    btn.value = 'Submitting...';
    setStatus('Submitting your issue...');

    const payload = {
      from_name: document.getElementById('from_name')?.value?.trim() || '',
      email_id: document.getElementById('email_id')?.value?.trim() || '',
      message: document.getElementById('message')?.value?.trim() || '',
      image_name: issueImageInput?.files?.[0]?.name || '',
      createdAt: new Date().toISOString(),
      source: 'website-form',
    };

    let submitted = false;

    if (window.firebaseIssueService?.submitIssueToFirebase) {
      try {
        await withTimeout(window.firebaseIssueService.submitIssueToFirebase(payload), 6000);
        submitted = true;
        setStatus('Issue submitted to Firebase successfully.');
      } catch (error) {
        setStatus('Firebase submit failed. Trying email fallback...');
      }
    }

    if (!submitted && window.emailjs) {
      try {
        await withTimeout(emailjs.sendForm('service_eadh9rd', 'template_4c4536t', form), 6000);
        submitted = true;
        setStatus('Issue submitted successfully via email.');
      } catch (error) {
        setStatus('Email submit failed. Saving locally...');
      }
    }

    if (!submitted) {
      const existing = JSON.parse(localStorage.getItem('pendingIssues') || '[]');
      existing.push(payload);
      localStorage.setItem('pendingIssues', JSON.stringify(existing));
      setStatus('Could not reach server. Issue saved locally on this device.');
    }

    btn.value = 'Submit issue';
    form.reset();
    resetIssuePreview();
  });
}
