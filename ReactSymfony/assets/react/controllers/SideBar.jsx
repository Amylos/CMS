import React, { useState, useEffect } from 'react';


const SideBar = (props) => {
    return (
        <div className='SideBar'>
            <button onClick={ChangeContent} value={"Article"}>Article</button>
            <button onClick={ChangeContent} value={"Data"}>Data</button>
            <button onClick={ChangeContent} value={"Media"}>Media</button>
            <button onClick={ChangeContent} value={"Theme"}>Theme</button>
            <button onClick={ChangeContent} value={"Users"}>Users</button>
        </div>
      );

        function ChangeContent(e){
            props.setContent(e.target.value);
            console.log("content");
        }
}

export default SideBar;