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
                coefficient: PropTypes.number.isRequired,
                income: PropTypes.number.isRequired,
                currentIncome: PropTypes.number.isRequired,
                baseCost: PropTypes.number.isRequired,
                currentCost: PropTypes.number.isRequired,
                numberOwned: PropTypes.number.isRequired,
                manager: PropTypes.bool.isRequired,
                wait: PropTypes.number.isRequired,
                isLocked: PropTypes.bool.isRequired,
                isContribLocked: PropTypes.bool.isRequired,
            })
        ).isRequired
    }

    constructor() {
        super()

        this.secondsPassed = 0
        this.oldTimeStamp = 0
    }

    componentDidMount() {
        this.startLoop()
    }

    componentWillUnmount() {
        this.stopLoop()
    }

    startLoop() {
        if (!this._frameId) {
            this._frameId = window.requestAnimationFrame(this.loop)
        }
    }

    loop = (timeStamp) => {
        //Calculate the number of seconds passed
        //since the last frame
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000
        this.oldTimeStamp = timeStamp

        if (this.secondsPassed === 1000) {
            this.props.updateAll()
        }

        // Set up next iteration of the loop
        this._frameId = window.requestAnimationFrame(this.loop)
    }

    stopLoop() {
        // cancelAnimationFrame() won't throw an error
        window.cancelAnimationFrame(this._frameId)
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
                    <h1>{'Antimatter: ' + antimatter.toFixed(2)}</h1>
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
