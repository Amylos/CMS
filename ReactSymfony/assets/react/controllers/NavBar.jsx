import React from 'react';


const NavBar = (props) => {
    console.log(props)
    return (
        <div className="NavBar">
            <a href="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</a>
            <h1>Nb article</h1>
            <h1>clear cache</h1>
            <h1>User connecté</h1>
            {
                props.username ?
                <div>
                    <p> connected as : {props.username}</p>
                    <br></br>
                    <a href="/logout" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</a>
                    <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</a>

                </div>
                :
                <div>
                    <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign up</a>
                    <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</a>
                </div>
            }
        </div>
      );
}

export default NavBar;