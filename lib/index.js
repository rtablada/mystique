var Transformer = require('./transformer');

function Mystique() {
  var transformers = {};

  this.registerTransformer = (name, transformer) => {
    transformers[name] = transformer;
  };

  this.getTransformer = (name) => {
    if (transformers[name]) {
      return new transformers[name]();
    } else {
      throw new Error(`A ${name} transformer has not been registered with Mystique`);
    }
  };
}

Mystique.prototype.Transformer = Transformer;

module.exports = new Mystique();
