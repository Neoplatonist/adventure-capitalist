import React, { Component, Fragment } from 'react'
import './game.css'

export default class Game extends Component {
    render() {
        return (
            <Fragment>
                <header id="game-header">
                    {/* Display Stats Here */}
                </header>

                <aside id="game-menu">
                    {/* Display Menu Here */}
                </aside>

                <article id="game-industries">
                    {/* Get Industries Here */}
                </article>
            </Fragment>
        )
    }
}
