import React from 'react'
import { createRoot } from 'react-dom/client'
import { ControlApp } from './ControlApp'
import './control.css'

const root = createRoot(document.getElementById('root')!)
root.render(<ControlApp />)
