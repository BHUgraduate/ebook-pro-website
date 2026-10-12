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
})();
