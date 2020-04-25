import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    buyIndustry,
    incIndustryContrib,
    resetContribLocksAsync
} from './industrySlice'
import { selectAntiMatter } from '../../gameSlice'
import Timer from './timer'
import numeral from 'numeral'
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
                {/* <div id="industry"> */}
                <h4>{industry.name} x {industry.numberOwned}</h4>

                <div className="stats">
                    <p>Output: &#9797;{numeral(industry.currentIncome).format('0.00a')}</p>
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
                    Buy &#9797;{numeral(industry.currentCost).format('0.00a')}
                </button>

                <button
                    className="button btn-collect"
                    onClick={this.handleCollect}
                    disabled={industry.isLocked || industry.isContribLocked ? true : false}>
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
    incIndustryContrib,
    resetContribLocksAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Industry)
