const dialog = document.querySelector('.dialog');
const dialogOpenButton = document.querySelector('.btn');
const dialogCloesButton = document.querySelector('.dialog__close');
const dialogContent = document.querySelector('.dialog__content');

dialogContent.style.marginRight = window.innerWidth - document.body.offsetWidth + "px";

dialogOpenButton.addEventListener('click', openDialog);
dialogCloesButton.addEventListener('click', closeDialog);
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

/**
 * В реальных проектах мы бы брали полифил из Node пакета.
 * Но для примера воспользуемся CDN */
const dialogPolyfillURL = "https://esm.run/dialog-polyfill";

const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;

/**
 * Подключаем полифил к каждому dialog на странице, если в браузере нет поддержки
 * */
if (isBrowserNotSupportDialog) {
    const dialogs = document.querySelectorAll("dialog");

    dialogs.forEach(async (dialog) => {
        const {
            default: polyfill
        } = await import(dialogPolyfillURL);
        polyfill.registerDialog(dialog);
    });
}
