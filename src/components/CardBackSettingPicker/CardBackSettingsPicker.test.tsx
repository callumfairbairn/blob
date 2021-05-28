import { CardBackSettingsPicker, diamondLimit } from './CardBackSettingsPicker'
import { render, screen } from '@testing-library/react'
import { AppContextProvider } from '../../AppContext/AppContext'
import userEvent from '@testing-library/user-event'

describe('CardBackSettingsPicker', () => {
  describe('when increasing number of diamonds', () => {
    it('calls setCardBackDiamondNumber with a number one greater than the current number', () => {
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

    it('does not increase the number when the limit is hit', () => {
      const setCardBackDiamondNumber = jest.fn()
      const appProviderValues = { cardBackDiamondNumber: diamondLimit, setCardBackDiamondNumber }

      render(
        <AppContextProvider values={appProviderValues}>
          <CardBackSettingsPicker />
        </AppContextProvider>
      )

      userEvent.click(screen.getByTestId('moreDiamondsButton'))

      expect(setCardBackDiamondNumber).toHaveBeenCalledWith(diamondLimit)
    })
  })

  describe('when decreasing number of diamonds', () => {
    it('calls setCardBackDiamondNumber with a number one less than the current number', () => {
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
    it('does not decrease the number when it is 1', () => {
      const setCardBackDiamondNumber = jest.fn()
      const appProviderValues = { cardBackDiamondNumber: 1, setCardBackDiamondNumber }

      render(
        <AppContextProvider values={appProviderValues}>
          <CardBackSettingsPicker />
        </AppContextProvider>
      )

      userEvent.click(screen.getByTestId('fewerDiamondsButton'))

      expect(setCardBackDiamondNumber).toHaveBeenCalledWith(1)
    })
  })
})