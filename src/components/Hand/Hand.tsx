import React, { useContext } from 'react'
import { CardType } from '../../types/card'
import { Card } from '../Card/Card'
import './Hand.scss'
import { handTypes } from '../../enums/handTypes'
import { motion } from 'framer-motion'
import { AppContext } from '../../AppContext/AppContext'

type HandProps = {
  cards: CardType[]
  handType: handTypes,
}


export const Hand = ({ cards, handType }: HandProps) => {
  const { turn } = useContext(AppContext)
  const getZIndex = (index: number) => {
    if (handType === handTypes.Front || handType === handTypes.Left) {
    return cards.length - index
    }
    return cards.length + index
  }
  const getUID = (card: CardType) => `${card.suit}-${card.value}-${handType}`
  const movable = handType === turn

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
          />
        </motion.div>
      )}
    </div>
  )
}