import React from "react";
import { useState,useEffect } from "react";

const ImagePicker = (props) => {

const [images, setImages] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

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
        console.log('Fetched Images:', result["hydra:member"][0].filePath);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);



  function HandleGetImage(path){
    console.log(path);
    // props.setImageBtn(false);
    props.setPickImage(false);
    props.setImage(path);

  }


    return (
        <div className="ImagePicker">
          {images ? (
            images.map((image) => (
              <button key={image.id} onClick={() => HandleGetImage(image.filePath)}>
                <img src={`/media/images/${image.filePath}`} alt={`Image ${image.id}`} />
              </button>
            ))
          ) : null}
        </div>
      );
}

export default ImagePicker;