import React from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';

const PieChart = (props) => {

    const [dataLabel,setDataLabel] = useState([]);
    const [dataAttribute,setAttribute] = useState('');
    const [dataValue,setDataValue] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    /** EXTRACTION DE DONNEES **/
    var labelsAttribute;
    var labels = [];
    var values = [];

    onload = fetch("/CSV/my.csv") // DATA BASE PATH FILE
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error occured while loading csv file : ${res.status}`);
      }
      return res.text();
    })
    .then((data) => {
      let result = data.split('\n').map((e) => {
        return e.split(';');
      });
      result.forEach((e, index) => {
        if (index == 0) {
          labelsAttribute = e[1];
        } else {
          labels[index - 1] = e[0];
          values[index - 1] = e[1];
        }
      });
    })
    .then(() => {
      if (isFetched == false) {
        setAttribute(labelsAttribute);
        setDataLabel(labels);
        setDataValue(values);
        setIsFetched(true);
      }
      console.log(dataLabel);
      console.log(dataValue);
    })
    .catch((error) => {
      console.error('Error occured after managing CSV data :', error);
    });

/** CREATION DE LA CHART **/
const data = {
    labels: dataLabel,
    datasets: [
        {
            label: dataAttribute,
            data: dataValue,
            borderWidth: 3,
            backgroundColor: ['#05445E','#189AB4','#75E6DA','#D4F1F4'],  // DATA BASE COLOR
        }
    ]
};

    return (
        <div className="PieChart">
            <Pie data={data}/>
        </div>
    )
}

export default PieChart;


