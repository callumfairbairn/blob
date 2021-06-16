import { CardType } from '../../types/cardType'
import { Suits } from '../../enums/suits'
import { HandCardsType } from '../../types/handCardsType'

export const sortHands = (handCards: HandCardsType) => {
  const newHandCards: HandCardsType = { front: [], back: [], left: [], right: [] }
  newHandCards.front = sortHand(handCards.front)
  newHandCards.back = sortHand(handCards.back)
  newHandCards.left = sortHand(handCards.left)
  newHandCards.right = sortHand(handCards.right)
  return newHandCards
}

export const sortHand = (hand: CardType[]) => {
  const newHand: CardType[] = []
  hand.forEach((card) => {
    if (newHand.length === 0) {
      newHand.push(card)
    } else {
      let newHandIndex = 0
      for (const newCard of newHand) {
        if (suitIsLessThanOrEqualTo(card, newCard)) {
          if (card.suit === newCard.suit) {
            if (card.value > newCard.value) {
              newHand.splice(newHandIndex, 0, card)
              return
            }
          } else {
            newHand.splice(newHandIndex, 0, card)
            return
          }
        } else if (newHandIndex === newHand.length - 1) {
          newHand.push(card)
        }
      newHandIndex++
      }
    }
  })
  return newHand
}

const suitIsLessThanOrEqualTo = (currentCard: CardType, newHandCard: CardType) => {
  const currentCardSuitValue = suitHierarchy[currentCard.suit]
  const newHandCardSuitValue = suitHierarchy[newHandCard.suit]
  return currentCardSuitValue <= newHandCardSuitValue
}


const suitHierarchy = {
  [Suits.Spades]: 0,
  [Suits.Diamonds]: 1,
  [Suits.Clubs]: 2,
  [Suits.Hearts]: 3,
}