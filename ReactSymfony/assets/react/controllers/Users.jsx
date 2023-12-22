import React, { useState, useEffect } from 'react';

const Users = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/users');
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('User deleted successfully');
        setReload(!reload); // Toggle reload to trigger a refetch
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error occurred while deleting user:', error);
    }
  };

  return (
    <div className="Users">
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.username} {user.lastName} {user.firstName} {user.mail}
            <a href={`/user/edit/${user.id}`}> Update</a>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
