var pluralize = require('pluralize');
var _ = require('underscore');

function Transformer(options) {
  if (!options.resourceName) {
    throw new Error('A resourceName must be declared');
  }

  this.singularName = options.resourceName;
  this.map = options.map;
}

Transformer.prototype.getSingularResourceName = function() {
  return this.singularName;
};

Transformer.prototype.getPluralResourceName = function() {
  if (this.pluralName) {
    return this.pluralName;
  } else {
    return pluralize(this.singularName);
  }
};

Transformer.prototype.item = function(data) {
  var res = {};

  res[this.getSingularResourceName()] = this.map(data);

  return res;
};

Transformer.prototype.collection = function(data) {
  var res = {};
  var _this = this;

  res[this.getPluralResourceName()] = _.map(data, function(item) {
    return _this.map(item);
  });

  return res;
};

module.exports = Transformer;
