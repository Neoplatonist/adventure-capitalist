import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Manager from './manager'
import { connect } from 'react-redux'
import './managerList.css'
import { selectManagersLocked } from './managerListSlice'

class ManagerList extends Component {
    getManagers() {
        return this.props.managerList.map(manager => {
            return <Manager
                key={'manager-' + manager.name}
                manager={manager} />
        })
    }

    render() {
        return (
            <div>
                {this.props.managerList.length === 0 ? 'Loading...' : this.getManagers()}
            </div>
        )
    }
}

ManagerList.propTypes = {
    managerList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            isLocked: PropTypes.bool.isRequired,
            cost: PropTypes.number.isRequired,
            secCounter: PropTypes.number.isRequired,
        })
    ).isRequired
}

const mapStateToProps = state => ({
    managerList: selectManagersLocked(state),
})

export default connect(mapStateToProps, null)(ManagerList)
