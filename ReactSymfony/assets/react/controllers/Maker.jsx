import React, { useState, useEffect } from 'react';
import Shape from "./Shape";
import ToolBox from "./ToolBox";
import Custom from "./Custom";
import ImagePicker from './ImagePicker';
import DataPicker from './DataPicker';



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
    const [graphType,setGraphType] = useState(null);

    const [pickImage,setPickImage]= useState(false);
    const [pickData,setPickData]= useState(false);

    const [newArticleId, setNewArticleId] =  useState(null);

    const [textColor,setTextColor] = useState(null);
    const [backgroundColor,setBackgroundColor] = useState(null);
    const [fontFamily,setFontFamily] = useState(null);
    const [fontSize,setFontSize] = useState(null);
    const [fontWeight,setFontWeight] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);


    const [isPopUpVisible, setPopUpVisible] = useState(false);
    const HandlePop = () => {
      isPopUpVisible == true ? setPopUpVisible(false) : setPopUpVisible(true);
    };


    useEffect(() =>{
        console.log('----------------------------------------------------------------');
        console.log('titleBtn :', titleBtn, 'textBtn : ', textBtn, 'imageBtn : ', imageBtn, 'graphBtn : ', graphBtn);
        console.log('title :', title, 'text : ', text, 'image : ', image, 'graph : ', graph);
        console.log('backgroundColor :', backgroundColor, 'textColor : ', textColor);
        console.log('FontFamily : ', fontFamily, 'fontSize :', fontSize, 'fontWeight : ', fontWeight);

        console.log('New Article ID : ', newArticleId, 'SelectedTheme: ', selectedTheme);
        console.log('Pick image : ', pickImage, 'Pick data : ', pickData, 'graphType : ', graphType);

        console.log('----------------------------------------------------------------');

        titleBtn == false ? setTitle(null) : null;   title == "" ?  setTitle(null) : null;
        textBtn == false ? setText(null) : null;     text == "" ?  setText(null) : null;
        imageBtn == image ? setImage(null) : null;
        graphBtn == false ? setGraph(null) : null;

    },[titleBtn,textBtn,imageBtn,graphBtn,title,text,image,graph,backgroundColor,textColor,fontFamily,fontSize,fontWeight,graph,graphType, selectedTheme])

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
                        resume: resume,
                        user: `/api/users/${props.id}`,
                        user_id: props.id,
                        owner : props.username,
                        selectedTheme : selectedTheme
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
                const currentDate = new Date().toISOString();
                const response = await fetch('http://localhost:8000/api/blocs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        blocType: 'title',
                        title: title,
                        created_at: currentDate,
                        updated_at: currentDate,
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


        if(text){
             // Create Text Bloc
             try {
                const currentDate = new Date().toISOString();
                const response = await fetch('http://localhost:8000/api/blocs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        blocType: 'text',
                        text: text,
                        created_at: currentDate,
                        updated_at: currentDate,
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


        if(image){
            // Create Image Bloc
            try {
                const currentDate = new Date().toISOString();
               const response = await fetch('http://localhost:8000/api/blocs', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({
                       blocType: 'image',
                       imagePath: image,
                       created_at: currentDate,
                       updated_at: currentDate,
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


        if(graph){
        // Create graph Bloc
            try {
                const currentDate = new Date().toISOString();
                const response = await fetch('http://localhost:8000/api/blocs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        blocType: 'graph',
                        imagePath: image,
                        created_at: currentDate,
                        updated_at: currentDate,
                        graphPath : graph,
                        graphType : graphType,
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

        HandlePop();
    }


/************************************************************************************** */
/************************************************************************************** */
    return (
        <div className="Maker">
            <ToolBox setTitleBtn = {setTitleBtn} setTextBtn = {setTextBtn} setImageBtn = {setImageBtn} setGraphBtn = {setGraphBtn} titleBtn = {titleBtn} textBtn = {textBtn} imageBtn = {imageBtn} graphBtn = {graphBtn} setPickImage = {setPickImage} pickImage = {pickImage}  setPickData = {setPickData} pickData = {pickData}/>
            {
                pickImage == false ?
                <>
                {
                    pickData == false ?
                    <>
                        <Shape setPopUpVisible = {setPopUpVisible} isPopUpVisible = {isPopUpVisible} textColor = {textColor} backgroundColor = {backgroundColor} fontFamily = {fontFamily} fontWeight = {fontWeight} fontSize = {fontSize} titleBtn = {titleBtn} textBtn = {textBtn} imageBtn = {imageBtn} graphBtn = {graphBtn} setTitle = {setTitle} setText = {setText} setImage = {setImage} setGraph = {setGraph} setTextColor = {setTextColor} setFontFamily = {setFontFamily} setBackgroundColor = {setBackgroundColor} setFontWeight = {setFontWeight} setFontSize = {setFontSize} HandlePublish = {HandlePublish} image = {image} graph = {graph} setGraphType = {setGraphType}  text = {text} title = {title}/>
                        <Custom setSelectedTheme = {setSelectedTheme} setTextColor = {setTextColor} setFontFamily = {setFontFamily} setBackgroundColor = {setBackgroundColor} setFontWeight = {setFontWeight} setFontSize = {setFontSize} />
                    </>
                    :
                    <>
                        <DataPicker setGraph = {setGraph}  setPickData = {setPickData}/>
                        <Custom setSelectedTheme = {setSelectedTheme} setTextColor = {setTextColor} setFontFamily = {setFontFamily} setBackgroundColor = {setBackgroundColor} setFontWeight = {setFontWeight} setFontSize = {setFontSize} />
                    </>
                }
                </>
               :
               <>
                    <ImagePicker setImageBtn = {setImageBtn} setImage = {setImage} setPickImage = {setPickImage}/>
                    <Custom setSelectedTheme = {setSelectedTheme} setTextColor = {setTextColor} setFontFamily = {setFontFamily} setBackgroundColor = {setBackgroundColor} setFontWeight = {setFontWeight} setFontSize = {setFontSize} />
                </>
            }
        </div>
      );
/**************************************************************************************/
}

export default Maker;