import React, { useState, useEffect } from 'react';


const SideBar = (props) => {
    console.log("SIDEBAR : ",props.role);
    return (
        <div className='SideBar'>
            <button className="Sidebar__link" onClick={ChangeContent} value={"DashBoard"}>DashBoard</button>
            <button className="Sidebar__link" onClick={ChangeContent} value={"Article"}>Article</button>

            <button className="Sidebar__link" onClick={ChangeContent} value={"Data"}>Data</button>
            <button className="Sidebar__link" onClick={ChangeContent} value={"Media"}>Media</button>
            <button className="Sidebar__link" onClick={ChangeContent} value={"Theme"}>Theme</button>
            <button className="Sidebar__link" onClick={ChangeContent} value={"Users"}>Users</button>
            {/* {
                props.role == 'ROLE_ADMIN' || props.role == 'ROLE_FOURNISSEUR' ?
                <>
                    <button className="Sidebar__link" onClick={ChangeContent} value={"Data"}>Data</button>
                    <button className="Sidebar__link" onClick={ChangeContent} value={"Media"}>Media</button>
                    <button className="Sidebar__link" onClick={ChangeContent} value={"Theme"}>Theme</button>
                    <button className="Sidebar__link" onClick={ChangeContent} value={"Users"}>Users</button>
                </>
                :                     <button className="Sidebar__link" onClick={ChangeContent} value={"Users"}>Users</button>

            }
            {
                props.role == 'ROLE_ADMIN' || props.role == 'ROLE_DESIGN' ?
                <>
                    <button className="Sidebar__link" onClick={ChangeContent} value={"Theme"}>Theme</button>
                </>
                : null
            }
            {
                props.role == 'ROLE_ADMIN' ?
                <>
                    <button className="Sidebar__link" onClick={ChangeContent} value={"Users"}>Users</button>
                </>
                : null
            } */}
        </div>
      );

        function ChangeContent(e){
            props.setContent(e.target.value);
            console.log("content");
        }
}

export default SideBar;