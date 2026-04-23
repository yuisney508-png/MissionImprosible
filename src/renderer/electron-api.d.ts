import type { AppState, Participant, MissionData, ObjectiveData, CinematicData, CinematicAudioData } from '../shared/types'

declare global {
  interface Window {
    electronAPI: {
    getState: () => void
    onStateUpdate: (cb: (state: AppState) => void) => () => void
    updateScore: (id: string, delta: number) => void
    setScore: (id: string, value: number) => void
    updateParticipant: (p: Participant) => void
    updateAppState: (update: Partial<AppState>) => void
    selectPhoto: (participantId: string) => Promise<string | null>
    listDisplays: () => Promise<{ id: number; label: string; bounds: { x: number; y: number; width: number; height: number }; isPrimary: boolean }[]>
    setDisplay: (displayId: number) => void
    announceObjective: (name: string) => void
    onObjectiveAnnounce: (cb: (name: string) => void) => () => void
    announceMission: (name: string) => void
    onMissionAnnounce: (cb: (name: string) => void) => () => void
    showRatings: (ratings: Record<string, string>) => void
    clearRatings: () => void
    onShowRatings: (cb: (ratings: Record<string, string>) => void) => () => void
    onClearRatings: (cb: () => void) => () => void
    startRoulette: (winnerIndex: number, challenges: string[], skipAnimation?: boolean) => void
    onRouletteStart: (cb: (winnerIndex: number, challenges: string[], skipAnimation: boolean) => void) => () => void
    getMissions: () => Promise<MissionData[]>
    saveMissions: (missions: MissionData[]) => Promise<void>
    addMission: (mission: MissionData) => Promise<void>
    deleteMission: (id: string) => Promise<void>
    updateMission: (mission: MissionData) => Promise<void>
    updateMissionEntry: (missionId: string, entry: unknown) => Promise<void>
    getObjectives: () => Promise<ObjectiveData[]>
    saveObjectives: (objectives: ObjectiveData[]) => Promise<void>
    getChallenges: () => Promise<{ name: string; audioPath: string | null }[]>
    saveChallenges: (challenges: { name: string; audioPath: string | null }[]) => Promise<void>
    getSounds: () => Promise<Record<string, string | null>>
    getLogoPath: () => Promise<string | null>
    getSvgLogoPath: () => Promise<string>
    getSvgLogoOrangePath: () => Promise<string>
    getSvgLogoContent: () => Promise<string>
    getSvgLogoOrangeContent: () => Promise<string>
    selectLogo: () => Promise<string | null>
    getCinematics: () => Promise<CinematicData[]>
    saveCinematics: (cinematics: CinematicData[]) => Promise<void>
    getCinematicAudios: () => Promise<CinematicAudioData[]>
    saveCinematicAudios: (audios: CinematicAudioData[]) => Promise<void>
    selectAudio: () => Promise<string | null>
    selectVideo: () => Promise<string | null>
    deleteFile: (storedPath: string | null) => Promise<boolean>
    closeProjection: () => void
    startImprosible: (finalistIds: [string, string]) => void
    onImprosibleStart: (cb: (finalistIds: [string, string], audioPath: string | null) => void) => () => void
    clearImprosible: () => void
    onImprosibleClear: (cb: () => void) => () => void
    startImprosibleFinal: (winnerId: string) => void
    onImprosibleFinalStart: (cb: (winnerId: string) => void) => () => void
  }
}
}
