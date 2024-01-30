import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';

const BarChart = (props) => {
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('bar');
    const chartRef = useRef(null);

    const parseCSV = (data) => {
        const parsedData = Papa.parse(data, { header: true });
        const labels = parsedData.data.map(row => row[parsedData.meta.fields[0]]);
        const datasets = parsedData.meta.fields.slice(1).map(field => ({
            label: field,
            data: parsedData.data.map(row => row[field])
        }));
        return { labels, datasets };
    };

    useEffect(() => {
        if (props.graph) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/media/CSV/${props.graph}`);
                    const data = await response.text();
                    const chartData = parseCSV(data);
                    setChartData(chartData);
                } catch (error) {
                    console.error('Error fetching CSV:', error);
                }
            };

            fetchData();
        }
    }, [props.graph]);

    useEffect(() => {
        console.log('chartData : ',chartData);
        if (Object.keys(chartData).length && chartRef.current) {
            const myChart = new Chart(chartRef.current, {
                type: chartType,
                data: {
                    labels: chartData.labels,
                    datasets: chartData.datasets,
                },
                options: {}
            });

            props.setGraphType(chartType)
            return () => myChart.destroy();
        }
    }, [chartData, chartType]);

    return (
        <div className='Chart'>
            <h2>Graphique des Données</h2>
            <select value={chartType} onChange={(e) => {setChartType(e.target.value)}}>
                <option value="bar">Barre</option>
                <option value="line">Ligne</option>
                <option value="pie">Camembert</option>
                <option value="radar">Radar</option>
                <option value="bubble">Bubble</option>
                <option value="polarArea">Polar</option>
            </select>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default BarChart;




