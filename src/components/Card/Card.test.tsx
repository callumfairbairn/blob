import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card'
import { Suits } from '../../enums/suits';

describe('Card', () => {
  it('renders a number', () => {
    const card = { value: 4, suit: Suits.Clubs }

    render(<Card card={card} hidden={false}/>)

    expect(screen.getByText(card.value)).toBeInTheDocument()
  })

  it('renders a suit 4 times', () => {
    const card = { value: 4, suit: Suits.Clubs }

    render(<Card card={card} hidden={false}/>)

    expect(screen.getAllByText(Suits.Clubs).length).toEqual(4)
  })

  it('provides a z index if provided', () => {
    const card = { value: 4, suit: Suits.Clubs, }

    render(<Card card={card} hidden={false} zIndex={3}/>)

    expect(screen.getByTestId('card')).toHaveAttribute('style', 'z-index: 3;');
  })

  it('does not render suit or number if hidden is true', () => {
    const card = { value: 4, suit: Suits.Clubs, }

    render(<Card card={card} hidden={true} zIndex={3}/>)

    expect(screen.queryByText(card.value)).not.toBeInTheDocument();
    expect(screen.queryAllByText(card.suit).length).toEqual(0);
  })

  describe('for different suits', () => {
    it('renders a black card if the suit is clubs', () => {
      const card = { value: 4, suit: Suits.Clubs }

      render(<Card card={card} hidden={false}/>)

      expect(screen.getByTestId('card')).toHaveAttribute('class', 'blackCard');
    })

    it('renders a black card if the suit is spades', () => {
      const card = { value: 4, suit: Suits.Spades }

      render(<Card card={card} hidden={false}/>)

      expect(screen.getByTestId('card')).toHaveAttribute('class', 'blackCard');
    })

    it('renders a red card if the suit is hearts', () => {
      const card = { value: 4, suit: Suits.Hearts }

      render(<Card card={card} hidden={false}/>)

      expect(screen.getByTestId('card')).toHaveAttribute('class', 'redCard');
    })

    it('renders a red card if the suit is diamonds', () => {
      const card = { value: 4, suit: Suits.Diamonds }

      render(<Card card={card} hidden={false}/>)

      expect(screen.getByTestId('card')).toHaveAttribute('class', 'redCard');
    })
  })
})
