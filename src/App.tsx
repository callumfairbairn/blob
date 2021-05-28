import React from 'react'
import './App.css'
import { Card } from './components/Card/Card'
import { Suits } from './enums/suits'

const App = () => {
  return (
    <div className="App" data-testid="app">
      <Card card={{ value: 2, suit: Suits.Clubs }} zIndex={4}/>
      <Card card={{ value: 3, suit: Suits.Diamonds }} zIndex={3}/>
      <Card card={{ value: 4, suit: Suits.Hearts }} zIndex={2}/>
      <Card card={{ value: 5, suit: Suits.Spades }} zIndex={1}/>
    </div>
  );
}

export default App;
