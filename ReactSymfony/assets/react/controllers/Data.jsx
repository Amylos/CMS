import React, { useState, useEffect } from 'react';
import Chart from './Chart';

const Data = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check if the selected file has a valid extension (.csv)
            if (file.name.endsWith('.csv')) {
                setSelectedFile(file);
                console.log('Selected file:', file.name);
            } else {
                console.error('Invalid file type. Please select a .csv file.');
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
            const response = await fetch('http://localhost:8000/api/data_csvs', {
                method: 'POST',
                body: formData,

            });

            const data = await response.json();
            console.log('File uploaded successfully:', data);

            // Handle any additional logic after successful upload, if needed.
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className='Data'>
            <input type='file' accept='.csv' onChange={handleFileChange} />
            {selectedFile && (
                <>
                    <p>{selectedFile.name}</p>
                    <button onClick={handleUpload}>Upload</button>
                </>
            )}
        </div>
    );
};

export default Data;
