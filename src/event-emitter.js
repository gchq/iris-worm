export default class EventEmitter {

  constructor(logger) {
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
  on(eventName, callback) {
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
  emit(eventName, arg1, arg2, arg3) {
    (this._events[eventName] || []).forEach((fn) => {
      fn && fn(arg1, arg2, arg3)
    });
  }

}