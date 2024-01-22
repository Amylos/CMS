import React from "react";
import { useState,useEffect } from "react";

const DataPicker = (props) => {

const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data_csvs', {
          method: 'GET',
          headers: {
            'Accept-Version': 'v1',
            'Authorization': 'Client-ID YOUR_UNSPLASH_ACCESS_KEY', // Replace with your actual Unsplash Access Key
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result["hydra:member"]);

        // Log the fetched data
        console.log('Fetched Data:', result["hydra:member"]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  function HandleGetData(path){
    console.log(path);
    props.setPickData(false);
    props.setGraph(path);

  }


    return (
        <div className="DataPicker">
          <ul>
            {data ? (
                data.map((data) => (
                    <li>
                      <button key={data.id} onClick={() => HandleGetData(data.filePath)}>
                        {data.filePath}
                      </button>
                    </li>
                ))
            ) : null}
          </ul>

        </div>
      );
}

export default DataPicker;