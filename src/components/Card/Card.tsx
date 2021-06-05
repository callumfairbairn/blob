import React, { useContext, useEffect, useRef, useState } from 'react'
import './Card.scss'
import { CardType } from '../../types/card'
import { Suits } from '../../enums/suits'
import { CardBack } from '../CardBack/CardBack'
import { motion } from 'framer-motion'
import { handTypes } from '../../enums/handTypes'
import { AppContext, HandCardsType, PileCardsType } from '../../AppContext/AppContext'

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
  zIndex?: number
  hidden: boolean
  movable?: boolean
  uid: string
  handType?: handTypes
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
  frontCardSpaceRectangleRef: React.MutableRefObject<DOMRect | undefined>,
  uid: string) => () => {
  selfRectangleRef.current = document.getElementById(uid)?.getBoundingClientRect()
  pileRectangleRef.current = document.getElementById('pile')?.getBoundingClientRect()
  frontCardSpaceRectangleRef.current = document.getElementById('frontCardSpace')?.getBoundingClientRect()
}

const getAnimation = (isCardInPile: boolean, selfRectangle: DOMRect | undefined, frontCardSpaceRectangle: DOMRect | undefined, card: CardType) => {
  if (isCardInPile && selfRectangle && frontCardSpaceRectangle) {
    const horizontalRestraint = frontCardSpaceRectangle.x - selfRectangle.x
    const verticalRestraint = frontCardSpaceRectangle.y - selfRectangle.y
    return { x: horizontalRestraint, y: verticalRestraint }
  }
  return { x: 0, y: 0 }
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

export const Card = ({ card, zIndex, hidden, movable = false, uid, handType}: CardProps) => {
  const [isCardInPile, setIsCardInPile] = useState(false)
  const [animation, setAnimation] = useState(defaultAnimation)
  const { pileCards, setPileCards, handCards, setHandCards } = useContext(AppContext)
  const className = (card.suit === Suits.Clubs || card.suit === Suits.Spades) ? 'blackCard' : 'redCard'
  const selfRectangleRef = useRef<DOMRect | undefined>(undefined)
  const pileRectangleRef = useRef<DOMRect | undefined>(undefined)
  const frontCardSpaceRectangleRef = useRef<DOMRect | undefined>(undefined)

  useEffect(() => {
    window.addEventListener(
      'resize',
      handleResize(selfRectangleRef, pileRectangleRef, frontCardSpaceRectangleRef, uid)
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize(selfRectangleRef, pileRectangleRef, frontCardSpaceRectangleRef, uid)
      )
    }
  },[uid])

  useEffect(() => {
    selfRectangleRef.current = document.getElementById(uid)?.getBoundingClientRect()
    pileRectangleRef.current = document.getElementById('pile')?.getBoundingClientRect()
    frontCardSpaceRectangleRef.current = document.getElementById('frontCardSpace')?.getBoundingClientRect()
  }, [uid])

  useEffect(() => {
    setAnimation(getAnimation(isCardInPile, selfRectangleRef.current, frontCardSpaceRectangleRef.current, card))
  }, [card, isCardInPile])

  useEffect(() => {
    setIsCardInPile(false)
  }, [setIsCardInPile, pileCards])

  return (
    <motion.div
      className={`${className} card`}
      data-testid="card"
      id={uid}
      style={{ zIndex }}
      drag={movable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.85}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 40, mass: 1.5 }}
      animate={animation}
      onDragEnd={
        (event: PointerEvent) => {
          setIsCardInPile(isPositionInsidePile(event.x, event.y, pileRectangleRef.current))
        }
      }
      layout="position"
      onAnimationComplete={(definition: any) => {
        if (Math.floor(definition.x) !== 0 && Math.floor(definition.y) !== 0 && handType && pileCards) {
          updatePileCards(pileCards, card, handType, setPileCards)
          updateHandCards(handCards, card, handType, setHandCards)
        }
      }}
    >
      {hidden ? <CardBack /> : <CardContent card={card} />}
    </motion.div>
  )
}
