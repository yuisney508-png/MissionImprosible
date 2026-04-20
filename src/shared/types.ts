export interface Participant {
  id: string
  name: string
  score: number
  photoPath: string | null
  eliminated?: boolean
}

export interface MissionView {
  active: boolean
  name: string
  teamImpro: string[]
  teamSible: string[]
  allPlay?: boolean
}

export interface AppState {
  title: string
  subtitle: string
  role: string
  date: string
  participants: Participant[]
  visibleParticipants: number
  missionView: MissionView | null
  volume: number
  overlayOpacity: number
  curtain?: boolean
  activeCinematic?: string | null
  activeCinematicName?: string | null
  logoVersion?: number
  rouletteTickBase?: number
  rouletteTickRange?: number
  curtainFlipEnabled?: boolean
  curtainFlipDuration?: number
  curtainPulseEnabled?: boolean
  curtainPulseDuration?: number
  curtainLogoColor?: 'white' | 'orange'
  curtainWobbleEnabled?: boolean
  curtainWobbleDuration?: number
}

export interface MissionData {
  id: number
  name: string
  audioPath: string | null
}

export interface ObjectiveData {
  id: number
  name: string
  points: number
  description: string
  audioPath: string | null
}

export interface ChallengeData {
  name: string
  audioPath: string | null
}

export interface CinematicData {
  name: string
  videoPath: string | null
}

export interface CinematicAudioData {
  name: string
  audioPath: string | null
}

export type IpcChannel =
  | 'state:update'
  | 'state:get'
  | 'state:response'
  | 'file:select-photo'
  | 'file:photo-selected'
  | 'display:list'
  | 'display:list-response'
  | 'display:set'
