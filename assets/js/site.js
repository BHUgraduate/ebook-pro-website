// Small, dependency-free enhancements. The site is fully usable without this file.
(function () {
  // Legacy links from the old single-page site (#features, #pricing, #roadmap)
  var legacy = { '#features': '/features/', '#pricing': '/premium/', '#roadmap': '/roadmap/' };
  if (location.pathname === '/' && legacy[location.hash]) location.replace(legacy[location.hash]);

  // Mobile menu
  var btn = document.querySelector('.menu-btn'), nav = document.getElementById('primary-nav');
  if (btn && nav) {
    var set = function (open) { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', function () { set(!nav.classList.contains('open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); btn.focus(); } });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  }

  // Gentle reveal on scroll (content is visible by default if JS/IO is unavailable)
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('in'); });

  // Docs search (loads the index on first focus)
  var box = document.getElementById('doc-search'), out = document.getElementById('doc-results');
  if (box && out) {
    var index = null, state = document.getElementById('doc-search-state');
    var load = function () {
      if (index) return Promise.resolve(index);
      state.textContent = 'Loading search…';
      return fetch('/docs/search-index.json').then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function (j) { index = j; state.textContent = ''; return j; })
        .catch(function () { state.textContent = 'Search is unavailable right now. Browse the categories below instead.'; return []; });
    };
    box.addEventListener('focus', load);
    box.addEventListener('input', function () {
      var q = box.value.trim().toLowerCase();
      out.textContent = '';
      if (q.length < 2) { state.textContent = ''; return; }
      load().then(function (idx) {
        var terms = q.split(/\s+/);
        var hits = idx.filter(function (d) { var h = (d.title + ' ' + d.text).toLowerCase(); return terms.every(function (t) { return h.indexOf(t) > -1; }); }).slice(0, 12);
        state.textContent = hits.length ? hits.length + ' result' + (hits.length > 1 ? 's' : '') : 'No articles match “' + box.value.trim() + '”. Try another word or contact support.';
        hits.forEach(function (d) {
          var li = document.createElement('li'), a = document.createElement('a'), s = document.createElement('small');
          a.href = d.url; a.textContent = d.title; s.textContent = d.category; li.appendChild(a); li.appendChild(s); out.appendChild(li);
        });
      });
    });
  }
  // "Get the app" card. Shown on every refresh and every arrival from outside the site
  // (new tab, typed URL, search, another site); not when moving between pages of this site.
  (function () {
    var tpl = document.getElementById('app-promo-tpl');
    if (!tpl || !('content' in tpl) || typeof HTMLDialogElement !== 'function') return;
    if (/^\/delete-account\//.test(location.pathname)) return; // never interrupt a task page
    var nav = window.performance && performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null;
    var reload = nav ? nav.type === 'reload' : (performance.navigation && performance.navigation.type === 1);
    var internal = false;
    try { internal = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (e) {}
    if (nav && nav.type === 'back_forward') return; // Back/Forward is moving around, not arriving
    if (internal && !reload) return;

    setTimeout(function () {
      var dlg = tpl.content.firstElementChild.cloneNode(true), root = document.documentElement, closing = false;
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      var gutter = window.innerWidth - root.clientWidth; // keep the page from shifting when scroll locks
      document.body.appendChild(dlg);
      if (gutter > 0) root.style.paddingRight = gutter + 'px';
      root.classList.add('promo-lock');
      dlg.showModal();
      requestAnimationFrame(function () { requestAnimationFrame(function () { dlg.classList.add('is-open'); }); });

      var done = function () {
        if (dlg.open) dlg.close();
        dlg.remove(); root.classList.remove('promo-lock'); root.style.paddingRight = '';
      };
      var close = function () {
        if (closing) return; closing = true;
        dlg.classList.remove('is-open');
        if (reduce) return done();
        var t = setTimeout(done, 400);
        dlg.addEventListener('transitionend', function f(e) { if (e.target === dlg) { clearTimeout(t); dlg.removeEventListener('transitionend', f); done(); } });
      };
      dlg.addEventListener('cancel', function (e) { e.preventDefault(); close(); }); // Escape
      dlg.addEventListener('click', function (e) {
        if (e.target === dlg || e.target.closest('[data-promo-close]')) close(); // backdrop, X, "Skip to website"
        else if (e.target.closest('[data-promo-go]')) setTimeout(close, 150);
      });
    }, 900);
  })();
})();
