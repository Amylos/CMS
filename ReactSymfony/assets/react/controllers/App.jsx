import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useState } from 'react';
import DashBoard from './DashBoard';



const App = (props) => {

    const [content,setContent] = useState("DashBoard");

    return (
        <div className='App'>
            {Display(props)}
        </div>
      );
}


const Display = (props) =>{

    // if(props.username){
    //     switch(content){
    //         case "DashBoard":
    //                 return
    //                 <>
    //                     <NavBar username = {props.username}/>
    //                     <SideBar/>
    //                 </>
    //             break;
    //         case "Data":
    //                 return
    //                 <>
    //                     <NavBar username = {props.username}/>
    //                     <SideBar/>
    //                 </>
    //             break;
    //         case "Media":
    //                 return
    //                 <>
    //                     <NavBar username = {props.username}/>
    //                     <SideBar/>
    //                 </>
    //             break;
    //         case "Theme":
    //                 return
    //                 <>
    //                     <NavBar username = {props.username}/>
    //                     <SideBar/>
    //                 </>
    //             break;
    //         case "Users":
    //             return
    //                 <>
    //                     <NavBar username = {props.username}/>
    //                     <SideBar/>
    //                 </>
    //             break;
    //         case "Article":
    //                 return
    //                 <>
    //                     <NavBar username = {props.username}/>
    //                     <SideBar/>
    //                 </>
    //             break;

    //     }
    // }
    // else{
    //     return
    //     <>
    //         <NavBar username={props.username} />
    //         <DashBoard username={props.username}/>
    //     </>
    // }
    return <NavBar username={props.username} />

}


export default App;


                // props.username ?
                // <>
                //     <NavBar username = {props.username}/>
                //     <SideBar/>
                // </>
                // :
                // <NavBar username = {props.username}/>