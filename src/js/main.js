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
    this.btn = btn,
      // окно
      this.popup = document.getElementById(this.btn.getAttribute('data-bolt')),
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
      this.initB(),
      // отслеживаем действия кнопки и открытого окна
      this.influence()
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
    // клик по кнопке
    if (this.popup) {

      this.btn.addEventListener('click', {
        handleEvent: () => {


          this.popup.querySelector('.bolt-close').addEventListener('click', {
            handleEvent: this.close,
            obj: this
          });

          // this.popup.addEventListener('click', {
          //   handleEvent: () => {
          //     if(this){
          //       console.log(e);
          //     }
          //   },
          //   obj: this
          // });

          // document.addEventListener('keydown', ()=>{
          //   console.log(this);
          // });

          document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
          setTimeout(() => {
            document.body.style.overflow = 'hidden';
          }, 0)

          if (document.querySelectorAll(`[data-bolt=${this.btn.getAttribute('data-bolt')}]`).length == 1) {
            this.popup.style.top = '';
            this.popup.style.left = '';
          }

          this.popup.removeAttribute('aria-hidden');
          this.popup.classList.remove('bolt-hidden');

          let interactiveEl = document.querySelectorAll(this.interactiveCSS);
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

          let interactivePopup = this.popup.querySelectorAll('[data-p]');

          for (let i = 0; i < interactivePopup.length; i++) {
            if (interactivePopup[i].getAttribute('data-tabindex')) {
              interactivePopup[i].setAttribute('tabindex', interactivePopup[i].getAttribute('data-tabindex'))
            } else {
              interactivePopup[i].removeAttribute('tabindex');
            }
          }

          interactivePopup[0].focus();
        },
        obj: this
      });

    }
  }

  close() {
    this.obj.popup.setAttribute('aria-hidden', true);
    this.obj.popup.classList.add('bolt-hidden');

    let interactivePopup = this.obj.popup.querySelectorAll('[data-p]');

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
    this.obj.btn.focus();

    if (document.querySelectorAll(`[data-bolt=${this.obj.btn.getAttribute('data-bolt')}]`).length == 1) {
      var box = this.obj.btn.getBoundingClientRect();
      this.obj.popup.style.top = box.top + pageYOffset + 'px';
      this.obj.popup.style.left = box.left + pageXOffset + 'px';
    }

    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
  }

}