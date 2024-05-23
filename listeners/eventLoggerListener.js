import { emitter } from "../emitter.js"
import { Logger } from "../utils/Logger.js"

emitter.on("hello", environment => {
  Logger.log(`Event emitted: hello - ${environment}`)
})

emitter.on("ping", response => {
  Logger.log(`Event emitted: ping - ${response}`)
})

emitter.on("partyInfo", data => {
  Logger.log(`Event emitted: partyInfo - ${JSON.stringify(data)}`)
})

emitter.on("playerInfo", data => {
  Logger.log(`Event emitted: playerInfo - ${JSON.stringify(data)}`)
})

emitter.on("location", data => {
  Logger.log(`Event emitted: location - ${JSON.stringify(data)}`)
})
