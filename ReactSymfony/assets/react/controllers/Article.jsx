import React, { useState, useEffect } from 'react';

const Article = (props) => {
    console.log('Article props : ', props);
  const [dataArticle, setDataArticle] = useState(null);
  const [dataBlocs, setDataBlocs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [showArticle,setShowArticle] = useState(false);



  useEffect(() => {
    const fetchDataArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setDataArticle(result['hydra:member']);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataBlocs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/blocs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setDataBlocs(result['hydra:member']);
        console.log(result['hydra:member']);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataArticles();
    fetchDataBlocs();
  }, [reload]);

  useEffect(() => {
    if (dataArticle) {
      console.log('Data Article:', dataArticle);
    }
  }, [dataArticle]);

  useEffect(() => {
    if (dataBlocs) {
      console.log('Data Blocs:', dataBlocs);
    }
  }, [dataBlocs]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }



  const HandleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Article deleted successfully');
        setReload(!reload);
        setShowArticle(false);
      } else {
        console.error('Failed to delete article');
      }
    } catch (error) {
      console.error('Error occurred while deleting article:', error);
    }
  };


  const HandleUpdate = async (id) => {

    console.log("HandleUpdate");

  };



  function HandleShow(articleId){
    console.log('HandleShow : ', articleId);
    showArticle == false ? setShowArticle(articleId) : setShowArticle(false);
  };

  return (
    <div className='ArticleComponent'>
      {
        showArticle == false ?
        <>
          <a href="/article" className=" articleAdd bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</a>
              {dataArticle && dataArticle.map((article) => (
              <button className='article' key={article.id} onClick={() => HandleShow(article.id)}>

                ArticleID :  {article.id} UserId : {article.userId} Rédigé par : {article.owner}
                {dataBlocs && dataBlocs.map((bloc) => (
                  <>
                  {
                    bloc.articleId == article.id ?
                      <li key={bloc.id}>
                          BlocId : {bloc.id} articleID :  {bloc.articleId} {bloc.title} {bloc.text}
                          {
                          bloc.imagePath ?
                            <img src={`/media/images/${bloc.imagePath}`} alt={`Image ${bloc.imagePath}`} />
                          :
                           null
                          }
                      </li>
                    : null
                  }
                  </>
                  ))}
              </button>
            ))}
        </>
        : //HERE
        <div>
              <button style={{color:"blue"}} onClick={() => HandleShow()}>Back</button>
              {dataArticle && dataArticle.map((article) => (
              article.id == showArticle ?
                <div className='article' key={article.id}>
                   {article.title} <button onClick={() =>HandleUpdate()}>Update</button>
                  {dataBlocs && dataBlocs.map((bloc) => (
                  <>
                  {
                    bloc.articleId == showArticle ?
                      <li key={bloc.id}>
                          {
                          bloc.imagePath ?
                            <img src={`/media/images/${bloc.imagePath}`} alt={`Image ${bloc.imagePath}`} />
                          :
                           null
                          }
                          {bloc.text}

                          bloc.imagePath
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
              ))}
        </div>
      }
      </div>
  );
};





export default Article;



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
