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
    this.check = false
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
      if (document.querySelectorAll(`[data-bolt=${this.btn.getAttribute('data-bolt')}]`).length == 1) {
        var box = this.btn.getBoundingClientRect();
        this.popup.style.top = box.top + pageYOffset + 'px';
        this.popup.style.left = box.left + pageXOffset + 'px';
      }
    }
  }

  // отслеживаем действия кнопки и открытого окна
  influence() {
    if (this.popup) {

      // открытие окна
      this.btn.addEventListener("click", this.open.bind(null, this), false);

      // закрытие по кнопке
      this.popup.querySelector('.bolt-close').addEventListener("click", this.close.bind(null, this), false);

      // закрытие по esk
      document.addEventListener("keydown", this.keydownEvent.bind(null, this), false);
    }
  }

  open(obj) {
    obj.check = true;

    // открываем окно читалкам
    obj.popup.removeAttribute('aria-hidden');
    // показываем окно
    obj.popup.classList.remove('bolt-hidden');

    if (document.querySelectorAll(`[data-bolt=${obj.btn.getAttribute('data-bolt')}]`).length == 1) {
      obj.popup.style.top = '';
      obj.popup.style.left = '';
    }

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

    let interactivePopup = obj.popup.querySelectorAll('[data-p]');

    for (let i = 0; i < interactivePopup.length; i++) {
      if (interactivePopup[i].getAttribute('data-tabindex')) {
        interactivePopup[i].setAttribute('tabindex', interactivePopup[i].getAttribute('data-tabindex'))
      } else {
        interactivePopup[i].removeAttribute('tabindex');
      }
    }

    interactivePopup[0].focus();

    document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';

    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
  }

  close(obj, event) {
    obj.check = false;
    obj.popup.setAttribute('aria-hidden', true);
    obj.popup.classList.add('bolt-hidden');

    // объявить в конструкторе, изменять при открытии
    const scrollY = document.body.style.top;
    // 
    console.log(scrollY)
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    document.body.style.paddingRight = '';

    let interactivePopup = obj.popup.querySelectorAll('[data-p]');

    for (let i = 0; i < interactivePopup.length; i++) {
      if (interactivePopup[i].getAttribute('data-p')) {
        interactivePopup[i].setAttribute('tabindex', -1)
      }
    }
    let interactiveEl = document.querySelectorAll('[tabindex="-1"]');
    for (let i = 0; i < interactiveEl.length; i++) {
      if (!interactiveEl[i].getAttribute('data-p')) {
        if (interactiveEl[i].getAttribute('data-tabindex')) {
          interactiveEl[i].setAttribute('tabindex', interactiveEl[i].getAttribute('data-tabindex'))
        } else {
          interactiveEl[i].removeAttribute('tabindex')
        }
      }
    }
    obj.btn.focus();
    if (document.querySelectorAll(`[data-bolt=${obj.btn.getAttribute('data-bolt')}]`).length == 1) {
      var box = obj.btn.getBoundingClientRect();
      obj.popup.style.top = box.top + pageYOffset + box.width / 2 + 'px';
      obj.popup.style.left = box.left + pageXOffset + box.height / 2 + 'px';
    }
  }

  keydownEvent(obj, event) {
    if (obj.check) {
      if (event.keyCode == 27) {
        obj.close(obj);
      }
    }
  }

}