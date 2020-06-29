const doNothing = () => {};

const newCalculatorUI = () => {
  const newCalculator = require("./calculator");
  const calculator = newCalculator();

  return {
    _numberDisplayed: 0,
    listener: doNothing,

    digitClicked(digit) {
      this.numberDisplayed = this._numberDisplayed * 10 + digit;
    },

    plusClicked() {
      calculator.add(this._numberDisplayed);
      this._numberDisplayed = 0;
    },

    equalClicked() {
      calculator.equal(this._numberDisplayed);
      this.numberDisplayed = calculator.result;
    },

    registerNumberDisplayedChangedListener(callback) {
      this.listener = callback;
    },

    set numberDisplayed(n) {
      this._numberDisplayed = n;
      this.listener(this._numberDisplayed);
    },

    get numberDisplayed() {
      return this._numberDisplayed;
    },
  };
};

module.exports = newCalculatorUI;
