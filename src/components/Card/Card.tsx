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

const handleResize = (selfRectangle: React.MutableRefObject<DOMRect | undefined>, pileRectangle: React.MutableRefObject<DOMRect | undefined>, uuid: string) => () => {
  selfRectangle.current = document.getElementById(uuid)?.getBoundingClientRect()
  pileRectangle.current = document.getElementById('pile')?.getBoundingClientRect()
}

const getDragRestraints = (isCardInPile: boolean, selfRectangle: DOMRect | undefined, pileRectangle: DOMRect | undefined) => {
  if (isCardInPile && selfRectangle && pileRectangle) {
    const horizontalRestraint = pileRectangle.x - selfRectangle.x
    const verticalRestraint = pileRectangle.y - selfRectangle.y
    return { left: horizontalRestraint, right: horizontalRestraint, top: verticalRestraint, bottom: verticalRestraint }
  }
  return { left: 0, right: 0, top: 0, bottom: 0 }
}

export const Card = ({ card, zIndex, hidden, movable = false, uuid }: CardProps) => {
  const [isCardInPile, setIsCardInPile] = useState(false)
  const className = (card.suit === Suits.Clubs || card.suit === Suits.Spades) ? 'blackCard' : 'redCard'
  const selfRectangle = useRef<DOMRect | undefined>(undefined);
  const pileRectangle = useRef<DOMRect | undefined>(undefined);

  useEffect(() => {
    window.addEventListener('resize', handleResize(selfRectangle, pileRectangle, uuid))

    return () => {
      window.removeEventListener('resize', handleResize(selfRectangle, pileRectangle, uuid))
    }
  },[uuid])

  useEffect(() => {
    selfRectangle.current = document.getElementById(uuid)?.getBoundingClientRect()
    pileRectangle.current = document.getElementById('pile')?.getBoundingClientRect()
  }, [uuid])
  return (
    <motion.div
      className={`${className} card`}
      data-testid="card"
      id={uuid}
      style={{ zIndex }}
      drag={movable}
      dragConstraints={getDragRestraints(isCardInPile, selfRectangle.current, pileRectangle.current)}
      dragElastic={0.85}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      onDragEnd={
        (event: PointerEvent) => {
          setIsCardInPile(isPositionInsidePile(event.x, event.y, pileRectangle.current))
        }
      }
    >
      {hidden ? <CardBack /> : <CardContent card={card} />}
    </motion.div>
  )
}
