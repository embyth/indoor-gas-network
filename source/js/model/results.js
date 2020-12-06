export default class ResultsData {
  constructor() {
    this._results = {};
  }

  setResults(results) {
    this._results = Object.assign({}, results);
  }

  getResults() {
    return this._results;
  }
}
