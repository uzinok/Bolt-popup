window.onload = () => {
    let popup1 = new BoltPopup(document.querySelector('[dada-path-popup="popup-1"]'))
    let popup2 = new BoltPopup(document.querySelector('[dada-path-popup="popup-2"]'))
}

class BoltPopup {
    constructor(popup) {
        this.popup = popup
        this.clickBtn
        this.scrollHeight = 0
        this.check = false

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
            interactiveEl[i].setAttribute('data-popup', true);
        }

        let btns = document.querySelectorAll(`[dada-target-popup="${this.popup.getAttribute('dada-path-popup')}"]`);

        for (let i = 0; i < btns.length; i++ ) {
            btns[i].addEventListener('click', this.isOpen.bind(null, this, btns[i]))
        }
    }

    isOpen(obj, clickBtn) {
        obj.check = true;
        obj.clickBtn = clickBtn || false;
        obj.popup.setAttribute('tabindex', 0);
        obj.popup.focus();

        obj.popup.classList.add('bolt-popup--visible');

        let interactiveEl = document.querySelectorAll(obj.interactiveCSS);

        for(let i = 0; i < interactiveEl.length; i++) {
            if (!interactiveEl[i].getAttribute('data-popup')) {
                if(interactiveEl[i].getAttribute('tabindex')) {
                    interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'));
                }
                interactiveEl[i].setAttribute('tabindex', -1);
            }
        }

        let interactiveElPopup = obj.popup.querySelectorAll('[tabindex="-1"]');
        for (let i = 0; i < interactiveElPopup.length; i++) {
            if(interactiveElPopup[i].getAttribute('data-tabindex')) {
                interactiveElPopup[i].setAttribute('tabindex', interactiveElPopup[i].getAttribute('data-tabindex'))
            } else {
                interactiveElPopup[i].removeAttribute('tabindex');
            }
        }


        obj.scrollHeight = window.scrollY || window.pageYOffset;
        document.body.style.top = `-${obj.scrollHeight}px`;
        document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + "px";
        setTimeout(function() {
            document.body.style.position = "fixed";
        }, 0)
        
        document.addEventListener('keydown', obj.monitorKeyboard.bind(null, obj), false);
        document.addEventListener('click', obj.monitorClick.bind(null, obj), false);
    }

    monitorKeyboard (obj, event) {
        if(event.keyCode == 27 && obj.check) {
            obj.isClose(obj);
        }
    }

    monitorClick (obj, event) {
        if(obj.check) {
            if(
                event.target == obj.popup.querySelector('.bolt-popup__close') ||
                event.target == obj.popup && event.target != obj.popup.querySelector('.bolt-popup__container')
            ) {
                obj.isClose(obj);
            }
        }
    }

    isClose(obj) {
        obj.check = false;
        obj.popup.removeAttribute('tabindex');
        obj.popup.classList.remove('bolt-popup--visible');

        let interactiveEl = document.querySelectorAll('[tabindex="-1"]');
        for (let i = 0; i < interactiveEl.length; i++) {
            if(interactiveEl[i].getAttribute('data-tabindex') && !interactiveEl[i].getAttribute('data-popup')) {
                interactiveEl[i].setAttribute('tabindex', interactiveEl[i].getAttribute('data-tabindex'))
            } else if (!interactiveEl[i].getAttribute('data-popup')) {
                interactiveEl[i].removeAttribute('tabindex');
            }
        }

        let interactiveElPopup = this.popup.querySelectorAll('[data-popup]');

        for(let i = 0; i < interactiveElPopup.length; i++ ) {
            interactiveElPopup[i].setAttribute('tabindex', -1);
        }

        // this.scrollHeight = 0
        document.body.style.position = '';

        window.scrollTo (0, obj.scrollHeight);
        document.body.style.paddingRight = '';
        document.body.style.top = '';
        if (obj.clickBtn) obj.clickBtn.focus();
    }
}