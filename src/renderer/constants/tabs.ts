import React from 'react'
import { Users, Flag, Settings, Crosshair, Target, Film, Zap } from 'lucide-react'

export type TabId = 'participantes' | 'objetivos' | 'desafios' | 'misiones' | 'cinematicas' | 'improsible' | 'configuracion'

export const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: 'participantes', label: 'Participantes',     Icon: Users },
  { id: 'misiones',      label: 'Misiones',          Icon: Crosshair },
  { id: 'objetivos',     label: 'Objetivos',         Icon: Flag },
  { id: 'desafios',      label: 'Desafíos',          Icon: Target },
  { id: 'cinematicas',   label: 'Cinemáticas',       Icon: Film },
  { id: 'improsible',    label: 'Misión Improsible', Icon: Zap },
  { id: 'configuracion', label: 'Configuración',     Icon: Settings },
]
