/* ZINC forms: intercept Webflow-styled forms and POST to /api/forms
   (Supabase + HubSpot) instead of Webflow's retired form backend.
   Keeps Webflow's .w-form-done / .w-form-fail UX intact. */
(function () {
  'use strict';

  function fieldMap(form) {
    var fields = {};
    var p = { fields: fields };
    form.querySelectorAll('input[name], textarea[name], select[name]').forEach(function (el) {
      if (el.type === 'checkbox') fields[el.name] = el.checked ? 'yes' : 'no';
      else if (el.type === 'radio') { if (el.checked) fields[el.name] = el.value; }
      else fields[el.name] = el.value;

      var n = el.name.toLowerCase();
      if (el.type === 'email' || n.includes('email')) p.email = p.email || el.value;
      else if (el.tagName === 'TEXTAREA' || n.includes('message')) p.message = p.message || el.value;
      else if (el.type === 'tel' || n.includes('phone')) p.phone = p.phone || el.value;
      else if (n.includes('first-name') || n.includes('first_name')) p.firstName = el.value;
      else if (n.includes('last-name') || n.includes('last_name')) p.lastName = el.value;
      else if (n.includes('company')) p.company = el.value;
      else if (n.includes('name')) p.name = p.name || el.value;
      else if (n === 'website') p.website = el.value; // honeypot
    });
    return p;
  }

  function show(el, on) {
    if (el) el.style.display = on ? 'block' : 'none';
  }

  function bind(form) {
    // honeypot
    var hp = document.createElement('input');
    hp.type = 'text';
    hp.name = 'website';
    hp.tabIndex = -1;
    hp.autocomplete = 'off';
    hp.setAttribute('aria-hidden', 'true');
    hp.style.cssText = 'position:absolute;left:-9999px;height:0;width:0;opacity:0;';
    form.appendChild(hp);

    form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var wrapper = form.closest('.w-form') || form.parentElement;
        var done = wrapper ? wrapper.querySelector('.w-form-done') : null;
        var fail = wrapper ? wrapper.querySelector('.w-form-fail') : null;
        var btn = form.querySelector('input[type="submit"], button[type="submit"]');
        var oldVal = btn && (btn.value || btn.textContent);
        if (btn) {
          var waitText = btn.getAttribute('data-wait') || 'Please wait...';
          if ('value' in btn && btn.value) btn.value = waitText;
          else if (btn.textContent) btn.textContent = waitText;
          btn.disabled = true;
        }

        var payload = fieldMap(form);
        payload.formName = form.getAttribute('data-name') || form.getAttribute('name') || 'unknown';

        fetch('/api/forms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then(function (r) { return r.json(); })
          .then(function (r) {
            if (!r.ok) throw new Error(r.error || 'failed');
            form.style.display = 'none';
            show(done, true);
            show(fail, false);
          })
          .catch(function () {
            show(fail, true);
            if (btn) {
              if ('value' in btn && btn.value) btn.value = oldVal;
              else if (btn.textContent) btn.textContent = oldVal;
              btn.disabled = false;
            }
          });
      },
      true // capture: beat webflow.js to the event
    );
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.w-form form, form[data-name]').forEach(bind);
  });
})();
