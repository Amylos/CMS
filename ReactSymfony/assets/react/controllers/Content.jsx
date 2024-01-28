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
                                <SideBar setContent ={setContent} role = {props.role}/>
                                <DashBoard/>
                            </>
                        )
                    break;
                case "Article":
                        return (
                            <>
                                <SideBar setContent ={setContent} role = {props.role}/>
                                <Article data = {props}/>
                            </>
                        )
                    break;
                case "Data":
                    return (
                        <>
                            <SideBar setContent ={setContent} role = {props.role}/>
                            {
                                props.role == 'ROLE_ADMIN' || props.role == 'ROLE_FOURNISSEUR' ?
                                    <Data data = {props}/>
                                : null
                            }
                        </>
                    )
                    break;
                case "Media":
                    return (
                        <>
                            <SideBar setContent ={setContent} role = {props.role}/>
                            {
                                props.role == 'ROLE_ADMIN' || props.role == 'ROLE_FOURNISSEUR' ?
                                    <Media data = {props}/>
                                : null

                            }
                        </>
                    )
                    break;
                case "Theme":
                    return (
                        <>
                            <SideBar setContent ={setContent} role = {props.role}/>
                            {
                                props.role == 'ROLE_ADMIN' || props.role == 'ROLE_DESIGN' ?
                                    <Theme data = {props}/>
                                : null

                            }
                        </>
                    )
                    break;
                case "Users":
                    return (
                        <>
                            <SideBar setContent ={setContent} role = {props.role}/>
                            <Users id = {props.id} role = {props.role}/>
                        </>
                    )
                    break;
            }
        }
        else{
            return (
                <>
                    <Article data = {props} role = {props.role}/>
                </>
            )
        }
    }
}

export default Content;