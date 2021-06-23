"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BoltPopup = /*#__PURE__*/function () {
  function BoltPopup(popup) {
    var _this = this;

    _classCallCheck(this, BoltPopup);

    _defineProperty(this, "monitorKeyboard", function (event) {
      // осли кликнули на клавишу "esc" и окно открыто
      if (event.keyCode == 27 && _this.check) {
        // закрываем
        _this.isClose();
      }
    });

    _defineProperty(this, "monitorClick", function (event) {
      // если окно открыто
      if (_this.check) {
        // если кликнули на кнопку "закрыть окно" или на подложку
        if (event.target == _this.popup.querySelector('.bolt-popup__close') || event.target == _this.popup && event.target != _this.popup.querySelector('.bolt-popup__container')) {
          // закрываем окно
          _this.isClose();
        }
      }
    });

    // само окно
    this.popup = popup; // кнопка на которую кликнули для открытия окна

    this.clickBtn; // высота прокрутки страницы при ткрытии окна

    this.scrollHeight = 0; // окно закрыто

    this.check = false; // css селектор интерактивных окон

    this.interactiveCSS = "a[href]:not([tabindex='-1']), area[href]:not([tabindex='-1']), input:not([disabled]):not([tabindex='-1']), select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']), iframe:not([tabindex='-1']), [tabindex]:not([tabindex='-1']), [contentEditable=true]:not([tabindex='-1'])"; // добавляем необходимые атрибуты окну и его элементам

    this.initPopup();
  }

  _createClass(BoltPopup, [{
    key: "initPopup",
    value: function initPopup() {
      var _this2 = this;

      // получаем все интерактивные элементы окна
      var interactiveEl = this.popup.querySelectorAll(this.interactiveCSS);
      this.popup.setAttribute('aria-hidden', 'true'); // перебирем все интерактивные элементы

      for (var i = 0; i < interactiveEl.length; i++) {
        // если есть атрибут tabindex
        if (interactiveEl[i].getAttribute('tabindex')) {
          // запоминаем в data-tabindex
          interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'));
        } // задаем tabindex -1 что бы исключить из доступа с клавиатуры


        interactiveEl[i].setAttribute('tabindex', -1); // запоминаем что это элемент окна

        interactiveEl[i].setAttribute('data-popup', true);
      } // получаем все возможные кнопки для открытия текущего окна


      var btns = document.querySelectorAll("[dada-target-popup=\"".concat(this.popup.getAttribute('dada-path-popup'), "\"]")); // в цикле отслеживаем по ним клик и открываем окно

      var _loop = function _loop(_i) {
        btns[_i].addEventListener('click', function () {
          _this2.isOpen(btns[_i]);
        });
      };

      for (var _i = 0; _i < btns.length; _i++) {
        _loop(_i);
      }
    }
  }, {
    key: "isOpen",
    value: function isOpen(clickBtn) {
      // запоминаем что окно открыто
      this.check = true; // запоминаем на какую кнопку кликнули

      this.clickBtn = clickBtn || false; // добавляем кликабельность для overlay

      this.popup.setAttribute('tabindex', 0); // показываем окно

      this.popup.classList.add('bolt-popup--visible');
      this.popup.removeAttribute('aria-hidden'); // получаем все интерактивные элементы окна

      var interactiveEl = document.querySelectorAll(this.interactiveCSS);

      for (var i = 0; i < interactiveEl.length; i++) {
        // если это элемент не всплывающего окна
        if (!interactiveEl[i].getAttribute('data-popup')) {
          // если есть атрибут tabindex
          if (interactiveEl[i].getAttribute('tabindex')) {
            // запоминаем его в data-tabindex
            interactiveEl[i].setAttribute('data-tabindex', interactiveEl[i].getAttribute('tabindex'));
          } // закрываем доступ от клавиатуры


          interactiveEl[i].setAttribute('tabindex', -1);
        }
      } // у всех элементов окна удаляем/меняем tabindex -1


      var interactiveElPopup = this.popup.querySelectorAll('[tabindex="-1"]');

      for (var _i2 = 0; _i2 < interactiveElPopup.length; _i2++) {
        if (interactiveElPopup[_i2].getAttribute('data-tabindex')) {
          interactiveElPopup[_i2].setAttribute('tabindex', interactiveElPopup[_i2].getAttribute('data-tabindex'));
        } else {
          interactiveElPopup[_i2].removeAttribute('tabindex');
        }
      } // высота прокрутки страницы на момент открытия окна


      this.scrollHeight = window.scrollY || window.pageYOffset; // для фиксации задаем для body

      document.body.style.top = "-".concat(this.scrollHeight, "px"); // если есть полоса прокрутки - компенсируем ее отсутствие внутренним отступом

      document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + "px";
      setTimeout(function () {
        // запрещаем скролл
        document.body.style.position = "fixed";
      }, 0); // фокус окну для читалок

      this.popup.focus(); // отслеживаем клик на "esc", клик на overlay, на кнопку закрыть окно

      document.addEventListener('keydown', this.monitorKeyboard);
      document.addEventListener('click', this.monitorClick);
    }
  }, {
    key: "isClose",
    value: function isClose() {
      // запоминаем что окно закрыто
      this.check = false; // убираем кликабельность у окна

      this.popup.removeAttribute('tabindex'); // скрываем окно

      this.popup.classList.remove('bolt-popup--visible');
      this.popup.setAttribute('aria-hidden', 'true'); // удаляем tabindex -1 там где не нужен на встранице

      var interactiveEl = document.querySelectorAll('[tabindex="-1"]');

      for (var i = 0; i < interactiveEl.length; i++) {
        if (interactiveEl[i].getAttribute('data-tabindex') && !interactiveEl[i].getAttribute('data-popup')) {
          interactiveEl[i].setAttribute('tabindex', interactiveEl[i].getAttribute('data-tabindex'));
        } else if (!interactiveEl[i].getAttribute('data-popup')) {
          interactiveEl[i].removeAttribute('tabindex');
        }
      } // скрываем элементы окна из доступа с клавиатуры


      var interactiveElPopup = this.popup.querySelectorAll('[data-popup]');

      for (var _i3 = 0; _i3 < interactiveElPopup.length; _i3++) {
        interactiveElPopup[_i3].setAttribute('tabindex', -1);
      } // у body удаляем лишние стили и возврашаем нужную высоту скролла


      document.body.style.position = '';
      window.scrollTo(0, this.scrollHeight);
      document.body.style.paddingRight = '';
      document.body.style.top = ''; // кнопке по которой открыли окно задаем фокус

      if (this.clickBtn) this.clickBtn.focus(); // удаляем слушатели событий

      document.removeEventListener('keydown', this.monitorKeyboard);
      document.removeEventListener('click', this.monitorClick);
    }
  }]);

  return BoltPopup;
}();