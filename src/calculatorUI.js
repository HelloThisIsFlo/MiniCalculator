const doNothing = () => {};

class CalculatorUI {
  constructor() {
    const newCalculator = require("./calculator");
    this._numberDisplayed = 0;
    this.listener = doNothing;
    this.calculator = newCalculator();
  }

  digitClicked(digit) {
    this.numberDisplayed = this._numberDisplayed * 10 + digit;
  }

  plusClicked() {
    this.calculator.add(this._numberDisplayed);
    this._numberDisplayed = 0;
  }

  equalClicked() {
    this.calculator.equal(this._numberDisplayed);
    this.numberDisplayed = this.calculator.result;
  }

  registerNumberDisplayedChangedListener(callback) {
    this.listener = callback;
  }

  set numberDisplayed(n) {
    this._numberDisplayed = n;
    this.listener(this._numberDisplayed);
  }

  get numberDisplayed() {
    return this._numberDisplayed;
  }
}

module.exports = CalculatorUI;

/*
const makeCalculatorUI = () => {
  const digitClicked = (digit) => {
    let num = calculatorUI.numberDisplayed;
    calculatorUI.numberDisplayed = num * 10 + digit;
  };

  const calculatorUI = {
    digitClicked,
    numberDisplayed: 0,
  };
  return calculatorUI;
};
*/
