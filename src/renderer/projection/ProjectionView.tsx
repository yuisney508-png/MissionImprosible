import { AppState, MissionView } from '../../shared/types'
import falsoVacioImg from '../assets/falso-vacio.jpg'

export const RATING_LABELS: Record<string, string> = {
  excelente: 'EXCELENTE',
  aceptable: 'ACEPTABLE',
  regular:   'REGULAR',
}
export const RATING_COLORS: Record<string, string> = {
  excelente: '#22c55e',
  aceptable: '#eab308',
  regular:   '#ef4444',
}

export interface ProjectionViewProps {
  state: AppState
  announcement: string | null
  missionAnnouncement: string | null
  missionAnnouncingOut: boolean
  missionExiting: boolean
  lastMission: MissionView | null
  scoreFlash: Record<string, number>
  elimShake: Record<string, number>
  activeRatings: Record<string, string> | null
  ratingsExiting: boolean
}

export function ProjectionView({
  state,
  announcement,
  missionAnnouncement,
  missionAnnouncingOut,
  missionExiting,
  lastMission,
  scoreFlash,
  elimShake,
  activeRatings,
  ratingsExiting,
}: ProjectionViewProps) {
  const mv = state.missionView?.active ? state.missionView : (missionExiting ? lastMission : null)

  if (mv?.active || missionExiting) {
    const impro = state.participants.filter(p => mv!.teamImpro.includes(p.id))
    const sible = state.participants.filter(p => mv!.teamSible.includes(p.id))
    return (
      <div className="projection-container">
        <div className="projection-root mission-view">
          <div className="mission-header-bar">
            <h1 className="header-title">
              <span className="title-mision">MISIÓN </span>
              <span className="title-impro">IMPRO</span>
              <span className="title-sible">SIBLE</span>
            </h1>
            <div className="mission-name-label">{mv!.name}</div>
          </div>
          <div className="mission-arena">
            <div className={`mission-team mission-team--impro${missionExiting ? ' exiting' : ''}`}>
              <div className="mission-team-label"><span className="team-label-impro">EQUIPO A</span></div>
              <div className="mission-team-cards">
                {impro.map(p => (
                  <div key={`${p.id}-${elimShake[p.id] ?? 0}`} className={`mission-card${elimShake[p.id] ? ' mission-card--shake' : ''}`}>
                    <div className="mission-card-photo" style={{ filter: p.eliminated ? 'grayscale(100%)' : 'none', transition: 'filter 0.4s' }}>
                      {p.photoPath
                        ? <img src={`localfile:///${p.photoPath.replace(/\\/g, '/')}`} alt={p.name} />
                        : <div className="photo-placeholder">FOTO</div>}
                      {activeRatings && activeRatings[p.id] && (
                        <div className={`rating-badge${ratingsExiting ? ' rating-badge--exiting' : ''}`} style={{ color: RATING_COLORS[activeRatings[p.id]] }}>
                          {RATING_LABELS[activeRatings[p.id]]}
                        </div>
                      )}
                    </div>
                    <div className="mission-card-name" style={{ background: p.eliminated ? '#4b5563' : undefined, transition: 'background 0.4s' }}>{p.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mission-vs${missionExiting ? ' exiting' : ''}`}>VS</div>

            <div className={`mission-team mission-team--sible${missionExiting ? ' exiting' : ''}`}>
              <div className="mission-team-label"><span className="team-label-sible">EQUIPO B</span></div>
              <div className="mission-team-cards">
                {sible.map(p => (
                  <div key={`${p.id}-${elimShake[p.id] ?? 0}`} className={`mission-card${elimShake[p.id] ? ' mission-card--shake' : ''}`}>
                    <div className="mission-card-photo" style={{ filter: p.eliminated ? 'grayscale(100%)' : 'none', transition: 'filter 0.4s' }}>
                      {p.photoPath
                        ? <img src={`localfile:///${p.photoPath.replace(/\\/g, '/')}`} alt={p.name} />
                        : <div className="photo-placeholder">FOTO</div>}
                      {activeRatings && activeRatings[p.id] && (
                        <div className={`rating-badge${ratingsExiting ? ' rating-badge--exiting' : ''}`} style={{ color: RATING_COLORS[activeRatings[p.id]] }}>
                          {RATING_LABELS[activeRatings[p.id]]}
                        </div>
                      )}
                    </div>
                    <div className="mission-card-name" style={{ background: p.eliminated ? '#4b5563' : undefined, transition: 'background 0.4s' }}>{p.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="projection-container">
      <div className="projection-root">
        <div className="header">
          <h1 className="header-title">
            <span className="title-mision">MISIÓN </span>
            <span className="title-impro">IMPRO</span>
            <span className="title-sible">SIBLE</span>
          </h1>
          <div className="header-logo">
            <img src={falsoVacioImg} className="logo-placeholder" />
          </div>
        </div>

        <div className="subtitle-bar">
          <div className="subtitle-text">
            {state.subtitle} <strong>{state.role}</strong>
          </div>
          <div className="subtitle-date">{state.date}</div>
        </div>

        <div className="participants">
          {state.participants.slice(0, state.visibleParticipants).map(p => (
            <div key={`${p.id}-${elimShake[p.id] ?? 0}`} className={`participant-card${elimShake[p.id] ? ' participant-card--shake' : ''}`}>
              <div className="participant-photo" style={{ filter: p.eliminated ? 'grayscale(100%)' : 'none', transition: 'filter 0.4s' }}>
                {p.photoPath ? (
                  <img src={`localfile:///${p.photoPath.replace(/\\/g, '/')}`} alt={p.name} />
                ) : (
                  <div className="photo-placeholder">FOTO</div>
                )}
                {activeRatings && activeRatings[p.id] && (
                  <div
                    className={`rating-badge${ratingsExiting ? ' rating-badge--exiting' : ''}`}
                    style={{ color: RATING_COLORS[activeRatings[p.id]] }}
                  >
                    {RATING_LABELS[activeRatings[p.id]]}
                  </div>
                )}
              </div>
              <div className="participant-name" style={{ background: p.eliminated ? '#4b5563' : undefined, transition: 'background 0.4s' }}>{p.name}</div>
              <div key={scoreFlash[p.id] ?? 0} className="participant-score participant-score--flash">{p.score}</div>
            </div>
          ))}
        </div>

        {announcement && (
          <div className="obj-announce-overlay" style={{ background: `rgba(0,0,0,${(state.overlayOpacity ?? 80) / 100})` }}>
            <div className="obj-announce-card">
              <div className="obj-announce-label">OBJETIVO ALCANZADO</div>
              <div className="obj-announce-name">{announcement}</div>
              <div className="obj-announce-corners">
                <span /><span /><span /><span />
              </div>
            </div>
          </div>
        )}

        {missionAnnouncement && (
          missionAnnouncement === 'Misión Improsible' ? (
            <div key="final" className={`mission-final-overlay${missionAnnouncingOut ? ' exiting' : ''}`}>
              <div className="mission-final-bg" style={{ background: 'rgba(0,0,0,0.95)' }} />
              <div className="mission-final-content">
                <div className="mission-final-caption">Misión Final</div>
                <div className="mission-final-rule" />
                <div className="mission-final-word mission-final-word--1">MISIÓN</div>
                <div className="mission-final-word mission-final-word--2">IMPROSIBLE</div>
                <div className="mission-final-rule mission-final-rule--2" />
              </div>
            </div>
          ) : (
            <div key={missionAnnouncement} className={`mission-announce-overlay${missionAnnouncingOut ? ' exiting' : ''}`}>
              <div className="mission-announce-backdrop" style={{ background: `rgba(0,0,0,${(state.overlayOpacity ?? 80) / 100})` }} />
              <div className="mission-announce-subtitle">Siguiente misión</div>
              <div className="mission-announce-name">{missionAnnouncement.toUpperCase()}</div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
