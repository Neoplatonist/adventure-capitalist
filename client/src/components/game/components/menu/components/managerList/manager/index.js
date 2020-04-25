import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startManager } from '../managerListSlice'
import numeral from 'numeral'

class Manager extends Component {
    handleClick = (e) => {
        if (this.props.antimatter > this.props.manager.cost) {
            this.props.startManager(this.props.manager)
        }
    }

    render() {
        const { cost, name } = this.props.manager

        return (
            <div>
                <button
                    onClick={this.handleClick}
                    disabled={this.props.antimatter > cost ? false : true
                    }>
                    {name}

                    <br />

                    &#9797;{numeral(cost).format('0.00a')}
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    antimatter: state.game.antimatter
})

const mapDispatchToProps = {
    startManager
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
