const sections = Array.from(document.querySelectorAll('.page-section'));
const navButtons = Array.from(document.querySelectorAll('[data-page-target]'));

const STORAGE_KEYS = {
  users: 'mg_users',
  session: 'mg_session',
  galleryUploads: 'mg_gallery_uploads',
};

const founderSeed = {
  name: 'Dadi Sai Krishna',
  email: 'dadisaikrishna39@gmail.com',
  phone: '',
  password: 'Founder@123',
  role: 'founder',
  permissions: {
    canUploadImages: true,
  },
};

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

function getJSON(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '');
    return parsed ?? fallback;
  } catch (_error) {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
  return getJSON(STORAGE_KEYS.users, []);
}

function setUsers(users) {
  setJSON(STORAGE_KEYS.users, users);
}

function ensureFounderUser() {
  const users = getUsers();

  const migratedUsers = users.map((user) => {
    if (user.role === 'founder' && user.email.toLowerCase() !== founderSeed.email.toLowerCase()) {
      return {
        ...user,
        name: founderSeed.name,
        email: founderSeed.email,
      };
    }
    return user;
  });

  const hasFounder = migratedUsers.some((user) => user.role === 'founder');
  if (!hasFounder) {
    migratedUsers.push(founderSeed);
  }

  setUsers(migratedUsers);
}

function getSessionUser() {
  return getJSON(STORAGE_KEYS.session, null);
}

function setSessionUser(user) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.session);
    return;
  }
  setJSON(STORAGE_KEYS.session, user);
}

function canUploadImages(user) {
  if (!user) return false;
  return user.role === 'founder' || user.role === 'admin' || Boolean(user.permissions?.canUploadImages);
}

function canManageUsers(user) {
  return user && (user.role === 'founder' || user.role === 'admin');
}

function canPromoteAdmins(user) {
  return user && user.role === 'founder';
}

const authChip = document.getElementById('auth-chip');
const adminNavBtn = document.getElementById('admin-nav-btn');
const adminUsers = document.getElementById('admin-users');
const adminStatus = document.getElementById('admin-status');

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const signupStatus = document.getElementById('signup-status');
const loginStatus = document.getElementById('login-status');

const galleryUploadPanel = document.getElementById('gallery-upload-panel');
const galleryImageInput = document.getElementById('gallery-image');
const galleryUploadBtn = document.getElementById('gallery-upload-btn');
const galleryUploadStatus = document.getElementById('gallery-upload-status');
const galleryGrid = document.getElementById('gallery-grid');

function setStatus(el, message) {
  if (el) el.textContent = message;
}

function syncSessionWithUsers() {
  const session = getSessionUser();
  if (!session) return null;

  const users = getUsers();
  const persisted = users.find((u) => u.email.toLowerCase() === session.email.toLowerCase());

  if (!persisted) {
    setSessionUser(null);
    return null;
  }

  setSessionUser(persisted);
  return persisted;
}

function handleLogout() {
  setSessionUser(null);
  renderAuthUI();
  showPage('home-page');
}

function renderAuthUI() {
  const user = syncSessionWithUsers();

  if (authChip) {
    if (user) {
      authChip.innerHTML = `Logged in as <strong>${user.name}</strong> (${user.role}) <button type="button" id="logout-btn" class="chip-btn">Logout</button>`;
      document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
    } else {
      authChip.textContent = 'Not logged in';
    }
  }

  if (adminNavBtn) {
    adminNavBtn.classList.toggle('hidden', !canManageUsers(user));
  }

  if (galleryUploadPanel) {
    const access = canUploadImages(user);
    galleryUploadPanel.classList.toggle('hidden', !access);
    if (!access) {
      setStatus(
        galleryUploadStatus,
        user
          ? 'You do not have permission to upload images. Contact founder/admin.'
          : 'Please login first. Founder can grant upload access.'
      );
    } else {
      setStatus(galleryUploadStatus, 'You can upload community images.');
    }
  }

  renderAdminUsers();
}

