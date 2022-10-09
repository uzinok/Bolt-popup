const dialog = document.querySelector('.dialog');
const dialogOpenButton = document.querySelector('.btn');
const dialogCloesButton = document.querySelector('.dialog__close');
const dialogContent = document.querySelector('.dialog__content');

dialogContent.style.marginRight = window.innerWidth - document.body.offsetWidth + "px";

dialogOpenButton.addEventListener('click', openDialog);
dialogCloesButton.addEventListener('click', closeDialog);
document.addEventListener('keydown', event => {
    if (event.keyCode == 27) {
        // закрываем
        closeDialog();
    }
});

dialog.addEventListener('click', e => {
    if (dialog == e.target) closeDialog();
});

function openDialog() {
    dialog.showModal();
    document.body.classList.add('scroll-lock');
}

function closeDialog() {
    dialog.close();
    document.body.classList.remove('scroll-lock');
}

// полифил

const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;

if (isBrowserNotSupportDialog) {
    const script = document.createElement('script');
    script.src = 'js/dialog-polyfill.js';
    document.body.appendChild(script);

    let link = document.createElement('link');
    link.href = 'css/dialog-polyfill.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    script.addEventListener('load', () => {
        var MyDialog = document.querySelector('dialog');
        dialogPolyfill.registerDialog(dialog);
    })
}
