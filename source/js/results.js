'use strict';

(function () {
  // Побудова таблиці з результатами розрахунку
  var buildResultsTable = function () {
    var results = window.calculate.results;
    var fragment = document.createDocumentFragment();
    var segmentsAmount = +document.querySelector('#segments-amount').value;
    var tableBodyNode = document.querySelector('.data__table--results .data__table-body');
    var rowTemplate = document.querySelector('#results-row').content.querySelector('.data__table-row');

    for (var i = 0; i < segmentsAmount; i++) {
      var rowNode = rowTemplate.cloneNode(true);
      rowNode.querySelector('.data__table-cell--segment').textContent = results.segmentsName[i];
      rowNode.querySelector('.data__table-cell--length .data__input--definition sub').textContent = results.segmentsName[i];
      rowNode.querySelector('.data__table-cell--length .data__value').textContent = results.lengths[i];
      rowNode.querySelector('.data__table-cell--consumption .data__input--definition sub').textContent = results.segmentsName[i];
      rowNode.querySelector('.data__table-cell--consumption .data__value').textContent = results.consumptions[i];
      rowNode.querySelector('.data__table-cell--diameter').textContent = results.diameters[i];
      rowNode.querySelector('.data__table-cell--pressure-loss .data__input--definition sub').textContent = results.segmentsName[i];
      rowNode.querySelector('.data__table-cell--pressure-loss .data__value').textContent = results.pressureLosses[i];
      rowNode.querySelector('.data__table-cell--pressure-drop .data__input--definition .data__sub').textContent = results.segmentsName[i];
      rowNode.querySelector('.data__table-cell--pressure-drop .data__value').textContent = results.pressureChanges[i];
      rowNode.querySelector('.data__table-cell--total-pressure-drop .data__input--definition .data__sub').textContent = results.segmentsName[i];
      rowNode.querySelector('.data__table-cell--total-pressure-drop .data__value').textContent = results.sumPressureChange[i];
      rowNode.querySelector('.data__table-cell--ending-pressure .data__input--definition .data__sub').textContent = results.segmentsName[i];
      rowNode.querySelector('.data__table-cell--ending-pressure .data__value').textContent = results.endingPressure[i];
      fragment.appendChild(rowNode);
    }

    tableBodyNode.appendChild(fragment);
  };

  // Очищення таблиці результатів
  var clearTableBody = function () {
    var tableBodyNode = document.querySelector('.data__table--results .data__table-body');

    while (tableBodyNode.firstChild) {
      tableBodyNode.firstChild.remove();
    }
  };

  // Передаємо функції в глобальну область видимості
  window.results = {
    buildTable: buildResultsTable,
    clear: clearTableBody
  };
})();
