import AbstractView from './abstract.js';

const createIntroTemplate = () => {
  return (
    `<section id="intro">
      <div class="section__container">
        <h1 class="site-heading">Розрахунок внутрішньо-будинкової газової мережі</h1>

        <p class="intro__text">
          Розрахунок проводиться аналітичним методом рівномірного розподілу гідравлічного нахилу шляхом підбору
          ділянок мережі з метою уточнити втрати тиску газу на кожній ділянці і загалом у
          газовій мережі житлового будинку
        </p>

        <a class="button intro__button intro__button--info"
          href="https://github.com/embyth/indoor-gas-network#fire-%D1%80%D0%BE%D0%B7%D1%80%D0%B0%D1%85%D1%83%D0%BD%D0%BE%D0%BA-%D0%B2%D0%BD%D1%83%D1%82%D1%80%D1%96%D1%88%D0%BD%D1%8C%D0%BE-%D0%B1%D1%83%D0%B4%D0%B8%D0%BD%D0%BA%D0%BE%D0%B2%D0%BE%D1%97-%D0%B3%D0%B0%D0%B7%D0%BE%D0%B2%D0%BE%D1%97-%D0%BC%D0%B5%D1%80%D0%B5%D0%B6%D1%96"
          target="_blank">Інформація</a>
        <button class="button intro__button intro__button--begin" type="button">Почати</button>
      </div>
    </section>`
  );
};

export default class Intro extends AbstractView {
  constructor() {
    super();

    this._beginButtonClickHandler = this._beginButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createIntroTemplate();
  }

  setBeginButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.intro__button--begin`).addEventListener(`click`, this._beginButtonClickHandler);
  }

  _beginButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }
}
