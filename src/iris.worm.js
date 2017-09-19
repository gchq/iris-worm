import EventEmitter from './event-emitter';

export default class Worm {

  get NAME() {
    'IRIS Worm'
  };
  get VERSION() {
    return null
  } // TODO
  get CSS_CONTAINER() {
    return 'irisWorm'
  };
  get MAX_MOMENTUM() {
    return 5
  };

  static get DEFAULT_OPTIONS() {
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
    }
  };

  /**
   * Constructs a new IRIS Worm instance.
   * @class IRIS.Worm
   * @constructor Worm
   * @example
   *      new IRIS.Worm(div, options);
   * @param {HTMLDivElement} div the div in which the visualisation will be rendered, e.g. '#map'
   * @param options visualisation options (see 'options' property)
   */
  constructor(div, options = {}) {
    this._rootDiv = div;
    this._options = Object.assign({}, Worm.DEFAULT_OPTIONS);

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
      this._fallbackDom.setAttribute('style', 'position:absolute;width:1px;' + '' +
        'height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);');
      this._rootDiv.appendChild(this._fallbackDom);
    }

    // Events
    this._eventEmitter = new EventEmitter();
  }

  start() {
    this._ctx.lineWidth = this._options.lineWidth;
    this._active = true;
    this._draw();
  }

  stop() {
    this._active = false;
  }

  _draw() {
    if (this._active) {
      requestAnimationFrame(this._draw.bind(this));
      this._moveViewport();
      this._drawPoint();
      this._resolveValues();
    }
  }

  _resolveValues() {

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

        this._metaValue += (this._momentum * distanceToValue) / 100;
      }
      this._oldMetaValue = this._metaValue;
    } else {
      this._oldMetaValue = this._metaValue;
      this._metaValue = this._value;
    }

  }

  _moveViewport() {
    var imageData = this._ctx.getImageData(1, 0, this._options.width - 1, this._options.height);
    this._ctx.putImageData(imageData, 0, 0);
    this._ctx.clearRect(this._options.width - 1, 0, 1, this._options.height);

    // this thing is known to be leaky so let's force explicit garbage collecion.
    imageData = null;
  }

  _drawPoint() {

    var colorUnit = (255 / this._options.height);
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

  _scaleValue(value) {
    var scale = this._options.height / this._options.maxValue;


    return this._options.height - (value * scale);
  }

  /**
   * Returns the name (and version, if available) of this widget.
   *
   * @private
   * @method _getName
   * @returns {string} name (and version, if available) of this widget
   */
  _getName() {
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
  destroy() {
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
  on(eventName, callback) {
    var self = this;
    this._eventEmitter.on(eventName, (a, b, c) => callback.call(self, a, b, c));
  }


  /**
   * Sets the value
   *
   * @public
   * @method setValue
   * @param {number} optionValue value to set the option to
   * @returns {null}
   */
  setValue(newValue) {

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
  getValue() {
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
  setOption(optionName, optionValue) {
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
  getOption(optionName) {
    return this._options[optionName];
  }

}