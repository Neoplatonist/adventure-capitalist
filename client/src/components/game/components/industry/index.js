import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import numeral from 'numeral'
import {
    buyIndustry,
    incIndustryContrib,
    resetContribLocksAsync
} from './industrySlice'
import Timer from './timer'
import './industry.css'

class Industry extends Component {
    static propTypes = {
        antimatter: PropTypes.number.isRequired,
        industry: PropTypes.object.isRequired,
        buyIndustry: PropTypes.func.isRequired,
        incIndustryContrib: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.resetContribLocksAsync()
    }

    handleBuy = (e) => {
        e.preventDefault()
        const { antimatter, buyIndustry, industry } = this.props

        if (antimatter >= industry.currentCost) {
            buyIndustry(industry)
        }
    }

    handleCollect = (e) => {
        e.preventDefault()
        const { industry, incIndustryContrib } = this.props

        if (!industry.isContribLocked) {
            incIndustryContrib(industry)
        }
    }

    getCost() {
        const { baseCost, currentCost } = this.props.industry

        return typeof currentCost === 'undefined'
            ? baseCost : currentCost.toFixed(2)

    }

    render() {
        const { antimatter, industry } = this.props

        return (
            <section className="industry col s6 l4">
                <div className="industry-container blue-grey lighten-5">
                    <div className="center">
                        <h4>{industry.name} x {industry.numberOwned}</h4>
                    </div>

                    <div className="stats col">
                        <p className="stats-output">Output: &#9797;{numeral(industry.aggregateIncome).format('0.00a')}</p>
                        <p className="stats-timer">
                            <Timer
                                isContribLocked={industry.isContribLocked}
                                wait={industry.wait / 1000} />
                        </p>
                    </div>

                    <div className="container">
                        <div className="row">
                            <button
                                className="button col waves-effect waves-light teal lighten-1 btn-small s10 push-s1"
                                onClick={this.handleBuy}
                                disabled={
                                    antimatter < (industry.currentCost || industry.baseCost)
                                        ? true : false}>
                                Buy &#9797;{numeral(industry.currentCost).format('0.00a')}
                            </button>
                        </div>
                    </div>

                    <div className="container">
                        <button
                            className="button col waves-effect waves-light amber darken-1 btn-medium s12"
                            onClick={this.handleCollect}
                            disabled={industry.isLocked || industry.isManaged ? true : false}>
                            Collect
                    </button>
                    </div>
                </div>
            </section >
        )
    }
}

const mapStateToProps = state => ({
    antimatter: state.game.antimatter
})

const mapDispatchToProps = {
    buyIndustry,
    incIndustryContrib,
    resetContribLocksAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Industry)
