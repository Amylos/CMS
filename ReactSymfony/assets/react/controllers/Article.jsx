import React, { useState, useEffect } from 'react';

const Article = (props) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    console.log(props)

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch('http://localhost:8000/api/articles');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result['hydra:member']);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [reload]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    const handleUpdate = (id) => {
      console.log(id);
      // Add logic for updating user with the specified id
    };






    return (
        <div className='Article'>
            Article
            <a href="/article" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</a>
            {data.map((article) => (
          <li key={article.id}>
            {article.user_id} {article.title} {article.resume}

          </li>
        ))}
        </div>
    );
}

export default Article;