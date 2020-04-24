import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startManager } from '../managerListSlice'

class Manager extends Component {
    handleClick = (e) => {
        if (this.props.antimatter > this.props.manager.cost) {
            this.props.startManager(this.props.manager.name)
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

                    ${cost}
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
