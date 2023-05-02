type Callback = ({ fps, deltaTime, ratio, elapsedTime }: {
  fps: number,
  deltaTime: number,
  ratio: number,
  elapsedTime: number
}) => void;

export default class Ticker {
  private id: number;
  private fps: number;
  private targetFps: number;
  private deltaTime: number;
  private elapsedTime: number;
  private lastTime: number;
  private ratio: number;
  private callbacks: Array<{ id: number, callback: Callback, priority: number }>;
  private requestId: number;
  
  constructor({ autoStart = true }: { autoStart?: boolean } = {}) {
    this.id = Math.random();

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

  add(callback: Callback, priority: number = 0): number {
    const id = this.id;

    this.callbacks.push({ id, callback, priority });
    this.callbacks.sort((a, b) => b.priority - a.priority);

    this.id += Math.random();

    return id;
  }

  remove(id: number) {
    this.callbacks = this.callbacks.filter(callback => {
      return callback.id !== id;
    });
  }

  dispose() {
    this.stop();

    this.id = null;
    this.fps = null;
    this.targetFps = null;
    this.deltaTime = null;
    this.elapsedTime = null;
    this.lastTime = null;
    this.ratio = null;
    this.callbacks = null;
    this.requestId = null;
  }

  private tick(timestamp: number) {
    if (this.lastTime === 0) this.lastTime = timestamp;

    this.deltaTime = (timestamp - this.lastTime) * 0.001;

    if (this.deltaTime !== 0) {
      this.fps = Math.round(1 / this.deltaTime);
    }

    this.ratio = Math.min(this.targetFps * this.deltaTime, 1);

    this.elapsedTime += this.deltaTime;

    this.lastTime = timestamp;

    this.callbacks.forEach(callback => {
      callback.callback({
        fps: this.fps,
        deltaTime: this.deltaTime,
        ratio: this.ratio,
        elapsedTime: this.elapsedTime
      });
    });

    this.requestId = requestAnimationFrame(this.tick.bind(this));
  }
}