'use strict';

(function () {
  // Розрахункова довжина ділянки
  var estimatedLength = function (length, resistCoef) {
    return length * (1 + resistCoef / 100);
  };

  // Надлишковий тиск на вході до споживача
  var inletPressure = function (startPressure, allowablePressure) {
    return startPressure - allowablePressure;
  };

  // Середній абсолютний тиск газу в системі
  var averagePressure = function (atmosphericPressure, startPressure, inletPressure) {
    return (atmosphericPressure + 0.5 * (startPressure + inletPressure)) * Math.pow(10, -6);
  };

  // Середній гідравлічний нахил в газовій мережі
  var averageHydraulicInc = function (overloadFactor, allowablePressure, sumEstimatedLength) {
    return overloadFactor * (allowablePressure / sumEstimatedLength);
  };

  // Внутрішній діаметр ділянки газової мережі, що має усереднене значення витрати газу
  var innerDiameter = function (consumption, temperature, averagePressure, velocity) {
    return 0.036238 * Math.sqrt((consumption * temperature) / (averagePressure * velocity));
  };

  // Гідравлічний нахил на характерній ділянці при прийнятій швидкості руху газу
  var estimatedHydraulicInc = function (roughness, diameter, viscosity, consumption, density) {
    return 69 * Math.pow((roughness / diameter + 1922 * (viscosity * diameter) / consumption), 0.25) * (Math.pow(consumption, 2) * density) / Math.pow(diameter, 5);
  };

  // Число Рейнольдса
  var reynoldsNumber = function (consumption, diameter, viscosity) {
    return 0.0354 * consumption / (diameter * viscosity);
  };

  // Втрата тиску від тертя на ділянці якщо Re<=2000
  var pressureLossRe2000 = function (consumption, viscosity, density, diameter, estimatedLength) {
    return 1.132 * Math.pow(10, 6) * (consumption * viscosity * density * estimatedLength) / Math.pow(diameter, 4);
  };

  // Втрата тиску від тертя на ділянці якщо 2000<Re<4000
  var pressureLossRe3000 = function (consumption, density, estimatedLength, diameter, viscosity) {
    return 0.516 * (Math.pow(consumption, 2.333) * density * estimatedLength) / (Math.pow(diameter, 5.333) * Math.pow(viscosity, 0.333));
  };

  // Втрата тиску від тертя на ділянці якщо Re>=4000
  var pressureLossRe4000 = function (roughness, diameter, viscosity, consumption, density, estimatedLength) {
    return 69 * Math.pow((roughness / diameter + 1922 * (viscosity * diameter) / consumption), 0.25) * (Math.pow(consumption, 2) * density * estimatedLength) / Math.pow(diameter, 5);
  };

  // Зміна надлишковго тиску ділянок
  var pressureChange = function (length, density, moveFactor) {
    return 9.81 * length * (1.293 - density) * moveFactor;
  };

  // Загальна зміна тиску на ділянці
  var totalPressureChange = function (pressureLoss, pressureChange) {
    return pressureLoss + pressureChange;
  };

  // Зальний кінцевий тиск на ділянці
  var endingPressure = function (startingPressure, totalPressureChange) {
    return startingPressure - totalPressureChange;
  };

  // Виносимо формули в глобальну область видимості
  window.formulas = {
    estimatedLength: estimatedLength,
    inletPressure: inletPressure,
    averagePressure: averagePressure,
    averageHydraulicInc: averageHydraulicInc,
    innerDiameter: innerDiameter,
    estimatedHydraulicInc: estimatedHydraulicInc,
    reynoldsNumber: reynoldsNumber,
    pressureLossRe2000: pressureLossRe2000,
    pressureLossRe3000: pressureLossRe3000,
    pressureLossRe4000: pressureLossRe4000,
    pressureChange: pressureChange,
    totalPressureChange: totalPressureChange,
    endingPressure: endingPressure
  };
})();
