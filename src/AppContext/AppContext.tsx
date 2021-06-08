import React, { createContext, useState } from 'react'
import { defaultColourSets } from '../defaultColourSets'
import { handTypes } from '../enums/handTypes'
import { CardType } from '../types/card'
import { Suits } from '../enums/suits'


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
}


const cards = [
  { value: 2, suit: Suits.Clubs },
  { value: 3, suit: Suits.Spades },
  { value: 4, suit: Suits.Diamonds },
  { value: 5, suit: Suits.Hearts },
  { value: 6, suit: Suits.Clubs },
  { value: 7, suit: Suits.Spades },
  { value: 8, suit: Suits.Diamonds },
]

const defaultAppContextValue: AppContextValueType = {
  cardBackDiamondNumber: 6,
  setCardBackDiamondNumber: () => {},
  cardBackColoursIndex: 0,
  setCardBackColoursIndex: () => {},
  colourSets: defaultColourSets,
  setColourSets: () => {},
  pileCards: {},
  setPileCards: () => {},
  handCards: { front: cards, back: cards, left: cards, right: cards },
  setHandCards: () => {},
  turn: handTypes.Front,
  setTurn: () => {}
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
  const [handCards, setHandCards] = useState({ front: cards, back: cards, left: cards, right: cards })
  const [turn, setTurn] = useState(handTypes.Front)

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
      ...values
    }
  }>
    {children}
  </AppContext.Provider>
}