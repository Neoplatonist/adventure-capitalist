import React, { Component } from 'react'

export default function BuildList(WrappedComponent, action) {
    return class extends Component {
        renderData() {
            return this.props.list.map(item =>
                <WrappedComponent
                    key={'list-' + item.name}
                    item={item}
                    antimatter={this.props.antimatter}
                    action={action} />
            )
        }

        render() {
            return (
                <div>
                    {this.props.list.length === 0 ? 'Loading...' : this.renderData()}
                </div>
            )
        }
    }
}
