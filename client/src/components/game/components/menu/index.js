import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectUpgradesLocked } from './components/upgradeList/upgradeListSlice'
import { selectManagersLocked } from './components/managerList/managerListSlice'
import ManagerListBuilder from './components/managerList'
import UpgradeListBuilder from './components/upgradeList'
import './menu.css'

class Menu extends Component {
    render() {
        const { antimatter, managerList, upgradeList } = this.props

        return (
            <aside id="game-menu">
                <section>
                    <h3>Upgrades</h3>

                    <UpgradeListBuilder
                        list={upgradeList}
                        antimatter={antimatter} />
                </section>

                <section>
                    <h3>Hire a Manager!</h3>

                    <ManagerListBuilder
                        list={managerList}
                        antimatter={antimatter} />
                </section>
            </aside>
        )
    }
}

const mapStateToProps = (state) => ({
    antimatter: state.game.antimatter,
    upgradeList: selectUpgradesLocked(state),
    managerList: selectManagersLocked(state)
})

export default connect(mapStateToProps, null)(Menu)
