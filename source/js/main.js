import IncomeDataModel from './model/income-data.js';
import ResultsModel from './model/results.js';
import PagePresenter from './presenter/page.js';

const contentContainer = document.querySelector(`#site-content`);

const incomeDataModel = new IncomeDataModel();
const resultsModel = new ResultsModel();

const pagePresenter = new PagePresenter(contentContainer, incomeDataModel, resultsModel);

pagePresenter.init();
