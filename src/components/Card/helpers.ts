import { HandCardsType } from '../../types/handCardsType'
import { CardType } from '../../types/cardType'
import { handTypes } from '../../enums/handTypes'
import React from 'react'
import { PileCardsType } from '../../types/pileCardsType'

export const defaultAnimation = { x: 0, y: 0 }

export const isPositionInsidePile = (mouseX: number, mouseY: number, pileRectangle: DOMRect | undefined): boolean => {
  if (pileRectangle) {
    const { x, y, width, height } = pileRectangle
    return (mouseX >= x && mouseX <= x + width) && (mouseY >= y && mouseY <= y + height)
  }
  return false
}
export const handleResize = (
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
export const getAnimation = (selfRectangle: DOMRect | undefined, pileCardSpaceRectangle: DOMRect | undefined, card: CardType) => {
  if (selfRectangle && pileCardSpaceRectangle) {
    const horizontalRestraint = pileCardSpaceRectangle.x - selfRectangle.x
    const verticalRestraint = pileCardSpaceRectangle.y - selfRectangle.y
    return { x: horizontalRestraint, y: verticalRestraint }
  }
  return defaultAnimation
}
export const updatePileCards = (pileCards: PileCardsType, card: CardType, handType: handTypes, setPileCards: any) => {
  const pileCardsClone = { ...pileCards }
  pileCardsClone[handType] = card
  setPileCards(pileCardsClone)
}
export const updateHandCards = (handCards: HandCardsType, card: CardType, handType: handTypes, setHandCards: any) => {
  const handCardsClone = { ...handCards }
  handCardsClone[handType] = handCardsClone[handType].filter(handCard => handCard !== card)
  setHandCards(handCardsClone)
}