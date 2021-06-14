import React, { useContext, useEffect, useRef, useState } from 'react'
import './Card.scss'
import { Suits } from '../../enums/suits'
import { CardBack } from '../CardBack/CardBack'
import { motion } from 'framer-motion'
import { handTypes } from '../../enums/handTypes'
import { AppContext, nextTurnMap } from '../../AppContext/AppContext'
import { cardValues } from '../../enums/cardValues'
import { CardType } from '../../types/cardType'
import {
  defaultAnimation,
  getAnimation,
  handleResize,
  isPositionInsidePile,
  updateHandCards,
  updatePileCards
} from './helpers'

type CardContentProps = {
  card: CardType
}

const CardContent = ({ card: { suit, value } }: CardContentProps) => <>
  <div className="suit">
    {suit}
  </div>
  <div className="suit">
    {suit}
  </div>
  <div className="number">
    {cardValues[value]}
  </div>
  <div className="suit">
    {suit}
  </div>
  <div className="suit">
    {suit}
  </div>
</>

type CardProps = {
  card: CardType
  hidden: boolean
  movable?: boolean
  uid: string
  handType?: handTypes
  aiWantsToMoveThisCard?: boolean
}

export const Card = ({ card, hidden, movable = false, uid, handType = handTypes.Front, aiWantsToMoveThisCard = false }: CardProps) => {
  const [isCardOverPile, setIsCardOverPile] = useState(false)
  const { pileCards, setPileCards, handCards, setHandCards, turn, setTurn } = useContext(AppContext)
  const className = (card.suit === Suits.Clubs || card.suit === Suits.Spades) ? 'blackCard' : 'redCard'
  const selfRectangleRef = useRef<DOMRect | undefined>(undefined)
  const pileRectangleRef = useRef<DOMRect | undefined>(undefined)
  const pileCardSpaceRectangleRef = useRef<DOMRect | undefined>(undefined)

  const [animation, setAnimation] = useState(
    aiWantsToMoveThisCard ? getAnimation(selfRectangleRef.current, pileCardSpaceRectangleRef.current, card) : defaultAnimation
  )

  useEffect(() => {
    window.addEventListener(
      'resize',
      handleResize(selfRectangleRef, pileRectangleRef, pileCardSpaceRectangleRef, uid, handType)
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize(selfRectangleRef, pileRectangleRef, pileCardSpaceRectangleRef, uid, handType)
      )
    }
  },[handType, uid])

  useEffect(() => {
    selfRectangleRef.current = document.getElementById(uid)?.getBoundingClientRect()
    pileRectangleRef.current = document.getElementById('pile')?.getBoundingClientRect()
    pileCardSpaceRectangleRef.current = document.getElementById(`${handType}CardSpace`)?.getBoundingClientRect()
  }, [handType, uid])

  useEffect(() => {
    setAnimation(isCardOverPile ? getAnimation(selfRectangleRef.current, pileCardSpaceRectangleRef.current, card) : defaultAnimation)
  }, [card, isCardOverPile])

  useEffect(() => {
    setAnimation(aiWantsToMoveThisCard ? getAnimation(selfRectangleRef.current, pileCardSpaceRectangleRef.current, card) : defaultAnimation)
  }, [turn, aiWantsToMoveThisCard, card])

  return (
    <motion.div
      className={`${className} card`}
      data-testid="card"
      id={uid}
      drag={movable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.85}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 40, mass: 1.5 }}
      animate={animation}
      onDragEnd={
        (event: PointerEvent) => {
          setIsCardOverPile(isPositionInsidePile(event.x, event.y, pileRectangleRef.current))
        }
      }
      layout="position"
      onAnimationComplete={(definition: any) => {
        if (Math.floor(definition.x) !== 0 && Math.floor(definition.y) !== 0 && handType && pileCards) {
          setTurn(nextTurnMap[handType])
          updatePileCards(pileCards, card, handType, setPileCards)
          updateHandCards(handCards, card, handType, setHandCards)
        }
      }}
    >
      {hidden ? <CardBack /> : <CardContent card={card} />}
    </motion.div>
  )
}
