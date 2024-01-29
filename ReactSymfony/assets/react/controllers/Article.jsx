import React, { useState, useEffect } from "react";
import ChartDisplay from "./ChartDisplay";

const Article = (props) => {
  console.log("Article props : ", props);
  const [dataArticle, setDataArticle] = useState(null);
  const [dataBlocs, setDataBlocs] = useState(null);
  const [dataThemes, setDataThemes] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  const [showArticle, setShowArticle] = useState(false);
  const [showArticleOwner, setShowArticleOwner] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState({backgroundColor : "white"});

    useEffect(() => {
      const fetchDataThemes = async () => {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:8000/api/themes");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setDataThemes(result["hydra:member"]);
          console.log(result["hydra:member"]);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

    const fetchDataBlocs = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/blocs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataBlocs(result["hydra:member"]);
        console.log(result["hydra:member"]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/articles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataArticle(result["hydra:member"]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataArticles();
    fetchDataBlocs();
    fetchDataThemes();
  }, [reload]);

  useEffect(() => {
    if (dataArticle) {
      console.log("Data Article:", dataArticle);
    }
  }, [dataArticle]);

  useEffect(() => {
    if (dataBlocs) {
      console.log("Data Blocs:", dataBlocs);
    }
  }, [dataBlocs]);

  if (loading) {
    return <div className="Article__Component">Loading...</div>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Article deleted successfully");
        setReload(!reload);
        setShowArticle(false);
      } else {
        console.error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error occurred while deleting article:", error);
    }
  };

  function HandleShow(articleId) {
    console.log("HandleShow : ", articleId);
    if(showArticle == false){
      setShowArticle(articleId);
    }
    else{
      setShowArticle(false);
      setSelectedTheme({backgroundColor : "white"});
    }
  }

  function HandleOwner(owner) {
    console.log("HandleOwner : ", owner);
    showArticleOwner == null
      ? setShowArticleOwner(owner)
      : setShowArticleOwner(null);
  }

  function HandleSelectTheme(themeId){
    dataThemes.map((theme) =>{
      if(themeId == theme.id){
        setSelectedTheme(theme);
      }
    })
  }

  return (
    <div className="Article__Component">
      {showArticle == false ? (
        <>
        {
          props.data.role ?
            <a href="/article" className=" articleAdd hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> + </a>
          : null
        }
        {dataArticle &&
          dataBlocs &&
          dataArticle.map((article) => (
            <button className="article" key={article.id} onClick={() => {HandleShow(article.id);HandleOwner(article.owner);HandleSelectTheme(article.selectedTheme)}}>
              {
                dataBlocs && dataBlocs.map((bloc) =>(
                  <>
                    {
                      bloc.articleId == article.id ?
                    <>
                      {
                        bloc.imagePath ?
                          <img className="article__img" src={`/media/images/${bloc.imagePath}`}/>
                        : null
                      }
                      <h2 className="article__title">{bloc.title}</h2>
                      <h2 className="article__content">{bloc.text}</h2>
                    </>
                    : null
                    }
                  </>
                ))
              }
              <p className="article__author"> Rédigé par : {article.owner}</p>
            </button>
          ))}
        </>
      ) : (
        <div className="ArticleDisplayedPage"   style={{ background: selectedTheme.backgroundColor }}>

          <ArticleDisplayed
          dataBlocs={dataBlocs}
          articleID={showArticle}
          owner={showArticleOwner}
          HandleDelete={HandleDelete}
          theme = {selectedTheme}/>
          <div className="ArticleDisplayed__utilities">
          <button className="ArticleDisplayed__btn" onClick={() => HandleShow()}> Back </button>
          <button className="ArticleDisplayed__btnD" onClick={() => HandleDelete(showArticle)}>Delete</button>
          </div>        
        </div>
      )}
    </div>
  );
};

export default Article;
const ArticleDisplayed = (props) => {
  return (
      <div className='ArticleDisplayed'>
        {
          props.dataBlocs ?
          props.dataBlocs.map((bloc)=>(
            <div>
              {
                bloc.articleId == props.articleID ?
                  <div>
                  {
                    bloc.blocType === "title" ?
                    <>
                     {
                      props.theme ?
                      <h1 className='BlocTitle' style={{color : props.theme.textColor, fontSize: props.theme.fontSize, fontFamily: props.theme.fontFamily, fontWeight: props.theme.fontWeight}}>
                       {bloc.title}
                      </h1>
                      :
                      <h1 className='BlocTitle'>
                        {bloc.title}
                      </h1>
                      }
                    </>
                    :
                    bloc.blocType === "text" ?
                    <>
                    {
                      props.theme ?
                      <div className='BlocText' style={{color : props.theme.textColor, fontSize: props.theme.fontSize, fontFamily: props.theme.fontFamily, fontWeight: props.theme.fontWeight}}>
                        <p>{bloc.text}</p>
                      </div>
                      :
                      <div className='BlocText'>
                        <p>{bloc.text}</p>
                      </div>
                    }
                    </>
                    :
                    bloc.blocType === "image" ?
                    <div className='BLocImage'>
                        <img src={`/media/images/${bloc.imagePath}`} alt={`Image ${bloc.imagePath}`}/>
                    </div>
                    :
                    bloc.blocType === "graph" ?
                    <div className='BLocGraph'>
                        {bloc.graphPath}
                        {bloc.graphType}
                        <ChartDisplay graph = {bloc.graphPath} graphType = {bloc.graphType} />
                    </div>
                    : null
                  }
                  </div>
                :
                  null
              }
            </div>
          ))
          : null
        }
        <p>Rédigé par : {props.owner}</p>
      </div>
    );
}

{
  /* {dataArticle && dataArticle.map((article) => ( */
}
{
  /* article.id == showArticle ? */
}

{
  /* <div className='article' key={article.id}> */
}

{
  /* {dataBlocs && dataBlocs.map((bloc) => (
                  <>
                  {
                    bloc.articleId == showArticle ?
                      <li key={bloc.id}> */
}
{
  /* {
                          bloc.imagePath ?
                            <img src={`/media/images/${bloc.imagePath}`} alt={`Image ${bloc.imagePath}`} />
                          :
                           null
                          } */
}
{
  /* text : {bloc.text}
                          bloc.graphPath : {bloc.graphPath} */
}
{
  /* {
                          bloc.graphPath ?
                            <img src={`/media/images/${bloc.imagePath}`} alt={`Image ${bloc.imagePath}`} />
                          :
                           null
                          } */
}

{
  /* bloc.imagePath
                          <button onClick={() =>HandleUpdate()}>Update</button>
                      </li>
                    : null
                  }
                  </>

              ))}
                    Rédigé par : {article.owner}
                    <button onClick={ () => HandleDelete(showArticle)}>Delete</button>
                </div>
              : null
                ))} */
}

// import React, { useState, useEffect } from 'react';

// const Article = (props) => {
//     console.log('Article props : ', props);
//   const [dataArticle, setDataArticle] = useState(null);
//   const [dataBlocs, setDataBlocs] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reload, setReload] = useState(false);

//   useEffect(() => {
//     const fetchDataArticles = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:8000/api/articles');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result = await response.json();
//         setDataArticle(result['hydra:member']);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchDataBlocs = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:8000/api/blocs');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result = await response.json();
//         setDataBlocs(result['hydra:member']);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDataArticles();
//     fetchDataBlocs();
//   }, [reload]);

//   useEffect(() => {
//     if (dataArticle) {
//       console.log('Data Article:', dataArticle);
//     }
//   }, [dataArticle]);

//   useEffect(() => {
//     if (dataBlocs) {
//       console.log('Data Blocs:', dataBlocs);
//     }
//   }, [dataBlocs]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className='ArticleComponent'>
//       <a href="/article" className=" btn__article articleAdd bg-blue-500 hover:border-4 border-sky-500 text-white font-bold py-2 px-4 rounded">
//         <div className='plus'> + </div>
//         <p> New article </p>
//       </a>
//             {dataArticle && dataArticle.map((article) => (
//             <div className='article' key={article.id}>
//                ArticleID :  {article.id} UserId : {article.userId} Rédigé par : {article.owner}

//                {dataBlocs && dataBlocs.map((bloc) => (
//                 <>
//                 {
//                     bloc.articleId == article.id ?
//                     <li key={bloc.id}>
//                         BlocId : {bloc.id} articleID :  {bloc.articleId} {bloc.title} {bloc.text}
//                     </li>
//                     : null
//                 }
//                 </>
//                 ))}
//                   { props.data.id ?
//                       props.data.id == article.userId ?
//                           <>
//                               <button>Update</button>
//                               <button>Delete</button>
//                           </>
//                       :null
//                 : null

//                 }
//         </div>
//             ))}
//       </div>
//   );
// };

// export default Article;


 {/* {dataBlocs &&
                dataBlocs.map((bloc) => (
                  <>
                    {bloc.articleId == article.id ?
                    <> */}
                    {/* <div className="Article__layout " key={bloc.id}> */}
                        {/* <div className="Article__background">
                        {
                          bloc.imagePath ?
                            <img className="" src={`/media/images/${bloc.imagePath}`}/>
                          : null
                        }
                        </div>
                        <div className="Article__header">
                        </div>
                        <div className="Article__footer">
                          <h1 className="Article__title"> {bloc.title} </h1>
                          <p className="Article__desc">{bloc.text}</p>
                          <p className="Article__author"> Rédigé par : {article.owner}</p>
                        </div> */}
                      {/* </div> */}
                    {/* </>
                    : null
                    } */}
                  {/* </> */}
                {/* ))} */}