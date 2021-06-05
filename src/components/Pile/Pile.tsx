import React from 'react'
import { CardType } from '../../types/card'
import { Card } from '../Card/Card'
import './Pile.scss'
import { handTypes } from '../../enums/handTypes'

type PileProps = {
  [handTypes.Front]?: CardType,
  [handTypes.Back]?: CardType,
  [handTypes.Left]?: CardType,
  [handTypes.Right]?: CardType,
}

export const Pile = ({ front, back, left, right }: PileProps) => {
  return (
    <div className="pile" data-testid="pile" id="pile">
      <div className="pileCard" id="backCard">
        <div id="backCardSpace">
          {back && <Card card={back} hidden={false} uid='pileBackCard' />}
        </div>
      </div>
      <div className="pileCard" id="leftCard">
        <div id="leftCardSpace">
          {left && <Card card={left} hidden={false} uid='pileLeftCard' />}
        </div>
      </div>
      <div className="pileCard" id="rightCard">
        <div id="rightCardSpace">
          {right && <Card card={right} hidden={false} uid='pileRightCard' />}
        </div>
      </div>
      <div className="pileCard" id="frontCard">
        <div id="frontCardSpace">
          {front && <Card card={front} hidden={false} uid='pileFrontCard' />}
        </div>
      </div>
    </div>
  )
}