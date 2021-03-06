import React, { useContext, useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import './Hand.scss'
import { handTypes } from '../../enums/handTypes'
import { motion } from 'framer-motion'
import { AppContext } from '../../AppContext/AppContext'
import { CardType } from '../../types/cardType'

type HandProps = {
  cards: CardType[]
  handType: handTypes,
}


export const Hand = ({ cards, handType }: HandProps) => {
  const { turn } = useContext(AppContext)
  const [cardToMove, setCardToMove] = useState<CardType | undefined>()

  const getZIndex = (index: number) => {
    if (handType === handTypes.Front || handType === handTypes.Left) {
    return cards.length - index
    }
    return cards.length + index
  }
  const getUID = (card: CardType) => `${card.suit}-${card.value}-${handType}`
  const movable = handType === handTypes.Front
  const aiTurn = handType !== handTypes.Front && turn === handType

  useEffect(() => {
    setCardToMove(aiTurn ? cards[Math.floor(Math.random() * cards.length)] : undefined)
  }, [aiTurn, cards, turn])

  return (
    <div className="hand" data-testid="hand" id={`${handType}Hand`}>
      {cards.map((card, index) =>
        <motion.div
          className={`${handType}HandCard`}
          style={{ zIndex: getZIndex(index) }}
          key={getUID(card)}
          whileHover={ movable ? {
            scale: 1.1,
            transition: { duration: 0.2 },
            zIndex: 99,
            position: 'relative',
          } : {}}
        >
          <Card
            card={card}
            key={getUID(card)}
            hidden={handType !== handTypes.Front}
            movable={movable}
            uid={getUID(card)}
            handType={handType}
            aiWantsToMoveThisCard={card === cardToMove}
          />
        </motion.div>
      )}
    </div>
  )
}