/**
 * Ticker is a class that implements a simple animation loop.
 * It allows you to add callbacks that will be called on every frame of the loop,
 * passing them some useful information such as the current fps,
 * the time elapsed since the loop started, and the time elapsed since the last frame.
 */
export default class Ticker {
  constructor({ autoStart = true } = {}) {
    this.id = 0;
    this.fps = 60;
    this.targetFps = 60;
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.lastTime = 0;
    this.ratio = 1;
    this.callbacks = [];
    if (autoStart) this.start();
  }
  
  start() {
    this.requestId = requestAnimationFrame(this.tick.bind(this));
  }

  stop() {
    cancelAnimationFrame(this.requestId);
  }

  add(callback, priority = 0) {
    const id = this.id;

    this.callbacks.push({ id, callback, priority });
    this.callbacks.sort((a, b) => b.priority - a.priority);

    this.id += 1;

    return id;
  }

  remove(id) {
    this.callbacks = this.callbacks.filter(callback => {
      return callback.id !== id;
    });
  }

  tick(timestamp) {
    if (this.lastTime === 0) this.lastTime = timestamp;

    this.deltaTime = (timestamp - this.lastTime) * 0.001;

    if (this.deltaTime !== 0) {
      this.fps = Math.round(1 / this.deltaTime);
    }

    this.ratio = Math.min(this.targetFps * this.deltaTime, 1);

    this.elapsedTime += this.deltaTime;

    this.lastTime = timestamp;

    if (this.callbacks.length) {
      for (let i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i].callback({
          fps: this.fps,
          deltaTime: this.deltaTime,
          ratio: this.ratio,
          elapsedTime: this.elapsedTime
        });
      }
    }

    requestAnimationFrame(this.tick.bind(this));
  }
}