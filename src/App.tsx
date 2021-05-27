import React from 'react'
import './App.css'
import { Card } from './Card/Card'
import { Suits } from './enums/suits'

function App() {
  return (
    <div className="App">
      <Card card={{ value: 2, suit: Suits.Clubs }} />
      <Card card={{ value: 3, suit: Suits.Diamonds }}/>
      <Card card={{ value: 4, suit: Suits.Hearts }}/>
      <Card card={{ value: 5, suit: Suits.Spades }}/>
    </div>
  );
}

export default App;
