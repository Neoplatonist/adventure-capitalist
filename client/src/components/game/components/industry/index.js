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
            <section className="industry">
                <h4>{industry.name} x {industry.numberOwned}</h4>

                <div className="stats">
                    <p>Output: &#9797;{numeral(industry.aggregateIncome).format('0.00a')}</p>
                    <p>
                        <Timer
                            isContribLocked={industry.isContribLocked}
                            wait={industry.wait / 1000} />
                    </p>
                </div>

                <button
                    className="button btn-buy"
                    onClick={this.handleBuy}
                    disabled={
                        antimatter < (industry.currentCost || industry.baseCost)
                            ? true : false}>
                    Buy &#9797;{numeral(industry.currentCost).format('0.00a')}
                </button>

                <button
                    className="button btn-collect"
                    onClick={this.handleCollect}
                    disabled={industry.isLocked || industry.isManaged ? true : false}>
                    Collect
                </button>
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
