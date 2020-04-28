import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    userSignUp,
    userLogin
} from '../game/gameSlice'
import M from 'materialize-css'

class LoginModal extends Component {
    state = {
        username: ''
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            const elems = document.querySelector('#modal1')
            const modal = M.Modal.init(elems, {
                preventScrolling: true,
                dismissible: false
            })

            modal.open()
        })
    }

    handleChange = (e) => {
        this.setState({ username: e.target.value })
    }

    handleSignup = async (e) => {
        if (this.state.username) {
            this.props.userSignUp(this.state.username)
        }
    }

    handleLogin = (e) => {
        if (this.state.username) {
            this.props.userLogin(this.state.username)
        }
    }

    render() {
        return (
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4 className="center">Login</h4>

                    <div className="row">
                        <div className="input-field col s12 m6 push-m3">
                            <input
                                id="username"
                                type="text"
                                className="validate"
                                onChange={this.handleChange}
                                value={this.state.username}
                                autoFocus />

                            <label htmlFor="username">Username</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 m6 push-s4">
                            <button
                                className="btn-large waves-effect waves-light"
                                onClick={this.handleSignup}>
                                SignUp
                            </button>
                        </div>

                        <div className="col s12 m6 pull-s4">
                            <button
                                className="btn-large waves-effect waves-light"
                                onClick={this.handleLogin}>
                                Login
                            </button>
                        </div>

                        <div className="modal-footer">
                            <p className="waves-effect waves-green">
                                {this.props.user.error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.game.user
})

const mapDispatchToProps = {
    userSignUp,
    userLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
