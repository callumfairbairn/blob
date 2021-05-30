import React, { createContext, useState } from 'react'
import { defaultColourSets } from '../defaultColourSets'

type AppContextValueType = {
  cardBackDiamondNumber: number,
  setCardBackDiamondNumber: any,
  cardBackColoursIndex: number,
  setCardBackColoursIndex: any,
  colourSets: string[][],
  setColourSets: any,
}

const defaultAppContextValue: AppContextValueType = {
  cardBackDiamondNumber: 6,
  setCardBackDiamondNumber: () => {},
  cardBackColoursIndex: 0,
  setCardBackColoursIndex: () => {},
  colourSets: defaultColourSets,
  setColourSets: () => {},
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

  return <AppContext.Provider value={
    {
      cardBackDiamondNumber,
      setCardBackDiamondNumber,
      cardBackColoursIndex,
      setCardBackColoursIndex,
      colourSets,
      setColourSets,
      ...values
    }
  }>
    {children}
  </AppContext.Provider>
}