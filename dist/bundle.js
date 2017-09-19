(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["IRISWorm"] = factory();
	else
		root["IRISWorm"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(2);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Worm = function () {
  _createClass(Worm, [{
    key: 'NAME',
    get: function get() {
      'IRIS Worm';
    }
  }, {
    key: 'VERSION',
    get: function get() {
      return null;
    } // TODO

  }, {
    key: 'CSS_CONTAINER',
    get: function get() {
      return 'irisWorm';
    }
  }, {
    key: 'MAX_MOMENTUM',
    get: function get() {
      return 5;
    }
  }], [{
    key: 'DEFAULT_OPTIONS',
    get: function get() {
      return {
        // The width of the component
        width: 600,

        // The height of the component
        height: 400,

        // The maximum value that can be set in the component (used for scaling) -
        // defaults to 100, meaning that "100" is the "Top of the worm".
        maxValue: 100,

        // When a value changes, the worm will accelerate towards that value smoothly
        // if smoothMode is set to true, otherwise it will jump straight to it.
        smoothMode: true,

        // Color mode: options are: 'greenIsGood', 'greenIsBad', 'monochrome'
        colorMode: 'greenIsGood',

        // How quickly the worm accelerates towards its target (NOTE: this value really is only useful if you keep it
        // below 1, otherwise you might as well just use smoothMode: false and have it instantly jumping)
        acceleration: 0.1,

        // How thick the line is
        lineWidth: 5,

        //how insistant the aria-live tag is. Default is polite;
        //options are: off, polite, assertive
        accessibilityBroadcast: 'polite'
      };
    }
  }]);

  /**
   * Constructs a new IRIS Worm instance.
   * @class IRIS.Worm
   * @constructor Worm
   * @example
   *      new IRIS.Worm(div, options);
   * @param {HTMLDivElement} div the div in which the visualisation will be rendered, e.g. '#map'
   * @param options visualisation options (see 'options' property)
   */
  function Worm(div) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Worm);

    this._rootDiv = div;
    this._options = _extends({}, Worm.DEFAULT_OPTIONS);

    // create canvas and context
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._options.width;
    this._canvas.height = this._options.height;
    this._canvas.className = this.CSS_CONTAINER;
    this._ctx = this._canvas.getContext('2d');
    this._rootDiv.appendChild(this._canvas);

    this._value = 50;
    this._metaValue = 50;
    this._oldMetaValue = 50;
    this._momentum = 0.0;
    this._active = false;

    //create fallback DOM and add aria roles if the accessibilityBroadcast option isn't disabled
    if (this._options.accessibilityBroadcast !== 'off') {
      this._fallbackDom = document.createElement('span');
      this._fallbackDom.setAttribute('role', 'alert');
      this._fallbackDom.setAttribute('aria-live', this._options.accessibilityBroadcast);
      this._fallbackDom.setAttribute('style', 'position:absolute;width:1px;' + '' + 'height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);');
      this._rootDiv.appendChild(this._fallbackDom);
    }

    // Events
    this._eventEmitter = new _eventEmitter2.default();
  }

  _createClass(Worm, [{
    key: 'start',
    value: function start() {
      this._ctx.lineWidth = this._options.lineWidth;
      this._active = true;
      this._draw();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._active = false;
    }
  }, {
    key: '_draw',
    value: function _draw() {
      if (this._active) {
        requestAnimationFrame(this._draw.bind(this));
        this._moveViewport();
        this._drawPoint();
        this._resolveValues();
      }
    }
  }, {
    key: '_resolveValues',
    value: function _resolveValues() {

      if (this._options.smoothMode) {
        var distanceToValue = Math.abs(this._value - this._metaValue);

        if (distanceToValue < 0.1) {
          this._metaValue = this._value;
          this._momentum = 0;
          return;
        } else {
          if (this._value < this._metaValue) {
            if (this._momentum >= -this.MAX_MOMENTUM) {
              this._momentum -= this._options.acceleration;
            }
          }
          if (this._value > this._metaValue) {
            if (this._momentum <= this.MAX_MOMENTUM) {
              this._momentum += this._options.acceleration;
            }
          }

          this._metaValue += this._momentum * distanceToValue / 100;
        }
        this._oldMetaValue = this._metaValue;
      } else {
        this._oldMetaValue = this._metaValue;
        this._metaValue = this._value;
      }
    }
  }, {
    key: '_moveViewport',
    value: function _moveViewport() {
      var imageData = this._ctx.getImageData(1, 0, this._options.width - 1, this._options.height);
      this._ctx.putImageData(imageData, 0, 0);
      this._ctx.clearRect(this._options.width - 1, 0, 1, this._options.height);

      // this thing is known to be leaky so let's force explicit garbage collecion.
      imageData = null;
    }
  }, {
    key: '_drawPoint',
    value: function _drawPoint() {

      var colorUnit = 255 / this._options.height;
      var bad = Math.floor(colorUnit * this._scaleValue(this._metaValue));
      var good = 255 - Math.floor(colorUnit * this._scaleValue(this._metaValue));
      var color;

      switch (this._options.colorMode) {
        case 'monochrome':
          color = 'rgb(0,0,0)';
          break;
        case 'greenIsBad':
          color = 'rgb(' + good + ',' + bad + ',0)';
          break;
        case 'greenIsGood':
        default:
          color = 'rgb(' + bad + ',' + good + ',0)';
      }

      this._ctx.strokeStyle = color;

      this._ctx.beginPath();
      this._ctx.moveTo(this._options.width, this._scaleValue(this._metaValue));
      this._ctx.lineTo(this._options.width - 1, this._scaleValue(this._oldMetaValue));
      this._ctx.stroke();
    }
  }, {
    key: '_scaleValue',
    value: function _scaleValue(value) {
      var scale = this._options.height / this._options.maxValue;

      return this._options.height - value * scale;
    }

    /**
     * Returns the name (and version, if available) of this widget.
     *
     * @private
     * @method _getName
     * @returns {string} name (and version, if available) of this widget
     */

  }, {
    key: '_getName',
    value: function _getName() {
      var name = this.NAME;
      // if we appear to have a version
      if (this.VERSION.indexOf('<%=') !== 0) {
        name = this.NAME + ' ' + this.VERSION;
      }
      return name;
    }

    /**
     * Deconstructor
     *
     * @public
     * @method destroy
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      if (typeof this._canvas !== 'undefined' && this._canvas != null) {
        this._canvas.remove();
        delete this._canvas;
      }
    }

    /**
     * Hook into a worm event.
     *
     * @public
     * @method on
     * @param {string} eventName the event to hook into
     * @param {function} callback the callback to run
     * @returns {null}
     */

  }, {
    key: 'on',
    value: function on(eventName, callback) {
      var self = this;
      this._eventEmitter.on(eventName, function (a, b, c) {
        return callback.call(self, a, b, c);
      });
    }

    /**
     * Sets the value
     *
     * @public
     * @method setValue
     * @param {number} optionValue value to set the option to
     * @returns {null}
     */

  }, {
    key: 'setValue',
    value: function setValue(newValue) {

      if (newValue > this._options.maxValue) {
        newValue = this._options.maxValue;
      }
      if (this._options.accessibilityBroadcast !== 'off') {
        if (this._fallbackDom && this._fallbackDom.remove) {
          this._fallbackDom.remove();
          this._fallbackDom.innerText = 'worm value is ' + newValue;
          this._rootDiv.appendChild(this._fallbackDom);
        }
      }

      if (newValue > this._value) {
        this._eventEmitter.emit('valueIncreased', this._value, newValue);
      }
      if (newValue < this._value) {
        this._eventEmitter.emit('valueDecreased', this._value, newValue);
      }
      if (newValue <= 0) {
        this._eventEmitter.emit('valueBecameMinimum', this._value);
      }
      if (newValue >= this._options.maxValue) {
        this._eventEmitter.emit('valueBecameMaximum', this._value);
      }

      if (newValue <= 0) {
        this._eventEmitter.emit('valueBecameMinimum', this._value);
      }

      this._value = newValue;
      this._momentum = 0;
      this._eventEmitter.emit('valueChanged', this._value);
    }

    /**
     * Gets the value
     *
     * @public
     * @method getValue
     * @returns {number} the current value
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this._value;
    }

    /**
     * Sets the value for the specified option.
     *
     * @public
     * @method setOption
     * @param {string} optionName name of the option to set a value for
     * @param {object} optionValue value to set the option to
     * @returns {null}
     */

  }, {
    key: 'setOption',
    value: function setOption(optionName, optionValue) {
      this._options[optionName] = optionValue;
    }

    /**
     * Returns the value for the specified option.
     *
     * @public
     * @method getOption
     * @param {string} optionName name of the option to retrieve a value for
     * @returns {object} the value of the specified option
     */

  }, {
    key: 'getOption',
    value: function getOption(optionName) {
      return this._options[optionName];
    }
  }]);

  return Worm;
}();

exports.default = Worm;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Worm = undefined;

var _iris = __webpack_require__(0);

var _iris2 = _interopRequireDefault(_iris);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Worm = exports.Worm = _iris2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter(logger) {
    _classCallCheck(this, EventEmitter);

    this._events = {};
  }

  /**
   * Sets a listener for the specified event name.
   *
   * @public
   * @method on
   * @param {string} eventName name of the event to listen to.
   * @param {function} callback function to call when the event occurs.
   */


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName, callback) {
      this._events[eventName] = this._events[eventName] || [];
      this._events[eventName].push(callback);
    }

    /**
     * Sets a listener for the specified event name.
     *
     * @public
     * @method emit
     * @param {string} eventName name of the event to emit.
     * @param {any} arg1, arg2, arg3 arguments to yield to the functioun
     */

  }, {
    key: "emit",
    value: function emit(eventName, arg1, arg2, arg3) {
      (this._events[eventName] || []).forEach(function (fn) {
        fn && fn(arg1, arg2, arg3);
      });
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map