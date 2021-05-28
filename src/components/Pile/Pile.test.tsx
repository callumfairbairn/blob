import React from 'react'
import { Suits } from '../../enums/suits'
import { Pile } from './Pile'
import { render, screen } from '@testing-library/react'

describe('Pile', () => {
  it('renders a front card', () => {
    const frontCard = { value: 2, suit: Suits.Clubs }

    render(<Pile frontCard={frontCard} />)

    expect(screen.getByText(frontCard.value)).toBeInTheDocument()
    expect(screen.getAllByText(frontCard.suit).length).toEqual(4)
  })

  it('renders a back card', () => {
    const backCard = { value: 2, suit: Suits.Clubs }

    render(<Pile backCard={backCard} />)

    expect(screen.getByText(backCard.value)).toBeInTheDocument()
    expect(screen.getAllByText(backCard.suit).length).toEqual(4)
  })

  it('renders a left card', () => {
    const leftCard = { value: 2, suit: Suits.Clubs }

    render(<Pile leftCard={leftCard} />)

    expect(screen.getByText(leftCard.value)).toBeInTheDocument()
    expect(screen.getAllByText(leftCard.suit).length).toEqual(4)
  })

  it('renders a right card', () => {
    const rightCard = { value: 2, suit: Suits.Clubs }

    render(<Pile rightCard={rightCard} />)

    expect(screen.getByText(rightCard.value)).toBeInTheDocument()
    expect(screen.getAllByText(rightCard.suit).length).toEqual(4)
  })
})