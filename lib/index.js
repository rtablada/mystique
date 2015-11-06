var Transformer = require('./transformer');

function Mystique() {
  var transformers = {};

  this.registerTransformer = function(name, transformer) {
    transformers[name] = transformer;
  };

  this.getTransformer = function(name) {
    if (transformers[name]) {
      return transformers[name];
    } else {
      throw new Error(`A ${name} transformer has not been registered with Mystique`);
    }
  };
}

Mystique.prototype.Transformer = Transformer;

module.exports = new Mystique();
