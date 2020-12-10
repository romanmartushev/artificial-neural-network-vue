export default class InputNode {
  constructor() {
    this.input = 0.0;
  }

  setInput(value) {
    this.input = value;
  }

  getOutput() {
    return this.input;
  }
}
