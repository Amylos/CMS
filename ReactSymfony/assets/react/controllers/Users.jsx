import React, { useState, useEffect } from "react";

const Users = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  function ModalUsers({ onClose, onDelete }) {
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={onClose}>X</button>
          </div>
          <div className="title">
            <h1>Are You Sure You Want to Continue?</h1>
          </div>
          <div className="body">
            <p>The next page looks amazing. Hope you want to go there!</p>
          </div>
          <div className="footer">
            <button onClick={onClose} id="cancelBtn">
              Cancel
            </button>
            <button onClick={onDelete}>Continue</button>
          </div>
        </div>
      </div>
    );
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result["hydra:member"]);
      console.log(result["hydra:member"]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  const handleUpdate = (id) => {
    console.log(id);
  
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User deleted successfully");
        setReload(!reload); // Toggle
        setOpenModal(false);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error occurred while deleting user:", error);
    }
  };




  const handleUpdateRole = async (userId, newEmail) => {
    try {
      console.log('New Email:', newEmail);
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          mail: newEmail, // Assuming 'mail' is the correct field for updating user email
        }),
      });
  
      if (response.ok) {
        console.log("User email updated successfully");
        setReload(!reload); // Toggle
        setOpenModal(false);
      } else {
        console.error("Failed to update user email");
      }
    } catch (error) {
      console.error("Error occurred while updating user email:", error);
    }
  };



  return (
    <div className="Users">
      <div className="Header">
        <h1> Users </h1>
      </div>

      <div className="Categories__title">
        <tr>
          <th> Username</th>
          <th> Lastname</th>
          <th> Firstname</th>
          <th> e-mail</th>
        </tr>

        <tr>
          <th> Edit</th>
          <th> Delete</th>
        </tr>
      </div>
      <ul>
        {data &&
          data.map((user) => (
            <li key={user.id}>
              {user.username} {user.lastName} {user.firstName} {user.mail}
              <div>
              <select
                id="choices"
                name="choices"
                onChange={(event) => handleUpdateRole(user.id, event.target.value)}>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                <option value="ROLE_DESIGN">ROLE_DESIGN</option>
                <option value="ROLE_FOURNISSEUR">ROLE_FOURNISSEUR</option>
                <option value="ROLE_USER">ROLE_USER</option>
              </select>

                <a className="btn__edit" href={`/user/edit/${user.id}`}>
                  Edit
                </a>
                <button
                  className="btn__delete"
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setOpenModal(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      {openModal && (
        <ModalUsers
          onClose={() => setOpenModal(false)}
          onDelete={() => handleDelete(selectedUserId)}
        />
      )}
    </div>
  );
};

export default Users;