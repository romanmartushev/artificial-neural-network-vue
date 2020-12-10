import Vue from 'vue';
import BiasNode from './BiasNode';
import HiddenNode from './HiddenNode';
import InputNode from './InputNode';
import OutputNode from './OutputNode';

export default new Vue({
  el: '#app',
  data: {
    train: [[1,2],[2,4],[3,6]],
    epochs: 0,
    trainCounter: 0,
    alpha: 0.1,
    errors: [],
    inputNodes: [
      new InputNode(),
      new BiasNode()
    ],
    hiddenNodes: [
      new HiddenNode(),
      new HiddenNode(),
      new BiasNode(),
    ],
    outputNodes: [
      new OutputNode(),
    ],
    // Array for each hidden node with as many values input + bias nodes
    hiddenWeights: [
      [Math.random(), Math.random()],
      [Math.random(), Math.random()],
    ],
    // Array for each output node with as many values as hidden nodes + bias Nodes
    outputWeights: [
      [Math.random(), Math.random(), Math.random()],
    ],
  },
  mounted() {
    while(this.epochs !== 800) {
      ////////////////////////////////////////////////
      //                 Forward
      ////////////////////////////////////////////////

      // Set inputs for all non-bias nodes Input Layer
      for(let i = 0; i < this.inputNodes.length; i++) {
        if (!(this.inputNodes[i] instanceof BiasNode)) {
          this.inputNodes[i].setInput(this.train[this.trainCounter][0])
        }
      }

      // Set inputs for all non-bias nodes Hidden Layer
      for(let k = 0; k < this.hiddenNodes.length; k++) {
        let value = 0;
        if (!(this.hiddenNodes[k] instanceof BiasNode)) {
          for (let i = 0; i < this.inputNodes.length; i++) {
            value += this.inputNodes[i].getOutput() * this.hiddenWeights[k][i];
          }
          this.hiddenNodes[k].sigmoid(value);
        }
      }
      // Set inputs for Output Layer
      for(let k = 0; k < this.outputNodes.length; k++) {
        let value = 0;
          for (let i = 0; i < this.hiddenNodes.length; i++) {
            value += this.hiddenNodes[i].getOutput() * this.outputWeights[k][i];
          }
          this.outputNodes[k].sigmoid(value);
      }

      ////////////////////////////////////////////////
      //                 Check
      ////////////////////////////////////////////////
      for(let i = 0; i < this.outputNodes.length; i++) {
        this.errors.push(Math.pow(this.outputNodes[i].getOutput() - this.train[this.trainCounter][1],2));
        console.log(`Beginning: ${this.train[this.trainCounter][0]}`);
        console.log(`Current: ${this.outputNodes[i].getOutput()}`);
        console.log(`Actual: ${this.train[this.trainCounter][1]}`);
        console.log(`Epoch: ${this.epochs}`);
        console.log('////////////////////////////////////////////////////////////////////////////////////////////////');
      }

      ////////////////////////////////////////////////
      //                 Backward
      ////////////////////////////////////////////////

      // Calculate Delta for Output Layer
      for(let i = 0; i < this.outputNodes.length; i++) {
        this.outputNodes[i].setDelta(this.train[this.trainCounter][1]);
      }

      //Calculate Delta for all non-bias nodes Hidden Layer
      for(let k = 0; k < this.hiddenNodes.length; k++) {
        let value = 0;
        if (!(this.hiddenNodes[k] instanceof BiasNode)) {
          for (let i = 0; i < this.outputNodes.length; i++) {
            value += this.outputNodes[i].getDelta() * this.outputWeights[i][k];
          }
          this.hiddenNodes[k].setDelta(value);
        }
      }

      // Calculate New Weights for Hidden Layer
      for(let k = 0; k < this.outputNodes.length; k++) {
        for(let i = 0; i < this.hiddenNodes.length; i++) {
          this.outputWeights[k][i] = this.outputWeights[k][i] - (this.alpha) * this.outputNodes[k].getDelta() * this.hiddenNodes[i].getOutput();
        }
      }

      // Calculate New Weights for Input Layer
      for(let k = 0; k < this.hiddenNodes.length; k++) {
        if (!(this.hiddenNodes[k] instanceof BiasNode)) {
          for (let i = 0; i < this.inputNodes.length; i++) {
            this.hiddenWeights[k][i] = this.hiddenWeights[k][i] - 2*(this.alpha) * this.hiddenNodes[k].getDelta() * this.inputNodes[i].getOutput();
          }
        }
      }

      this.trainCounter++;
      if (this.trainCounter === this.train.length) {
        this.trainCounter = 0;
      }
      this.epochs++;
    }
  }
});
