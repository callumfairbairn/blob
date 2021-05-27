import React from 'react'
import './Card.scss'

type CardProps = {
    value: number
}

export const Card = ({ value }: CardProps) => {
    return (
        <div className="card" >
            <div className="suit">
                ♠
            </div>
            <div className="suit">
                ♠
            </div>
            <div className="number">
                {value}
            </div>
            <div className="suit">
                ♠
            </div>
            <div className="suit">
                ♠
            </div>
        </div>
    )
}
