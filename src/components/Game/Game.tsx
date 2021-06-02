import { Hand } from '../Hand/Hand'
import { handTypes } from '../../enums/handTypes'
import { Pile } from '../Pile/Pile'
import React, { useContext } from 'react'
import { Suits } from '../../enums/suits'
import { AppContext } from '../../AppContext/AppContext'

const cards = [
  { value: 2, suit: Suits.Clubs },
  { value: 3, suit: Suits.Spades },
  { value: 4, suit: Suits.Diamonds },
  { value: 5, suit: Suits.Hearts },
  { value: 6, suit: Suits.Clubs },
  { value: 7, suit: Suits.Spades },
  { value: 8, suit: Suits.Diamonds },
]

export const Game = () => {
  const { pileCards } = useContext(AppContext)

  return (
    <div className="game">
      <Hand cards={cards} handType={handTypes.Back}/>
      <Hand cards={cards} handType={handTypes.Left}/>
      <Pile {...pileCards}/>
      <Hand cards={cards} handType={handTypes.Right}/>
      <Hand cards={cards} handType={handTypes.Front}/>
    </div>
  )
}