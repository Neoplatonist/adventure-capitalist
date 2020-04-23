import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    buyIndustry,
    incIndustryContrib
} from './industrySlice'
import { selectAntiMatter } from '../../gameSlice'
import Timer from '../timer'
import './industry.css'

class Industry extends Component {
    static propTypes = {
        antimatter: PropTypes.number.isRequired,
        industry: PropTypes.object.isRequired,
        buyIndustry: PropTypes.func.isRequired,
        incIndustryContrib: PropTypes.func.isRequired
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
                {/* <div id="industry"> */}
                <h4>{industry.name} x {industry.numberOwned}</h4>

                <div className="stats">
                    <p>{'Income: ' + industry.currentIncome.toFixed(2)}</p>
                    <p>
                        <Timer
                            isContribLocked={industry.isContribLocked}
                            wait={industry.wait / 1000} />
                    </p>
                </div>

                {/* <div className="btn-group"> */}
                <button
                    className="button btn-buy"
                    onClick={this.handleBuy}
                    disabled={
                        antimatter < (industry.currentCost || industry.baseCost)
                            ? true : false}>
                    Buy ${industry.currentCost.toFixed(2)}
                </button>

                <button
                    className="button btn-collect"
                    onClick={this.handleCollect}
                    disabled={industry.isLocked ? true : false}>
                    Collect
                    </button>
                {/* </div> */}
                {/* </div> */}
            </section >
        )
    }
}

const mapStateToProps = state => ({
    antimatter: selectAntiMatter(state),
})

const mapDispatchToProps = {
    buyIndustry,
    incIndustryContrib
}

export default connect(mapStateToProps, mapDispatchToProps)(Industry)
