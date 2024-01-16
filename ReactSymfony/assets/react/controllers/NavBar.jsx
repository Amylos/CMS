import React, { useState, useEffect } from 'react';


const NavBar = (props) => {
    console.log('NavBar : ',props);
    return (
        <div className="NavBar">
            <a href="/home">GAP.</a>
            {
                props.username ?
                <div>
                    <br></br>
                    <a href="/logout" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</a>
                    <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</a>

                </div>
                :
                <div>
                    <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</a>
                    <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</a>
                </div>
            }
        </div>
      );
}

export default NavBar;