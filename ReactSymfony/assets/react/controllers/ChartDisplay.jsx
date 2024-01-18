import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';

const ChartDisplay = (props) => {
    const [chartData, setChartData] = useState({});
    const chartRef = useRef(null);
    console.log('ChartDisplay : ',props);

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
                type: props.graphType,
                data: {
                    labels: chartData.labels,
                    datasets: chartData.datasets,
                },
                options: {}
            });

            return () => myChart.destroy();
        }
    }, [chartData]);

    return (
        <div className='Chart'>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ChartDisplay;
