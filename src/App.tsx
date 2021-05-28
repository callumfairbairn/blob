import React from 'react'
import './App.css'
import { Hand } from './components/Hand/Hand'
import { Suits } from './enums/suits'

const cards = [
  { value: 2, suit: Suits.Clubs },
  { value: 3, suit: Suits.Spades },
  { value: 4, suit: Suits.Diamonds },
  { value: 5, suit: Suits.Hearts },
  { value: 6, suit: Suits.Clubs },
  { value: 7, suit: Suits.Spades },
  { value: 8, suit: Suits.Diamonds },
]

const App = () => {
  return (
    <div className="App" data-testid="app">
      <Hand cards={cards} />
    </div>
  );
}

export default App;
