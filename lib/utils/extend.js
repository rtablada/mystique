var _ = require('underscore');

module.exports = function(protoProps, staticProps) {
  var _this = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the _this constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function() {
      return _this.apply(this, arguments);
    };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, _this, staticProps);

  // Set the prototype chain to inherit from `_this`, without calling
  // `_this`'s constructor function and add the prototype properties.
  child.prototype = _.create(_this.prototype, protoProps);
  child.prototype.constructor = child;

  // Set a convenience property in case the _this's prototype is needed
  // later.
  child.__super__ = _this.prototype;

  return child;
};
