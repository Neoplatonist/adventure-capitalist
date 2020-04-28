import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { setupGame, updateAll } from './gameSlice'
import { selectManagedIndustries } from './components/industry/industrySlice'
import LoginModal from '../loginModal'
import StatsModal from '../statsModal'
import Industry from './components/industry'
import Menu from './components/menu'
import M from 'materialize-css'
import './game.css'

class Game extends Component {
    constructor() {
        super()

        // Sets how often the gameloop updates the event timers
        this.gameLoopInterval = 1000
        this.gameLoopTimeStamp = 0

        this.state = {
            loop: false,
            loginModal: true,
            showStats: false,
        }
    }

    componentDidMount() {
        if (localStorage.getItem('jwt_token') && !this.state.loop) {
            this.props.setupGame()
            this.startLoop()

            let showStats = false
            if (((new Date() / 1000) - this.props.timeStamp) > 5) {
                showStats = true
            }

            this.setState({ loop: true, loginModal: false, showStats })
        }
    }

    componentDidUpdate() {
        if (localStorage.getItem('jwt_token') && !this.state.loop) {
            this.props.setupGame()
            this.startLoop()
            this.setState({ loop: true })
        }
    }

    componentWillUnmount() {
        this.stopLoop()
    }

    startLoop() {
        if (!this._frameId) {
            this._frameId = window.requestAnimationFrame(this.loop)
        }
    }

    loop = (timeStamp) => {
        // Calculate the number of seconds passed since the last frame.
        const glSecondsPassed = (timeStamp - this.gameLoopTimeStamp)

        if (this.gameLoopTimeStamp === 0) {
            this.gameLoopTimeStamp = timeStamp
            this.saveTimeStamp = timeStamp
        }

        if (glSecondsPassed >= this.gameLoopInterval) {
            this.props.updateAll()
            this.gameLoopTimeStamp = timeStamp
        }

        // Set up next iteration of the loop
        this._frameId = window.requestAnimationFrame(this.loop)
    }

    stopLoop() {
        // cancelAnimationFrame() won't throw an error
        window.cancelAnimationFrame(this._frameId)
    }


    getIndustries() {
        return this.props.industryList.map(industry => {
            return <Industry
                key={'industry-' + industry.name}
                industry={industry} />
        })
    }

    // possibly create a second state renderModal
    renderLoginModal() {
        if (this.state.loginModal) {
            if (localStorage.getItem('jwt_token')) {
                // check if element is already rendered
                const elem = document.querySelector('#modal1')
                if (typeof (elem) != 'undefined' && elem != null) {
                    const instance = M.Modal.getInstance(elem)
                    instance.close()

                    this.setState({ loginModal: false })
                }
                return false
            }

            return true
        } else {
            return false
        }
    }


    render() {
        const { antimatter, industryList, username } = this.props

        return (
            <div className="game container">
                {this.renderLoginModal() ? <LoginModal /> : null}

                <div className="row">
                    <nav className="nav-wrapper">
                        <p className="antimatter center">
                            &#9797;{'Antimatter: ' + numeral(antimatter).format('0.00a')}
                        </p>

                        <p>
                            {this.state.showStats ? <StatsModal /> : null}
                        </p>
                    </nav>

                    <div className="row">
                        <Menu />

                        <article className="col s12 m8 l9 flex">
                            <div className="row">
                                {industryList.length === 0 && username ?
                                    'Loading...' : this.getIndustries()}
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}

const industryType = PropTypes.arrayOf(
    PropTypes.shape({
        name: PropTypes.string.isRequired,
        coefficient: PropTypes.number.isRequired,
        income: PropTypes.number.isRequired,
        currentIncome: PropTypes.number.isRequired,
        baseCost: PropTypes.number.isRequired,
        currentCost: PropTypes.number.isRequired,
        numberOwned: PropTypes.number.isRequired,
        wait: PropTypes.number.isRequired,
        isLocked: PropTypes.bool.isRequired,
        isContribLocked: PropTypes.bool.isRequired,
    })
).isRequired

Game.propTypes = {
    antimatter: PropTypes.number.isRequired,
    industryList: industryType,
    managedIndustries: industryType
}

const mapStateToProps = state => ({
    antimatter: state.game.antimatter,
    industryList: state.industry.industries.list,
    managedIndustries: selectManagedIndustries(state),
    timeStamp: state.game.timeStamp,
    username: state.game.user.name
})

const mapDispatchToProps = {
    setupGame,
    updateAll
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
