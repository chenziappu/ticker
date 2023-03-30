# @chenziappu/ticker

A simple animation loop.

<br>

## Install

```sh
npm i @chenziappu/ticker
```
```js
import Ticker from '@chenziappu/ticker'
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
|`autoStart`|Boolean|true|If true, start() method will be called automatically.|

<br>

## Methods

|Method|Description|Arguments|
|------|-----------|---------|
|`start()`|Start the animation loop.||
|`stop()`|Stop the animation loop.||
|`add(callback, priority)`|Adds a callback that will be called on every frame and returns its ID.|`callback`: Callback to execute every frame.<br>`priority`: A higher number will be executed before those with lower number. Default is 0.|
|`remove(id)`|Remove a callback by its ID.|`id`: A callback ID.|

<br>

## Callback arguments

|Argument|Description|
|-----|-----------|
|`fps`|Current FPS.|
|`deltaTime`|Elapsed time since the last frame.|
|`ratio`|The ratio between the expected FPS (60 FPS) and the actual FPS. This value is usuful when FPS is above 60. If FPS is 60, `ratio` will be 1. If FPS is 120, `ratio` will be 0.5.|
|`elapsedTime`|Elapsed time since start() method was called.|

<br>

## License

[ISC License](http://opensource.org/licenses/ISC)