import React, { useContext } from 'react'
import { AppContext } from '../../AppContext/AppContext'
import './CardBackSettingsPicker.scss'

export const diamondLimit = 35;

export const CardBackSettingsPicker = () => {
  const { cardBackDiamondNumber, setCardBackDiamondNumber } = useContext(AppContext)

  return (
    <div className="cardBackSettingsPicker">
      Back of card settings
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
    </div>
  )
}