import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { setupGame, updateAll } from './gameSlice'
import { selectManagedIndustries } from './components/industry/industrySlice'
import Industry from './components/industry'
import Menu from './components/menu'
import './game.css'

class Game extends Component {
    constructor() {
        super()

        // Sets how often the gameloop updates the event timers
        this.gameLoopInterval = 1000
        this.gameLoopTimeStamp = 0
    }

    componentDidMount() {
        // check the timestamp vs now and calculate the money
        // made over the period of time of being away
        this.props.setupGame()
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
        //  since the last frame.
        const glSecondsPassed = (timeStamp - this.gameLoopTimeStamp)

        if (this.gameLoopTimeStamp === 0) {
            this.gameLoopTimeStamp = timeStamp
            this.saveTimeStamp = timeStamp
        }

        if (glSecondsPassed >= this.gameLoopInterval) {
            console.log('game loop')
            this.props.updateAll()
            this.gameLoopTimeStamp = timeStamp
        }

        // Set up next iteration of the loop
        this._frameId = window.requestAnimationFrame(this.loop)
    }

    stopLoop() {
        // cancelAnimationFrame() won't throw an error
        window.cancelAnimationFrame(this._frameId)
    }


    getIndustries() {
        return this.props.industryList.map(industry => {
            return <Industry
                key={'industry-' + industry.name}
                industry={industry} />
        })
    }

    render() {
        const { antimatter, industryList } = this.props

        return (
            <main>
                <header id="game-header">
                    <h1>&#9797;{'Antimatter: ' + numeral(antimatter).format('0.00a')}</h1>
                </header>

                <Menu />

                <article id="game-industries">
                    {industryList.length === 0 ? 'Loading...' : this.getIndustries()}
                </article>
            </main>
        )
    }
}

const industryType = PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string.isRequired,
        coefficient: PropTypes.number.isRequired,
        income: PropTypes.number.isRequired,
        currentIncome: PropTypes.number.isRequired,
        baseCost: PropTypes.number.isRequired,
        currentCost: PropTypes.number.isRequired,
        numberOwned: PropTypes.number.isRequired,
        wait: PropTypes.number.isRequired,
        isLocked: PropTypes.bool.isRequired,
        isContribLocked: PropTypes.bool.isRequired,
    })
).isRequired

Game.propTypes = {
    antimatter: PropTypes.number.isRequired,
    industryList: industryType,
    managedIndustries: industryType
}

const mapStateToProps = state => ({
    antimatter: state.game.antimatter,
    industryList: state.industry.industryList,
    managedIndustries: selectManagedIndustries(state)
})

const mapDispatchToProps = {
    setupGame,
    updateAll
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
