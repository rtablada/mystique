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

Transformer.prototype.rawItem = function(data, cb) {
  data = data || this.data;
  cb = cb || this.mapOut || this.map;

  return cb.apply(this, [data]);
};

Transformer.prototype.item = function(data) {
  var res = {};

  res[this.getSingularResourceName()] = this.rawItem.apply(this, arguments);

  return res;
};

Transformer.prototype.rawCollection = function(data, cb) {
  data = data || this.data;
  cb = cb || this.mapOut || this.map;

  return _.map(data, (item) => {
    return cb.apply(this, [item]);
  });
};

Transformer.prototype.collection = function(data) {
  var res = {};

  res[this.getPluralResourceName()] = this.rawCollection.apply(this, arguments);

  return res;
};

Transformer.prototype.relatedItem = function(relation, data, relationName) {
  var transformer = new relation(data);

  return transformer.rawItem();
};

Transformer.prototype.renderInclude = function(includeName, data) {
  data = data || this.data;
  var relation = this.includes[includeName];

  if (Array.isArray(data)) {
    var results = data.map((item) => {
      return this.renderInclude(includeName, item);
    });

    return results.reduce((carry, item) => {
      var ids = _.pluck(carry, 'id');

      if (item.id === undefined || ids.indexOf(item.id) === -1) {
        carry.push(item);
      }

      return carry;
    }, []);
  }

  return relation.call(this, data);
};

Transformer.extend = extend;

module.exports = Transformer;
