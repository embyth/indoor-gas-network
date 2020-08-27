'use strict';

(function () {
  // Повідомлення про помилки при вводі
  var ErrorMessage = {
    VALUE_MISSING: 'Введіть дані',
    RANGE_OVERFLOW: 'Значення не може бути більше ',
    RANGE_UNDERFLOW: 'Значення не може бути менше '
  };

  // Виділяємо поле вводу
  var highlightInput = function (input) {
    if (input.classList.contains('data__input')) {
      input.classList.add('data__input--error');
    } else {
      input.classList.add('data__table-input--error');
    }
  };

  // Знімаємо виділення поля вводу
  var resetHighlightInput = function (input) {
    if (input.classList.contains('data__input')) {
      input.classList.remove('data__input--error');
    } else {
      input.classList.remove('data__table-input--error');
    }
  };

  // Перевіряємо поле на правильність вводу
  var checkInputValidity = function (input) {
    if (input.validity.valueMissing) {
      input.setCustomValidity(ErrorMessage.VALUE_MISSING);
      input.reportValidity();
      highlightInput(input);
    } else if (input.validity.rangeUnderflow) {
      input.setCustomValidity(ErrorMessage.RANGE_UNDERFLOW + input.min);
      input.reportValidity();
      highlightInput(input);
    } else if (input.validity.rangeOverflow) {
      input.setCustomValidity(ErrorMessage.RANGE_OVERFLOW + input.max);
      input.reportValidity();
      highlightInput(input);
    } else {
      input.setCustomValidity('');
      resetHighlightInput(input);
    }
  };

  // Перевірка на валідність поля вводу
  var isInputsValid = function (form) {
    var inputs = form.querySelectorAll('input');
    var isValid = true;
    var notValidElements = [];

    inputs.forEach(function (item) {
      if (!item.checkValidity()) {
        highlightInput(item);
        notValidElements.push(item);

        var itemInputHandler = function () {
          checkInputValidity(item);
        };
        item.addEventListener('input', itemInputHandler);

        isValid = false;
      }
    });

    if (notValidElements.length > 0) checkInputValidity(notValidElements[0]);

    return isValid;
  };

  // Перевірка секції вихідних даних на правильність
  var isIncomeDataValid = function () {
    var incomeDataFieldset = document.querySelector('#income-data .data__fieldset');
    return isInputsValid(incomeDataFieldset);
  };

  // Перевірка секції вихідних ділянок на правильність
  var isIncomeSegmentsValid = function () {
    var incomeSegmentsFieldset = document.querySelector('#income-segments .data__table-body');
    return isInputsValid(incomeSegmentsFieldset);
  };

  // Передаємо функції в глобальну область видимості
  window.validation = {
    isIncomeDataValid: isIncomeDataValid,
    isIncomeSegmentsValid: isIncomeSegmentsValid
  };
})();
