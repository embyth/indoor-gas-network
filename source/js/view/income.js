import AbstractView from './abstract.js';
import {highlightInput, resetHighlightInput} from '../utils/common.js';
import {ErrorMessage} from '../const.js';

const createIncomeDataTemplate = (data) => {
  const {allowablePressure, startingPressure, density, viscosity, segmentsAmount, overloadFactor, averageTemperature, calcAccurance, atmosphericPressure, maxVelosity, averageConsumption} = data;

  return (
    `<section id="income-data">
      <div class="section__container">
        <h2 class="section-heading">Вихідні дані для розрахунку</h2>

        <fieldset class="data__fieldset">
          <div class="data__fieldset-replacer">
            <div class="data__container data__container--left">

              <div class="data__item">
                <label for="allowable-pressure" class="data__label">Допустимий перепад тиску газу</label>
                <dfn class="data__input--definition">ΔР<sub>доп</sub></dfn>
                <input type="number" class="data__input data__input--allowable-pressure" id="allowable-pressure"
                  placeholder="300" min="0" max="3000" autocomplete="off" required value="${allowablePressure ? allowablePressure : ``}">
                <span class="data__input--dimension">Па</span>
              </div>

              <div class="data__item">
                <label for="starting-pressure" class="data__label">Початковий надлишковий тиск газу</label>
                <dfn class="data__input--definition">Р<sub>п</sub></dfn>
                <input type="number" class="data__input data__input--starting-pressure" id="starting-pressure"
                  placeholder="1600" min="0" max="5000" autocomplete="off" required value="${startingPressure ? startingPressure : ``}">
                <span class="data__input--dimension">Па</span>
              </div>

              <div class="data__item">
                <label for="gas-density" class="data__label">Густина газу за нормальних умов</label>
                <dfn class="data__input--definition">ρ<sub>н</sub></dfn>
                <input type="number" class="data__input data__input--gas-density" id="gas-density"
                  placeholder="0.8350" min="0.5" max="1" step="0.001" autocomplete="off" required value="${density ? density : ``}">
                <span class="data__input--dimension">кг/м<sup>3</sup></span>
              </div>

              <div class="data__item">
                <label for="gas-viscosity" class="data__label">Кінематична в'язкість газу за норм. умов</label>
                <dfn class="data__input--definition">υ×10<sup>-6</sup></dfn>
                <input type="number" class="data__input data__input--gas-viscosity" id="gas-viscosity"
                  placeholder="12.39" min="10" max="15" step="0.001" autocomplete="off" required value="${viscosity ? viscosity : ``}">
                <span class="data__input--dimension">м<sup>2</sup>/с</span>
              </div>

              <div class="data__item">
                <label for="segments-amount" class="data__label">Кількість ділянок руху газу</label>
                <dfn class="data__input--definition">n</dfn>
                <input type="number" class="data__input data__input--segments-amount" id="segments-amount"
                  placeholder="10" min="1" max="30" autocomplete="off" required value="${segmentsAmount ? segmentsAmount : ``}">
                <span class="data__input--dimension">шт</span>
              </div>

              <div class="data__item">
                <label for="overload-factor" class="data__label">Коефіцієнт перевантаження мережі</label>
                <dfn class="data__input--definition">k</dfn>
                <input type="number" class="data__input data__input--overload-factor" id="overload-factor"
                  placeholder="1" min="0.1" max="2" step="0.001" autocomplete="off" required value="${overloadFactor ? overloadFactor : ``}">
              </div>
            </div>

            <div class="data__container data__container--right">
              <div class="data__item">
                <label for="average-temperature" class="data__label">Середня температура газу в мережі</label>
                <dfn class="data__input--definition">Т<sub>ср</sub></dfn>
                <input type="number" class="data__input data__input--average-temperature" id="average-temperature"
                  placeholder="12" min="-10" max="50" autocomplete="off" required value="${averageTemperature ? averageTemperature : ``}">
                <span class="data__input--dimension"><sup>о</sup>С</span>
              </div>

              <div class="data__item">
                <label for="calc-accurance" class="data__label">Точність розрахунку</label>
                <dfn class="data__input--definition">ε</dfn>
                <input type="number" class="data__input data__input--calc-accurance" id="calc-accurance"
                  placeholder="1" min="0.1" max="100" step="0.001" autocomplete="off" required value="${calcAccurance ? calcAccurance : ``}">
                <span class="data__input--dimension">%</span>
              </div>

              <div class="data__item">
                <label for="atmospheric-pressure" class="data__label">Атмосферний тиск</label>
                <dfn class="data__input--definition">Р<sub>бар</sub></dfn>
                <input type="number" class="data__input data__input--atmospheric-pressure" id="atmospheric-pressure"
                  placeholder="101325" min="90000" max="110000" autocomplete="off" required value="${atmosphericPressure ? atmosphericPressure : ``}">
                <span class="data__input--dimension">Па</span>
              </div>

              <div class="data__item">
                <label for="gas-speed" class="data__label">Максимальна швидкість газу в мережі</label>
                <dfn class="data__input--definition">w<sub>max</sub></dfn>
                <input type="number" class="data__input data__input--gas-speed" id="gas-speed" placeholder="7"
                  min="0.1" max="9" step="0.001" autocomplete="off" required value="${maxVelosity ? maxVelosity : ``}">
                <span class="data__input--dimension">м/с</span>
              </div>

              <div class="data__item">
                <label for="gas-consumption" class="data__label">Значення усередненої витрати газу</label>
                <dfn class="data__input--definition">Q<sub>cp</sub></dfn>
                <input type="number" class="data__input data__input--gas-consumption" id="gas-consumption"
                  placeholder="11" min="0.1" max="50" step="0.001" autocomplete="off" required value="${averageConsumption ? averageConsumption : ``}">
                <span class="data__input--dimension">м<sup>3</sup>/год</span>
              </div>

              <div class="data__item">
                <button class="button data__button data__button--next" type="button">Далі</button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </section>`
  );
};

