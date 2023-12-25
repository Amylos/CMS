import React, { useState, useEffect } from 'react';
import Shape from "./Shape";
import ToolBox from "./ToolBox";
import Custom from "./Custom";




const Maker = () => {

    const [titleBtn,setTitleBtn] = useState(false);
    const [textBtn,setTextBtn] = useState(false);
    const [imageBtn,setImageBtn] = useState(false);
    const [graphBtn,setGraphBtn] = useState(false);

    const [title,setTitle] = useState(null);
    const [text,setText] = useState(null);
    const [image,setImage] = useState(null);
    const [graph,setGraph] = useState(null);


    const [titleColor,setTitleColor] = useState(null);
    const [titleFontFamily,setTitleFontFamily] = useState(null);

    const [textColor,setTextColor] = useState(null);
    const [textFontFamily,setTextFontFamily] = useState(null);


    useEffect(() =>{
        console.log('----------------------------------------------------------------');
        console.log('title :', titleBtn, 'text : ', textBtn, 'image : ', imageBtn, 'graph : ', graphBtn);
        console.log('title :', title, 'text : ', text, 'image : ', image, 'graph : ', graph);
        console.log('titleColor :', titleColor, 'textColor : ', textColor);
        console.log('titleFontFamily :', titleFontFamily, 'textFontFamily : ', textFontFamily);
        console.log('----------------------------------------------------------------');

        titleBtn == false ? setTitle(null) : null;
        textBtn == false ? setText(null) : null;
        imageBtn == image ? setImage(null) : null;
        graphBtn == false ? setGraph(null) : null;

    },[titleBtn,textBtn,imageBtn,graphBtn,title,text,image,graph,titleColor,textColor,titleFontFamily,textFontFamily])


    function HandlePublish(){
        console.log("Pub");

        //     {
        //     "title": "striggfgfng",
        //     "resume": "strgfing",
        //     "user": "/api/users/1"
        //   }



    }






    return (
        <div className="Maker">
            <ToolBox setTitleBtn = {setTitleBtn} setTextBtn = {setTextBtn} setImageBtn = {setImageBtn} setGraphBtn = {setGraphBtn} titleBtn = {titleBtn} textBtn = {textBtn} imageBtn = {imageBtn} graphBtn = {graphBtn}/>
            <Shape titleBtn = {titleBtn} textBtn = {textBtn} imageBtn = {imageBtn} graphBtn = {graphBtn} setTitle = {setTitle} setText = {setText} setImage = {setImage} setGraph = {setGraph} titleColor = {titleColor} textColor = {textColor} titleFontFamily = {titleFontFamily} textFontFamily = {textFontFamily} HandlePublish = {HandlePublish}/>
            <Custom setTitleColor = {setTitleColor} setTitleFontFamily = {setTitleFontFamily} setTextColor = {setTextColor} setTextFontFamily = {setTextFontFamily} />
        </div>
      );
}

export default Maker;