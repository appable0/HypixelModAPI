import { Logger } from "../utils/Logger.js"
import { PacketWriter } from "../utils/PacketWriter.js"

// TODO: merge this with the registry, which is currently only clientbound
const versions = {
  "hypixel:register": 1,
  "hypixel:ping": 1,
  "hypixel:party_info": 2,
  "hypixel:player_info": 1,
}

function versionedPacket(identifier) {
  const writer = new PacketWriter(identifier)
  writer.writeVarInt(versions[identifier])
  return writer
}

/**
 *
 * @param {{[key: string]: string}} subscriptionMap
 */
function sendRegister(subscriptionMap) {
  const writer = versionedPacket("hypixel:register")
  writer.writeMap(subscriptionMap)
  Logger.log(`Sending register packet with data ${JSON.stringify(subscriptionMap)}`)
  return sendPacket(writer.toPacket())
}

function sendPing() {
  const writer = versionedPacket("hypixel:ping")
  Logger.log(`Sending ping packet`)
  return sendPacket(writer.toPacket())
}

function sendPartyInfo() {
  const writer = versionedPacket("hypixel:party_info")
  Logger.log(`Sending party info packet`)
  return sendPacket(writer.toPacket())
}

function sendPlayerInfo() {
  const writer = versionedPacket("hypixel:player_info")
  Logger.log(`Sending player info packet`)
  return sendPacket(writer.toPacket())
}

/**
 *
 * @param { any } packet
 * @returns { boolean } indicating whether sending was successful
 */
function sendPacket(packet) {
  const netHandler = Client.getMinecraft().func_147114_u()
  if (!netHandler) return false
  netHandler.func_147297_a(packet)
  return true
}

export const PacketSender = {
  sendRegister,
  sendPing,
  sendPartyInfo,
  sendPlayerInfo,
}
