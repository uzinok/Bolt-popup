window.onload = () => {
    // создаем popup
    let popup = new BoltPopup(document.querySelector('[data-target-popup="bolt-1"]'));
    let popup1 = new BoltPopup(document.querySelector('[data-target-popup="bolt-2"]'));
}

// создаем class 
class BoltPopup {
    constructor(popup) {

        this.popup = popup
        // кнопки
        const btns = document.querySelectorAll(`[data-path-popup="${this.popup.getAttribute('data-target-popup')}"]`);
        // nodeList конвертируем в массив
        this.btn = []
        for (let i = 0; i < btns.length; i++) {
            this.btn.push(btns[i])
            // отслеживаем клик по кнопкам, открываем окно
            this.btn[i].addEventListener("click", this.isOpen.bind(null, this, this.btn[i]), false)
        }

        // css селектор интерактивных окон
        this.interactiveCSS = `a[href]:not([tabindex='-1']), area[href]:not([tabindex='-1']), input:not([disabled]):not([tabindex='-1']), select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']), iframe:not([tabindex='-1']), [tabindex]:not([tabindex='-1']), [contentEditable=true]:not([tabindex='-1'])`

        // если окно открыто - true
        this.check = false

        // высота скролла
        this.scrollY = 0

        // кнопка по которой открыли окно
        this.btnClick

        // инициализация окна
        this.initPopup()
    }

    initPopup() {
        // получаем все интерактивные элементы окна
        let interactiveEl = this.popup.querySelectorAll(this.interactiveCSS);

        // перебираем все элементы
        for (let i = 0; i < interactiveEl.length; i++) {
            // если уже есть nabindex
            if (interactiveEl[i].getAttribute('tabindex')) {
                // задаем атрибут что бы запомнить nabindex
                interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'))
            }
            // задаем nabindex -1
            interactiveEl[i].setAttribute('tabindex', -1);
            interactiveEl[i].setAttribute('data-p', true);
        }
    }

    isOpen(obj, btnClick) {
        // запоминаем кнопку по которой кликнули
        obj.btnClick = btnClick;

        // указываем что окно открыто
        obj.check = true;

        // открываем окно читалкам
        obj.popup.removeAttribute('aria-hidden');
        // показываем окно
        obj.popup.classList.remove('bolt-popup--hidden');

        // получаем все интерактивные элементы на странице
        let interactiveEl = document.querySelectorAll(obj.interactiveCSS);
        // перебираем все элементы
        for (let i = 0; i < interactiveEl.length; i++) {
            // если уже есть nabindex
            if (interactiveEl[i].getAttribute('tabindex')) {
                // задаем атрибут что бы запомнить nabindex
                interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'))
            }
            // задаем nabindex -1
            interactiveEl[i].setAttribute('tabindex', -1);
        }

        // получаем интерактивные элементы окна
        let interactivePopup = obj.popup.querySelectorAll('[data-p]');
        // перебираем в цикле
        for (let i = 0; i < interactivePopup.length; i++) {
            // если есть атрибут data-tabindex
            if (interactivePopup[i].getAttribute('data-tabindex')) {
                // ставим tabindex 
                interactivePopup[i].setAttribute('tabindex', interactivePopup[i].getAttribute('data-tabindex'))
            }
            // либо 
            else {
                // удаляем tabindex 
                interactivePopup[i].removeAttribute('tabindex');
            }
        }

        // первому интерактивному элементу задаем фокус
        interactivePopup[0].focus();

        // что бы не дергалась верстка - задаем body отступ 
        document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
        // узнаем высоту скролла и запоминаем
        obj.scrollY = window.scrollY || window.pageYOffset;
        // задаем top для body что бы визуально страница не дергалась
        document.body.style.top = `-${obj.scrollY}px`;
        setTimeout(function () {
            // задаем position fixed что бы отменить скролл
            document.body.style.position = 'fixed';
        }, 0)
        // для мобильных устройств добавляем кликабельность
        obj.popup.setAttribute('tabindex', '0');

        // запускаем слушателя событий
        obj.listenEvent();
    }

    listenEvent() {
        // слушаем клавиатуру, закрытие по esk
        document.addEventListener("keydown", this.monitorKeyboard.bind(null, this), false);

        // отслеживаем клик для открытия/закрытия окна
        document.addEventListener("click", this.monitorСlick.bind(null, this), false)
    }

    // слушаем клавиатуру
    monitorKeyboard(obj, event) {
        // если окно открыто
        if (obj.check) {
            // если нажали на кнопку "esc"
            if (event.keyCode == 27) {
                // закрываем окно
                obj.close(obj);
            }
        }
    }

    // слушаем клики
    monitorСlick(obj, event) {
           if (
               (event.target == obj.popup.querySelector('.bolt-popup-close') && obj.check) ||
               (event.target == obj.popup && event.target != obj.popup.querySelector('.bolt-popup-container'))
               )
         {
            // закрываем окно
            if (obj.check) {
                obj.close(obj);
            }
        }
    }

    close(obj) {
        // запоминаем что окно закрыто
        obj.check = false;
        // закрываем окно читалкам
        obj.popup.setAttribute('aria-hidden', true);
        // скрываем окно
        obj.popup.classList.add('bolt-popup--hidden');

        // разрешаем скролл на странице
        document.body.style.position = '';
        // удаляем лишние стили
        document.body.style.top = '';
        document.body.style.paddingRight = '';
        // ставим высоту скролла как до открытия окна
        window.scrollTo(0, obj.scrollY);

        // получаем интерактивные элементы окна
        let interactivePopup = obj.popup.querySelectorAll('[data-p]');

        for (let i = 0; i < interactivePopup.length; i++) {
            // задаем tabindex -1 что бы не достать через tab интерактивные элементы
            interactivePopup[i].setAttribute('tabindex', -1)
        }

        // поручаем интерактивные элементы страницы
        let interactiveEl = document.querySelectorAll('[tabindex="-1"]');
        for (let i = 0; i < interactiveEl.length; i++) {
            // если это элемент не окна
            if (!interactiveEl[i].getAttribute('data-p')) {
                // если есть атрибут data-tabindex
                if (interactiveEl[i].getAttribute('data-tabindex')) {
                    // задаем нужный tabindex
                    interactiveEl[i].setAttribute('tabindex', interactiveEl[i].getAttribute('data-tabindex'))
                }
                // либо 
                else {
                    // просто удаляем tabindex
                    interactiveEl[i].removeAttribute('tabindex')
                }
            }
        }
        // задаем кнопке которой открыли окно фокус
        obj.btnClick.focus();
        // убираем из доступа с клавиатуры
        obj.popup.removeAttribute('tabindex');
    }

}