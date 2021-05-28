import React from 'react'
import { CardType } from '../../types/card'
import { Card } from '../Card/Card'
import './Pile.scss'

type PileProps = {
  frontCard?: CardType
  backCard?: CardType
  leftCard?: CardType
  rightCard?: CardType
}

export const Pile = ({ frontCard, backCard, leftCard, rightCard }: PileProps) => {
  return (
    <div className="pile" data-testid="pile" >
      <div className="pileCard" id="backCard">
        {backCard && <Card card={backCard}/>}
      </div>
      <div className="pileCard" id="leftCard">
        {leftCard && <Card card={leftCard}/>}
      </div>
      <div className="pileCard" id="rightCard">
        {rightCard && <Card card={rightCard}/>}
      </div>
      <div className="pileCard" id="frontCard">
        {frontCard && <Card card={frontCard}/>}
      </div>
    </div>
  )
}