import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div className="ui placeholder segment">
        <div className="ui two column very relaxed stackable grid">
          <div className="column">
            <div id="error-message">
              {error &&
                error.response && (
                  <div>
                    {' '}
                    {'*'}
                    {error.response.data}{' '}
                  </div>
                )}
            </div>
            <div className="ui form">
              <form onSubmit={handleSubmit} name={name}>
                <div className="field">
                  <label>Username</label>
                  <div className="ui left icon input">
                    <input type="text" name="email" placeholder="Username" />
                    <i className="user icon" />
                  </div>
                </div>
                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input type="password" name="password" />
                    <i className="lock icon" />
                  </div>
                </div>
                <br />
                <button
                  className="ui blue submit button"
                  id="login-button"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="middle aligned column">
            <div className="auth-button">
              <a href="/auth/google">
                <button className="ui google plus button">
                  <i className="google plus icon" />
                  {displayName} with Google
                </button>
              </a>
            </div>
            <div className="auth-button">
              <a href="/auth/facebook">
                <button className="ui facebook button">
                  <i className="facebook icon" />
                  {displayName} with Facebook
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="ui vertical divider">Or</div>
      </div>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    // error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    // error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}