const newCalculatorUI = require("./calculatorUI");

describe("CalculatorUI", () => {
  let calculatorUI;

  beforeEach(() => {
    calculatorUI = newCalculatorUI();
  });

  describe("Interactions with calculator", () => {
    const mockCalculator = {
      add: jest.fn(),
      equal: jest.fn(),
      result: "MOCK_RESULT",
    };

    beforeEach(() => {
      jest.clearAllMocks();
      jest.mock("./calculator", () => () => mockCalculator);
      calculatorUI = newCalculatorUI();
    });

    afterEach(() => {
      jest.unmock("./calculator");
    });

    it("calls 'add' on calculator with number displayed when 'plus' clicked", () => {
      calculatorUI.digitClicked(1);
      calculatorUI.digitClicked(2);
      calculatorUI.digitClicked(3);

      calculatorUI.plusClicked();

      expect(mockCalculator.add).toHaveBeenCalledWith(123);
    });
  });

  it("should display 0 initially", () => {
    expect(calculatorUI.numberDisplayed).toBe(0);
  });

  it("should display clicked digit", () => {
    calculatorUI.digitClicked(8);
    expect(calculatorUI.numberDisplayed).toBe(8);
  });

  it("should concatenate multiple digits into number", () => {
    calculatorUI.digitClicked(1);
    calculatorUI.digitClicked(2);
    calculatorUI.digitClicked(3);
    expect(calculatorUI.numberDisplayed).toBe(123);
  });

  it("notifies when number-to-display changes", () => {
    const callback = jest.fn();

    calculatorUI.registerNumberDisplayedChangedListener(callback);

    expect(callback).not.toHaveBeenCalled();
    calculatorUI.numberDisplayed = 12345;
    expect(callback).toHaveBeenCalledWith(12345);
  });

  it("notifies when digit clicked", () => {
    const callback = jest.fn();

    calculatorUI.registerNumberDisplayedChangedListener(callback);

    expect(callback).not.toHaveBeenCalled();
    calculatorUI.digitClicked(5);
    expect(callback).toHaveBeenCalledWith(5);
  });

  describe("After entered first number and clicked '+'", () => {
    let firstNumberDigits = [1, 2, 3];
    let firstNumber = Number(firstNumberDigits.join(""));

    beforeEach(() => {
      for (digits of firstNumberDigits) {
        calculatorUI.digitClicked(digits);
      }
      calculatorUI.plusClicked();
    });

    it("still shows first number", () => {
      calculatorUI.numberDisplayed = firstNumber;
    });

    it("replaces number when entering more digits", () => {
      calculatorUI.digitClicked(4);
      calculatorUI.digitClicked(5);
      calculatorUI.digitClicked(6);

      expect(calculatorUI.numberDisplayed).toBe(456);
    });

    it("add second number to first", () => {
      calculatorUI.digitClicked(4);
      calculatorUI.digitClicked(5);
      calculatorUI.digitClicked(6);
      calculatorUI.equalClicked();

      expect(calculatorUI.numberDisplayed).toBe(firstNumber + 456);
    });
  });
});
