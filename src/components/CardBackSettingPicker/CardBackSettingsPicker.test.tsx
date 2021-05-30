import { CardBackSettingsPicker, diamondLimit } from './CardBackSettingsPicker'
import { render, screen } from '@testing-library/react'
import { AppContextProvider } from '../../AppContext/AppContext'
import userEvent from '@testing-library/user-event'

const renderComponent = (appProviderValues: object) => {
  render(
    <AppContextProvider values={appProviderValues}>
      <CardBackSettingsPicker />
    </AppContextProvider>
  )
}

describe('CardBackSettingsPicker', () => {
  describe('diamond buttons', () => {
    describe('when increasing number of diamonds', () => {
      it('calls setCardBackDiamondNumber with a number one greater than the current number', () => {
        const setCardBackDiamondNumber = jest.fn()
        const appProviderValues = { cardBackDiamondNumber: 6, setCardBackDiamondNumber }
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('moreDiamondsButton'))

        expect(setCardBackDiamondNumber).toHaveBeenCalledWith(7)
      })

      it('does not increase the number when the limit is hit', () => {
        const setCardBackDiamondNumber = jest.fn()
        const appProviderValues = { cardBackDiamondNumber: diamondLimit, setCardBackDiamondNumber }
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('moreDiamondsButton'))

        expect(setCardBackDiamondNumber).toHaveBeenCalledWith(diamondLimit)
      })
    })
    describe('when decreasing number of diamonds', () => {
      it('calls setCardBackDiamondNumber with a number one less than the current number', () => {
        const setCardBackDiamondNumber = jest.fn()
        const appProviderValues = { cardBackDiamondNumber: 6, setCardBackDiamondNumber }
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('fewerDiamondsButton'))

        expect(setCardBackDiamondNumber).toHaveBeenCalledWith(5)
      })

      it('does not decrease the number when it is 1', () => {
        const setCardBackDiamondNumber = jest.fn()
        const appProviderValues = { cardBackDiamondNumber: 1, setCardBackDiamondNumber }
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('fewerDiamondsButton'))

        expect(setCardBackDiamondNumber).toHaveBeenCalledWith(1)
      })
    })
  })

  describe('colour buttons', () => {
    const colourSets = [['#F2F5EA', '#E75A7C', '#2C363F',]]
    describe('when clicking the up button', () => {
      it('increases the index by one', () => {
        const setCardBackColoursIndex = jest.fn();
        const appProviderValues = { cardBackColoursIndex: 3, setCardBackColoursIndex , colourSets}
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('upColourButton'))

        expect(setCardBackColoursIndex).toHaveBeenCalledWith(4)
      })

      it('wraps back round to 0 when the index is equal to the length of the cardBackColours array - 1', () => {
        const setCardBackColoursIndex = jest.fn();
        const appProviderValues = { cardBackColoursIndex: colourSets.length - 1, setCardBackColoursIndex, colourSets }
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('upColourButton'))

        expect(setCardBackColoursIndex).toHaveBeenCalledWith(0)
      })
    })

    describe('when clicking the down button', () => {
      it('decreases the index by one', () => {
        const setCardBackColoursIndex = jest.fn();
        const appProviderValues = { cardBackColoursIndex: 3, setCardBackColoursIndex }
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('downColourButton'))

        expect(setCardBackColoursIndex).toHaveBeenCalledWith(2)
      })

      it('wraps back round to the length of the cardBackColours array - 1 if index is 0', () => {
        const setCardBackColoursIndex = jest.fn();
        const appProviderValues = { cardBackColoursIndex: 0, setCardBackColoursIndex, colourSets }
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('downColourButton'))

        expect(setCardBackColoursIndex).toHaveBeenCalledWith(colourSets.length - 1)
      })
    })

  })

  describe('colour rotator buttons', () => {
    describe('when clicking the up button', () => {
      const colourSets = [
        [
          '#F2F5EA',
          '#E75A7C',
          '#2C363F',
        ],
        [
          '#8A8E91',
          '#855A5C',
          '#66101F',
        ],
        [
          '#AEA4BF',
          '#E3E4DB',
          '#CDCDCD',
        ],
      ]
      it('rotates the colours one direction', () => {
        const setColourSets = jest.fn();
        const appProviderValues = { colourSets, setColourSets, cardBackColoursIndex: 1 }
        const expectedColourSets = [
          [
            '#F2F5EA',
            '#E75A7C',
            '#2C363F',
          ],
          [
            '#66101F',
            '#8A8E91',
            '#855A5C',
          ],
          [
            '#AEA4BF',
            '#E3E4DB',
            '#CDCDCD',
          ],
        ]
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('upColourRotatorButton'))

        expect(setColourSets).toHaveBeenCalledWith(expectedColourSets)
      })

      it('rotates the colours in the other direction direction', () => {
        const setColourSets = jest.fn();
        const appProviderValues = { colourSets, setColourSets, cardBackColoursIndex: 1 }
        const expectedColourSets = [
          [
            '#F2F5EA',
            '#E75A7C',
            '#2C363F',
          ],
          [
            '#855A5C',
            '#66101F',
            '#8A8E91',
          ],
          [
            '#AEA4BF',
            '#E3E4DB',
            '#CDCDCD',
          ],
        ]
        renderComponent(appProviderValues)

        userEvent.click(screen.getByTestId('downColourRotatorButton'))

        expect(setColourSets).toHaveBeenCalledWith(expectedColourSets)
      })
    })
  })
})