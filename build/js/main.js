"use strict";

var dialog = document.querySelector('.dialog');
var dialogOpenButton = document.querySelector('.btn');
var dialogCloesButton = document.querySelector('.dialog__close');
var dialogContent = document.querySelector('.dialog__content');
dialogContent.style.marginRight = window.innerWidth - document.body.offsetWidth + "px";
dialogOpenButton.addEventListener('click', openDialog);
dialogCloesButton.addEventListener('click', closeDialog);
document.addEventListener('keydown', function (event) {
  if (event.keyCode == 27) {
    // закрываем
    closeDialog();
  }
});
dialog.addEventListener('click', function (e) {
  if (dialog == e.target) closeDialog();
});

function openDialog() {
  dialog.showModal();
  document.body.classList.add('scroll-lock');
}

function closeDialog() {
  dialog.close();
  document.body.classList.remove('scroll-lock');
} // полифил


var isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;

if (isBrowserNotSupportDialog) {
  var script = document.createElement('script');
  script.src = 'js/dialog-polyfill.js';
  document.body.appendChild(script);
  var link = document.createElement('link');
  link.href = 'css/dialog-polyfill.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  script.addEventListener('load', function () {
    var MyDialog = document.querySelector('dialog');
    dialogPolyfill.registerDialog(dialog);
  });
}