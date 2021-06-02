import React from 'react'
import { CardType } from '../../types/card'
import { Card } from '../Card/Card'
import './Pile.scss'
import { getUUID } from '../../functions/getUUID'

type PileProps = {
  frontCard?: CardType
  backCard?: CardType
  leftCard?: CardType
  rightCard?: CardType
}

export const Pile = ({ frontCard, backCard, leftCard, rightCard }: PileProps) => {
  return (
    <div className="pile" data-testid="pile" id="pile">
      <div className="pileCard" id="backCard">
        <div id="backCardSpace">
          {backCard && <Card card={backCard} hidden={false} uuid={getUUID()} />}
        </div>
      </div>
      <div className="pileCard" id="leftCard">
        <div id="leftCardSpace">
          {leftCard && <Card card={leftCard} hidden={false} uuid={getUUID()} />}
        </div>
      </div>
      <div className="pileCard" id="rightCard">
        <div id="rightCardSpace">
          {rightCard && <Card card={rightCard} hidden={false} uuid={getUUID()} />}
        </div>
      </div>
      <div className="pileCard" id="frontCard">
        <div id="frontCardSpace">
          {frontCard && <Card card={frontCard} hidden={false} uuid={getUUID()} />}
        </div>
      </div>
    </div>
  )
}