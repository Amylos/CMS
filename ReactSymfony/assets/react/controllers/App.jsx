import React from 'react';
import { useState } from 'react';

import NavBar from './NavBar';
import Content from './Content';
import Maker from './Maker';

const App = (props) => {
    console.log('App props : ',props);
    function Display(){

        switch(props.route){
            case 'app_home':
                return(
                    <>
                        <NavBar connected = {props.connected} username = {props.username}/>
                        <Content connected = {props.connected} id = {props.id} username = {props.username} role = {props.role}/>
                    </>
                )
                break;
            case 'app_article':
                return(
                    <>
                        <NavBar connected = {props.connected} username = {props.username}/>
                        <Maker id = {props.id} username = {props.username}/>
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

