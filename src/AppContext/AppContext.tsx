import React, { createContext, useState } from 'react'
import { defaultColourSets } from '../defaultColourSets'
import { handTypes } from '../enums/handTypes'
import { CardType } from '../types/card'

export type PileCardsType = {
  [handTypes.Front]?: CardType,
  [handTypes.Back]?: CardType,
  [handTypes.Left]?: CardType,
  [handTypes.Right]?: CardType,
}

type AppContextValueType = {
  cardBackDiamondNumber: number,
  setCardBackDiamondNumber: any,
  cardBackColoursIndex: number,
  setCardBackColoursIndex: any,
  colourSets: string[][],
  setColourSets: any,
  pileCards: PileCardsType
  setPileCards: any,
}

const defaultAppContextValue: AppContextValueType = {
  cardBackDiamondNumber: 6,
  setCardBackDiamondNumber: () => {},
  cardBackColoursIndex: 0,
  setCardBackColoursIndex: () => {},
  colourSets: defaultColourSets,
  setColourSets: () => {},
  pileCards: {},
  setPileCards: () => {}
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
      ...values
    }
  }>
    {children}
  </AppContext.Provider>
}