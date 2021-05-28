import React, { createContext, useState } from 'react'

type AppContextValueType = {
  cardBackDiamondNumber: number,
  setCardBackDiamondNumber: any
}

const defaultAppContextValue: AppContextValueType = {
  cardBackDiamondNumber: 6,
  setCardBackDiamondNumber: () => {}
}

export const AppContext = createContext(defaultAppContextValue)

type AppContextProviderProps = {
  children: any
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [cardBackDiamondNumber, setCardBackDiamondNumber] = useState(7)

  return <AppContext.Provider value={{ cardBackDiamondNumber, setCardBackDiamondNumber }}>
    {children}
  </AppContext.Provider>
}