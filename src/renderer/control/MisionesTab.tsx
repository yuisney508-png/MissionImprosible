import React, { useState } from 'react'
import { PlusCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { AppState, Mission, MissionEntry, Performance, calcScore } from '../../shared/types'

interface Props { state: AppState }

const PERF_OPTIONS: { value: Performance; label: string; color: string }[] = [
  { value: 'excelente',  label: 'Excelente (+5)',  color: '#16a34a' },
  { value: 'aceptable',  label: 'Aceptable (+3)',  color: '#2563eb' },
  { value: 'regular',    label: 'Regular (+1)',    color: '#d97706' },
  { value: 'no_aplica',  label: 'No Aplica',       color: '#555' },
]

function defaultEntry(participantId: string): MissionEntry {
  return { participantId, participates: true, performance: 'no_aplica', nerfd: false }
}

function getMissionScore(mission: Mission, participantId: string): number {
  return calcScore([mission], participantId, 0)
}

export function MisionesTab({ state }: Props) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const addMission = () => {
    const id = crypto.randomUUID()
    const mission: Mission = {
      id,
      name: `Misión ${state.missions.length + 1}`,
      entries: state.participants.map(p => defaultEntry(p.id)),
    }
    window.electronAPI.addMission(mission)
  }

  const deleteMission = (id: string) => window.electronAPI.deleteMission(id)

  const renameMission = (mission: Mission, name: string) => {
    window.electronAPI.updateMission({ ...mission, name })
  }

  const updateEntry = (missionId: string, entry: MissionEntry) => {
    window.electronAPI.updateMissionEntry(missionId, entry)
  }

  const toggleCollapse = (id: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const visibleParticipants = state.participants.slice(0, state.visibleParticipants)

  return (
    <div className="misiones-root">
      {/* Score summary */}
      <div className="misiones-summary">
        {visibleParticipants.map(p => (
          <div key={p.id} className="summary-chip">
            <span className="summary-name">{p.name}</span>
            <span className="summary-score">{calcScore(state.missions, p.id, p.bonus)}</span>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #1a1a2e' }}>
        <button className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={addMission}>
          <PlusCircle size={15} /> Nueva misión
        </button>
      </div>

      {/* Mission list */}
      <div className="misiones-list">
        {state.missions.length === 0 && (
          <div style={{ color: '#444', textAlign: 'center', padding: '32px 0', fontSize: 13 }}>
            No hay misiones. Agrega una.
          </div>
        )}
        {state.missions.map(mission => {
          const isCollapsed = collapsed.has(mission.id)
          return (
            <div key={mission.id} className="mission-card">
              {/* Mission header */}
              <div className="mission-header">
                <button className="mission-collapse-btn" onClick={() => toggleCollapse(mission.id)}>
                  {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
                <input
                  className="mission-name-input"
                  value={mission.name}
                  onChange={e => renameMission(mission, e.target.value)}
                />
                <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => deleteMission(mission.id)}>
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Mission entries */}
              {!isCollapsed && (
                <table className="mission-table">
                  <thead>
                    <tr>
                      <th>Participante</th>
                      <th style={{ textAlign: 'center' }}>Participa</th>
                      <th>Desempeño</th>
                      <th style={{ textAlign: 'center' }}>Nerf</th>
                      <th style={{ textAlign: 'center' }}>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleParticipants.map(p => {
                      const entry = mission.entries.find(e => e.participantId === p.id)
                        ?? defaultEntry(p.id)
                      const pts = getMissionScore(mission, p.id)
                      return (
                        <tr key={p.id} style={{ opacity: entry.participates ? 1 : 0.45 }}>
                          <td className="mission-td-name">{p.name}</td>
                          <td style={{ textAlign: 'center' }}>
                            <input type="checkbox" checked={entry.participates}
                              onChange={e => updateEntry(mission.id, { ...entry, participates: e.target.checked })} />
                          </td>
                          <td>
                            <select
                              className="mission-select"
                              value={entry.performance}
                              disabled={!entry.participates}
                              style={{ color: PERF_OPTIONS.find(o => o.value === entry.performance)?.color }}
                              onChange={e => updateEntry(mission.id, { ...entry, performance: e.target.value as Performance })}
                            >
                              {PERF_OPTIONS.map(o => (
                                <option key={o.value} value={o.value} style={{ color: o.color }}>{o.label}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <input type="checkbox" checked={entry.nerfd}
                              disabled={!entry.participates}
                              onChange={e => updateEntry(mission.id, { ...entry, nerfd: e.target.checked })} />
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: 700, color: pts > 0 ? '#b5d99c' : pts < 0 ? '#f87171' : '#666' }}>
                            {pts > 0 ? `+${pts}` : pts}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
