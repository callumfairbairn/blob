import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext/AppContext'
import './CardBackSettingsPicker.scss'

export const diamondLimit = 35;

const rotateColourSetUp = (colourSet: string[]) => [colourSet[2], colourSet[0], colourSet[1]]
const rotateColourSetDown = (colourSet: string[]) => [colourSet[1], colourSet[2], colourSet[0]]

type CardBackSettingsPickerProps = {
  showSettings: boolean,
}

export const CardBackSettingsPicker = ({ showSettings }: CardBackSettingsPickerProps) => {
  const { cardBackDiamondNumber, setCardBackDiamondNumber, cardBackColoursIndex, setCardBackColoursIndex, colourSets, setColourSets } = useContext(AppContext)

  return (
    <div className={`${showSettings ? 'cardBackSettingsPicker' : 'hidden'}`}>
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
                cardBackColoursIndex === colourSets.length - 1 ? 0 : cardBackColoursIndex + 1
              )
            }
            data-testid="upColourButton"
          />
          <div
            className="colourButton"
            id="downColourButton"
            onClick={
              () => setCardBackColoursIndex(
                cardBackColoursIndex === 0 ? colourSets.length - 1 : cardBackColoursIndex - 1
              )
            }
            data-testid="downColourButton"
          />
        </div>
      </div>
      <div className="colourChanger">
        Rotate colours
        <div className="buttonContainer">
          <div
            className="colourButton"
            id="upColourRotatorButton"
            onClick={
              () => setColourSets(
                colourSets.map((colourSet: string[], index: number) => index === cardBackColoursIndex ? rotateColourSetUp(colourSet) : colourSet)
              )
            }
            data-testid="upColourRotatorButton"
          />
          <div
            className="colourButton"
            id="downColourRotatorButton"
            onClick={
              () => setColourSets(
                colourSets.map((colourSet: string[], index: number) => index === cardBackColoursIndex ? rotateColourSetDown(colourSet) : colourSet)
              )
            }
            data-testid="downColourRotatorButton"
          />
        </div>
      </div>
    </div>
  )
}