import React from "react";
import { useState } from 'react';

import SideBar from "./SideBar";
import DashBoard from './DashBoard';
import Article from './Article';
import Data from './Data';
import Theme from './Theme';
import Users from './Users';
import Media from './Media';


const Content = (props) => {
    console.log('Content : ', props);

    const [content,setContent] = useState("DashBoard");

    return (
        <div className="Content">
            {Display(props)}
        </div>
      );

    function Display(props){
        if(props.connected){
            switch(content){
                case "DashBoard":
                        return (
                            <>
                                <SideBar setContent ={setContent}/>
                                <DashBoard/>
                            </>
                        )
                    break;
                case "Article":
                        return (
                            <>
                                <SideBar setContent ={setContent}/>
                                <Article data = {props}/>
                            </>
                        )
                    break;
                case "Data":
                    return (
                        <>
                            <SideBar setContent ={setContent}/>
                            <Data data = {props}/>
                        </>
                    )
                    break;
                case "Media":
                    return (
                        <>
                            <SideBar setContent ={setContent}/>
                            <Media data = {props}/>
                        </>
                    )
                    break;
                case "Theme":
                    return (
                        <>
                            <SideBar setContent ={setContent}/>
                            <Theme data = {props}/>
                        </>
                    )
                    break;
                case "Users":
                    return (
                        <>
                            <SideBar setContent ={setContent}/>
                            <Users id = {props.id}/>
                        </>
                    )
                    break;
            }
        }
        else{
            return (
                <>
                    <Article data = {props}/>
                </>
            )
        }
    }
}

export default Content;