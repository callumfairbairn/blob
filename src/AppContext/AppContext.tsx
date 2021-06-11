import React, { createContext, useState } from 'react'
import { defaultColourSets } from '../defaultColourSets'
import { handTypes } from '../enums/handTypes'
import { CardType } from '../types/card'
import { gameStates } from '../enums/gameStates'

export type PileCardsType = {
  [handTypes.Front]?: CardType,
  [handTypes.Back]?: CardType,
  [handTypes.Left]?: CardType,
  [handTypes.Right]?: CardType,
}

export type HandCardsType = {
  [handTypes.Front]: CardType[],
  [handTypes.Back]: CardType[],
  [handTypes.Left]: CardType[],
  [handTypes.Right]: CardType[],
}

type AppContextValueType = {
  cardBackDiamondNumber: number
  setCardBackDiamondNumber: any
  cardBackColoursIndex: number
  setCardBackColoursIndex: any
  colourSets: string[][]
  setColourSets: any
  pileCards: PileCardsType
  setPileCards: any
  handCards: HandCardsType
  setHandCards: any
  turn: handTypes
  setTurn: any
  gameState: gameStates
  setGameState: any
}

const defaultAppContextValue: AppContextValueType = {
  cardBackDiamondNumber: 6,
  setCardBackDiamondNumber: () => {},
  cardBackColoursIndex: 0,
  setCardBackColoursIndex: () => {},
  colourSets: defaultColourSets,
  setColourSets: () => {},
  pileCards: {},
  setPileCards: () => {},
  handCards: { front: [], back: [], left: [], right: [] },
  setHandCards: () => {},
  turn: handTypes.Front,
  setTurn: () => {},
  gameState: gameStates.Deal,
  setGameState: () => {}
}

export const nextTurnMap = {
  [handTypes.Front]: handTypes.Left,
  [handTypes.Left]: handTypes.Back,
  [handTypes.Back]: handTypes.Right,
  [handTypes.Right]: handTypes.Front
}

export const AppContext = createContext(defaultAppContextValue)

type AppContextProviderProps = {
  children: any,
  values?: object
}

export const AppContextProvider = ({ children, values }: AppContextProviderProps) => {
  const [cardBackDiamondNumber, setCardBackDiamondNumber] = useState(6)
  const [cardBackColoursIndex, setCardBackColoursIndex] = useState(0)
  const [colourSets, setColourSets] = useState(defaultColourSets)
  const [pileCards, setPileCards] = useState({})
  const [handCards, setHandCards] = useState({ front: [], back: [], left: [], right: [] })
  const [turn, setTurn] = useState(handTypes.Front)
  const [gameState, setGameState] = useState(gameStates.Deal)

  return <AppContext.Provider value={
    {
      cardBackDiamondNumber,
      setCardBackDiamondNumber,
      cardBackColoursIndex,
      setCardBackColoursIndex,
      colourSets,
      setColourSets,
      pileCards,
      setPileCards,
      handCards,
      setHandCards,
      turn,
      setTurn,
      gameState,
      setGameState,
      ...values
    }
  }>
    {children}
  </AppContext.Provider>
}