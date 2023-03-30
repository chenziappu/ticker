# @chenziappu/ticker

Ticker is a class that implements a simple animation loop.

<br>

## Install

```sh
npm i @chenziappu/ticker
```
```js
import Ticker from '@chenziaapu/ticker'
```

<br>

## Usage

```js
const ticker = new Ticker();

function raf({ fps, deltaTime, ratio, elapsedTime }) {
  // will be called on every frame
}

ticker.add(raf);
```

<br>

## Option

|Option   |Type   |Default|Description|
|---------|-------|-------|-----------|
|`autoStart`|Boolean|true   |If true, requestAnimationFrame will be called automatically|

<br>

## Methods

|Method|Description|Arguments|
|------|-----------|---------|
|`start()`|Start ticker.||
|`stop()`|Stop ticker.||
|`add(callback, priority)`|Adds a callback. Callback will be called on every frame. and return ID.|`callback`: Callback to execute every frame.<br>`priority`: A higher number will be excuted before those with before lower number. Default is 0.|
|`remove(id)`|Remove a callback by its ID.|`id`: a return value of add() method|

<br>