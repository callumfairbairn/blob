import React from 'react'
import './App.scss'
import { AppContextProvider } from './AppContext/AppContext'
import { CardBackSettings } from './components/CardBackSettings/CardBackSettings'
import { Game } from './components/Game/Game'

const App = () => {
  return (
    <AppContextProvider>
      <div className="App" data-testid="app">
        <CardBackSettings />
        <Game />
      </div>
    </AppContextProvider>
  );
}

export default App;
