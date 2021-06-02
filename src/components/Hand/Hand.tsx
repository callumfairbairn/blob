import React from 'react'
import { CardType } from '../../types/card'
import { Card } from '../Card/Card'
import './Hand.scss'
import { handTypes } from '../../enums/handTypes'
import { getUUID } from '../../functions/getUUID'

type HandProps = {
  cards: CardType[]
  handType: handTypes
}

export const Hand = ({ cards, handType }: HandProps) => {
  const getZIndex = (index: number) => {
    if (handType === handTypes.Front || handType === handTypes.Left) {
    return cards.length - index
    }
    return cards.length + index
  }

  return (
    <div className="hand" data-testid="hand" id={`${handType}Hand`}>
      {cards.map((card, index) =>
        <div className={`${handType}HandCard`} style={{ zIndex: getZIndex(index) }} key={index}>
          <Card card={card} zIndex={getZIndex(index)} key={index} hidden={handType !== handTypes.Front} movable={handType === handTypes.Front} uuid={getUUID()} />
        </div>
      )}
    </div>
  )
}