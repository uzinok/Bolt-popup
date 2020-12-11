window.onload = () => {
    let popup1 = new BoltPopup(document.querySelector('[dada-path-popup="popup-1"]'))
}

class BoltPopup {
    constructor(popup) {
        this.popup = popup


        // css селектор интерактивных окон
        this.interactiveCSS = `a[href]:not([tabindex='-1']), area[href]:not([tabindex='-1']), input:not([disabled]):not([tabindex='-1']), select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']), iframe:not([tabindex='-1']), [tabindex]:not([tabindex='-1']), [contentEditable=true]:not([tabindex='-1'])`


        this.initPopup()
    }

    initPopup() {
        // получаем все интерактивные элементы окна
        let interactiveEl = this.popup.querySelectorAll(this.interactiveCSS);

        for(let i = 0; i < interactiveEl.length; i++ ) {
            if(interactiveEl[i].getAttribute('tabindex')) {
                interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'));
            }
            interactiveEl[i].setAttribute('tabindex', -1);
        }
    }
}