export default class Ticker {
  /**
   * 
   * @param {{ autoStart: boolean }} options
   */
  constructor({ autoStart = true } = {}) {
    this._id = Math.random();

    this._fps = 60;
    this._targetFps = 60;
    this._deltaTime = 0;
    this._elapsedTime = 0;
    this._lastTime = 0;
    this._ratio = 1;
    this._callbacks = [];
    if (autoStart) this.start();
  }
  
  start() {
    this._requestId = requestAnimationFrame(this.tick.bind(this));
  }

  stop() {
    cancelAnimationFrame(this._requestId);
  }

  /**
   * 
   * @param {function} callback 
   * @param {number} priority 
   * @returns {number}
   */
  add(callback, priority = 0) {
    const id = this._id;

    this._callbacks.push({ id, callback, priority });
    this._callbacks.sort((a, b) => b.priority - a.priority);

    this._id += Math.random();

    return id;
  }

  /**
   * 
   * @param {number} id 
   */
  remove(id) {
    this._callbacks = this._callbacks.filter(callback => {
      return callback.id !== id;
    });
  }

  dispose() {
    this.stop();

    this._id = null;
    this._fps = null;
    this._targetFps = null;
    this._deltaTime = null;
    this._elapsedTime = null;
    this._lastTime = null;
    this._ratio = null;
    this._callbacks = null;
    this._requestId = null;
  }

  /**
   * 
   * @param {number} timestamp 
   */
  tick(timestamp) {
    if (this._lastTime === 0) this._lastTime = timestamp;

    this._deltaTime = (timestamp - this._lastTime) * 0.001;

    if (this._deltaTime !== 0) {
      this._fps = Math.round(1 / this._deltaTime);
    }

    this._ratio = Math.min(this._targetFps * this._deltaTime, 1);

    this._elapsedTime += this._deltaTime;

    this._lastTime = timestamp;

    if (this._callbacks.length) {
      this._callbacks.forEach(callback => {
        callback.callback({
          fps: this._fps,
          deltaTime: this._deltaTime,
          ratio: this._ratio,
          elapsedTime: this._elapsedTime
        });
      });
    }

    this._requestId = requestAnimationFrame(this.tick.bind(this));
  }
}