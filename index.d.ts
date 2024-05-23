type PartyRole = "LEADER" | "MOD" | "MEMBER"
type Environment = "PRODUCTION" | "BETA" | "TEST"

type PartyInfoResponse = { [uuid: string]: PartyRole | undefined }

type PlayerInfoResponse = {
  playerRank: number
  packageRank: number
  monthlyPackageRank: number
  prefix: string | null
}

type LocationResponse = {
  serverName: string
  serverType: string | null
  lobbyName: string | null
  mode: string | null
  map: string | null
}

type EventArguments = {
  hello: [environment: Environment]
  ping: [response: string]
  partyInfo: [PartyInfoResponse] // Replace arg3Type with actual type for event2
  playerInfo: [PlayerInfoResponse] // Replace arg3Type with actual type for event2
  location: [LocationResponse]
  error: [reason: string]
}

type EventType = keyof EventArguments

declare class ModAPI {
  on<K extends EventType>(event: K, listener: (...args: EventArguments[K]) => void): void
  once<K extends EventType>(event: K, listener: (...args: EventArguments[K]) => void): void
  off<K extends EventType>(event: K, listener: (...args: EventArguments[K]) => void): void
  requestPing(): void
  requestPlayerInfo(): void
  requestPartyInfo(): void
  setLogging(shouldLog: boolean): void
}

export declare const HypixelModAPI: ModAPI
