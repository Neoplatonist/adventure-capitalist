import React, { Component } from 'react'
import numeral from 'numeral'
import { connect } from 'react-redux'
import './listItem.css'

class ListItem extends Component {
    handleClick = (e) => {
        const {
            action,
            antimatter,
            dispatch,
            item
        } = this.props

        if (antimatter > item.cost) {
            dispatch(action(item))
        }
    }

    render() {
        const { cost, name } = this.props.item

        return (
            <div>
                <button
                    className="list-item-btn"
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

export default connect()(ListItem)
