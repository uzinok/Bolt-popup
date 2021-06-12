BOLT-popup
=====================

Подготовил: [Александр Зиновьев](http://uzinok.ru/)
-----------------------------------

Команды
-----------------------------------

* gulp - сборка проекта и запуск сервера
* gulp build - сборка проекта

особенности
-----------------------------------

* файл стилей, js код, html - минифицируются
* препроцессор стилей less
* стили обновляются без перезагрузки страницы
* webpack

перед установкой сборщика необходимо:
-----------------------------------

* [устнаовить node.js](https://nodejs.org/) используется пакет npm
* [глобально установить gulp](https://gulpjs.com/) для работы команд gulp
* [глобально установить browser-sync](https://browsersync.io/) для работы виртуального сервера

Методы:
-----------------------------------
* initPopup() добавляет необходимые атрибуты
* isOpen(obj, [clickBtn]) открывает окно (принимает текущий объект и кнопку если окно открыто по клику на кнопку)
* isClose(obj) закрывает окно (принимает текущий объект)

Использование:
-----------------------------------
HTML
```
<!--
...
 -->
<div class="bolt-popup" role="dialog" dada-path-popup="popup-2">

  <div class="bolt-popup__container">
    <button class="bolt-popup__close" aria-label="Close"></button>
    <!--
    ...
    -->
  </div>

</div>
<!--
...
 -->
<script src="./js/main.min.js"></script>
<script>
  let popup1 = new BoltPopup( document.querySelector('[dada-path-popup="popup-1"]') )
</script>
<!--
...
 -->
```