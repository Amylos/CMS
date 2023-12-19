import React, { useState, useEffect } from 'react';

const Users = (props) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true when starting the fetch
        setLoading(true);

        // Make a GET request to your API endpoint
        const response = await fetch('http://localhost:8000/api/users?page=1');

        // Check if the request was successful (status code 200)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const result = await response.json();

        // Update the state with the fetched data
        setData(result['hydra:member']);


      } catch (error) {
        // If an error occurs, update the state with the error information
        setError(error);
      } finally {
        // Set loading to false after the request is complete, regardless of success or failure
        setLoading(false);
      }
    };
        // Call the fetchData function when the component mounts
        fetchData();
    }, []); // The empty dependency array ensures that this effect runs once when the component mounts

    // Render based on the loading and error states
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

  return (
        <div className='Users'>
          <ul>
            {
              data.map(user => (
                <li>{user.username} {user.lastName}{user.firstName} {user.mail}</li>
              ))
            }

          </ul>

        </div>
      );
}

export default Users;