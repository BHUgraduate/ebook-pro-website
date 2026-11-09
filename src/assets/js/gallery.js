// Screenshot gallery: one set at a time (device × theme) instead of all four. Without JS every set is shown.
(function () {
  var sw = document.querySelector('.gallery-switch');
  if (!sw) return;
  var state = { device: 'phone', theme: 'light' };
  try { var saved = JSON.parse(localStorage.getItem('gallery-view') || 'null'); if (saved && saved.device && saved.theme) state = saved; } catch (e) {}
  function render() {
    document.querySelectorAll('.gallery-set').forEach(function (s) {
      s.classList.toggle('is-hidden', s.getAttribute('data-set') !== state.device + '-' + state.theme);
    });
    sw.querySelectorAll('button').forEach(function (b) {
      var on = b.hasAttribute('data-device') ? b.getAttribute('data-device') === state.device : b.getAttribute('data-theme') === state.theme;
      b.setAttribute('aria-pressed', String(on));
    });
    try { localStorage.setItem('gallery-view', JSON.stringify(state)); } catch (e) {}
  }
  sw.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-device')) state.device = b.getAttribute('data-device');
    else state.theme = b.getAttribute('data-theme');
    render();
  });
  sw.hidden = false;
  render();
})();
