'use strict';

(function () {
  // Змінні для роботи з секціями
  var navButtons = document.querySelectorAll('.site-nav__button');
  var beginButton = document.querySelector('.intro__button--begin');
  var nextButtonNode = document.querySelector('.data__button--next');
  var calcButtonNode = document.querySelector('.data__button--calc');

  var incomeDataSectionNode = document.querySelector('#income-data');
  var incomeSegmentsSectionNode = document.querySelector('#income-segments');
  var resultsSectionNode = document.querySelector('#results');

  // Константи імен секцій
  var SECTION_NAMES = {
    intro: 'intro',
    data: 'income-data',
    segments: 'income-segments',
    results: 'results'
  };

  // Функція переключатель секцій
  var toggleSection = function (section) {
    var sections = document.querySelectorAll('section');
    sections.forEach((item) => {
      item.classList.add('visually-hidden');
    });

    section.classList.remove('visually-hidden');
  };

  // Функція переключатель активного стану кнопки навігації
  var toggleCurrentState = function (button) {
    var buttons = document.querySelectorAll('.site-nav__button');
    buttons.forEach((item) => {
      item.classList.remove('site-nav__button--current');
    });

    button.disabled = false;
    button.classList.add('site-nav__button--current');
  };

  // Функція яка отримує ноду секції через клас кнопки навігації
  var getSectionNode = function (target) {
    var strings = target.className.split(' ');
    var section;

    strings.forEach(function (item) {
      for (var name in SECTION_NAMES) {
        if (item.includes(SECTION_NAMES[name])) {
          section = document.querySelector('#' + SECTION_NAMES[name]);
        }
      }
    });

    return section;
  };

  // Оброблювач кліку на кнопки навігації
  var navButtonClickHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;

    toggleSection(getSectionNode(target));
    toggleCurrentState(target);
  };

  // Оброблювач кліку на кнопку "Почати"
  var beginButtonClickHandler = function (evt) {
    evt.preventDefault();

    toggleSection(incomeDataSectionNode);
    toggleCurrentState(navButtons[1]);
  };

  // Оброблювач кліку на кнопку "Далі"
  var nextButtonClickHandler = function (evt) {
    evt.preventDefault();

    if (!window.validation.isIncomeDataValid()) return;
    window.segments.clear();
    window.segments.buildTable();
    incomeSegmentsSectionNode.querySelector('fieldset').disabled = false;
    toggleSection(incomeSegmentsSectionNode);
    toggleCurrentState(navButtons[2]);
  };

  // Оброблювач кліку на кнопку "Розрахувати"
  var calcButtonClickHandler = function (evt) {
    evt.preventDefault();

    if (!window.validation.isIncomeSegmentsValid()) return;
    window.calculate.activate();
    window.results.clear();
    window.results.buildTable();
    toggleSection(resultsSectionNode);
    toggleCurrentState(navButtons[3]);
  };

  // Функція активації секцій
  var activate = function () {
    navButtons.forEach(function (button) {
      button.addEventListener('click', navButtonClickHandler);
    });

    beginButton.addEventListener('click', beginButtonClickHandler);
    nextButtonNode.addEventListener('click', nextButtonClickHandler);
    calcButtonNode.addEventListener('click', calcButtonClickHandler);
  };

  // Функція диактивації секцій
  var disable = function () {
    navButtons.forEach(function (button) {
      button.removeEventListener('click', navButtonClickHandler);
    });

    beginButton.removeEventListener('click', beginButtonClickHandler);
    nextButtonNode.removeEventListener('click', nextButtonClickHandler);
  };

  // Передаємо функції в глобальну область видимості
  window.sections = {
    activate: activate,
    disable: disable
  };
})();
