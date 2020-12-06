export default class IncomeData {
  constructor() {
    this._incomeData = {};
  }

  setData(data) {
    this._incomeData = Object.assign({}, data);
  }

  addData(data) {
    this._incomeData = Object.assign(this._incomeData, data);
  }

  getData() {
    return this._incomeData;
  }
}
