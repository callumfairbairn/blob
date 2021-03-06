import { Hand } from '../Hand/Hand'
import { handTypes } from '../../enums/handTypes'
import { Pile } from '../Pile/Pile'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext/AppContext'
import { gameStates } from '../../enums/gameStates'
import { initialDeck } from '../../initialDeck'
import { HandCardsType } from '../../types/handCardsType'
import { sortHands } from './sortHands'

const dealHands = (setHandCards: (newHandCards: HandCardsType) => void, setGameState: (newGameState: gameStates) => void) => {
  const newHandCards: HandCardsType = { front: [], back: [], left: [], right: [] }
  const deck = [...initialDeck]
  while (
    newHandCards.front.length < 7 &&
    newHandCards.back.length < 7 &&
    newHandCards.left.length < 7 &&
    newHandCards.right.length < 7
    ) {
    Object.keys(newHandCards).forEach(handType => {
      if (handType === 'front' || handType === 'back' || handType === 'left' || handType === 'right') {
        const deckIndex = Math.floor(Math.random() * deck.length)
        newHandCards[handType].push(deck[deckIndex])
        deck.splice(deckIndex, 1)
      }
    })
  }
  const sortedHandCards = sortHands(newHandCards)
  setHandCards(sortedHandCards)
  setGameState(gameStates.Play)
}

export const Game = () => {
  const { pileCards, handCards, setHandCards, gameState, setGameState } = useContext(AppContext)

  useEffect(() => {
    if (gameState === gameStates.Deal) {
      dealHands(setHandCards, setGameState)
    }

  }, [gameState, setGameState, setHandCards])


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