function renderAdminUsers() {
  if (!adminUsers) return;

  const session = getSessionUser();
  if (!canManageUsers(session)) {
    adminUsers.innerHTML = '<p class="par">Only founder/admin can manage access.</p>';
    return;
  }

  const users = getUsers();
  const manageable = users.filter((u) => u.role !== 'founder');

  if (!manageable.length) {
    adminUsers.innerHTML = '<p class="par">No members yet. Ask users to sign up first.</p>';
    return;
  }

  const rows = manageable
    .map((u, index) => {
      const hasAccess = canUploadImages(u);
      const canPromote = canPromoteAdmins(session);
      const roleLabel = u.role;
      const uploadLabel = hasAccess ? 'Revoke upload access' : 'Grant upload access';
      const roleLabelBtn = u.role === 'admin' ? 'Make member' : 'Make admin';

      return `<div class="admin-row">
          <div>
            <p><strong>${u.name}</strong> (${u.email})</p>
            <p class="small-text">Role: ${roleLabel} • Upload access: ${hasAccess ? 'Yes' : 'No'}</p>
          </div>
          <div class="admin-actions">
            <button type="button" class="btn admin-toggle-upload" data-user-index="${index}">${uploadLabel}</button>
            <button type="button" class="btn admin-toggle-role ${canPromote ? '' : 'disabled-btn'}" data-user-index="${index}" ${canPromote ? '' : 'disabled'}>${roleLabelBtn}</button>
          </div>
        </div>`;
    })
    .join('');

  adminUsers.innerHTML = rows;

  adminUsers.querySelectorAll('.admin-toggle-upload').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.userIndex);
      const allUsers = getUsers();
      const nonFounderIndexes = allUsers.map((u, i) => ({ user: u, i })).filter((entry) => entry.user.role !== 'founder');

      const targetRef = nonFounderIndexes[index];
      if (!targetRef) return;

      const targetUser = allUsers[targetRef.i];
      const current = canUploadImages(targetUser);

      targetUser.permissions = {
        ...(targetUser.permissions || {}),
        canUploadImages: !current,
      };

      if (targetUser.role === 'admin' && current) {
        targetUser.permissions.canUploadImages = true;
      }

      allUsers[targetRef.i] = targetUser;
      setUsers(allUsers);
      setStatus(adminStatus, `Updated upload permission for ${targetUser.name}.`);

      const currentSession = getSessionUser();
      if (currentSession?.email?.toLowerCase() === targetUser.email.toLowerCase()) {
        setSessionUser(targetUser);
      }

      renderAuthUI();
    });
  });

  adminUsers.querySelectorAll('.admin-toggle-role').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sessionUser = getSessionUser();
      if (!canPromoteAdmins(sessionUser)) {
        setStatus(adminStatus, 'Only founder can make admins.');
        return;
      }

      const index = Number(btn.dataset.userIndex);
      const allUsers = getUsers();
      const nonFounderIndexes = allUsers.map((u, i) => ({ user: u, i })).filter((entry) => entry.user.role !== 'founder');
      const targetRef = nonFounderIndexes[index];
      if (!targetRef) return;

      const targetUser = allUsers[targetRef.i];
      targetUser.role = targetUser.role === 'admin' ? 'member' : 'admin';
      if (targetUser.role === 'admin') {
        targetUser.permissions = {
          ...(targetUser.permissions || {}),
          canUploadImages: true,
        };
      }

      allUsers[targetRef.i] = targetUser;
      setUsers(allUsers);

      const currentSession = getSessionUser();
      if (currentSession?.email?.toLowerCase() === targetUser.email.toLowerCase()) {
        setSessionUser(targetUser);
      }

      setStatus(adminStatus, `Updated role for ${targetUser.name} to ${targetUser.role}.`);
      renderAuthUI();
    });
  });
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

const issueForm = document.getElementById('form');
const issueBtn = document.getElementById('button');
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

