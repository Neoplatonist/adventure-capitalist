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
                wait: PropTypes.number.isRequired,
                unlocked: PropTypes.bool.isRequired,
                isContribLocked: PropTypes.bool.isRequired
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
        const { antimatter, industries } = this.props

        return (
            <Fragment>
                <header id="game-header">
                    {'Antimatter: ' + antimatter}
                </header>

                <aside id="game-menu">
                    Menu
                </aside>

                <article id="game-industries">
                    {industries.length === 0 ? 'Loading...' : this.getIndustries()}
                </article>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    antimatter: selectAntiMatter(state),
    industries: state.industry.industries
})

export default connect(mapStateToProps, null)(Game)
