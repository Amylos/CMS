import React, { useState, useEffect, useRef } from 'react';

const BarChart = () => {
    const [file, setFile] = useState(null);
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('bar');
    const chartRef = useRef(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const parseCSV = (data) => {
        const parsedData = Papa.parse(data, { header: true });
        console.log(parsedData);
        const labels = parsedData.data.map(row => row[parsedData.meta.fields[0]]);
        const datasets = parsedData.meta.fields.slice(1).map(field => {
            return {
                label: field,
                data: parsedData.data.map(row => row[field])
            };
        });
        return { labels, datasets };
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const chartData = parseCSV(e.target.result);
                setChartData(chartData);
            };
            reader.readAsText(file);
        }
    }, [file]);

    useEffect(() => {
        if (Object.keys(chartData).length) {
            const myChart = new Chart(chartRef.current, {
                type: chartType,
                data: {
                    labels: chartData.labels,
                    datasets: chartData.datasets,
                },
                options: {}
            });

            return () => myChart.destroy();
        }
    }, [chartData, chartType]);

    return (
        <div className='Chart'>
            <h2>Graphique des Données</h2>
            <input type="file" onChange={handleFileChange} />
            <select value={chartType} onChange={handleChartTypeChange}>
                <option value="bar">Barre</option>
                <option value="line">Ligne</option>
                <option value="pie">Camembert</option>
                <option value="radar">Radar</option>
                <option value="bubble">Bubble</option>
                <option value="polarArea">Polar</option>

            </select>
            <canvas ref={chartRef} />
        </div>
    );
};

export default BarChart;