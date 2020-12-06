import AbstractView from './abstract.js';

const createResultsTemplate = () => {
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

            </tbody>
          </table>
        </div>
      </div>
    </section>`
  );
};

export default class Results extends AbstractView {
  getTemplate() {
    return createResultsTemplate();
  }
}
