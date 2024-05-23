const PacketBuffer = Java.type("net.minecraft.network.PacketBuffer")
const Unpooled = Java.type("io.netty.buffer.Unpooled")
const C17PacketCustomPayload = Java.type("net.minecraft.network.play.client.C17PacketCustomPayload")

/**
 *  A writer class to create a new `C17PacketCustomPayload`.
 */
export class PacketWriter {
  constructor(identifier) {
    this.identifier = identifier
    this.buffer = new PacketBuffer(Unpooled.buffer())
  }

  /**
   *
   * @param { number } num
   * @returns
   */
  writeVarInt(num) {
    this.buffer.func_150787_b(num)
  }

  /**
   *
   * @param { string } num
   * @returns
   */
  writeString(str) {
    this.buffer.func_180714_a(str)
  }

  /**
   *
   * @param { {[key: string]: number} } map
   * @returns
   */
  writeMap(map) {
    const entries = Object.entries(map)
    this.writeVarInt(entries.length)
    entries.forEach(([event, version]) => {
      this.writeString(event)
      this.writeVarInt(version)
    })
  }

  toPacket() {
    return new C17PacketCustomPayload(this.identifier, this.buffer)
  }
}
