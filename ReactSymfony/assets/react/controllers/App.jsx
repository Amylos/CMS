import React from 'react';
import { useState } from 'react';

import NavBar from './NavBar';
import Content from './Content';
import Maker from './Maker';

const App = (props) => {

    function Display(){
        switch(props.route){
            case 'app_home':
                return(
                    <>
                        <NavBar username = {props.username}/>
                        <Content connected = {props.connected} />
                    </>
                )
                break;
            case 'app_article':
                return(
                    <>
                        <NavBar username = {props.username}/>
                        <Maker/>
                    </>
                )
                break;
            default:
                return null;
                break;
        }
    }

    return (
        <div className='App'>
            {
                Display()
            }

        </div>
      );

}


export default App;

