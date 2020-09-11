'use strict';

(function () {
  // Елемент гамбургера
  var hamburgerNode = document.querySelector('.hamburger');
  var menuNode = document.querySelector('.site-header__links-list');
  var overlayNode = document.querySelector('.menu-overlay');

  // Логіка відкриття навігації по кліку на гамбургер
  var hamburgerClickHandler = function (evt) {
    evt.preventDefault();

    hamburgerNode.classList.toggle('is-active');
    menuNode.classList.toggle('site-header__links-list--show');
    overlayNode.classList.toggle('menu-overlay--show');

    if (hamburgerNode.classList.contains('is-active')) {
      window.utils.blockBodyScroll();
      document.addEventListener('keydown', hamburgerKeydownHandler);
    } else {
      window.utils.unblockBodyScroll();
      document.removeEventListener('keydown', hamburgerKeydownHandler);
    }
  };

  // Оброблювач події натиснення кнопки ESC
  var hamburgerKeydownHandler = function (evt) {
    if (window.utils.isEscKey(evt)) hamburgerClickHandler(evt);
  };

  // Функція активації гамбургера
  var activate = function () {
    hamburgerNode.addEventListener('click', hamburgerClickHandler);
    overlayNode.addEventListener('click', hamburgerClickHandler);
  };

  // Передаємо активацію в глобальну область видимості
  window.hamburger = {
    activate: activate
  };
})();
