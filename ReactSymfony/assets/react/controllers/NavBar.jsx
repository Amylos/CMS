import React, { useState, useEffect } from 'react';


const NavBar = (props) => {
    console.log('NavBar : ',props);
    return (
        <div className="NavBar">
      <div className="NavBar__container">
        <a href="/home" className="NavBar__logo">
          GAP.
        </a>

        {props.username ? (
          <div className="Navbar__Connection">
            <br></br>
            <a href="/logout" className="Navbar__logout">
              Logout
            </a>
            <a href="/register" className="Navbar__register">
              Sign in
            </a>
          </div>
        ) : (
          <div>
            <a href="/login" className="Navbar__logout">
              Login
            </a>
            <a href="/register" className="Navbar__register">
              Sign in
            </a>
          </div>
        )}
      </div>
    </div>

      );
}

export default NavBar;