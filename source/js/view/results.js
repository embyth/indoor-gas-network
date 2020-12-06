import AbstractView from './abstract.js';

const getResultsBySegmentsTemplate = (results) => {
  const {segmentsAmount, segmentsNames, lengths, consumptions, estimatedDiameters, pressureLosses, pressureChanges, sumPressureChanges, endingPressures} = results;

  let template = ``;

  for (let i = 0; i < segmentsAmount; i++) {
    template += (
      `<tr class="data__table-row">
        <td class="data__table-cell data__table-cell--segment">${segmentsNames[i]}</td>
        <td class="data__table-cell data__table-cell--length">
          <dfn class="data__input--definition">l<sub>${segmentsNames[i]}</sub></dfn>
          <span class="data__value">${lengths[i]}</span>
          <span class="data__input--dimension">м</span>
        </td>
        <td class="data__table-cell data__table-cell--consumption">
          <dfn class="data__input--definition">Q<sub>${segmentsNames[i]}</sub></dfn>
          <span class="data__value">${consumptions[i]}</span>
          <span class="data__input--dimension">м<sup>3</sup>/год</span>
        </td>
        <td class="data__table-cell data__table-cell--diameter">${estimatedDiameters[i]}</td>
        <td class="data__table-cell data__table-cell--pressure-loss">
          <dfn class="data__input--definition">ΔP<sub>${segmentsNames[i]}</sub></dfn>
          <span class="data__value">${pressureLosses[i]}</span>
          <span class="data__input--dimension">Па</span>
        </td>
        <td class="data__table-cell data__table-cell--pressure-drop">
          <dfn class="data__input--definition">ΔP<sub>гс<sub class="data__sub">${segmentsNames[i]}</sub></sub></dfn>
          <span class="data__value">${pressureChanges[i]}</span>
          <span class="data__input--dimension">Па</span>
        </td>
        <td class="data__table-cell data__table-cell--total-pressure-drop">
          <dfn class="data__input--definition">ΔP<sub>заг<sub class="data__sub">${segmentsNames[i]}</sub></sub></dfn>
          <span class="data__value">${sumPressureChanges[i]}</span>
          <span class="data__input--dimension">Па</span>
        </td>
        <td class="data__table-cell data__table-cell--ending-pressure">
          <dfn class="data__input--definition">P<sub>к<sub class="data__sub">${segmentsNames[i]}</sub></sub></dfn>
          <span class="data__value">${endingPressures[i]}</span>
          <span class="data__input--dimension">Па</span>
        </td>
      </tr>`
    );
  }

  return template;
};

const createResultsTemplate = (results) => {
  const resultsBySegmentsTemplate = getResultsBySegmentsTemplate(results);

  return (
    `<section id="results">
      <div class="section__container">
        <h2 class="section-heading">Результати гідравлічного розрахунку будинкової мережі</h2>

        <div class="data__container data__container--results">

          <table class="data__table data__table--results">
            <thead class="data__table-head">
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--segment">Ділянка</td>
                <td class="data__table-cell data__table-cell--length">Довжина</td>
                <td class="data__table-cell data__table-cell--consumption">Розрахункова витрата газу</td>
                <td class="data__table-cell data__table-cell--diameter">Діаметр&nbsp;<dfn>D<sub>з</sub>×δ</dfn>,&nbsp;
                  <span>мм</span></td>
                <td class="data__table-cell data__table-cell--pressure-loss">Втрати тиску від тертя у місцевих опорах
                </td>
                <td class="data__table-cell data__table-cell--pressure-drop">Гідростатичний перепад тиску</td>
                <td class="data__table-cell data__table-cell--total-pressure-drop">Загальний перепад тиску</td>
                <td class="data__table-cell data__table-cell--ending-pressure">Кінцевий надлишковий тиск на ділянці
                </td>
              </tr>
            </thead>
            <tbody class="data__table-body">
              ${resultsBySegmentsTemplate}
            </tbody>
          </table>

        </div>

      </div>
    </section>`
  );
};

export default class Results extends AbstractView {
  constructor(resultsModel) {
    super();

    this._resultsModel = resultsModel;
  }

  getTemplate() {
    return createResultsTemplate(this._resultsModel.getResults());
  }
}
