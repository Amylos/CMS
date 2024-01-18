import React, { useState, useEffect } from 'react';

const ToolBox = (props) => {

    function HandleChange(e){
        switch(e.target.value){
            case 'title':
                props.titleBtn == true ? props.setTitleBtn(false) : props.setTitleBtn(true);
                break;
            case 'text':
                props.textBtn == true ? props.setTextBtn(false) : props.setTextBtn(true);
                break;
            case 'image':
                    // props.setPickImage(true); props.setPickData(false);

                   if(props.imageBtn == true){
                    props.setImageBtn(false);
                    props.setPickImage(false);
                    }
                    else{
                        props.setImageBtn(true);
                        props.setPickData(false);
                        props.setPickImage(true);

                    }

                    // props.imageBtn == true ?  : props.setImageBtn(true);
                break;
            case 'graph':
                props.setPickData(true);  props.setPickImage(false);
                props.graphBtn == true ? props.setGraphBtn(false) : props.setGraphBtn(true);
                break;
        }
    }

    return (
        <div className="ToolBox">
            <h1>Create a bloc</h1>
            <ul>
                {
                    props.titleBtn == true ?
                        <li><button onClick={HandleChange} value={'title'}>Remove Title</button></li>
                    :
                        <li><button onClick={HandleChange} value={'title'}>Add Title</button></li>
                }

                {
                    props.textBtn == true ?
                        <li><button onClick={HandleChange} value={'text'}>Remove Text</button></li>
                    :
                        <li><button onClick={HandleChange} value={'text'}>Add Text</button></li>
                }

                {
                    props.imageBtn == true  ?
                    <>
                        <li><button onClick={HandleChange} value={'image'}>Remove Image</button></li>
                    </>
                    :
                        <li><button onClick={HandleChange} value={'image'}>Add Image</button></li>
                }

                {
                    props.graphBtn == true ?
                        <li><button onClick={HandleChange} value={'graph'}>Remove Graph</button></li>
                    :
                        <li><button onClick={HandleChange} value={'graph'}>Add Graph</button></li>
                }
            </ul>
        </div>
      );
}

export default ToolBox;













// const Theme = () => {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/images', {
//           method: 'GET',
//           headers: {
//             'Accept-Version': 'v1',
//             'Authorization': 'Client-ID YOUR_UNSPLASH_ACCESS_KEY', // Replace with your actual Unsplash Access Key
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Error fetching images');
//         }

//         const result = await response.json();
//         setImages(result["hydra:member"]);

//         // Log the fetched data
//         console.log('Fetched Images:', result["hydra:member"][0].filePath);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
// {images ? (
//   images.map((image) => (
//     <div key={image.id}>
//       <img src={`/media/images/${image.filePath}`} alt={`Image ${image.id}`} />
//     </div>
//   ))
// ) : null}

//     </div>
//   );
// };

