import React, { useContext } from 'react'
import { AppContext } from '../../AppContext/AppContext'
import './CardBackSettingsPicker.scss'
import { cardBackColours } from '../../cardBackColours'

export const diamondLimit = 35;

export const CardBackSettingsPicker = () => {
  const { cardBackDiamondNumber, setCardBackDiamondNumber, cardBackColoursIndex, setCardBackColoursIndex } = useContext(AppContext)

  return (
    <div className="cardBackSettingsPicker">
      Card back settings
      <div className="diamondsChanger">
        Number of diamonds
        <div className="buttonContainer">
          <div
            className="diamondsButton"
            id="moreDiamondsButton"
            onClick={
              () => setCardBackDiamondNumber(
                cardBackDiamondNumber === diamondLimit ? diamondLimit : cardBackDiamondNumber + 1
              )
            }
            data-testid="moreDiamondsButton"
          />
          <div
            className="diamondsButton"
            id="fewerDiamondsButton"
            onClick={
              () => setCardBackDiamondNumber(
                cardBackDiamondNumber === 1 ? 1 : cardBackDiamondNumber - 1
              )
            }
            data-testid="fewerDiamondsButton"
          />
        </div>
      </div>
      <div className="colourChanger">
        Colour
        <div className="buttonContainer">
          <div
            className="colourButton"
            id="upColourButton"
            onClick={
              () => setCardBackColoursIndex(
                cardBackColoursIndex === cardBackColours.length - 1 ? 0 : cardBackColoursIndex + 1
              )
            }
            data-testid="upColourButton"
          />
          <div
            className="colourButton"
            id="downColourButton"
            onClick={
              () => setCardBackColoursIndex(
                cardBackColoursIndex === 0 ? cardBackColours.length - 1 : cardBackColoursIndex - 1
              )
            }
            data-testid="downColourButton"
          />
        </div>
      </div>
    </div>
  )
}