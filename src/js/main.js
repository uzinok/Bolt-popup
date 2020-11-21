window.onload = () => {
  // создаем popup
  let popup = new Bolt(document.querySelector('.btn'));

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
    }
  }

  // отслеживаем действия кнопки и открытого окна
  influence() {
    // клик по кнопке
    if (this.popup) {

      this.btn.addEventListener('click', {
        handleEvent: () => {

        this.popup.removeAttribute('aria-hidden');
        this.popup.classList.remove('bolt-hidden');

        this.close()
        }, obj: this
      });
      
    }
    console.log(this);


  }

  close() {
    console.log('fgdhdfg')
  }

}