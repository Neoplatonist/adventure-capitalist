import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { incIndustryIncome } from './industrySlice'
import './industry.css'

class Industry extends Component {
    static propTypes = {
        industry: PropTypes.object.isRequired,
        isBuyClicked: PropTypes.bool.isRequired,
        incIndustryIncome: PropTypes.func.isRequired
    }

    handleUpgrade = (e) => {
        console.log('clicked upgrade')
    }

    handleBuy = (e) => {
        if (!this.props.isBuyClicked) {
            this.props.incIndustryIncome(
                this.props.industry.income,
                this.props.industry.wait
            )
        }
    }

    render() {
        return (
            <section className="industry">
                <p>{this.props.industry.name}</p>

                <div className="stats">
                    {'Income: ' + this.props.industry.income}
                </div>

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
            </section >
        )
    }
}

const mapStateToProps = state => ({
    isBuyClicked: state.industry.isBuyClicked
})

const mapDispatchToProps = {
    incIndustryIncome
}

export default connect(mapStateToProps, mapDispatchToProps)(Industry)
