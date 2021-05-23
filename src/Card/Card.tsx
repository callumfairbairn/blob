import React from 'react'
import './Card.scss'

type CardProps = {
    value: number
}

export const Card = ({ value }: CardProps) => {
    return (
        <div className="card" >
            {value}
        </div>
    )
}
