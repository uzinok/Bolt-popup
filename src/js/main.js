
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
        for(let i = 0; i < interactiveEl.length; i++ ) {
            // если есть атрибут tabindex
            if(interactiveEl[i].getAttribute('tabindex')) {
                // запоминаем в data-tabindex
                interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'));
            }
            // задаем tabindex -1 что бы исключить из доступа с клавиатуры
            interactiveEl[i].setAttribute('tabindex', -1);
            // запоминаем что это элемент окна
            interactiveEl[i].setAttribute('data-popup', true);
        }

        // получаем все возможные кнопки для открытия текущего окна
        let btns = document.querySelectorAll(`[dada-target-popup="${this.popup.getAttribute('dada-path-popup')}"]`);

        // в цикле отслеживаем по ним клик и открываем окно
        for (let i = 0; i < btns.length; i++ ) {
            btns[i].addEventListener('click', this.isOpen.bind(null, this, btns[i]))
        }
    }


    isOpen(obj, clickBtn) {
        // запоминаем что окно открыто
        obj.check = true;
        // запоминаем на какую кнопку кликнули
        obj.clickBtn = clickBtn || false;
        // добавляем кликабельность для overlay
        obj.popup.setAttribute('tabindex', 0);
        // показываем окно
        obj.popup.classList.add('bolt-popup--visible');
        obj.popup.removeAttribute('aria-hidden');

        // получаем все интерактивные элементы окна
        let interactiveEl = document.querySelectorAll(obj.interactiveCSS);

        for(let i = 0; i < interactiveEl.length; i++) {
            // если это элемент не всплывающего окна
            if (!interactiveEl[i].getAttribute('data-popup')) {
                // если есть атрибут tabindex
                if(interactiveEl[i].getAttribute('tabindex')) {
                    // запоминаем его в data-tabindex
                    interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'));
                }
                // закрываем доступ от клавиатуры
                interactiveEl[i].setAttribute('tabindex', -1);
            }
        }

        // у всех элементов окна удаляем/меняем tabindex -1
        let interactiveElPopup = obj.popup.querySelectorAll('[tabindex="-1"]');
        for (let i = 0; i < interactiveElPopup.length; i++) {
            if(interactiveElPopup[i].getAttribute('data-tabindex')) {
                interactiveElPopup[i].setAttribute('tabindex', interactiveElPopup[i].getAttribute('data-tabindex'))
            } else {
                interactiveElPopup[i].removeAttribute('tabindex');
            }
        }

        // высота прокрутки страницы на момент открытия окна
        obj.scrollHeight = window.scrollY || window.pageYOffset;
        // для фиксации задаем для body
        document.body.style.top = `-${obj.scrollHeight}px`;
        // если есть полоса прокрутки - компенсируем ее отсутствие внутренним отступом
        document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + "px";
        setTimeout(function() {
            // запрещаем скролл
            document.body.style.position = "fixed";
        }, 0)

        // фокус окну для читалок
        obj.popup.focus();

        // отслеживаем клик на "esc", клик на overlay, на кнопку закрыть окно
        document.addEventListener('keydown', obj.monitorKeyboard.bind(null, obj), false);
        document.addEventListener('click', obj.monitorClick.bind(null, obj), false);
    }

    monitorKeyboard (obj, event) {
        // осли кликнули на клавишу "esc" и окно открыто
        if(event.keyCode == 27 && obj.check) {
            // закрываем
            obj.isClose(obj);
        }
    }

    monitorClick (obj, event) {
        // если окно открыто
        if(obj.check) {
            // если кликнули на кнопку "закрыть окно" или на подложку
            if(
                event.target == obj.popup.querySelector('.bolt-popup__close') ||
                event.target == obj.popup && event.target != obj.popup.querySelector('.bolt-popup__container')
            ) {
                // закрываем окно
                obj.isClose(obj);
            }
        }
    }

    isClose(obj) {
        // запоминаем что окно закрыто
        obj.check = false;
        // убираем кликабельность у окна
        obj.popup.removeAttribute('tabindex');
        // скрываем окно
        obj.popup.classList.remove('bolt-popup--visible');
        obj.popup.setAttribute('aria-hidden', 'true')

        // удаляем tabindex -1 там где не нужен на встранице
        let interactiveEl = document.querySelectorAll('[tabindex="-1"]');
        for (let i = 0; i < interactiveEl.length; i++) {
            if(interactiveEl[i].getAttribute('data-tabindex') && !interactiveEl[i].getAttribute('data-popup')) {
                interactiveEl[i].setAttribute('tabindex', interactiveEl[i].getAttribute('data-tabindex'))
            } else if (!interactiveEl[i].getAttribute('data-popup')) {
                interactiveEl[i].removeAttribute('tabindex');
            }
        }

        // скрываем элементы окна из доступа с клавиатуры
        let interactiveElPopup = this.popup.querySelectorAll('[data-popup]');
        for(let i = 0; i < interactiveElPopup.length; i++ ) {
            interactiveElPopup[i].setAttribute('tabindex', -1);
        }

        // у body удаляем лишние стили и возврашаем нужную высоту скролла
        document.body.style.position = '';

        window.scrollTo (0, obj.scrollHeight);
        document.body.style.paddingRight = '';
        document.body.style.top = '';

        // кнопке по которой открыли окно задаем фокус
        if (obj.clickBtn) obj.clickBtn.focus();
    }
}