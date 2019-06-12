import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/auth'
import {Menu} from 'semantic-ui-react'

class Navbar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  render() {
    const {handleClick, isLoggedIn, userId} = this.props
    return (
      <div>
        <div className="ui teal inverted segment" style={{borderRadius: '0px'}}>
          <h1
            style={{fontSize: '40px', display: 'inline-block'}}
            className="nav-title"
          >
            Payment
          </h1>
          <p style={{display: 'inline-block', marginLeft: '20px'}}>
            Capgemini project
          </p>
          <div className="ui inverted secondary menu navigationBar">

            <Menu secondary>
                <Menu.Item>
                    <Link to="/home" className="item">
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/products" className="item">
                        Products
                    </Link>
                </Menu.Item>
            </Menu>

            <Menu secondary className="navigationBarLogIn">
              {isLoggedIn && (
                  <Menu.Item>
                      <Link to={`/users/${userId}/orders`} className="item">
                          Orders
                      </Link>
                  </Menu.Item>
              )}
              <Menu.Item>
                  {isLoggedIn ? (
                      <a className="item" href="#" onClick={handleClick}>
                          Logout
                      </a>
                  ) : (
                      <Link to="/login" className="item">
                          Login
                      </Link>
                  )}
              </Menu.Item>
              {!isLoggedIn && (
                  <Menu.Item>
                      <Link to="/signup" className="item">
                          Sign Up
                      </Link>
                  </Menu.Item>
              )}
            </Menu>

            {/* <div className="nav-items">
              <Link to="/home" className="item">
                Home
              </Link>
              <Link to="/products" className="item">
                Products
              </Link>
            </div> */}

            {/* <div className="nav-items end">
              {isLoggedIn && (
                <Link to={`/users/${userId}/orders`} className="item">
                  Orders
                </Link>
              )}

              {isLoggedIn ? (
                <a className="item" href="#" onClick={handleClick}>
                  Logout
                </a>
              ) : (
                <Link to="/login" className="item">
                  Login
                </Link>
              )}
              {!isLoggedIn && (
                <Link to="/signup" className="item">
                  Sign Up
                </Link>
              )}
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    // isLoggedIn: !!state.user.id,
    isLoggedIn: false,
    // userId: state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}