import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class Timer extends Component {
    static propTypes = {
        isContribLocked: PropTypes.bool.isRequired,
        wait: PropTypes.number.isRequired
    }

    state = {
        secondsRemaining: 0
    }

    componentDidMount() {
        this.setState({ secondsRemaining: this.props.wait })

        if (this.props.isContribLocked) {
            this.intervalHandle = setInterval(this.tick, 1000)
        }
    }

    componentDidUpdate() {
        if (this.props.isContribLocked && this.intervalHandle === undefined) {
            this.intervalHandle = setInterval(this.tick, 1000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    tick = () => {
        let seconds = this.state.secondsRemaining
        seconds--

        if (seconds < 0) {
            clearInterval(this.intervalHandle)
            this.intervalHandle = undefined
            seconds = this.props.wait
        }

        this.setState({ secondsRemaining: seconds })
    }

    render() {
        const secRem = this.state.secondsRemaining
        const min = Math.floor(secRem / 60)
        const sec = secRem - (min * 60)

        return (
            <Fragment>
                Timer: {min}:{0 < sec && sec < 1 ? 0 : sec}
            </Fragment>
        )
    }
}
