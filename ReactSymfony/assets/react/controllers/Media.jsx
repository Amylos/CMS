import React, { useState, useEffect } from 'react';

const Media = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/images', {
          method: 'GET',
          headers: {
            'Accept-Version': 'v1',
            'Authorization': 'Client-ID YOUR_UNSPLASH_ACCESS_KEY', // Replace with your actual Unsplash Access Key
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching images');
        }

        const result = await response.json();
        setImages(result["hydra:member"]);

        // Log the fetched data
        console.log('Fetched Images:', result["hydra:member"]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [reloadTrigger]); // Add reloadTrigger as a dependency

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the selected file has a valid extension (.jpg or .jpeg)
      if (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.JPG')) {
        setSelectedFile(file);
        console.log('Selected file:', file.name);
      } else {
        console.error('Invalid file type. Please select a .jpg, .jpeg, or .JPG file.');
        setSelectedFile(null);
        file.name = "Aucun fichier choisi";      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected for upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/api/images', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Image uploaded successfully:', data);

      // Trigger a reload by updating reloadTrigger state
      setReloadTrigger((prev) => !prev);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  const HandleDelete = async (id,path) => {
    // delete API
    try {
      const response = await fetch(`http://localhost:8000/api/images/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Image deleted successfully");
        setReload(!reload); // Toggle reload to trigger a refetch
        setOpenModal(false);
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error occurred while deleting image:", error);
    }

    // delete from project


  };



  /***************RETURN***************** */
  return (
    <div className='Media'>
      <input type='file' accept='.jpg, .jpeg, .JPG' onChange={handleFileChange} />
      {selectedFile && (
        <>
          <p>{selectedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </>
      )}
      {images ? (
        images.map((image) => (
          <div key={image.id}>
            <img src={`/media/images/${image.filePath}`} alt={`Image ${image.id}`} />
            <p>{image.filePath}</p>
            <button onClick={() => HandleDelete(image.id,image.filePath)}>Delete</button>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default Media;
