import React from 'react'
import Game from '../game'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Astral Tycoon
      </header>

      <main className="App-main">
        <Game />
      </main>

      <footer className="App-footer">
        2020 &hearts; Joshua Johnston
      </footer>
    </div>
  )
}

export default App