export default class Income extends AbstractView {
  constructor(incomeDataModel) {
    super();

    this._incomeDataModel = incomeDataModel;

    this._nextButtonClickHandler = this._nextButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createIncomeDataTemplate(this._getData());
  }

  setNextButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.data__button--next`).addEventListener(`click`, this._nextButtonClickHandler);
  }

  _getData() {
    return this._incomeDataModel.getData();
  }

  _nextButtonClickHandler(evt) {
    evt.preventDefault();

    if (!this._isUserDataValid()) {
      return;
    }

    this._incomeDataModel.setData(this._collectData());
    this._callback.click();
  }

  _checkInputValidity(input) {
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
      input.setCustomValidity(``);
      resetHighlightInput(input);
    }
  }

  _isUserDataValid() {
    const inputs = this.getElement().querySelectorAll(`input`);
    const notValidInputs = [];

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        highlightInput(input);
        notValidInputs.push(input);
        input.addEventListener(`input`, (evt) => {
          this._checkInputValidity(evt.target);
        });
      }
    });

    if (notValidInputs.length) {
      this._checkInputValidity(notValidInputs[0]);
    }

    return notValidInputs.length === 0;
  }

  _collectData() {
    return {
      allowablePressure: +this.getElement().querySelector(`#allowable-pressure`).value,
      startingPressure: +this.getElement().querySelector(`#starting-pressure`).value,
      density: +this.getElement().querySelector(`#gas-density`).value,
      viscosity: +this.getElement().querySelector(`#gas-viscosity`).value * Math.pow(10, -6),
      segmentsAmount: +this.getElement().querySelector(`#segments-amount`).value,
      overloadFactor: +this.getElement().querySelector(`#overload-factor`).value,
      averageTemperature: +this.getElement().querySelector(`#average-temperature`).value + 273.15,
      calcAccurance: +this.getElement().querySelector(`#calc-accurance`).value / 100,
      atmosphericPressure: +this.getElement().querySelector(`#atmospheric-pressure`).value,
      maxVelosity: +this.getElement().querySelector(`#gas-speed`).value,
      averageConsumption: +this.getElement().querySelector(`#gas-consumption`).value,
    };
  }
}
