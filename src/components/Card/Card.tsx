import React, { useEffect, useRef, useState } from 'react'
import './Card.scss'
import { CardType } from '../../types/card'
import { Suits } from '../../enums/suits'
import { CardBack } from '../CardBack/CardBack'
import { motion } from 'framer-motion'

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
  uuid: string
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
  uuid: string) => () => {
  selfRectangleRef.current = document.getElementById(uuid)?.getBoundingClientRect()
  pileRectangleRef.current = document.getElementById('pile')?.getBoundingClientRect()
  frontCardSpaceRectangleRef.current = document.getElementById('frontCardSpace')?.getBoundingClientRect()
}

const getAnimation = (isCardInPile: boolean, selfRectangle: DOMRect | undefined, frontCardSpaceRectangle: DOMRect | undefined) => {
  if (isCardInPile && selfRectangle && frontCardSpaceRectangle) {
    const horizontalRestraint = frontCardSpaceRectangle.x - selfRectangle.x
    const verticalRestraint = frontCardSpaceRectangle.y - selfRectangle.y
    return { x: horizontalRestraint, y: verticalRestraint }
  }
  return { x: 0, y: 0 }
}

export const Card = ({ card, zIndex, hidden, movable = false, uuid }: CardProps) => {
  const [isCardInPile, setIsCardInPile] = useState(false)
  const className = (card.suit === Suits.Clubs || card.suit === Suits.Spades) ? 'blackCard' : 'redCard'
  const selfRectangleRef = useRef<DOMRect | undefined>(undefined)
  const pileRectangleRef = useRef<DOMRect | undefined>(undefined)
  const frontCardSpaceRectangleRef = useRef<DOMRect | undefined>(undefined)

  useEffect(() => {
    window.addEventListener(
      'resize',
      handleResize(selfRectangleRef, pileRectangleRef, frontCardSpaceRectangleRef, uuid)
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize(selfRectangleRef, pileRectangleRef, frontCardSpaceRectangleRef, uuid)
      )
    }
  },[uuid])

  useEffect(() => {
    selfRectangleRef.current = document.getElementById(uuid)?.getBoundingClientRect()
    pileRectangleRef.current = document.getElementById('pile')?.getBoundingClientRect()
    frontCardSpaceRectangleRef.current = document.getElementById('frontCardSpace')?.getBoundingClientRect()
  }, [uuid])
  return (
    <motion.div
      className={`${className} card`}
      data-testid="card"
      id={uuid}
      style={{ zIndex }}
      drag={movable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.85}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 1.5 }}
      animate={getAnimation(isCardInPile, selfRectangleRef.current, frontCardSpaceRectangleRef.current)}
      onDragEnd={
        (event: PointerEvent) => {
          setIsCardInPile(isPositionInsidePile(event.x, event.y, pileRectangleRef.current))
        }
      }
      layout="position"
    >
      {hidden ? <CardBack /> : <CardContent card={card} />}
    </motion.div>
  )
}
