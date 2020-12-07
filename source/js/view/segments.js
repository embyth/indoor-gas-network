import AbstractView from './abstract.js';
import {getRandomNumber, getRandomFloatNumber, getRandomValue} from '../utils/common.js';
import {RESIST_COEFS, PipeType} from '../const.js';

const getSegmentsRowsTemplate = (data) => {
  const {segmentsAmount, segmentsNames, consumptions, lengths, resistCoefs, moveDirections} = data;

  let template = ``;

  for (let i = 0; i < segmentsAmount; i++) {
    const segmentNumber = i + 1;
    template += (
      `<tr class="data__table-row">
        <td class="data__table-cell data__table-cell--number">Ділянка ${segmentNumber}</td>
        <td class="data__table-cell data__table-cell--segment">
          <input type="text" class="data__table-input data__table-input--segment" placeholder="${getRandomNumber(1, 15)}-${getRandomNumber(1, 15)}" autocomplete="off" required value="${segmentsNames ? segmentsNames[i] : ``}">
        </td>
        <td class="data__table-cell data__table-cell--consumption">
          <dfn class="data__input--definition">Q<sub>${segmentNumber}</sub></dfn>
          <input type="number" class="data__table-input data__table-input--consumption" placeholder="${getRandomFloatNumber(1, 15, 2)}" autocomplete="off" min="0" max="100" step="0.01" required value="${consumptions ? consumptions[i] : ``}">
          <span class="data__input--dimension">м<sup>3</sup>/год</span>
        </td>
        <td class="data__table-cell data__table-cell--length">
          <dfn class="data__input--definition">l<sub>${segmentNumber}</sub></dfn>
          <input type="number" class="data__table-input data__table-input--length" placeholder="${getRandomFloatNumber(1, 12, 1)}" autocomplete="off"
            min="0.1" max="100" step="0.01" required value="${lengths ? lengths[i] : ``}">
          <span class="data__input--dimension">м</span>
        </td>
        <td class="data__table-cell data__table-cell--resist-coef">
          <dfn class="data__input--definition">a<sub>${segmentNumber}</sub></dfn>
          <input type="number" class="data__table-input data__table-input--resist-coef" placeholder="${getRandomValue(RESIST_COEFS)}"
            autocomplete="off" min="20" max="450" step="5" required value="${resistCoefs ? resistCoefs[i] : ``}">
          <span class="data__input--dimension">%</span>
        </td>
        <td class="data__table-cell data__table-cell--movement-direction">
          <select class="data__table-input data__table-input--select data__table-input--movement-direction">
          ${moveDirections
        ? `<option value="0" ${moveDirections[i] === 0 ? `selected` : ``}>Горизонтальний</option>
            <option value="-1" ${moveDirections[i] === -1 ? `selected` : ``}>Вгору</option>
            <option value="1" ${moveDirections[i] === 1 ? `selected` : ``}>Вниз</option>`
        : `<option value="0" selected>Горизонтальний</option>
            <option value="-1">Вгору</option>
            <option value="1">Вниз</option>`}
          </select>
        </td>
      </tr>`
    );
  }

  return template;
};

const createSegmentsTemplate = (data) => {
  const pipeType = data.pipeType ? data.pipeType : PipeType.STEEL;
  const segmentsRowsTemplate = getSegmentsRowsTemplate(data);

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
                    value="steel" name="pipe-type" ${pipeType === PipeType.STEEL ? `checked` : ``}>
                  <label for="pipe-steel" class="data__label">Сталеві</label>
                </div>
                <div class="data__radio-wrapper">
                  <input type="radio" class="data__input data__input--pipe-poly visually-hidden" id="pipe-poly"
                    value="poly" name="pipe-type" ${pipeType === PipeType.POLY ? `checked` : ``}>
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
    return createSegmentsTemplate(this._getData());
  }

  setCalcButtonClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.data__button--calc`).addEventListener(`click`, this._calcButtonClickHandler);
  }

  _calcButtonClickHandler(evt) {
    evt.preventDefault();

    if (!this.isUserDataValid()) {
      this.shake();
      return;
    }

    this._incomeDataModel.addData(this._collectData());
    this._callback.click();
  }

  _getData() {
    return this._incomeDataModel.getData();
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

    for (let i = 0; i < this._getData().segmentsAmount; i++) {
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
