import React from 'react'
import './Card.scss'
import { CardType } from '../../types/card'
import { Suits } from '../../enums/suits'
import { CardBack } from '../CardBack/CardBack'

type CardContentProps = {
  card: CardType
}

const CardContent = ({ card }: CardContentProps) => (<>
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
</>)

type CardProps = {
  card: CardType
  zIndex?: number
  hidden: boolean
}

export const Card = ({ card, zIndex, hidden }: CardProps) => {
  const className = (card.suit === Suits.Clubs || card.suit === Suits.Spades) ? 'blackCard' : 'redCard'
  return (
    <div className={className} data-testid="card" id="card" style={{ zIndex }}>
      {hidden ? <CardBack /> : <CardContent card={card} />}
    </div>
  )
}
