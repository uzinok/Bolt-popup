class BoltPopup {
    constructor(popup) {
        // само окно
        this.popup = popup
        // кнопка на которую кликнули для открытия окна
        this.clickBtn
        // высота прокрутки страницы при ткрытии окна
        this.scrollHeight = 0
        // окно закрыто
        this.check = false

        // css селектор интерактивных окон
        this.interactiveCSS = `a[href]:not([tabindex='-1']), area[href]:not([tabindex='-1']), input:not([disabled]):not([tabindex='-1']), select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']), iframe:not([tabindex='-1']), [tabindex]:not([tabindex='-1']), [contentEditable=true]:not([tabindex='-1'])`

        // добавляем необходимые атрибуты окну и его элементам
        this.initPopup()
    }

    initPopup() {
        // получаем все интерактивные элементы окна
        let interactiveEl = this.popup.querySelectorAll(this.interactiveCSS);

        this.popup.setAttribute('aria-hidden', 'true');

        // перебирем все интерактивные элементы
        for (let i = 0; i < interactiveEl.length; i++) {
            // если есть атрибут tabindex
            if (interactiveEl[i].getAttribute('tabindex')) {
                // запоминаем в data-tabindex
                interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'));
            }
            // задаем tabindex -1 что бы исключить из доступа с клавиатуры
            interactiveEl[i].setAttribute('tabindex', -1);
            // запоминаем что это элемент окна
            interactiveEl[i].setAttribute('data-popup', true);
        }

        // получаем все возможные кнопки для открытия текущего окна
        let btns = document.querySelectorAll(`[data-target-popup="${this.popup.getAttribute('data-path-popup')}"]`);

        // в цикле отслеживаем по ним клик и открываем окно
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', () => {
                this.isOpen(btns[i])
            })
        }
    }


    isOpen(clickBtn) {
        // запоминаем что окно открыто
        this.check = true;
        // запоминаем на какую кнопку кликнули
        this.clickBtn = clickBtn || false;
        // добавляем кликабельность для overlay
        this.popup.setAttribute('tabindex', 0);
        // показываем окно
        this.popup.classList.add('bolt-popup--visible');
        this.popup.removeAttribute('aria-hidden');

        // получаем все интерактивные элементы окна
        let interactiveEl = document.querySelectorAll(this.interactiveCSS);

        for (let i = 0; i < interactiveEl.length; i++) {
            // если это элемент не всплывающего окна
            if (!interactiveEl[i].getAttribute('data-popup')) {
                // если есть атрибут tabindex
                if (interactiveEl[i].getAttribute('tabindex')) {
                    // запоминаем его в data-tabindex
                    interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'));
                }
                // закрываем доступ от клавиатуры
                interactiveEl[i].setAttribute('tabindex', -1);
            }
        }

        // у всех элементов окна удаляем/меняем tabindex -1
        let interactiveElPopup = this.popup.querySelectorAll('[tabindex="-1"]');
        for (let i = 0; i < interactiveElPopup.length; i++) {
            if (interactiveElPopup[i].getAttribute('data-tabindex')) {
                interactiveElPopup[i].setAttribute('tabindex', interactiveElPopup[i].getAttribute('data-tabindex'))
            } else {
                interactiveElPopup[i].removeAttribute('tabindex');
            }
        }

        // на тот случай если body не на всю ширину
        document.body.style.width = '100%';
        // высота прокрутки страницы на момент открытия окна
        this.scrollHeight = window.scrollY || window.pageYOffset;
        // для фиксации задаем для body
        document.body.style.top = `-${this.scrollHeight}px`;
        // если есть полоса прокрутки - компенсируем ее отсутствие внутренним отступом
        setTimeout(function () {
            // запрещаем скролл
            document.body.style.position = "fixed";
        }, 0)

        // фокус окну для читалок
        this.popup.focus();

        // отслеживаем клик на "esc", клик на overlay, на кнопку закрыть окно
        document.addEventListener('keydown', this.monitorKeyboard);
        document.addEventListener('click', this.monitorClick);
    }

    monitorKeyboard = (event) => {
        // если кликнули на клавишу "esc" и окно открыто
        if (event.keyCode == 27) {
            // закрываем
            this.isClose();
        }
    }

    monitorClick = (event) => {
        // если кликнули на кнопку "закрыть окно" или на подложку
        if (
            event.target == this.popup.querySelector('.bolt-popup__close') ||
            event.target == this.popup && event.target != this.popup.querySelector('.bolt-popup__container')
        ) {
            // закрываем окно
            this.isClose();
        }
    }

    isClose() {
        // запоминаем что окно закрыто
        this.check = false;
        // убираем кликабельность у окна
        this.popup.removeAttribute('tabindex');
        // скрываем окно
        this.popup.classList.remove('bolt-popup--visible');
        this.popup.setAttribute('aria-hidden', 'true')

        // удаляем tabindex -1 там где не нужен на встранице
        let interactiveEl = document.querySelectorAll('[tabindex="-1"]');
        for (let i = 0; i < interactiveEl.length; i++) {
            if (interactiveEl[i].getAttribute('data-tabindex') && !interactiveEl[i].getAttribute('data-popup')) {
                interactiveEl[i].setAttribute('tabindex', interactiveEl[i].getAttribute('data-tabindex'))
            } else if (!interactiveEl[i].getAttribute('data-popup')) {
                interactiveEl[i].removeAttribute('tabindex');
            }
        }

        // скрываем элементы окна из доступа с клавиатуры
        let interactiveElPopup = this.popup.querySelectorAll('[data-popup]');
        for (let i = 0; i < interactiveElPopup.length; i++) {
            interactiveElPopup[i].setAttribute('tabindex', -1);
        }

        // у body удаляем лишние стили и возврашаем нужную высоту скролла
        document.body.style.position = '';
        document.body.style.width = '';

        window.scrollTo(0, this.scrollHeight);
        document.body.style.top = '';

        // кнопке по которой открыли окно задаем фокус
        if (this.clickBtn) this.clickBtn.focus();

        // удаляем слушатели событий
        document.removeEventListener('keydown', this.monitorKeyboard);
        document.removeEventListener('click', this.monitorClick);
    }
}
