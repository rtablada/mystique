var pluralize = require('pluralize');
var _ = require('underscore');
var extend = require('./utils/extend');

function Transformer(data) {
  this.data = data;
}

Transformer.prototype.setData = function(data) {
  return this.data = data;
};

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

Transformer.prototype.rawItem = function(data) {
  data = data || this.data;

  return this.map(data);
};

Transformer.prototype.item = function(data) {
  var res = {};

  res[this.getSingularResourceName()] = this.rawItem.apply(this, arguments);

  return res;
};

Transformer.prototype.rawCollection = function(data) {
  data = data || this.data;

  return _.map(data, (item) => {
    return this.map(item);
  });
};

Transformer.prototype.collection = function(data) {
  var res = {};

  res[this.getPluralResourceName()] = this.rawCollection.apply(this, arguments);

  return res;
};

Transformer.extend = extend;

module.exports = Transformer;
