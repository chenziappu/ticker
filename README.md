# @chenziappu/ticker

Ticker is a class that implements a simple animation loop.

## Install

```sh
npm i @chenziappu/ticker
```
```js
import Ticker from '@chenziaapu/ticker'
```

## Usage

```js
const ticker = new Ticker();

function raf({ fps, deltaTime, ratio, elapsedTime }) {
  // be called on every frame
}

ticker.add(raf);
```

## Option

|Option   |Type   |Default|Description|
|---------|-------|-------|-----------|
|autoStart|boolean|true   |if true, requestAnimationFrame will be called automatically|

## methods

|Method|Description|Arguments|
|------|-----------|---------|
|start()|Start ticker||
|stop()|Stop ticker||
|add()|Adds a callback. Callback will be called on every frame. and return ID.|callback: Callback to execute every frame.<br>priority: A higher number will be excuted before those with before lower number. Default is 0.|
|remove()|Remove a callback by its ID.|id: a return value of add() method|