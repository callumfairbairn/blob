import { Suits } from '../../enums/suits'
import { sortHand } from './sortHands'
import { CardType } from '../../types/cardType'

describe('sortHand', () => {
  describe('it returns the same hand if', () => {
    it('contains no cards', () => {
      const hand: CardType[] = []

      expect(sortHand(hand)).toEqual(hand)
    })

    it('contains only one card', () => {
      const hand: CardType[] = [
        { value: 2, suit: Suits.Clubs }
      ]

      expect(sortHand(hand)).toEqual(hand)
    })

    it('contains cards already in the correct order', () => {
      const hand: CardType[] = [
        { value: 2, suit: Suits.Clubs },
        { value: 3, suit: Suits.Diamonds },
      ]

      expect(sortHand(hand)).toEqual(hand)
    })
  })

  describe('if the hand is unsorted', () => {
    it('sorts cards in numerical order with the highest on the left', () => {
      const hand: CardType[] = [
        { value: 2, suit: Suits.Clubs },
        { value: 3, suit: Suits.Clubs },
      ]

      const expectedHand: CardType[] = [
        { value: 3, suit: Suits.Clubs },
        { value: 2, suit: Suits.Clubs },
      ]

      expect(sortHand(hand)).toEqual(expectedHand)
    })

    it('sorts cards in suit order', () => {
      const hand: CardType[] = [
        { value: 2, suit: Suits.Spades },
        { value: 2, suit: Suits.Hearts },
        { value: 2, suit: Suits.Diamonds },
        { value: 2, suit: Suits.Clubs },
      ]

      const expectedHand: CardType[] = [
        { value: 2, suit: Suits.Clubs },
        { value: 2, suit: Suits.Diamonds },
        { value: 2, suit: Suits.Hearts },
        { value: 2, suit: Suits.Spades },
      ]

      expect(sortHand(hand)).toEqual(expectedHand)
    })
  })
})