import { contextBridge, ipcRenderer } from 'electron'
import { AppState, Participant, MissionData, ObjectiveData, ChallengeData, CinematicData, CinematicAudioData } from '../shared/types'

contextBridge.exposeInMainWorld('electronAPI', {
  getState: () => ipcRenderer.send('state:get'),
  onStateUpdate: (cb: (state: AppState) => void) => {
    ipcRenderer.on('state:update', (_e, state) => cb(state))
    return () => ipcRenderer.removeAllListeners('state:update')
  },

  updateScore: (id: string, delta: number) => ipcRenderer.send('participant:score', { id, delta }),
  setScore: (id: string, value: number) => ipcRenderer.send('participant:score-set', { id, value }),
  updateParticipant: (p: Participant) => ipcRenderer.send('participant:update', p),
  updateAppState: (update: Partial<AppState>) => ipcRenderer.send('appstate:update', update),

  selectPhoto: (participantId: string): Promise<string | null> =>
    ipcRenderer.invoke('file:select-photo', participantId),

  listDisplays: (): Promise<{ id: number; label: string; bounds: Electron.Rectangle; isPrimary: boolean }[]> =>
    ipcRenderer.invoke('display:list'),
  setDisplay: (displayId: number) => ipcRenderer.send('display:set', displayId),

  announceObjective: (name: string) => ipcRenderer.send('objective:announce', { name }),
  onObjectiveAnnounce: (cb: (name: string) => void) => {
    ipcRenderer.on('objective:announce', (_e, { name }) => cb(name))
    return () => ipcRenderer.removeAllListeners('objective:announce')
  },

  announceMission: (name: string) => ipcRenderer.send('mission:announce', { name }),
  onMissionAnnounce: (cb: (name: string) => void) => {
    ipcRenderer.on('mission:announce', (_e, { name }) => cb(name))
    return () => ipcRenderer.removeAllListeners('mission:announce')
  },

  showRatings: (ratings: Record<string, string>) => ipcRenderer.send('rating:show', ratings),
  clearRatings: () => ipcRenderer.send('rating:clear'),
  onShowRatings: (cb: (ratings: Record<string, string>) => void) => {
    ipcRenderer.on('rating:show', (_e, ratings) => cb(ratings))
    return () => ipcRenderer.removeAllListeners('rating:show')
  },
  onClearRatings: (cb: () => void) => {
    ipcRenderer.on('rating:clear', () => cb())
    return () => ipcRenderer.removeAllListeners('rating:clear')
  },

  startRoulette: (winnerIndex: number, challenges: string[]) => ipcRenderer.send('roulette:start', { winnerIndex, challenges }),
  onRouletteStart: (cb: (winnerIndex: number, challenges: string[]) => void) => {
    ipcRenderer.on('roulette:start', (_e, { winnerIndex, challenges }) => cb(winnerIndex, challenges))
    return () => ipcRenderer.removeAllListeners('roulette:start')
  },

  getMissions: (): Promise<MissionData[]> => ipcRenderer.invoke('data:get-missions'),
  saveMissions: (missions: MissionData[]): Promise<void> => ipcRenderer.invoke('data:save-missions', missions),
  getObjectives: (): Promise<ObjectiveData[]> => ipcRenderer.invoke('data:get-objectives'),
  saveObjectives: (objectives: ObjectiveData[]): Promise<void> => ipcRenderer.invoke('data:save-objectives', objectives),
  getChallenges: (): Promise<ChallengeData[]> => ipcRenderer.invoke('data:get-challenges'),
  saveChallenges: (challenges: ChallengeData[]): Promise<void> => ipcRenderer.invoke('data:save-challenges', challenges),
  getSounds: (): Promise<Record<string, string | null>> => ipcRenderer.invoke('data:get-sounds'),
  getLogoPath: (): Promise<string | null> => ipcRenderer.invoke('data:get-logo-path'),
  selectLogo: (): Promise<string | null> => ipcRenderer.invoke('file:select-logo'),
  getCinematics: (): Promise<CinematicData[]> => ipcRenderer.invoke('data:get-cinematics'),
  saveCinematics: (cinematics: CinematicData[]): Promise<void> => ipcRenderer.invoke('data:save-cinematics', cinematics),
  getCinematicAudios: (): Promise<CinematicAudioData[]> => ipcRenderer.invoke('data:get-cinematic-audios'),
  saveCinematicAudios: (audios: CinematicAudioData[]): Promise<void> => ipcRenderer.invoke('data:save-cinematic-audios', audios),
  selectAudio: (): Promise<string | null> => ipcRenderer.invoke('file:select-audio'),
  selectVideo: (): Promise<string | null> => ipcRenderer.invoke('file:select-video'),
  closeProjection: () => ipcRenderer.send('window:close-projection'),
})
