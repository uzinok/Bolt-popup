window.onload = () => {
  // создаем popup
//   let popup = new BoltPopup(document.querySelector('.btn'));
//   let popup1 = new BoltPopup(document.querySelector('[data-BoltPopup="bolt-2"]'));
//   let popup2 = new BoltPopup(document.querySelector('.btn-2'));

let popup = new BoltPopup(document.querySelector('#bolt-1'));
}

// создаем class 
class BoltPopup {
  constructor(popup) {
    // кнопка
    this.btn = document.querySelectorAll(`[data-BoltPopup="bolt-1"]`)
    // окно
    this.popup = popup
    // css селектор интерактивных окон
    this.interactiveCSS = `
        a[href]:not([tabindex='-1']),
        area[href]:not([tabindex='-1']),
        input:not([disabled]):not([tabindex='-1']),
        select:not([disabled]):not([tabindex='-1']),
        textarea:not([disabled]):not([tabindex='-1']),
        button:not([disabled]):not([tabindex='-1']),
        iframe:not([tabindex='-1']),
        [tabindex]:not([tabindex='-1']),
        [contentEditable=true]:not([tabindex='-1'])
      `,
      // инициализация окна
      this.initB()
    // отслеживаем действия кнопки и открытого окна
    this.actions()
    // если окно открыто - true
    this.check = false
    // высота скролла
    this.scrollY = 0
    // кнопка по которой открыли окно
    this.btnClick = this.btn
  }

  initB() {
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

  // отслеживаем действия кнопки и открытого окна
  actions() {

    // если для кнопки есть окно
    if (this.popup) {

      // отслеживаем клик для открытия/закрытия окна
      document.addEventListener("click", this.trackСlick.bind(null, this), false)

      // закрытие по esk
      document.addEventListener("keydown", this.monitorKeyboard.bind(null, this), false);
    }
  }

  open(obj) {
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

  trackСlick(obj, event) {
    // если кликнули по кнопке
    if (event.target == obj.btn) {
      // запоминаем кнопку на которую кликнули
      obj.btnClick = event.target;
      // открываем окно
      obj.open(obj);
    }
    // либо если кликнули по кнопке "закрыть" или по подложке
    else if (
      (event.target == obj.popup.querySelector('.bolt-popup-close') && obj.check) ||
      (event.target == obj.popup && event.target != obj.popup.querySelector('.bolt-popup-container'))
    ) {
      // закрываем окно
      if (obj.check) {
        obj.close(obj);
      }
    }
  }
}