import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card'
import { Suits } from '../enums/suits';

describe('Card', () => {
    it('renders a number', () => {
        const card = { value: 4, suit: Suits.Clubs }

        render(<Card card={card} />)

        expect(screen.getByText(card.value)).toBeInTheDocument()
    })

    it('renders a suit 4 times', () => {
        const card = { value: 4, suit: Suits.Clubs }

        render(<Card card={card} />)

        expect(screen.getAllByText(Suits.Clubs).length).toEqual(4)
    })
})
