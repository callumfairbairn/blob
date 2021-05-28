import React from 'react'
import { render, screen } from '@testing-library/react'
import { Hand } from './Hand'
import { Suits } from '../../enums/suits'

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
})