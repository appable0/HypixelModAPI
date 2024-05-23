# HypixelModAPI (ChatTriggers)
An implementation of the preview [Hypixel Mod API](https://github.com/HypixelDev/ModAPI) for ChatTriggers, intended for use as a library in other modules.

Supports all features of the Hypixel Mod API, including automatically subscribing to location events when joining Hypixel. 

Exports `HypixelModAPI` for adding listeners, sending packets, and setting configuration.

## Example
```js
import { HypixelModAPI } from "../HypixelModAPI"

// enable logging in ChatTriggers js console (default false)
HypixelModAPI.setLogging(true)

// send ping packet
HypixelModAPI.ping()

HypixelModAPI.on("pong", response => {
  ChatLib.chat(`Response: ${response}!`)
  // Response: pong!
})

// HypixelModAPI handles subscriptions
// This event is emitted shortly after every server change on Hypixel
HypixelModAPI.on("location", data => {
  ChatLib.chat(`You are on: ${data.serverType}!`)
  // You are on: SKYBLOCK!
})
```
