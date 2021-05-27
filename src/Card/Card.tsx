import React from 'react'
import './Card.scss'
import { CardType } from '../types/card'
import { Suits } from '../enums/suits'

type CardProps = {
  card: CardType
}


export const Card = ({ card }: CardProps) => {
  const className = (card.suit === Suits.Clubs || card.suit === Suits.Spades) ? 'black-card' : 'red-card'
  return (
    <div className={className} data-testid="card" id="card">
      <div className="suit">
        {card.suit}
      </div>
      <div className="suit">
        {card.suit}
      </div>
      <div className="number">
        {card.value}
      </div>
      <div className="suit">
        {card.suit}
      </div>
      <div className="suit">
        {card.suit}
      </div>
    </div>
  )
}
