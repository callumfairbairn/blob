import { Hand } from '../Hand/Hand'
import { handTypes } from '../../enums/handTypes'
import { Pile } from '../Pile/Pile'
import React, { useContext } from 'react'
import { AppContext } from '../../AppContext/AppContext'

export const Game = () => {
  const { pileCards, handCards } = useContext(AppContext)

  return (
    <div className="game">
      <Hand cards={handCards[handTypes.Back]} handType={handTypes.Back} />
      <Hand cards={handCards[handTypes.Left]} handType={handTypes.Left} />
      <Pile {...pileCards}/>
      <Hand cards={handCards[handTypes.Right]} handType={handTypes.Right} />
      <Hand cards={handCards[handTypes.Front]} handType={handTypes.Front} />
    </div>
  )
}