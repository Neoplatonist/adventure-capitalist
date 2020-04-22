import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './industry.css'

export default class Industry extends Component {
    static propTypes = {
        industry: PropTypes.object.isRequired
    }

    handleUpgrade = (e) => {
        console.log('clicked upgrade')
    }

    handleBuy = (e) => {
        console.log('clicked buy')
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
