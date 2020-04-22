import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Industry from './components/industry'
import { connect } from 'react-redux'
import {
    selectAntiMatter
} from './gameSlice'
import './game.css'

class Game extends Component {
    static propTypes = {
        antimatter: PropTypes.number.isRequired,
        industries: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                baseCost: PropTypes.number.isRequired,
                currentCost: PropTypes.number.isRequired,
                upgrade: PropTypes.number.isRequired,
                numberOwned: PropTypes.number.isRequired,
                manager: PropTypes.bool.isRequired,
                wait: PropTypes.number.isRequired
            })
        ).isRequired
    }

    getIndustries() {
        return this.props.industries.map(industry => {
            return <Industry
                key={'industry-' + industry.name}
                industry={industry} />
        })
    }

    render() {
        return (
            <Fragment>
                <header id="game-header">
                    {'Antimatter: ' + this.props.antimatter}
                </header>

                <aside id="game-menu">
                    Menu
                </aside>

                <article id="game-industries">
                    {this.getIndustries()}
                </article>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    antimatter: selectAntiMatter(state),
    industries: state.game.industries
})

export default connect(mapStateToProps, null)(Game)
