import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card'

describe('Card', () => {
    it('renders a number within the card', () => {
        const number = 4

        render(<Card value={4} />)

        expect(screen.getByText(number)).toBeInTheDocument()
    })
})
