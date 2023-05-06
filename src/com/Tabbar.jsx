import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../img/logo.png"
import { AuthContext } from '../context/authContext';

export const Tabbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (

    <div className='navbar'>
      <div className="container">
        <div className='logo'>
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>         
        </div>

        <div className='links'>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>

          <Link className='link' to="/?cat=hotel">
            <h6>HOTEL</h6>
          </Link>

          <Link className='link' to="/?cat=recommend">
            <h6>RECOMMEND</h6>
          </Link>

          <Link className='link' to="/?cat=travel">
            <h6>TRAVEL</h6>
          </Link>

          <Link className='link' to="/?cat=fashion">
            <h6>FASHION</h6>
          </Link>

          <Link className='link' to="/?cat=about">
            <h6>ABOUT</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className='write'>
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
