'use strict';

(function () {
  // Масив для використанных ділянок
  var usedSegments = [];
  // Масив з коеф. місцевих опорів для плейсхолдеров
  var resistCoefArray = [25, 20, 450, 300, 120, 50];

  // Отримуємо значення плейсхолдера для заданого типу
  var getPlaceholderValue = function (type) {
    var result;

    switch (type) {
      case 'segment':
        result = window.utils.getRandomNumber(1, 20) + '-' + window.utils.getRandomNumber(1, 20);
        usedSegments.includes(result) ? getPlaceholderValue('segment') : usedSegments.push(result);
        break;
      case 'consumption':
        result = window.utils.getRandomFloatNumber(1, 15, 2);
        break;
      case 'length':
        result = window.utils.getRandomFloatNumber(1, 12, 1);
        break;
      case 'resist-coef':
        result = window.utils.getRandomValue(resistCoefArray);
        break;
    }

    return result;
  };

  // Будуємо таблицю для вихідних даних ділянок мережі
  var buildSegmentsTable = function () {
    var fragment = document.createDocumentFragment();
    var segmentsAmount = document.querySelector('#segments-amount').value;
    var tableBodyNode = document.querySelector('.data__table--segments .data__table-body');
    var rowTemplate = document.querySelector('#segments-row').content.querySelector('.data__table-row');

    for (var i = 1; i <= segmentsAmount; i++) {
      var rowNode = rowTemplate.cloneNode(true);
      rowNode.querySelector('.data__table-cell--number').textContent = 'Ділянка ' + i;
      rowNode.querySelector('.data__table-input--segment').placeholder = getPlaceholderValue('segment');
      rowNode.querySelector('.data__table-cell--consumption .data__input--definition sub').textContent = i;
      rowNode.querySelector('.data__table-input--consumption').placeholder = getPlaceholderValue('consumption');
      rowNode.querySelector('.data__table-cell--length .data__input--definition sub').textContent = i;
      rowNode.querySelector('.data__table-input--length').placeholder = getPlaceholderValue('length');
      rowNode.querySelector('.data__table-cell--resist-coef .data__input--definition sub').textContent = i;
      rowNode.querySelector('.data__table-input--resist-coef').placeholder = getPlaceholderValue('resist-coef');
      fragment.appendChild(rowNode);
    }

    tableBodyNode.appendChild(fragment);
  };

  // Очищаємо таблицю для вихідних даних ділянок мережі
  var clearTableBody = function () {
    usedSegments.length = 0;
    var tableBodyNode = document.querySelector('.data__table--segments .data__table-body');

    while (tableBodyNode.firstChild) {
      tableBodyNode.firstChild.remove();
    }
  };

  // Заносимо функції в глобальну область видимості
  window.segments = {
    buildTable: buildSegmentsTable,
    clear: clearTableBody
  };
})();
