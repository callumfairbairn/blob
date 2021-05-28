import React from 'react'
import { CardType } from '../../types/card'
import { Card } from '../Card/Card'
import './Hand.scss'

type HandProps = {
  cards: CardType[]
}

export const Hand = ({ cards }: HandProps) => {
  return (
    <div className="hand" data-testid="hand">
      {cards.map((card, index) => <Card card={card} zIndex={cards.length - index} key={index} />)}
    </div>
  )
}