import React from 'react'
import { render, screen } from '@testing-library/react'
import { Hand } from './Hand'
import { Suits } from '../../enums/suits'
import { handTypes } from '../../enums/handTypes'

const cards = [
  { value: 2, suit: Suits.Clubs },
  { value: 3, suit: Suits.Spades },
  { value: 4, suit: Suits.Diamonds },
  { value: 5, suit: Suits.Hearts },
  { value: 6, suit: Suits.Clubs },
  { value: 7, suit: Suits.Spades },
  { value: 8, suit: Suits.Diamonds },
]

describe('Hand', () => {
  it('renders a given number of cards', () => {
    render(<Hand cards={cards} />)

    expect(screen.getAllByTestId('card').length).toEqual(cards.length)
  })

  describe('when given a handType prop', () => {
    it('has the id frontHand if front is provided as handType', () => {
      const handType = handTypes.Front

      render(<Hand cards={cards} handType={handType} />)

      expect(screen.getByTestId('hand')).toHaveAttribute('id', 'frontHand')
    })

    it('has the id backHand if back is provided as handType', () => {
      const handType = handTypes.Back

      render(<Hand cards={cards} handType={handType} />)

      expect(screen.getByTestId('hand')).toHaveAttribute('id', 'backHand')
    })

    it('has the id leftHand if left is provided as handType', () => {
      const handType = handTypes.Left

      render(<Hand cards={cards} handType={handType} />)

      expect(screen.getByTestId('hand')).toHaveAttribute('id', 'leftHand')
    })

    it('has the id rightHand if right is provided as handType', () => {
      const handType = handTypes.Right

      render(<Hand cards={cards} handType={handType} />)

      expect(screen.getByTestId('hand')).toHaveAttribute('id', 'rightHand')
    })
  })
})