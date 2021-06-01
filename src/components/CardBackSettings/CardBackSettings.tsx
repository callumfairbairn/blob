import React, { useState } from 'react'
import { CardBackSettingsPicker } from './CardBackSettingPicker/CardBackSettingsPicker'
import { CardBackSettingsToggle } from './CardBackSettingsToggle/CardBackSettingsToggle'

export const CardBackSettings = () => {
  const [ showSettings, setShowSettings ] = useState(false)
  return (
    <div className="cardBackSettings">
      <CardBackSettingsToggle showSettings={showSettings} setShowSettings={setShowSettings} />
      <CardBackSettingsPicker showSettings={showSettings} />
    </div>
  )
}