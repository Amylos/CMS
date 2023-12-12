import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useState } from 'react';



const App = (props) => {

    const [content,setContent] = useState("DashBoard");

    return (
        <div className='App'>
            {Display(props)}
        </div>
      );
}


const Display = (props) =>{

    if(props.username){
        switch(content){
            case "DashBoard":
                break;
            case "Data":
                break;
            case "Media":
                break;
            case "Theme":
                break;
            case "Users":
                break;
            case "Article":
                break;

        }
    }

    return <NavBar username={props.username} />;
}


export default App;


                // props.username ?
                // <>
                //     <NavBar username = {props.username}/>
                //     <SideBar/>
                // </>
                // :
                // <NavBar username = {props.username}/>