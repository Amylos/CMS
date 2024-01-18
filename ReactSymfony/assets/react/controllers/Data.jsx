import React, { useState, useEffect } from 'react';
import BarChart from './Chart';


const Data = (Data) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvFiles, setCsvFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data_csvs', {
          method: 'GET',
          headers: {
            'Accept-Version': 'v1',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching CSV files');
        }

        const result = await response.json();
        setCsvFiles(result["hydra:member"]);

        // Log the fetched data
        console.log('Fetched CSV Files:', result["hydra:member"]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCsvFiles();
  }, [reloadTrigger]); // Add reloadTrigger as a dependency

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the selected file has a valid extension (.csv)
      if (file.name.endsWith('.csv')) {
        setSelectedFile(file);
        console.log('Selected file:', file.name);
      } else {
        console.error('Invalid file type. Please select a .csv file.');
        setSelectedFile(null);
        file.name = "No file chosen";
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
      console.log('CSV File uploaded successfully:', data);

      // Trigger a reload by updating reloadTrigger state
      setReloadTrigger((prev) => !prev);
    } catch (error) {
      console.error('Error uploading CSV file:', error);
    }
  };

  const HandleDelete = async (id, path) => {
    // delete API
    try {
      const response = await fetch(`http://localhost:8000/api/data_csvs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("CSV File deleted successfully");
        setReloadTrigger((prev) => !prev); // Toggle reload to trigger a refetch
      } else {
        console.error("Failed to delete CSV file");
      }
    } catch (error) {
      console.error("Error occurred while deleting CSV file:", error);
    }
  };

  /***************RETURN***************** */
  return (
    <div className='Data'>
      <input type='file' accept='.csv' onChange={handleFileChange} />
      {selectedFile && (
        <>
          <p>{selectedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </>
      )}
      {csvFiles ? (
        csvFiles.map((csvFile) => (
            <p>{csvFile.filePath}</p>
        ))
      ) : null}
    </div>
  );
};

export default Data;
