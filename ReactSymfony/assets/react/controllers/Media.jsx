import React, { useState } from 'react';

const Media = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check if the selected file has a valid extension (.jpg or .jpeg)
            if (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.JPG')) {
                setSelectedFile(file);
                console.log('Selected file:', file.name);
            } else {
                console.error('Invalid file type. Please select a .jpg, .jpeg, or .JPG file.');
            }
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

            // Handle any additional logic after successful upload, if needed.
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className='Media'>
            <input type='file' accept='.jpg, .jpeg, .JPG' onChange={handleFileChange} />
            {selectedFile && (
                <>
                    <p>{selectedFile.name}</p>
                    <button onClick={handleUpload}>Upload</button>
                </>
            )}
        </div>
    );
};

export default Media;
