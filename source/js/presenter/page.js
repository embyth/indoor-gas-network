import IntroView from '../view/intro.js';
import IncomeView from '../view/income.js';
import SegmentsView from '../view/segments.js';
import ResultsView from '../view/results.js';
import {blockBodyScroll, unblockBodyScroll, isEscKey} from '../utils/common.js';
import {render, remove} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class Page {
  constructor(container, incomeDataModel, resultsModel) {
    this._contentContainer = container;
    this._incomeDataModel = incomeDataModel;
    this._resultsModel = resultsModel;

    this._isMenuOpen = false;

    this._hamburgerNode = document.querySelector(`.hamburger`);
    this._menuNode = document.querySelector(`.site-header__links-list`);
    this._overlayNode = document.querySelector(`.menu-overlay`);

    this._handleSiteMenuOpen = this._handleSiteMenuOpen.bind(this);
    this._handleSiteMenuClose = this._handleSiteMenuClose.bind(this);
    this._hamburgerKeyDownHandler = this._hamburgerKeyDownHandler.bind(this);
    this._hamburgerClickHandler = this._hamburgerClickHandler.bind(this);
  }

  init() {
    this._hamburgerNode.addEventListener(`click`, this._hamburgerClickHandler);
    this._overlayNode.addEventListener(`click`, this._hamburgerClickHandler);
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
