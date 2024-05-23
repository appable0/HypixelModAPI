import { emitter } from "../emitter.js"
import { PacketHandler } from "./PacketHandler.js"
import { PacketReader } from "../utils/PacketReader.js"
import { Logger } from "../utils/Logger.js"

const registry = {
  "hypixel:hello": new PacketHandler(packet => {
    const environmentId = packet.readVarInt()
    const environment = environments[environmentId]
    emitter.emit("hello", environment)
  }),

  "hypixel:ping": new PacketHandler(packet => {
    const response = packet.readString()
    emitter.emit("pong", response)
  }, 1),

  "hypixel:party_info": new PacketHandler(packet => {
    const members = {}
    const inParty = packet.readBoolean()

    if (inParty) {
      const memberCount = packet.readVarInt()
      for (i = 0; i < memberCount; i++) {
        let uuid = packet.readUuid()
        let role = partyRoles[packet.readVarInt()]
        members[uuid] = role
      }
    }

    emitter.emit("partyInfo", members)
  }, 2),

  "hypixel:player_info": new PacketHandler(packet => {
    const playerRank = packet.readVarInt()
    const packageRank = packet.readVarInt()
    const monthlyPackageRank = packet.readVarInt()
    const prefix = packet.readStringOrNull()
    const data = { playerRank, packageRank, monthlyPackageRank, prefix }
    emitter.emit("playerInfo", data)
  }, 1),

  "hyevent:location": new PacketHandler(packet => {
    const serverName = packet.readString()
    const serverType = packet.readStringOrNull()
    const lobbyName = packet.readStringOrNull()
    const mode = packet.readStringOrNull()
    const map = packet.readStringOrNull()
    const data = { serverName, serverType, lobbyName, mode, map }
    emitter.emit("location", data)
  }, 1),
}

/**
 *
 * @param {PacketReader} packet
 */
function handleClientboundPacket(packet) {
  /** @type {PacketHandler | undefined } */
  const handler = registry[packet.getIdentifier()]
  if (!handler) return
  Logger.log(`Handling packet (identifier: ${packet.getIdentifier()})`)
  handler.handle(packet)
}

export const PacketRegistry = {
  handleClientboundPacket,
}

function log(data) {
  console.log(`[LocationAPI] ${data}`)
}

const environments = ["PRODUCTION", "BETA", "TEST"]
const partyRoles = ["LEADER", "MOD", "MEMBER"]
