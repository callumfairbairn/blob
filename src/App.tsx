import React from 'react'
import './App.css'
import { Card } from './Card/Card'
import { Suits } from './enums/suits'

function App() {
  return (
    <div className="App">
      <Card card={{ value: 7, suit: Suits.Diamonds }}/>
    </div>
  );
}

export default App;
