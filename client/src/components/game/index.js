import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Industry from './components/industry'
import { connect } from 'react-redux'
import {
    selectAntiMatter,
    updateAll
} from './gameSlice'
import {
    selectManagedIndustries
} from './components/industry/industrySlice'
import './game.css'
import Menu from './components/menu'

class Game extends Component {
    constructor() {
        super()

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
        const secondsPassed = (timeStamp - this.oldTimeStamp)

        if (this.oldTimeStamp === 0) {
            this.oldTimeStamp = timeStamp
        }

        if (secondsPassed >= 1000) {
            this.props.updateAll()
            this.oldTimeStamp = timeStamp
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
                    <h1>{'Antimatter: ' + antimatter.toFixed(2)}</h1>
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
    antimatter: selectAntiMatter(state),
    industryList: state.industry.industryList,
    managedIndustries: selectManagedIndustries(state)
})

const mapDispatchToProps = {
    updateAll
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
