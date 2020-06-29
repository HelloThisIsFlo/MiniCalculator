const newCalculator = () => {
  let currentOp;
  let result = 0;

  function add(number) {
    this.result += number;
    currentOp = "add";
  }
  function equal(number) {
    if (currentOp === "add") {
      this.result += number;
    } else {
      this.result = number;
    }
  }

  return {
    add,
    equal,
    result,
  };
};

module.exports = newCalculator;
