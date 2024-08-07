const MAX_STRING_LENGTH = 32767

const MCPacketBuffer = Java.type("net.minecraft.network.PacketBuffer")
const Unpooled = Java.type("io.netty.buffer.Unpooled")

/**
 * A reader class for `S3FPacketCustomPayload`.
 */
export class PacketReader {
  constructor(packet) {
    this.identifier = packet.func_149169_c()
    this.buffer = new MCPacketBuffer(packet.func_180735_b().copy())
  }

  /**
   *
   * @returns { string }
   */
  getIdentifier() {
    return this.identifier
  }

  /**
   *
   * @returns { number }
   */
  readVarInt() {
    return this.buffer.func_150792_a()
  }

  /**
   *
   * @returns { string }
   */
  readUuid() {
    return this.buffer.func_179253_g().toString()
  }

  /**
   *
   * @returns { string }
   */
  readString() {
    return this.buffer.func_150789_c(MAX_STRING_LENGTH)
  }

  /**
   *
   * @returns { boolean }
   */
  readBoolean() {
    return this.buffer.readBoolean()
  }

  /**
   *
   * @returns { string | null }
   */
  readStringOrNull() {
    const exists = this.readBoolean()
    return exists ? this.readString() : null
  }

  release() {
    this.buffer.release()
  }
}
