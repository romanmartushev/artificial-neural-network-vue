var np = require('jsnumpy');

export default class OutputNode {
  constructor() {
    this.output = 0.0;
    this.input = 0.0;
    this.delta = 0.0
  }

  setInput(value) {
    this.input = value;
  }

  getInput() {
    return this.input;
  }

  getOutput() {
    return this.output;
  }

  setDelta(value) {
    let error = value - this.output
    this.delta = -error * this.derivative();
  }

  getDelta() {
    return this.delta;
  }

  sigmoid(value) {
    this.input = value;
    this.output = 1/(1 + np.exp(-value));
  }

  derivative() {
    return (1/(1 + np.exp(-this.output))) * (1-1/(1 + np.exp(-this.output)));
  }
}
