import React from 'react'
import './App.scss'
import { Hand } from './components/Hand/Hand'
import { Suits } from './enums/suits'
import { Pile } from './components/Pile/Pile'

const cards = [
  { value: 2, suit: Suits.Clubs },
  { value: 3, suit: Suits.Spades },
  { value: 4, suit: Suits.Diamonds },
  { value: 5, suit: Suits.Hearts },
  // { value: 6, suit: Suits.Clubs },
  // { value: 7, suit: Suits.Spades },
  // { value: 8, suit: Suits.Diamonds },
]

const App = () => {
  return (
    <div className="App" data-testid="app">
      <div className="game">
        <Pile frontCard={cards[0]} backCard={cards[0]} leftCard={cards[0]} rightCard={cards[0]} />
        <Hand cards={cards}/>
      </div>
    </div>
  );
}

export default App;
