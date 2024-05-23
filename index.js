/// <reference types="../CTAutocomplete" />

import { emitter } from "./emitter.js"
import { PacketSender } from "./packet/PacketSender.js"
import { Logger } from "./utils/Logger.js"

import "./listeners/eventLoggerListener.js"
import "./listeners/commandListener.js"
import "./listeners/packetListener.js"
import "./listeners/subscriptionListener.js"

class ModAPI {
  on(event, listener) {
    emitter.on(event, listener)
  }

  once(event, listener) {
    emitter.on(event, listener)
  }

  off(event, listener) {
    emitter.off(event, listener)
  }

  ping() {
    return PacketSender.sendPing()
  }

  requestPlayerInfo() {
    return PacketSender.sendPlayerInfo()
  }
  requestPartyInfo() {
    return PacketSender.sendPartyInfo()
  }

  setLogging(shouldLog) {
    Logger.setLogging(shouldLog)
  }
}

export const HypixelModAPI = new ModAPI()
