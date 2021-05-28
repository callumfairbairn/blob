import { CardBackSettingsPicker } from './CardBackSettingsPicker'
import { render, screen } from '@testing-library/react'
import { AppContextProvider } from '../../AppContext/AppContext'
import userEvent from '@testing-library/user-event'

describe('CardBackSettingsPicker', () => {
  it('increases the number of diamonds on the cards when the up button is clicked', () => {
    const setCardBackDiamondNumber = jest.fn()
    const appProviderValues = { cardBackDiamondNumber: 6, setCardBackDiamondNumber }

    render(
      <AppContextProvider values={appProviderValues}>
        <CardBackSettingsPicker />
      </AppContextProvider>
    )

    userEvent.click(screen.getByTestId('moreDiamondsButton'))

    expect(setCardBackDiamondNumber).toHaveBeenCalledWith(7)
  })

  it('decreases the number of diamonds on the cards when the down button is clicked', () => {
    const setCardBackDiamondNumber = jest.fn()
    const appProviderValues = { cardBackDiamondNumber: 6, setCardBackDiamondNumber }

    render(
      <AppContextProvider values={appProviderValues}>
        <CardBackSettingsPicker />
      </AppContextProvider>
    )

    userEvent.click(screen.getByTestId('fewerDiamondsButton'))

    expect(setCardBackDiamondNumber).toHaveBeenCalledWith(5)
  })
})