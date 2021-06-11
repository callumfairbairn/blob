import React, { useContext, useEffect, useRef, useState } from 'react'
import './Card.scss'
import { CardType } from '../../types/card'
import { Suits } from '../../enums/suits'
import { CardBack } from '../CardBack/CardBack'
import { motion } from 'framer-motion'
import { handTypes } from '../../enums/handTypes'
import { AppContext, HandCardsType, nextTurnMap, PileCardsType } from '../../AppContext/AppContext'

const defaultAnimation = { x: 0, y: 0 }

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
  hidden: boolean
  movable?: boolean
  uid: string
  handType?: handTypes
  aiWantsToMoveThisCard?: boolean
}

const isPositionInsidePile = (mouseX: number, mouseY: number, pileRectangle: DOMRect | undefined): boolean => {
  if (pileRectangle) {
    const { x, y, width, height } = pileRectangle
    return (mouseX >= x && mouseX <= x + width) && (mouseY >= y && mouseY <= y + height)
  }
  return false
}

const handleResize = (
  selfRectangleRef: React.MutableRefObject<DOMRect | undefined>,
  pileRectangleRef: React.MutableRefObject<DOMRect | undefined>,
  pileCardSpaceRectangleRef: React.MutableRefObject<DOMRect | undefined>,
  uid: string,
  handType: handTypes
) => () => {
  selfRectangleRef.current = document.getElementById(uid)?.getBoundingClientRect()
  pileRectangleRef.current = document.getElementById('pile')?.getBoundingClientRect()
  pileCardSpaceRectangleRef.current = document.getElementById(`${handType}CardSpace`)?.getBoundingClientRect()
}

const getAnimation = (selfRectangle: DOMRect | undefined, pileCardSpaceRectangle: DOMRect | undefined, card: CardType) => {
  if (selfRectangle && pileCardSpaceRectangle) {
    const horizontalRestraint = pileCardSpaceRectangle.x - selfRectangle.x
    const verticalRestraint = pileCardSpaceRectangle.y - selfRectangle.y
    return { x: horizontalRestraint, y: verticalRestraint }
  }
  return defaultAnimation
}

const updatePileCards = (pileCards: PileCardsType, card: CardType, handType: handTypes, setPileCards: any) => {
  const pileCardsClone = { ...pileCards }
  pileCardsClone[handType] = card
  setPileCards(pileCardsClone)
}

const updateHandCards = (handCards: HandCardsType, card: CardType, handType: handTypes, setHandCards: any) => {
  const handCardsClone = { ...handCards }
  handCardsClone[handType] = handCardsClone[handType].filter(handCard => handCard !== card)
  setHandCards(handCardsClone)
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
