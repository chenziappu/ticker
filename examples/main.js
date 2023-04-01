import Ticker from "@chenziappu/ticker";

const ticker = new Ticker()

function raf({ fps, deltaTime, ratio, elapsedTime }) {
  console.log(fps);
}

ticker.add(raf);