import { PacketRegistry } from "../packet/PacketRegistry.js"
import { PacketReader } from "../utils/PacketReader.js"

const S3FPacketCustomPayload = Java.type("net.minecraft.network.play.server.S3FPacketCustomPayload")

register("packetReceived", mcPacket => {
  const packet = new PacketReader(mcPacket)
  try {
    PacketRegistry.handleClientboundPacket(packet)
  } finally {
    packet.release()
  }
}).setFilteredClass(S3FPacketCustomPayload)
