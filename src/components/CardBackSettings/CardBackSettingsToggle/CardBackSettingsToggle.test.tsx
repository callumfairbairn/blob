import { cleanup, render, screen } from '@testing-library/react'
import { CardBackSettingsToggle } from './CardBackSettingsToggle'
import userEvent from '@testing-library/user-event'
import { expect } from '@jest/globals'

const cleanupAndRenderComponent = (showSettings: boolean, setShowSettings: any) => {
  cleanup()
  render(<CardBackSettingsToggle showSettings={showSettings} setShowSettings={setShowSettings} />)
}

describe('CardBackSettingsToggle', () => {
  it('calls setShowSettings with true and changes to - when clicked once', () => {
    let showSettings = false;
    const setShowSettings = jest.fn().mockImplementation((input: boolean) => { showSettings = input })

    cleanupAndRenderComponent(showSettings, setShowSettings)

    userEvent.click(screen.getByText('+'))
    cleanupAndRenderComponent(showSettings, setShowSettings)

    expect(setShowSettings).toHaveBeenLastCalledWith(true)

    expect(screen.getByText('-')).toBeDefined()
  })

  it('calls setShowSettings with false and changes to + when clicked twice', () => {
    let showSettings = false;
    const setShowSettings = jest.fn().mockImplementation((input: boolean) => { showSettings = input })

    cleanupAndRenderComponent(showSettings, setShowSettings)

    userEvent.click(screen.getByText('+'))
    cleanupAndRenderComponent(showSettings, setShowSettings)
    userEvent.click(screen.getByText('-'))
    cleanupAndRenderComponent(showSettings, setShowSettings)

    expect(setShowSettings).toHaveBeenLastCalledWith(false)

    expect(screen.getByText('+')).toBeDefined()
  })

})