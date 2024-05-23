import { emitter } from "../emitter.js"
import { Logger } from "../utils/Logger.js"
import { PacketReader } from "../utils/PacketReader.js"

/**
 * Handles a specific type of (possibly-versioned) Hypixel Mod API packet.
 */
export class PacketHandler {
  /**
   *
   * @param { (reader: PacketReader) => void } handler
   * @param { number | undefined } version
   */
  constructor(handler, version) {
    this.customHandler = handler
    this.version = version
  }

  /**
   *
   * @param {PacketReader} packet
   */
  handle(packet) {
    const success = packet.readBoolean()

    if (!success) {
      const errorId = packet.readVarInt()
      const error = errors[errorId]
      Logger.log(`Packet error: ${error}`)
      emitter.emit("error", error)
      return
    }

    if (this.version != null) {
      const version = packet.readVarInt()
      if (version != this.version) {
        Logger.log(`Unknown packet version: ${version}`)
        return
      }
    }

    this.customHandler(packet)
  }
}

const errors = {
  1: "DISABLED",
  2: "INTERNAL_SERVER_ERROR",
  3: "RATE_LIMITED",
  4: "INVALID_PACKET_VERSION",
  5: "NO_LONGER_SUPPORTED",
}
