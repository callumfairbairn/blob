import React from 'react'
import { Suits } from '../../enums/suits'
import { Pile } from './Pile'
import { render, screen } from '@testing-library/react'

describe('Pile', () => {
  it('renders a front card', () => {
    const front = { value: 2, suit: Suits.Clubs }

    render(<Pile front={front} />)

    expect(screen.getByText(front.value)).toBeInTheDocument()
    expect(screen.getAllByText(front.suit).length).toEqual(4)
  })

  it('renders a back card', () => {
    const back = { value: 2, suit: Suits.Clubs }

    render(<Pile back={back} />)

    expect(screen.getByText(back.value)).toBeInTheDocument()
    expect(screen.getAllByText(back.suit).length).toEqual(4)
  })

  it('renders a left card', () => {
    const left = { value: 2, suit: Suits.Clubs }

    render(<Pile left={left} />)

    expect(screen.getByText(left.value)).toBeInTheDocument()
    expect(screen.getAllByText(left.suit).length).toEqual(4)
  })

  it('renders a right card', () => {
    const right = { value: 2, suit: Suits.Clubs }

    render(<Pile right={right} />)

    expect(screen.getByText(right.value)).toBeInTheDocument()
    expect(screen.getAllByText(right.suit).length).toEqual(4)
  })
})