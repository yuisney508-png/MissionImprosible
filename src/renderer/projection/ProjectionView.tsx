import { AppState, MissionView } from '../../shared/types'
import falsoVacioImg from '../assets/falso-vacio.jpg'

// Pre-generados para evitar re-randomizar en cada render (ProjectionView es función pura)
const CONFETTI_DATA = Array.from({ length: 50 }, (_, i) => ({
  i,
  left: (i * 137.508 + 17) % 100, // distribución pseudo-aleatoria determinista
  color: ['#facc15','#ef4444','#3b82f6','#10b981','#ec4899','#fbbf24'][i % 6],
  delay: -((i * 0.67) % 3),
  duration: 2.5 + (i * 0.11) % 2,
  rotate: (i * 53) % 360,
  width: 8 + (i % 6),
  height: 12 + (i % 8),
  circular: i % 5 === 0,
  variant: i % 3,
}))

function toLocalFile(absPath: string | null): string | null {
  if (!absPath) return null
  const normalized = absPath.replace(/\\/g, '/')
  const encoded = normalized.split('/').map((seg: string, i: number) =>
    i === 0 && /^[A-Za-z]:$/.test(seg) ? seg : encodeURIComponent(seg)
  ).join('/')
  return `localfile:///${encoded}`
}

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
  activeRatings: Record<string, string> | null
  ratingsExiting: boolean
  improsiblePhase?: null | 'title' | 'shatter' | 'barrel' | 'vs' | 'final'
  improsibleFinalists?: [string, string] | null
  improsibleWinnerId?: string | null
}

export function ProjectionView({
  state,
  announcement,
  missionAnnouncement,
  missionAnnouncingOut,
  missionExiting,
  lastMission,
  scoreFlash,
  activeRatings,
  ratingsExiting,
  improsiblePhase,
  improsibleFinalists,
  improsibleWinnerId,
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
                  <div key={p.id} className="mission-card">
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
                  <div key={p.id} className="mission-card">
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
            <div key={p.id} className="participant-card">
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
          <div key={missionAnnouncement} className={`mission-announce-overlay${missionAnnouncingOut ? ' exiting' : ''}`}>
            <div className="mission-announce-backdrop" style={{ background: `rgba(0,0,0,${(state.overlayOpacity ?? 80) / 100})` }} />
            <div className="mission-announce-subtitle">Siguiente misión</div>
            <div className="mission-announce-name">{missionAnnouncement.toUpperCase()}</div>
          </div>
        )}

        {improsiblePhase === 'title' && (
          <div key="improsible-title" className="mission-final-overlay">
            <div className="mission-final-bg" style={{ background: 'rgba(0,0,0,0.95)' }} />
            <div className="mission-final-content">
              <div className="mission-final-caption">Misión Final</div>
              <div className="mission-final-rule" />
              <div className="mission-final-word mission-final-word--1">MISIÓN</div>
              <div className="mission-final-word mission-final-word--2">IMPROSIBLE</div>
              <div className="mission-final-rule mission-final-rule--2" />
            </div>
          </div>
        )}

        {(improsiblePhase === 'shatter' || improsiblePhase === 'barrel' || improsiblePhase === 'vs' || improsiblePhase === 'final') && improsibleFinalists && (
          <div className="improsible-shatter-overlay">
            {state.participants.slice(0, state.visibleParticipants).map((p, idx) => {
              const isFinalista = improsibleFinalists.includes(p.id)
              if (isFinalista) return null
              const total = state.participants.slice(0, state.visibleParticipants).length
              const col = total <= 2 ? idx : idx % Math.ceil(total / 2)
              const row = total <= 2 ? 0 : Math.floor(idx / Math.ceil(total / 2))
              const cols = total <= 2 ? total : Math.ceil(total / 2)
              const rows = total <= 2 ? 1 : Math.ceil(total / cols)
              return (
                <div
                  key={p.id}
                  className="improsible-shatter-card"
                  style={{
                    left: `${(col / cols) * 100}%`,
                    top: `${(row / rows) * 100}%`,
                    width: `${100 / cols}%`,
                    height: `${100 / rows}%`,
                  }}
                >
                  {p.photoPath && (
                    <img src={toLocalFile(p.photoPath) ?? ''} alt={p.name} className="improsible-shatter-img" />
                  )}
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className={`improsible-shard improsible-shard--${i}`} />
                  ))}
                </div>
              )
            })}
          </div>
        )}

        {improsiblePhase === 'final' && improsibleWinnerId && (() => {
          const winner = state.participants.find(p => p.id === improsibleWinnerId)
          return (
            <div className="improsible-winner-overlay">
              <div className="winner-confetti-container">
                {CONFETTI_DATA.map(c => (
                  <span
                    key={c.i}
                    className={`confetti-piece confetti-piece--v${c.variant}${c.circular ? ' confetti-piece--circle' : ''}`}
                    style={{
                      left: `${c.left}vw`,
                      background: c.color,
                      animationDelay: `${c.delay}s`,
                      animationDuration: `${c.duration}s`,
                      transform: `rotate(${c.rotate}deg)`,
                      width: `${c.width}px`,
                      height: `${c.height}px`,
                    }}
                  />
                ))}
              </div>
              <div className="winner-stage-wrapper">
                <div className="winner-stage">
                  <div className="winner-photo-ring">
                    {winner?.photoPath
                      ? <img className="winner-photo" src={toLocalFile(winner.photoPath) ?? ''} alt={winner?.name} />
                      : <div className="winner-photo-placeholder">{winner?.name?.[0] ?? '?'}</div>
                    }
                  </div>
                  <div className="winner-name">{winner?.name}</div>
                  <div className="winner-label">¡GANADOR!</div>
                  <div className="winner-sublabel">MEJOR AGENTE</div>
                </div>
              </div>
            </div>
          )
        })()}

        {improsiblePhase === 'vs' && improsibleFinalists && (() => {
          const fa = state.participants.find(p => p.id === improsibleFinalists[0])
          const fb = state.participants.find(p => p.id === improsibleFinalists[1])
          return (
            <div className="improsible-vs-overlay">
              <div className="improsible-vs-bg" />
              <div className="improsible-vs-label">¿Quién será el mejor agente?</div>
              <div className="improsible-vs-content">
                <div className="improsible-finalist-card improsible-finalist-card--a">
                  <div className="improsible-finalist-photo">
                    {fa?.photoPath
                      ? <img src={toLocalFile(fa.photoPath) ?? ''} alt={fa?.name} />
                      : <div className="improsible-finalist-placeholder">A</div>}
                  </div>
                  <div className="improsible-finalist-name">{fa?.name}</div>
                </div>
                <div className="improsible-vs-center">
                  <div className="improsible-vs-word">VS</div>
                </div>
                <div className="improsible-finalist-card improsible-finalist-card--b">
                  <div className="improsible-finalist-photo">
                    {fb?.photoPath
                      ? <img src={toLocalFile(fb.photoPath) ?? ''} alt={fb?.name} />
                      : <div className="improsible-finalist-placeholder">B</div>}
                  </div>
                  <div className="improsible-finalist-name">{fb?.name}</div>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
