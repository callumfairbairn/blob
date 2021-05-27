import React from 'react'
import './Card.scss'
import { CardType } from '../types/card'

type CardProps = {
    card: CardType
}

export const Card = ({ card }: CardProps) => {
    return (
        <div className="card">
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
