import IntroView from '../view/intro.js';
import IncomeView from '../view/income.js';
import SegmentsView from '../view/segments.js';
import ResultsView from '../view/results.js';
import {blockBodyScroll, unblockBodyScroll, isEscKey} from '../utils/common.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition, SECTION} from '../const.js';

export default class Page {
  constructor(container, incomeDataModel, resultsModel) {
    this._contentContainer = container;
    this._incomeDataModel = incomeDataModel;
    this._resultsModel = resultsModel;

    this._isMenuOpen = false;
    this._currentSection = SECTION.INTRO;

    this._introComponent = new IntroView();
    this._incomeComponent = new IncomeView();
    this._segmentsComponent = new SegmentsView(this._incomeDataModel);
    this._resultsComponent = new ResultsView(this._resultsModel);

    this._hamburgerNode = document.querySelector(`.hamburger`);
    this._menuNode = document.querySelector(`.site-header__links-list`);
    this._overlayNode = document.querySelector(`.menu-overlay`);

    this._navigationButtons = document.querySelectorAll(`.site-nav__button`);

    this._handleSiteMenuOpen = this._handleSiteMenuOpen.bind(this);
    this._handleSiteMenuClose = this._handleSiteMenuClose.bind(this);
    this._hamburgerKeyDownHandler = this._hamburgerKeyDownHandler.bind(this);
    this._hamburgerClickHandler = this._hamburgerClickHandler.bind(this);
    this._navButtonsClickHandler = this._navButtonsClickHandler.bind(this);
    this._handleBeginButtonClick = this._handleBeginButtonClick.bind(this);
    this._handleNextButtonClick = this._handleNextButtonClick.bind(this);
    this._handleCalcButtonClick = this._handleCalcButtonClick.bind(this);
  }

  init() {
    render(this._contentContainer, this._introComponent, RenderPosition.BEFOREEND);
    this._introComponent.setBeginButtonClickHandler(this._handleBeginButtonClick);
    this._setPageHandlers();
  }

  _pageSectionHandler(type) {
    this._currentSection = type;
    this._clearPage();
    this._handleNavButtonsActiveState(type);

    switch (type) {
      case SECTION.INTRO:
        render(this._contentContainer, this._introComponent, RenderPosition.BEFOREEND);
        this._introComponent.setBeginButtonClickHandler(this._handleBeginButtonClick);
        break;
      case SECTION.DATA:
        render(this._contentContainer, this._incomeComponent, RenderPosition.BEFOREEND);
        this._incomeComponent.setNextButtonClickHandler(this._handleNextButtonClick);
        break;
      case SECTION.SEGMENTS:
        render(this._contentContainer, this._segmentsComponent, RenderPosition.BEFOREEND);
        this._segmentsComponent.setCalcButtonClickHandler(this._handleCalcButtonClick);
        break;
      case SECTION.RESULTS:
        render(this._contentContainer, this._resultsComponent, RenderPosition.BEFOREEND);
        break;
    }
  }

  _clearPage() {
    remove(this._introComponent);
    remove(this._incomeComponent);
    remove(this._segmentsComponent);
    remove(this._resultsComponent);
  }

  _setPageHandlers() {
    this._hamburgerNode.addEventListener(`click`, this._hamburgerClickHandler);
    this._overlayNode.addEventListener(`click`, this._hamburgerClickHandler);
    this._navigationButtons.forEach((button) => button.addEventListener(`click`, this._navButtonsClickHandler));
  }

  _handleBeginButtonClick() {
    this._pageSectionHandler(SECTION.DATA);
  }

  _handleNextButtonClick() {
    this._pageSectionHandler(SECTION.SEGMENTS);
  }

  _handleCalcButtonClick() {
    this._pageSectionHandler(SECTION.RESULTS);
  }

  _navButtonsClickHandler(evt) {
    evt.preventDefault();
    const type = evt.target.dataset.section;

    if (this._currentSection === type) {
      return;
    }

    this._pageSectionHandler(type);
  }

  _handleNavButtonsActiveState(type) {
    this._navigationButtons.forEach((button) => button.classList.remove(`site-nav__button--current`));

    [...this._navigationButtons].find((button) => button.dataset.section === type).classList.add(`site-nav__button--current`);
  }

  _handleSiteMenuOpen() {
    blockBodyScroll();

    this._hamburgerNode.classList.add(`is-active`);
    this._menuNode.classList.add(`site-header__links-list--show`);
    this._overlayNode.classList.add(`menu-overlay--show`);

    document.addEventListener(`keydown`, this._hamburgerKeyDownHandler);
  }

  _handleSiteMenuClose() {
    unblockBodyScroll();

    this._hamburgerNode.classList.remove(`is-active`);
    this._menuNode.classList.remove(`site-header__links-list--show`);
    this._overlayNode.classList.remove(`menu-overlay--show`);

    document.removeEventListener(`keydown`, this._hamburgerKeyDownHandler);
  }

  _hamburgerKeyDownHandler(evt) {
    if (isEscKey(evt)) {
      this._isMenuOpen = false;
      this._handleSiteMenuClose();
    }
  }

  _hamburgerClickHandler(evt) {
    evt.preventDefault();

    if (this._isMenuOpen) {
      this._isMenuOpen = false;
      this._handleSiteMenuClose();
    } else {
      this._isMenuOpen = true;
      this._handleSiteMenuOpen();
    }
  }
}
