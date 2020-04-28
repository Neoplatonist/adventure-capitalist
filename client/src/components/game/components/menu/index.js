import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectUpgradesLocked } from './components/upgradeList/upgradeListSlice'
import { selectManagersLocked } from './components/managerList/managerListSlice'
import ManagerListBuilder from './components/managerList'
import UpgradeListBuilder from './components/upgradeList'
import M from 'materialize-css'
import './menu.css'

class Menu extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            const elems = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elems);
        })
    }

    render() {
        const { antimatter, managerList, upgradeList } = this.props

        return (
            <aside className="col s12 m4 l3">
                <ul className="collapsible">
                    <li>
                        <div className="collapsible-header teal lighten-1 grey-text text-lighten-5">
                            <i className="material-icons">local_offer</i>
                            Upgrades
                        </div>

                        <div className="collapsible-body blue-grey lighten-5">
                            <UpgradeListBuilder
                                list={upgradeList}
                                antimatter={antimatter} />
                        </div>
                    </li>
                    <li className="active">
                        <div className="collapsible-header teal lighten-1 grey-text text-lighten-5">
                            <i className="material-icons">business_center</i>
                            Hire a Manager!
                        </div>

                        <div className="collapsible-body blue-grey lighten-5">
                            <ManagerListBuilder
                                list={managerList}
                                antimatter={antimatter} />
                        </div>
                    </li>
                </ul>
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
