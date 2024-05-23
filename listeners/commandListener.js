import { emitter } from "../emitter.js"
import { PacketSender } from "../packet/PacketSender.js"

const mapping = {
  ping: PacketSender.sendPing,
  playerinfo: PacketSender.sendPlayerInfo,
  partyinfo: PacketSender.sendPartyInfo,
}

const validArgs = Object.keys(mapping)

register("command", (...args) => {
  const type = args?.join("")?.toLowerCase() ?? ""
  const sender = mapping[type]

  if (!sender) {
    ChatLib.chat(`§cInvalid argument! Valid arguments are: §e[${validArgs.join(", ")}]`)
  }
  if (type == "ping") {
    PacketSender.sendPing()
  } else if (type == "partyinfo") {
    PacketSender.sendPartyInfo()
  } else if (type == "playerinfo") {
    PacketSender.sendPlayerInfo()
  }
})
  .setTabCompletions(validArgs)
  .setCommandName("testmodapi")
