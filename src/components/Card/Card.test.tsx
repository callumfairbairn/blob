import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card'
import { Suits } from '../../enums/suits';

describe('Card', () => {
  it('renders a number', () => {
    const card = { value: 4, suit: Suits.Clubs }

    render(<Card card={card} hidden={false} uid='asd'/>)

    expect(screen.getByText(card.value)).toBeInTheDocument()
  })

  it('renders a suit 4 times', () => {
    const card = { value: 4, suit: Suits.Clubs }

    render(<Card card={card} hidden={false} uid='asd'/>)

    expect(screen.getAllByText(Suits.Clubs).length).toEqual(4)
  })

  it('does not render suit or number if hidden is true', () => {
    const card = { value: 4, suit: Suits.Clubs, }

    render(<Card card={card} hidden={true} uid='asd'/>)

    expect(screen.queryByText(card.value)).not.toBeInTheDocument();
    expect(screen.queryAllByText(card.suit).length).toEqual(0);
  })
})
