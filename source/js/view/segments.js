import AbstractView from './abstract.js';
import {getRandomNumber, getRandomFloatNumber, getRandomValue, highlightInput, resetHighlightInput} from '../utils/common.js';
import {RESIST_COEFS, ErrorMessage} from '../const.js';

const getSegmentsRowsTemplate = (amount) => {
  if (!amount) {
    return ``;
  }

  let result = ``;

  for (let i = 1; i <= amount; i++) {
    result += (
      `<tr class="data__table-row">
        <td class="data__table-cell data__table-cell--number">Ділянка ${i}</td>
        <td class="data__table-cell data__table-cell--segment">
          <input type="text" class="data__table-input data__table-input--segment" placeholder="${getRandomNumber(1, 15)}-${getRandomNumber(1, 15)}" autocomplete="off" required>
        </td>
        <td class="data__table-cell data__table-cell--consumption">
          <dfn class="data__input--definition">Q<sub>${i}</sub></dfn>
          <input type="number" class="data__table-input data__table-input--consumption" placeholder="${getRandomFloatNumber(1, 15, 2)}" autocomplete="off" min="0" max="100" step="0.01" required>
          <span class="data__input--dimension">м<sup>3</sup>/год</span>
        </td>
        <td class="data__table-cell data__table-cell--length">
          <dfn class="data__input--definition">l<sub>${i}</sub></dfn>
          <input type="number" class="data__table-input data__table-input--length" placeholder="${getRandomFloatNumber(1, 12, 1)}" autocomplete="off"
            min="0.1" max="100" step="0.01" required>
          <span class="data__input--dimension">м</span>
        </td>
        <td class="data__table-cell data__table-cell--resist-coef">
          <dfn class="data__input--definition">a<sub>${i}</sub></dfn>
          <input type="number" class="data__table-input data__table-input--resist-coef" placeholder="${getRandomValue(RESIST_COEFS)}"
            autocomplete="off" min="20" max="450" step="5" required>
          <span class="data__input--dimension">%</span>
        </td>
        <td class="data__table-cell data__table-cell--movement-direction">
          <select class="data__table-input data__table-input--select data__table-input--movement-direction">
            <option value="0" selected>Горизонтальний</option>
            <option value="-1">Вгору</option>
            <option value="1">Вниз</option>
          </select>
        </td>
      </tr>`
    );
  }

  return result;
};

const createSegmentsTemplate = (segmentsAmount) => {
  const segmentsRowsTemplate = getSegmentsRowsTemplate(segmentsAmount);

  return (
    `<section id="income-segments">
      <div class="section__container">
        <h2 class="section-heading">Вихідні дані ділянок мережі</h2>

        <fieldset class="data__fieldset">
          <div class="data__fieldset-replacer">
            <div class="data__container data__container--segments">

              <table class="data__table data__table--segments">
                <thead class="data__table-head">
                  <tr>
                    <td class="data__table-cell data__table-cell--number">Номер</td>
                    <td class="data__table-cell data__table-cell--segment">Ділянка</td>
                    <td class="data__table-cell data__table-cell--consumption">Розрахункова витрата газу</td>
                    <td class="data__table-cell data__table-cell--length">Довжина</td>
                    <td class="data__table-cell data__table-cell--resist-coef">Коеф. місцевого опору</td>
                    <td class="data__table-cell data__table-cell--movement-direction">Напрям руху газу</td>
                  </tr>
                </thead>
                <tbody class="data__table-body">
                  ${segmentsRowsTemplate}
                </tbody>
              </table>

            </div>
            <div class="data__footer">
              <div class="data__footer-item">
                <span class="data__legend">Тип газопроводів:</span>
                <div class="data__radio-wrapper">
                  <input type="radio" class="data__input data__input--pipe-steel visually-hidden" id="pipe-steel"
                    value="steel" name="pipe-type" checked>
                  <label for="pipe-steel" class="data__label">Сталеві</label>
                </div>
                <div class="data__radio-wrapper">
                  <input type="radio" class="data__input data__input--pipe-poly visually-hidden" id="pipe-poly"
                    value="poly" name="pipe-type">
                  <label for="pipe-poly" class="data__label">Поліетиленові</label>
                </div>
              </div>
              <div class="data__footer-item">
                <button class="button data__button data__button--calc" type="button">Розрахувати</button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </section>`
  );
};

export default class Segments extends AbstractView {
  constructor(incomeDataModel) {
    super();

    this._incomeDataModel = incomeDataModel;

    this._calcButtonClickHandler = this._calcButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createSegmentsTemplate(this._getSegmentsQuantity());
  }

  setCalcButtonClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.data__button--calc`).addEventListener(`click`, this._calcButtonClickHandler);
  }

  _calcButtonClickHandler(evt) {
    evt.preventDefault();

    if (!this._isUserDataValid()) {
      return;
    }

    this._incomeDataModel.addData(this._collectData());
    this._callback.click();
  }

  _getSegmentsQuantity() {
    return this._incomeDataModel.getData().segmentsAmount;
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
    const segmentsCells = this.getElement().querySelectorAll(`.data__table-input--segment`);
    const consumptionCells = this.getElement().querySelectorAll(`.data__table-input--consumption`);
    const lengthCells = this.getElement().querySelectorAll(`.data__table-input--length`);
    const resistCoefCells = this.getElement().querySelectorAll(`.data__table-input--resist-coef`);
    const moveDirectionCells = this.getElement().querySelectorAll(`.data__table-input--movement-direction`);
    const pipeTypeRadios = this.getElement().querySelectorAll(`input[name="pipe-type"]`);

    const segmentsNames = [];
    const consumptions = [];
    const lengths = [];
    const resistCoefs = [];
    const moveDirections = [];
    const pipeType = [...pipeTypeRadios].find((radio) => radio.checked).value;

    for (let i = 0; i < this._getSegmentsQuantity(); i++) {
      segmentsNames.push(segmentsCells[i].value);
      consumptions.push(parseFloat(consumptionCells[i].value));
      lengths.push(parseFloat(lengthCells[i].value));
      resistCoefs.push(parseFloat(resistCoefCells[i].value));
      moveDirections.push(parseFloat(moveDirectionCells[i].value));
    }

    return {
      segmentsNames,
      consumptions,
      lengths,
      resistCoefs,
      moveDirections,
      pipeType,
    };
  }
}
