import React from 'react';
import { useState } from 'react';

import NavBar from './NavBar';
import SideBar from './SideBar';

import DashBoard from './DashBoard';
import Article from './Article';
import Data from './Data';
import Theme from './Theme';
import Users from './Users';
import Media from './Media';
import Content from './Content';


const App = (props) => {
    console.log('App : ', props);
    return (
        <div className='App'>
            <NavBar username = {props.username}/>
            <Content connected = {props.connected}/>
        </div>
      );

}


export default App;

