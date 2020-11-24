window.onload = () => {
  // создаем popup
  let popup = new Bolt(document.querySelector('.btn'));
  let popup1 = new Bolt(document.querySelector('[data-bolt="bolt-2"]'));
  let popup2 = new Bolt(document.querySelector('.btn-2'));

}

// создаем class 
class Bolt {
  constructor(btn) {
    // кнопка
    this.btn = btn
    // окно
    this.popup = document.getElementById(this.btn.getAttribute('data-bolt'))
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
    this.influence()
    // если окно открыто - true
    this.check = false
    // высота скролла
    this.scrollY = 0;
    // кнопка по которой открыли окно
    this.btnClick = this.btn;
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
    // если кнопка одна
    if (document.querySelectorAll(`[data-bolt=${this.btn.getAttribute('data-bolt')}]`).length == 1) {
      // получаем координаты кнопки
      var box = this.btn.getBoundingClientRect();
      // ставим окно там где кнопка
      this.popup.style.top = box.top + pageYOffset + 'px';
      this.popup.style.left = box.left + pageXOffset + 'px';
    }
  }

  // отслеживаем действия кнопки и открытого окна
  influence() {

    // если для кнопки есть окно
    if (this.popup) {

      // отслеживаем клик для открытия/закрытия окна
      document.addEventListener("click", this.clickPopup.bind(null, this), false)

      // закрытие по esk
      document.addEventListener("keydown", this.keydownEvent.bind(null, this), false);
    }
  }

  open(obj) {
    // указываем что окно открыто
    obj.check = true;

    // открываем окно читалкам
    obj.popup.removeAttribute('aria-hidden');
    // показываем окно
    obj.popup.classList.remove('bolt-hidden');

    // если одна кнопка
    if (document.querySelectorAll(`[data-bolt=${obj.btn.getAttribute('data-bolt')}]`).length == 1) {
      // сбрасываем свойства для position
      obj.popup.style.top = '';
      obj.popup.style.left = '';
    }

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
    console.log(window)
    // задаем top для body что бы визуально страница не дергалась
    document.body.style.top = `-${obj.scrollY}px`;
    setTimeout(function () {
      // задаем position fixed что бы отменить скролл
      document.body.style.position = 'fixed';
    }, 0)
  }

  close(obj) {
    // запоминаем что окно закрыто
    obj.check = false;
    // закрываем окно читалкам
    obj.popup.setAttribute('aria-hidden', true);
    // скрываем окно
    obj.popup.classList.add('bolt-hidden');

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
    // если кнопка у окна одна
    if (document.querySelectorAll(`[data-bolt=${obj.btn.getAttribute('data-bolt')}]`).length == 1) {
      // получаем координаты кнопки
      var box = obj.btn.getBoundingClientRect();
      // ставим окно там где кнопка
      obj.popup.style.top = box.top + pageYOffset + 'px';
      obj.popup.style.left = box.left + pageXOffset + 'px';
    }
  }

  // слушаем клавиатуру
  keydownEvent(obj, event) {
    // если окно открыто
    if (obj.check) {
      // если нажали на кнопку "esc"
      if (event.keyCode == 27) {
        // закрываем окно
        obj.close(obj);
      }
    }
  }

  clickPopup(obj, event) {
    // если кликнули по кнопке
    if (event.target == obj.btn) {
      // запоминаем кнопку на которую кликнули
      obj.btnClick = event.target;
      // открываем окно
      obj.open(obj);
    }
    // либо если кликнули по кнопке "закрыть" или по подложке
    else if (
      (event.target == obj.popup.querySelector('.bolt-close') && obj.check) ||
      (event.target == obj.popup && event.target != obj.popup.querySelector('.bolt-container'))
    ) {
      // закрываем окно
      if (obj.check) {
        obj.close(obj);
      }
    }
  }
}