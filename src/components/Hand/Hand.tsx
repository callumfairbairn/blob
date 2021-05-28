import React from 'react'
import { CardType } from '../../types/card'
import { Card } from '../Card/Card'
import './Hand.scss'
import { handTypes } from '../../enums/handTypes'

type HandProps = {
  cards: CardType[]
  handType: handTypes
}

export const Hand = ({ cards, handType }: HandProps) => {
  return (
    <div className="hand" data-testid="hand" id={`${handType}Hand`}>
      {cards.map((card, index) =>
        <div className={`${handType}HandCard`} key={index}>
          <Card card={card} zIndex={cards.length - index} key={index}/>
        </div>
      )}
    </div>
  )
}