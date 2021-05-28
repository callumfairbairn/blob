import React from 'react'
import './Card.scss'
import { CardType } from '../../types/card'
import { Suits } from '../../enums/suits'

type CardProps = {
  card: CardType
  zIndex?: number
}


export const Card = ({ card, zIndex }: CardProps) => {
  const className = (card.suit === Suits.Clubs || card.suit === Suits.Spades) ? 'blackCard' : 'redCard'
  return (
    <div className={className} data-testid="card" id="card" style={{ zIndex }}>
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
