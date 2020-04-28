import React, { Component } from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { incAntimatterAsync, selectNewAntimatter } from '../game/gameSlice'
import M from 'materialize-css'

class StatsModal extends Component {
    antimatter = 0

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            const elems = document.querySelector('#modal2')
            const instance = M.Modal.init(elems, { preventScrolling: true })
            instance.open()
        })

        this.props.incAntimatterAsync(this.props.newAntimatter)
        this.antimatter = this.props.newAntimatter
    }

    handleOK = (e) => {

    }

    render() {
        return (
            <div id="modal2" className="modal">
                <div className="modal-content blue-grey darken-4-text">
                    <h4 className="center">Welcome Back!</h4>

                    <div className="row">
                        <div className="col s12 center">
                            You have made &#9797;{numeral(this.antimatter).format('0.00a')} while away
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 center">
                            <button
                                className="btn-large waves-effect waves-light modal-close"
                                onClick={this.handleOK}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    newAntimatter: selectNewAntimatter(state)
})

const mapDispatchToProps = {
    incAntimatterAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsModal)
