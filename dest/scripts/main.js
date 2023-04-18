"use strict";

var dialogs = document.querySelectorAll('.dialog');
for (var i = 0; i < dialogs.length; i++) {
  dialog(dialogs[i]);
}
function dialog(elem) {
  var openingButtons = document.querySelectorAll('[data-dialog="' + elem.id + '"]');
  var closeButton = elem.querySelector('.dialog__close');
  for (var _i = 0; _i < openingButtons.length; _i++) {
    openingButtons[_i].addEventListener('click', function () {
      if (this.dataset.modal === "false") opensWindow();else opensModal();
    });
  }
  closeButton.addEventListener('click', closesModal);
  elem.addEventListener('click', function (e) {
    if (elem == e.target) closesModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key == "Escape") closesModal();
  });
  function opensModal() {
    elem.showModal();
    scrollLock();
  }
  function opensWindow() {
    elem.show();
  }
  function closesModal() {
    elem.close();
    scrollUnlock();
  }
  function scrollLock() {
    document.body.classList.add('scroll-lock');
    document.body.style.overflow = 'hidden';
  }
  function scrollUnlock() {
    document.body.classList.remove('scroll-lock');
    document.body.style.overflow = '';
  }
}

// полифил

var isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;
if (isBrowserNotSupportDialog) {
  var script = document.createElement('script');
  script.src = 'scripts/dialog-polyfill.js';
  document.body.appendChild(script);
  var link = document.createElement('link');
  link.href = 'styles/dialog-polyfill.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  script.addEventListener('load', function () {
    var MyDialogs = document.querySelectorAll('dialog');
    for (var _i2 = 0; _i2 < MyDialogs.length; _i2++) {
      dialogPolyfill.registerDialog(MyDialogs[_i2]);
    }
  });
}