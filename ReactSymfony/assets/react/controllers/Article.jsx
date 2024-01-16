import React, { useState, useEffect } from 'react';

const Article = (props) => {
    console.log('Article props : ', props);
  const [dataArticle, setDataArticle] = useState(null);
  const [dataBlocs, setDataBlocs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

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

  return (
    <div className='ArticleComponent'>
      <a href="/article" className=" btn__article articleAdd bg-blue-500 hover:border-4 border-sky-500 text-white font-bold py-2 px-4 rounded">
        <div className='plus'> + </div>
        <p> New article </p>
      </a>
            {dataArticle && dataArticle.map((article) => (
            <div className='article' key={article.id}>
               ArticleID :  {article.id} UserId : {article.userId} Rédigé par : {article.owner}

               {dataBlocs && dataBlocs.map((bloc) => (
                <>
                {
                    bloc.articleId == article.id ?
                    <li key={bloc.id}>
                        BlocId : {bloc.id} articleID :  {bloc.articleId} {bloc.title} {bloc.text}
                    </li>
                    : null
                }
                </>
                ))}
                  { props.data.id ?
                      props.data.id == article.userId ?
                          <>
                              <button>Update</button>
                              <button>Delete</button>
                          </>
                      :null
                : null

                }
        </div>
            ))}
      </div>
  );
};

export default Article;