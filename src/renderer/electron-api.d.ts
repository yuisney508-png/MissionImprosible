type _AppState = import('../shared/types').AppState
type _Participant = import('../shared/types').Participant
type _MissionData = import('../shared/types').MissionData
type _ObjectiveData = import('../shared/types').ObjectiveData
type _CinematicData = import('../shared/types').CinematicData
type _CinematicAudioData = import('../shared/types').CinematicAudioData

declare interface Window {
  electronAPI: {
    getState: () => void
    onStateUpdate: (cb: (state: _AppState) => void) => () => void
    updateScore: (id: string, delta: number) => void
    setScore: (id: string, value: number) => void
    updateParticipant: (p: _Participant) => void
    updateAppState: (update: Partial<_AppState>) => void
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
    startRoulette: (winnerIndex: number, challenges: string[]) => void
    onRouletteStart: (cb: (winnerIndex: number, challenges: string[]) => void) => () => void
    getMissions: () => Promise<_MissionData[]>
    saveMissions: (missions: _MissionData[]) => Promise<void>
    addMission: (mission: _MissionData) => Promise<void>
    deleteMission: (id: string) => Promise<void>
    updateMission: (mission: _MissionData) => Promise<void>
    updateMissionEntry: (missionId: string, entry: unknown) => Promise<void>
    getObjectives: () => Promise<_ObjectiveData[]>
    saveObjectives: (objectives: _ObjectiveData[]) => Promise<void>
    getChallenges: () => Promise<{ name: string; audioPath: string | null }[]>
    saveChallenges: (challenges: { name: string; audioPath: string | null }[]) => Promise<void>
    getSounds: () => Promise<Record<string, string | null>>
    getLogoPath: () => Promise<string | null>
    selectLogo: () => Promise<string | null>
    getCinematics: () => Promise<_CinematicData[]>
    saveCinematics: (cinematics: _CinematicData[]) => Promise<void>
    getCinematicAudios: () => Promise<_CinematicAudioData[]>
    saveCinematicAudios: (audios: _CinematicAudioData[]) => Promise<void>
    selectAudio: () => Promise<string | null>
    selectVideo: () => Promise<string | null>
    closeProjection: () => void
  }
}
