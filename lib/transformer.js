var pluralize = require('pluralize');
var _ = require('underscore');
var extend = require('./utils/extend');

function Transformer(data) {
  this.data = data;
}

Transformer.prototype.getSingularResourceName = function() {
  return this.singularName || this.resourceName;
};

Transformer.prototype.getPluralResourceName = function() {
  if (this.pluralName) {
    return this.pluralName;
  } else {
    return pluralize(this.getSingularResourceName());
  }
};

Transformer.prototype.item = function(data) {
  var res = {};
  data = data || this.data;

  res[this.getSingularResourceName()] = this.map(data);

  return res;
};

Transformer.prototype.collection = function(data) {
  var res = {};
  data = data || this.data;

  res[this.getPluralResourceName()] = _.map(data, (item) => {
    return this.map(item);
  });

  return res;
};

Transformer.extend = extend;

module.exports = Transformer;
