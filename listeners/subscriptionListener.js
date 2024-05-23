import { emitter } from "../emitter.js"
import { PacketSender } from "../packet/PacketSender.js"
import { Logger } from "../utils/Logger.js"

// TODO: don't subscribe if a subscription packet for the same events
//  has been sent from another mod already
// (this will eventually be important)

let needsToSubscribe = false

const subscriptions = {
  "hyevent:location": 1,
}

emitter.on("hello", environment => {
  needsToSubscribe = true
})

register("tick", () => {
  if (needsToSubscribe) {
    const success = PacketSender.sendRegister(subscriptions)
    needsToSubscribe = !success
    if (success) {
      Logger.log(`Subscribed to events: ${JSON.stringify(subscriptions)}`)
    }
  }
})
