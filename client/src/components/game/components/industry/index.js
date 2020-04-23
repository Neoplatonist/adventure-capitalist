import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { incIndustryContrib } from './industrySlice'
// import { incAntimatterAsync } from '../../gameSlice'
import Timer from '../timer'
import './industry.css'

class Industry extends Component {
    static propTypes = {
        industry: PropTypes.object.isRequired,
        incIndustryContrib: PropTypes.func.isRequired
    }

    handleUpgrade = (e) => {
        if (this.props.antimatter > this.props.industry.currentCost) {
            this.props.buyIndustry()
        }
    }

    handleBuy = (e) => {
        const { industry } = this.props

        if (!industry.isContribLocked) {
            this.props.incIndustryContrib(industry)
        }
    }

    render() {
        const { industry } = this.props

        return (
            <section className="industry">
                <h4>{industry.name} x {industry.numberOwned}</h4>

                <div className="stats">
                    <p>{'Income: ' + industry.income}</p>
                    <p>
                        <Timer
                            isContribLocked={industry.isContribLocked}
                            wait={industry.wait / 1000} />
                    </p>
                </div>

                <div className="btn-group">
                    <button
                        className="button"
                        onClick={this.handleUpgrade}>
                        Upgrade
                    </button>

                    <button
                        className="button"
                        onClick={this.handleBuy}>
                        Buy
                    </button>
                </div>
            </section >
        )
    }
}

const mapStateToProps = state => ({
    // isContribLocked: state.industry.isContribLocked
})

const mapDispatchToProps = {
    // incIndustryIncome
    // incAntimatter
    incIndustryContrib
}

export default connect(mapStateToProps, mapDispatchToProps)(Industry)
