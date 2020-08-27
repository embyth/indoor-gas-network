'use strict';

(function () {
  // Елемент гамбургера
  var hamburgerNode = document.querySelector('.hamburger');
  var menuNode = document.querySelector('.site-header__links-list');

  // Логіка відкриття навігації по кліку на гамбургер
  var hamburgerClickHandler = function (evt) {
    evt.preventDefault();

    hamburgerNode.classList.toggle('is-active');
    menuNode.classList.toggle('site-header__links-list--show');

    if (hamburgerNode.classList.contains('is-active')) {
      window.utils.blockBodyScroll();
    } else {
      window.utils.unblockBodyScroll();
    }
  };

  // Функція активації гамбургера
  var activate = function () {
    hamburgerNode.addEventListener('click', hamburgerClickHandler);
  };

  // Передаємо активацію в глобальну область видимості
  window.hamburger = {
    activate: activate
  };
})();
