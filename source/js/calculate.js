'use strict';

(function () {
  // Функція розрахунку
  var calculate = function () {
    // Змінні з секції вихідні дані
    var incomeData = document.querySelector('#income-data');
    var allowablePressure = +incomeData.querySelector('#allowable-pressure').value;
    var startingPressure = +incomeData.querySelector('#starting-pressure').value;
    var density = +incomeData.querySelector('#gas-density').value;
    var viscosity = +incomeData.querySelector('#gas-viscosity').value * Math.pow(10, -6);
    var segmentsAmount = +incomeData.querySelector('#segments-amount').value;
    var overloadFactor = +incomeData.querySelector('#overload-factor').value;
    var averageTemperature = +incomeData.querySelector('#average-temperature').value + 273;
    var calcAccurance = +incomeData.querySelector('#calc-accurance').value / 100;
    var atmosphericPressure = +incomeData.querySelector('#atmospheric-pressure').value;
    var maxVelosity = +incomeData.querySelector('#gas-speed').value;
    var averageConsumption = +incomeData.querySelector('#gas-consumption').value;

    // Змінні з секції вихідні ділянки
    var incomeSegments = document.querySelector('#income-segments');
    var segmentsCells = incomeSegments.querySelectorAll('.data__table-input--segment');
    var consumptionCells = incomeSegments.querySelectorAll('.data__table-input--consumption');
    var lengthCells = incomeSegments.querySelectorAll('.data__table-input--length');
    var resistCoefCells = incomeSegments.querySelectorAll('.data__table-input--resist-coef');
    var moveDirectionCells = incomeSegments.querySelectorAll('.data__table-input--movement-direction');
    var pipeTypeRadios = incomeSegments.querySelectorAll('input[name="pipe-type"]');

    // Набір стандартних діаметрів
    var diameters = (pipeTypeRadios[0].checked && pipeTypeRadios[0].value === 'steel') ? window.CONSTANTS.DIAMETERS.STEEL : window.CONSTANTS.DIAMETERS.POLY;
    var roughness = (pipeTypeRadios[0].checked && pipeTypeRadios[0].value === 'steel') ? window.CONSTANTS.ROUGHNESS.STEEL : window.CONSTANTS.ROUGHNESS.POLY;

    // Масиви для результатів
    var segmentsNames = [];
    var consumptionsArray = [];
    var lengthsArray = [];
    var resistCoefsArray = [];
    var moveDirectionsArray = [];
    var estimatedLengthsArray = [];

    var sumEstimatedLength = 0;

    // Заносимо в масиви дані з секції вихдіні ділянки
    for (var i = 0; i < segmentsAmount; i++) {
      segmentsNames.push(segmentsCells[i].value);
      consumptionsArray.push(parseFloat(consumptionCells[i].value));
      lengthsArray.push(parseFloat(lengthCells[i].value));
      resistCoefsArray.push(parseFloat(resistCoefCells[i].value));
      moveDirectionsArray.push(parseFloat(moveDirectionCells[i].value));
      var estimatedLength = parseFloat(window.formulas.estimatedLength(lengthCells[i].value, resistCoefCells[i].value));
      estimatedLengthsArray.push(estimatedLength);
      sumEstimatedLength += estimatedLength;
    }

    // Знаходимо тиск на вході
    var inletPressure = window.formulas.inletPressure(startingPressure, allowablePressure);
    // Знаходимо середній тиск
    var averagePressure = window.formulas.averagePressure(atmosphericPressure, startingPressure, inletPressure);
    // Знаходимо середній гідравлічний нахил
    var averageHydraulicInc = window.formulas.averageHydraulicInc(overloadFactor, allowablePressure, sumEstimatedLength);
    var estimatedHydraulicInc = 0;

    // Уточнюємо швидкість газу в системі та знаходимо діаметр характерної ділянки
    for (var velocity = maxVelosity; calcAccurance < Math.abs(estimatedHydraulicInc - averageHydraulicInc); velocity -= 0.001) {
      var innerDiameter = window.formulas.innerDiameter(averageConsumption, averageTemperature, averagePressure, velocity);
      estimatedHydraulicInc = window.formulas.estimatedHydraulicInc(roughness, innerDiameter, viscosity, averageConsumption, density);
    }

    // Задаємося пустими масивами для результатів
    var estimatedDiameters = [];
    var reynoldsNumbersArray = [];
    var pressureLossesArray = [];
    var pressureChangesArray = [];
    var sumPressureChangeArray = [];
    var endingPressureArray = [];
    var sumPressureLoss = 0;

    for (var j = 0; j < segmentsAmount; j++) {
      // Знаходимо діаметр для конкретної ділянки
      var currentDiameter = window.formulas.innerDiameter(consumptionsArray[j], averageTemperature, averagePressure, velocity);

      // Порівнюємо та заокруглюємо діаметр до найближчого більшого стандартного значення
      for (var diameter in diameters) {
        if (currentDiameter - diameters[diameter] > 0) continue;
        currentDiameter = diameters[diameter];
        estimatedDiameters.push(diameter);
        break;
      }

      // Знаходимо число Рейнольдса
      var currentReynolds = window.formulas.reynoldsNumber(consumptionsArray[j], currentDiameter, viscosity);
      // Знаходимо втрати тиску від тертя залежно від режиму руху газу
      if (currentReynolds >= 4000) {
        var currentPressureLoss = window.formulas.pressureLossRe4000(roughness, currentDiameter, viscosity, consumptionsArray[j], density, estimatedLengthsArray[j]);
      } else if (currentReynolds >= 2000 && currentReynolds < 4000) {
        currentPressureLoss = window.formulas.pressureLossRe3000(consumptionsArray[j], density, estimatedLengthsArray[j], currentDiameter, viscosity);
      } else {
        currentPressureLoss = window.formulas.pressureLossRe2000(consumptionsArray[j], viscosity, density, currentDiameter, estimatedLengthsArray[j]);
      }
      // Знаходимо зміну надлишкового тиску газу
      var currentPressureChange = window.formulas.pressureChange(lengthsArray[j], density, moveDirectionsArray[j]);
      // Знаходимо загальну зміну тиску газу
      var currentSumPressureChange = window.formulas.totalPressureChange(currentPressureLoss, currentPressureChange);
      // Сумуємо втрати тиску
      sumPressureLoss += currentSumPressureChange;
      // Знаходимо загальний кінцевий тиск на ділянці
      var currentEndingPressure = window.formulas.endingPressure(startingPressure, currentSumPressureChange);
      // Оновлюємо початковий тиск
      startingPressure = currentEndingPressure;

      // Заносимо результати в масиви
      reynoldsNumbersArray.push(currentReynolds.toFixed());
      pressureLossesArray.push(currentPressureLoss.toFixed());
      pressureChangesArray.push(currentPressureChange.toFixed());
      sumPressureChangeArray.push(currentSumPressureChange.toFixed());
      endingPressureArray.push(currentEndingPressure.toFixed());
    }

    // Заносимо в об'єкт потрібні результати
    window.calculate.results = {
      segmentsName: segmentsNames,
      lengths: lengthsArray,
      consumptions: consumptionsArray,
      diameters: estimatedDiameters,
      pressureLosses: pressureLossesArray,
      pressureChanges: pressureChangesArray,
      sumPressureChange: sumPressureChangeArray,
      endingPressure: endingPressureArray,
      velocity: velocity,
      sumPressureLoss: sumPressureLoss
    };
  };

  // Виносимо розрахунок в глобальну область видимості
  window.calculate = {
    activate: calculate
  };
})();
