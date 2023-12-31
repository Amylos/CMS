import React, { useState, useEffect } from 'react';
import Shape from "./Shape";
import ToolBox from "./ToolBox";
import Custom from "./Custom";




const Maker = (props) => {
    console.log('Maker props : ', props);

    const [titleBtn,setTitleBtn] = useState(false);
    const [textBtn,setTextBtn] = useState(false);
    const [imageBtn,setImageBtn] = useState(false);
    const [graphBtn,setGraphBtn] = useState(false);

    const [title,setTitle] = useState(null);
    const [text,setText] = useState(null);
    const [resume,setResume] = useState(null);
    const [image,setImage] = useState(null);
    const [graph,setGraph] = useState(null);

    const [titleColor,setTitleColor] = useState(null);
    const [titleFontFamily,setTitleFontFamily] = useState(null);
    const [textColor,setTextColor] = useState(null);
    const [textFontFamily,setTextFontFamily] = useState(null);

    const [newArticleId, setNewArticleId] =  useState(null);

    useEffect(() =>{
        console.log('----------------------------------------------------------------');
        console.log('title :', titleBtn, 'text : ', textBtn, 'image : ', imageBtn, 'graph : ', graphBtn);
        console.log('title :', title, 'text : ', text, 'image : ', image, 'graph : ', graph);
        console.log('titleColor :', titleColor, 'textColor : ', textColor);
        console.log('titleFontFamily :', titleFontFamily, 'textFontFamily : ', textFontFamily);
        console.log('New Article ID : ', newArticleId);
        console.log('----------------------------------------------------------------');

        titleBtn == false ? setTitle(null) : null;   title == "" ?  setTitle(null) : null;
        textBtn == false ? setText(null) : null;     text == "" ?  setText(null) : null;
        imageBtn == image ? setImage(null) : null;
        graphBtn == false ? setGraph(null) : null;

    },[titleBtn,textBtn,imageBtn,graphBtn,title,text,image,graph,titleColor,textColor,titleFontFamily,textFontFamily])

/**************************************************************************************/
/**************************************************************************************/

    const HandlePublish = async (event) => {
        if (props.id) {
            event.preventDefault();
    
            try {
                const currentDate = new Date().toISOString();
    
                // Create Article
                const responseArticle = await fetch('http://localhost:8000/api/articles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        created_at: currentDate,
                        updated_at: currentDate,
                        resume: 'resume',
                        user: `/api/users/${props.id}`,
                        user_id: props.id,
                        owner : props.username,
                    }),
                });

                if (responseArticle.ok) {
                    console.log('Article created successfully');
                    const responseData = await responseArticle.json();
                    const newArticleId = responseData.id;

                    console.log('Article created successfully with ID:', newArticleId);
                    // setNewArticleId(newArticleId);

                    await createBloc(newArticleId);

                } else {
                    const errorDataArticle = await responseArticle.json(); // Parse the error response
                    console.error('Failed to create article:', errorDataArticle);

                    // Add additional logging for debugging
                    console.log('Full Response Article:', responseArticle);
                }
            } catch (error) {
                console.error('Error creating article:', error);
            }
        } else {
            console.error('Error creating article:', 'No User connected');
        }
    };



    const createBloc = async (ArticleId) => {
        // Create Title Bloc
        if(title){
            try {
                const response = await fetch('http://localhost:8000/api/blocs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        blocType: 'title',
                        title: title,
                        articles: `/api/articles/${ArticleId}`,
                        article_id: ArticleId
                    }),
                });
    
                if (response.ok) {
                    console.log('Bloc created successfully');
                } else {
                    const errorData = await response.json(); // Parse the error response
                    console.error('Failed to create bloc:', errorData);
                }
            } catch (error) {
                console.error('Error creating bloc:', error);
            }
        }
        else{

        }

        if(text){
             // Create Text Bloc
             try {
                const response = await fetch('http://localhost:8000/api/blocs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        blocType: 'text',
                        text: text,
                        articles: `/api/articles/${ArticleId}`,
                        article_id: ArticleId
                    }),
                });

                if (response.ok) {
                    console.log('Bloc created successfully');
                } else {
                    const errorData = await response.json(); // Parse the error response
                    console.error('Failed to create bloc:', errorData);
                }
            } catch (error) {
                console.error('Error creating bloc:', error);
            }


        }
        else{
            
        }
    }
        

       

/************************************************************************************** */
/************************************************************************************** */
    return (
        <div className="Maker">
            <ToolBox setTitleBtn = {setTitleBtn} setTextBtn = {setTextBtn} setImageBtn = {setImageBtn} setGraphBtn = {setGraphBtn} titleBtn = {titleBtn} textBtn = {textBtn} imageBtn = {imageBtn} graphBtn = {graphBtn}/>
            <Shape titleBtn = {titleBtn} textBtn = {textBtn} imageBtn = {imageBtn} graphBtn = {graphBtn} setTitle = {setTitle} setText = {setText} setImage = {setImage} setGraph = {setGraph} titleColor = {titleColor} textColor = {textColor} titleFontFamily = {titleFontFamily} textFontFamily = {textFontFamily} HandlePublish = {HandlePublish}/>
            <Custom setTitleColor = {setTitleColor} setTitleFontFamily = {setTitleFontFamily} setTextColor = {setTextColor} setTextFontFamily = {setTextFontFamily} />
        </div>
      );
/**************************************************************************************/
}

export default Maker;