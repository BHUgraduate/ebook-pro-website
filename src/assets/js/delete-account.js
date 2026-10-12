// Account deletion flow. Signs the user in with Firebase Auth (in-memory only, so any
// old session is never reused), then calls the `deleteMyAccount` Cloud Function, which
// deletes ONLY the caller's own account (uid comes from the verified token server-side).
const V = '10.12.2';
const root = document.getElementById('del-app');
const $ = (id) => document.getElementById(id);
const msg = (text, kind = 'err') => {
  const box = $('del-msg');
  box.textContent = '';
  if (!text) return;
  const d = document.createElement('div');
  d.className = 'msg ' + kind;
  d.textContent = text;
  box.appendChild(d);
};
const show = (id, on) => $(id).classList.toggle('hidden', !on);

(async function main() {
  let cfg;
  try { cfg = JSON.parse(root.dataset.config); } catch (e) { return fail(); }
  function fail() {
    show('del-loading', false);
    msg('We could not load the secure sign-in. Check your connection and reload, or delete your account in the app, or email support.');
  }

  let A, F, auth, functions;
  try {
    const [app, au, fn] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-functions.js`),
    ]);
    A = au; F = fn;
    const fbApp = app.initializeApp(cfg.firebase);
    auth = A.getAuth(fbApp);
    await A.setPersistence(auth, A.inMemoryPersistence);
    functions = F.getFunctions(fbApp, cfg.region);
  } catch (e) { return fail(); }

  show('del-loading', false);
  show('del-signin', true);

  const authError = (e) => {
    const c = (e && e.code) || '';
    if (c === 'auth/popup-closed-by-user' || c === 'auth/cancelled-popup-request') return '';
    if (c === 'auth/too-many-requests') return 'Too many attempts. Please wait a few minutes and try again.';
    if (c === 'auth/network-request-failed') return 'Network error. Check your connection and try again.';
    if (c === 'auth/popup-blocked') return 'Your browser blocked the Google sign-in window. Allow pop-ups and try again.';
    if (c === 'auth/unauthorized-domain') return 'Sign-in is not enabled for this website yet. Please delete your account in the app, or email support.';
    return 'We could not sign you in. Check your details and the sign-in method you used.';
  };

  let label = '';
  const toConfirm = (user, shown) => {
    label = shown || user.email || user.displayName || 'your account';
    $('del-who').textContent = label;
    show('del-signin', false);
    show('del-confirm', true);
    $('del-type').value = '';
    $('del-go').disabled = true;
    msg('');
    $('del-type').focus();
  };

  $('del-signin').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    msg('');
    const id = $('del-id').value.trim(), pw = $('del-pw').value;
    if (!id || !pw) return msg('Enter your email or username and your password.');
    const btn = ev.submitter; if (btn) btn.disabled = true;
    try {
      let email = id;
      if (!id.includes('@')) {
        const res = await F.httpsCallable(functions, 'resolveUsername')({ username: id });
        email = res.data && res.data.shadowEmail;
        if (!email) throw { code: 'auth/invalid-credential' };
      }
      const cred = await A.signInWithEmailAndPassword(auth, email, pw);
      toConfirm(cred.user, id);
    } catch (e) { msg(authError(e)); }
    finally { if (btn) btn.disabled = false; $('del-pw').value = ''; }
  });

  $('del-google').addEventListener('click', async () => {
    msg('');
    try {
      const cred = await A.signInWithPopup(auth, new A.GoogleAuthProvider());
      toConfirm(cred.user);
    } catch (e) { const m = authError(e); if (m) msg(m); }
  });

  $('del-switch').addEventListener('click', async () => {
    await A.signOut(auth);
    show('del-confirm', false);
    show('del-signin', true);
    msg('');
  });

  $('del-type').addEventListener('input', () => { $('del-go').disabled = $('del-type').value.trim() !== 'DELETE'; });

  $('del-confirm').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if ($('del-type').value.trim() !== 'DELETE' || !auth.currentUser) return;
    $('del-go').disabled = true;
    msg('Deleting your account…', 'info');
    try {
      await F.httpsCallable(functions, 'deleteMyAccount')({ confirm: true });
      try { await A.signOut(auth); } catch (e) { /* account already gone */ }
      show('del-confirm', false);
      msg('');
      show('del-done', true);
      $('del-done').setAttribute('tabindex', '-1');
      $('del-done').focus();
    } catch (e) {
      const m = String((e && e.message) || '');
      if (m.includes('requires-recent-login')) {
        await A.signOut(auth);
        show('del-confirm', false); show('del-signin', true);
        msg('For your security, please sign in again and then confirm deletion.');
      } else {
        msg('We could not finish deleting your account. Please try again, or email support so we can complete it for you.');
        $('del-go').disabled = false;
      }
    }
  });
})();
