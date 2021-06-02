import React, { useEffect, useRef } from 'react'
import './Card.scss'
import { CardType } from '../../types/card'
import { Suits } from '../../enums/suits'
import { CardBack } from '../CardBack/CardBack'
import { motion } from 'framer-motion'

const isPositionInsidePile = (mouseX: number, mouseY: number, pileRectangle: DOMRect | undefined): boolean => {
  if (pileRectangle) {
    const { x, y, width, height } = pileRectangle
    return (mouseX >= x && mouseX <= x + width) && (mouseY >= y && mouseY <= y + height)
  }
  return false
}

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
}

const handleResize = (pileRectangle: React.MutableRefObject<DOMRect | undefined>) => () => {
  pileRectangle.current = document.getElementById('pile')?.getBoundingClientRect()
}

export const Card = ({ card, zIndex, hidden, movable = false }: CardProps) => {
  const className = (card.suit === Suits.Clubs || card.suit === Suits.Spades) ? 'blackCard' : 'redCard'
  const pileRectangle = useRef<DOMRect | undefined>(undefined);

  useEffect(() => {
    window.addEventListener('resize', handleResize(pileRectangle))

    return () => {
      window.removeEventListener('resize', handleResize(pileRectangle))
    }
  },[])

  useEffect(() => {
    pileRectangle.current = document.getElementById('pile')?.getBoundingClientRect()
  }, [])
  return (
    <motion.div
      className={className}
      data-testid="card"
      id="card"
      style={{ zIndex }}
      drag={movable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.85}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      onDragEnd={
        (event: PointerEvent) => {
          console.log(isPositionInsidePile(event.x, event.y, pileRectangle.current))
        }
      }
    >
      {hidden ? <CardBack /> : <CardContent card={card} />}
    </motion.div>
  )
}
