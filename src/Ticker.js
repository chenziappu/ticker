/**
 * Ticker is a class that implements a simple animation loop.
 * It allows you to add callbacks that will be called on every frame of the loop,
 * passing them some useful information such as the current fps,
 * the time elapsed since the loop started, and the time elapsed since the last frame.
 */
export default class Ticker {
  constructor({ autoStart = true } = {}) {
    this._id = 0;
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
    this._requestId = requestAnimationFrame(this._tick.bind(this));
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

    this._id += 1;

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

  /**
   * 
   * @param {number} timestamp 
   */
  _tick(timestamp) {
    if (this._lastTime === 0) this._lastTime = timestamp;

    this._deltaTime = (timestamp - this._lastTime) * 0.001;

    if (this._deltaTime !== 0) {
      this._fps = Math.round(1 / this._deltaTime);
    }

    this._ratio = Math.min(this._targetFps * this._deltaTime, 1);

    this._elapsedTime += this._deltaTime;

    this._lastTime = timestamp;

    if (this._callbacks.length) {
      for (let i = 0; i < this._callbacks.length; i++) {
        this._callbacks[i].callback({
          fps: this._fps,
          deltaTime: this._deltaTime,
          ratio: this._ratio,
          elapsedTime: this._elapsedTime
        });
      }
    }

    requestAnimationFrame(this._tick.bind(this));
  }
}