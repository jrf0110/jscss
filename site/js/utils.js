define(function(require){
  var utils = {};

  // Extend objects.. duh
  utils.extend = function(obj) {
    Array.prototype.forEach.call(Array.prototype.slice.call(arguments, 1), function(source){
      for (var prop in source){
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Extendable Classes
  utils.class = function(d){
    d.constructor.extend = function(def){
      for (var k in d) if (!def.hasOwnProperty(k)) def[k] = d[k];
      return utils.class(def);
    };
    return (d.constructor.prototype = d).constructor;
  };

  // Backbone events
  utils.Events = {
    on: function(events, callback, context) {
      var ev;
      events = events.split(/\s+/);
      var calls = this._callbacks || (this._callbacks = {});
      while (ev = events.shift()) {
        var list  = calls[ev] || (calls[ev] = {});
        var tail = list.tail || (list.tail = list.next = {});
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    },
    off: function(events, callback, context) {
      var ev, calls, node;
      if (!events) {
        delete this._callbacks;
      } else if (calls = this._callbacks) {
        events = events.split(/\s+/);
        while (ev = events.shift()) {
          node = calls[ev];
          delete calls[ev];
          if (!callback || !node) continue;
          // Create a new list, omitting the indicated event/context pairs.
          while ((node = node.next) && node.next) {
            if (node.callback === callback &&
              (!context || node.context === context)) continue;
            this.on(ev, node.callback, node.context);
          }
        }
      }
      return this;
    },
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls['all'];
      (events = events.split(/\s+/)).push(null);
      // Save references to the current heads & tails.
      while (event = events.shift()) {
        if (all) events.push({next: all.next, tail: all.tail, event: event});
        if (!(node = calls[event])) continue;
        events.push({next: node.next, tail: node.tail});
      }
      // Traverse each list, stopping when the saved tail is reached.
      rest = Array.prototype.slice.call(arguments, 1);
      while (node = events.pop()) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    }
  };

  var classMatch = "(?:^|\\s){class}(?!\\S)";
  utils.addClass = function(el, className){
    var r = new RegExp(classMatch.replace('{class}', className));
    if (!!el.className.match(r)) return; // Already in className
    el.className += " " + className;
  };
  utils.removeClass = function(el, className){
    var r = new RegExp(classMatch.replace('{class}', className));
    el.className = el.className.replace(r, '');
  };
  utils.hasClass = function(el, className){
    var r = new RegExp(classMatch.replace('{class}', className));
    return !!el.className.match(r);
  };

  // Simple Collections
  utils.Collection = utils.class(utils.extend({
    constructor: function(options){
      this.options = options || {};
      this.items = [];
      this.initialize.apply(this, arguments);
    }
  , initialize: function(){}
  }, utils.Events));

  utils.clone = function(obj) {
    if (!utils.isObject(obj)) return obj;
    return utils.isArray(obj) ? obj.slice() : utils.extend({}, obj);
  };

  // Simple model class a lot like backbone's
  utils.Model = utils.class(utils.extend({
    constructor: function(attr){
      this.attributes = utils.extend({}, utils.clone(this.defaults), attr);
      this.initialize.apply(this, arguments);
    }
  , defaults: {}
  , initialize: function(){}
  , set: function(key, value){
      if (typeof key == "object"){
        this.setHash(key);
      }else{
        var old = this.attributes[key];
        this.attributes[key] = value;
        this.trigger('change:' + key, old, this);
      }
    }
  , get: function(key, value){
      return this.attributes[key];
    }
  , setHash: function(obj){
      for (var key in obj) this.set(key, obj[key]);
    }
  , toJSON: function(){
      return utils.clone(this.attributes);
    }
  , reset: function(){
      var old = this.attributes;
      console.log("[model] - reset");
      console.log(this.defaults);
      this.attributes = utils.clone(this.defaults);
      this.trigger('change', old, this);
      this.trigger('reset', old, this);
    }
  }, utils.Events));

  utils.isFunction = function(obj) {
    return Object.prototype.toString.call(obj) == '[object Function]';
  };
  utils.isObject = function(obj) {
    return Object.prototype.toString.call(obj) == '[object Object]';
  };
  utils.isArray = function(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  };
  utils.isString = function(obj) {
    return Object.prototype.toString.call(obj) == '[object String]';
  };
  utils.isNumber = function(obj) {
    return Object.prototype.toString.call(obj) == '[object Number]';
  };
  utils.isFinite = function(obj) {
    return utils.isNumber(obj) && isFinite(obj);
  };

  utils.isNaN = function(obj) {
    return obj !== obj;
  };
  utils.isBoolean = function(obj) {
    return obj === true || obj === false || Object.prototype.toString.call(obj) == '[object Boolean]';
  };

  utils.isDate = function(obj) {
    return Object.prototype.toString.call(obj) == '[object Date]';
  };

  utils.isRegExp = function(obj) {
    return Object.prototype.toString.call(obj) == '[object RegExp]';
  };

  utils.isNull = function(obj) {
    return obj === null;
  };

  utils.isUndefined = function(obj) {
    return obj === void 0;
  };

  var idCounter = 0;
  utils.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  utils.exists = function(x) {
    if (typeof x !== "undefined" && x !== null)
    return true;
    return false;
  };


  // Backbone view without jquery dependency for modern browsers
  utils.View = (function (){
    var constructor = function(options) {
      this.cid = utils.uniqueId('view');
      this._configure(options || {});
      this._ensureElement();
      this.initialize.apply(this, arguments);
      this.delegatedEvents = [];
      this.delegateEvents();
    };

    // Cached regex to split keys for `delegate`.
    var eventSplitter = /^(\S+)\s*(.*)$/;

    // List of view options to be merged as properties.
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

    // Set up all inheritable **Backbone.View** properties and methods.
    utils.extend(constructor.prototype, {
      // The default `tagName` of a View's element is `"div"`.
      tagName: 'div',
      $: function(selector) {
        return this.el.querySelectorAll(selector);
      },
      initialize: function(){},
      render: function() {
        return this;
      },
      remove: function() {
        this.el.parentElement.removeChild(this.el);
        return this;
      },
      make: function(tagName, attributes, content) {
        var el = document.createElement(tagName);
        if (attributes) for (var k in attributes) el.setAttribute(k, attributes[k]);
        if (content){
          if (typeof content == "object") content.appendChild(content);
          else content.innerHTML = content;
        }
        return el;
      },
      setElement: function(element, delegate) {
        this.el = element;
        if (delegate !== false) this.delegateEvents();
        return this;
      },
      delegateEvents: function(events) {
        if (!(events || (events = getValue(this, 'events')))) return;
        this.undelegateEvents();
        for (var key in events) {
          var method = events[key];
          if (typeof method != "function") method = this[events[key]];
          if (!method) throw new Error('Event "' + events[key] + '" does not exist');
          var match = key.match(eventSplitter);
          var eventName = match[1], selector = match[2];
          method = method.bind(this);
          if (selector === '') {
            this.el.addEventListener(eventName, method);
            this.delegatedEvents.push({
              el: this.el
            , event: eventName
            , method: method
            });
          } else {
            var els = this.el.querySelectorAll(selector);
            for (var i = 0; i < els.length; i++){
              els[i].addEventListener(eventName, method);
              this.delegatedEvents.push({
                el: els[i]
              , event: eventName
              , method: method
              });
            }
          }
        }
      },
      undelegateEvents: function() {
        if (this.delegatedEvents.length == 0) return;
        for (var i = 0, d; i < this.delegatedEvents.length; i++){
          d = this.delegatedEvents[i];
          d.el.removeEventListener(d.event, d.method);
        }
        this.delegatedEvents = [];
      },
      _configure: function(options) {
        if (this.options) options = utils.extend({}, this.options, options);
        for (var i = 0, l = viewOptions.length; i < l; i++) {
          var attr = viewOptions[i];
          if (options[attr]) this[attr] = options[attr];
        }
        this.options = options;
      },
      _ensureElement: function() {
        if (!this.el) {
          var attrs = utils.extend({}, getValue(this, 'attributes'));
          if (this.id) attrs.id = this.id;
          if (this.className) attrs['class'] = this.className;
          this.setElement(this.make(getValue(this, 'tagName'), attrs), false);
        } else {
          this.setElement(this.el, false);
        }
      }
    }, utils.Events);

    return constructor;
  })();

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    utils.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) utils.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) utils.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a value from a Backbone object as a property
  // or as a function.
  var getValue = function(object, prop) {
    if (!(object && object[prop])) return null;
    return utils.isFunction(object[prop]) ? object[prop]() : object[prop];
  };

  utils.View.extend = function(protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  return utils;
});