if (issueForm && issueBtn) {
  issueForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    issueBtn.value = 'Submitting...';
    setStatus(formStatus, 'Submitting your issue...');

    const currentUser = getSessionUser();
    const payload = {
      from_name: document.getElementById('from_name')?.value?.trim() || currentUser?.name || '',
      email_id: document.getElementById('email_id')?.value?.trim() || currentUser?.email || '',
      message: document.getElementById('message')?.value?.trim() || '',
      image_name: issueImageInput?.files?.[0]?.name || '',
      createdAt: new Date().toISOString(),
      source: 'website-form',
      reporterRole: currentUser?.role || 'guest',
    };

    let submitted = false;

    if (window.firebaseIssueService?.submitIssueToFirebase) {
      try {
        await withTimeout(window.firebaseIssueService.submitIssueToFirebase(payload), 6000);
        submitted = true;
        setStatus(formStatus, 'Issue submitted to Firebase successfully.');
      } catch (_error) {
        setStatus(formStatus, 'Firebase submit failed. Trying email fallback...');
      }
    }

    if (!submitted && window.emailjs) {
      try {
        await withTimeout(emailjs.sendForm('service_eadh9rd', 'template_4c4536t', issueForm), 6000);
        submitted = true;
        setStatus(formStatus, 'Issue submitted successfully via email.');
      } catch (_error) {
        setStatus(formStatus, 'Email submit failed. Saving locally...');
      }
    }

    if (!submitted) {
      const existing = JSON.parse(localStorage.getItem('pendingIssues') || '[]');
      existing.push(payload);
      localStorage.setItem('pendingIssues', JSON.stringify(existing));
      setStatus(formStatus, 'Could not reach server. Issue saved locally on this device.');
    }

    issueBtn.value = 'Submit issue';
    issueForm.reset();
    resetIssuePreview();
  });
}

function renderGalleryUploads() {
  if (!galleryGrid) return;
  galleryGrid.querySelectorAll('[data-uploaded="true"]').forEach((node) => node.remove());

  const uploads = getJSON(STORAGE_KEYS.galleryUploads, []);
  uploads.forEach((item, index) => {
    const image = document.createElement('img');
    image.src = item.dataUrl;
    image.className = 'img gallery-item';
    image.alt = `Community upload ${index + 1} by ${item.uploadedBy}`;
    image.setAttribute('data-uploaded', 'true');
    galleryGrid.appendChild(image);
  });
}

if (galleryUploadBtn && galleryImageInput) {
  galleryUploadBtn.addEventListener('click', () => {
    const session = getSessionUser();
    if (!canUploadImages(session)) {
      setStatus(galleryUploadStatus, 'Access denied. Founder/admin must grant upload permission.');
      return;
    }

    const [file] = galleryImageInput.files || [];
    if (!file) {
      setStatus(galleryUploadStatus, 'Please choose an image first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const uploads = getJSON(STORAGE_KEYS.galleryUploads, []);
      uploads.unshift({
        dataUrl: String(event.target?.result || ''),
        uploadedBy: session.name,
        uploadedAt: new Date().toISOString(),
      });
      setJSON(STORAGE_KEYS.galleryUploads, uploads.slice(0, 40));
      setStatus(galleryUploadStatus, 'Image uploaded to local gallery successfully.');
      galleryImageInput.value = '';
      renderGalleryUploads();
    };
    reader.readAsDataURL(file);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('signup-name')?.value?.trim();
    const email = document.getElementById('signup-email')?.value?.trim().toLowerCase();
    const phone = document.getElementById('signup-phone')?.value?.trim() || '';
    const password = document.getElementById('signup-password')?.value || '';

    if (!name || !email || !password) {
      setStatus(signupStatus, 'Please fill required fields.');
      return;
    }

    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email)) {
      setStatus(signupStatus, 'This email is already registered. Please login.');
      return;
    }

    users.push({
      name,
      email,
      phone,
      password,
      role: 'member',
      permissions: {
        canUploadImages: false,
      },
    });
    setUsers(users);
    setStatus(signupStatus, 'Signup successful. You can now login.');
    signupForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email')?.value?.trim().toLowerCase();
    const password = document.getElementById('login-password')?.value || '';

    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email && u.password === password);

    if (!user) {
      setStatus(loginStatus, 'Invalid email or password.');
      return;
    }

    setSessionUser(user);
    setStatus(loginStatus, `Welcome ${user.name}.`);
    loginForm.reset();
    renderAuthUI();
    showPage('home-page');
  });
}

ensureFounderUser();
renderGalleryUploads();
renderAuthUI();
