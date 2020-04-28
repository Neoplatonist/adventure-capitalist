import React, { Component } from 'react'
import Game from '../game'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'

class App extends Component {
    componentDidMount() {
        M.AutoInit()
    }

    render() {
        return (
            <div className="app">
                <header className="app-header blue-grey darken-3">
                    Astral Tycoon
                </header>

                <main>
                    <Game />
                </main>


                <footer className="page-footer center blue-grey">
                    2020 &hearts; Joshua Johnston
                </footer>
            </div>
        )
    }
}

export default App
