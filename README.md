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
* isOpen([clickBtn]) открывает окно (принимает кнопку если окно открыто по клику на кнопку)
* isClose() закрывает окно

Использование:
-----------------------------------
HTML
```
<!--
...
 -->
<div class="bolt-popup" role="dialog" data-path-popup="popup-2">

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
  let popup1 = new BoltPopup( document.querySelector('[data-path-popup="popup-1"]') )
</script>
<!--
...
 -->
```
