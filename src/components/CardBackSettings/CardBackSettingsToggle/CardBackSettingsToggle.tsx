import React from 'react'
import './CardBackSettingsToggle.scss'

type CardBackSettingsToggleProps = {
  showSettings: boolean
  setShowSettings: any
}

export const CardBackSettingsToggle = ({ showSettings, setShowSettings }: CardBackSettingsToggleProps) => {
  return (
    <div
      className="cardBackSettingsToggle"
      data-testid="cardBackSettingsToggle"
      onClick={() => {setShowSettings(!showSettings)}}
    >
      {showSettings ? '-' : '+'}
    </div>
  )
}