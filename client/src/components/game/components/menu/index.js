import React, { Component } from 'react'
import ManagerList from './components/managerList'
import './menu.css'

export default class Menu extends Component {
    render() {
        return (
            <aside id="game-menu">
                <h3>Hire a Manager!</h3>

                <ManagerList />
            </aside>
        )
    }
}
