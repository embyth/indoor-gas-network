import AbstractView from './abstract.js';

const createSegmentsTemplate = () => {
  return (
    `<section id="income-segments">
      <div class="section__container">
        <h2 class="section-heading">Вихідні дані ділянок мережі</h2>

        <fieldset class="data__fieldset" disabled>
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
  getTemplate() {
    return createSegmentsTemplate();
  }
}
