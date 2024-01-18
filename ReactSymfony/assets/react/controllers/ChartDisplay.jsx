import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse'; // Assurez-vous d'importer la bibliothèque PapaParse

const ChartDisplay = (props) => {
    // États pour gérer le fichier CSV, les données du graphique, le type de graphique, et la référence au graphique
    const [file, setFile] = useState(null);
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('bar');
    const chartRef = useRef(null);

    // Gère le changement de fichier
    // const handleFileChange = (event) => {
    //     setFile(event.target.files[0]);
    // };

    // Gère le changement de type de graphique
    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    // Fonction pour parser les données CSV
    const parseCSV = (data) => {
        const parsedData = Papa.parse(data, { header: true });
        console.log(parsedData);
        // Extrait les étiquettes et les ensembles de données du CSV
        const labels = parsedData.data.map(row => row[parsedData.meta.fields[0]]);
        const datasets = parsedData.meta.fields.slice(1).map(field => {
            return {
                label: field,
                data: parsedData.data.map(row => row[field])
            };
        });
        return { labels, datasets };
    };

    // Utilise useEffect pour charger les données du fichier CSV
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

    // Utilise useEffect pour créer et détruire le graphique lors des changements de données du graphique ou de type de graphique
    useEffect(() => {
        if (Object.keys(chartData).length) {
            // Crée le graphique avec Chart.js
            const myChart = new Chart(chartRef.current, {
                type: chartType,
                data: {
                    labels: chartData.labels,
                    datasets: chartData.datasets,
                },
                options: {}
            });

            // Détruit le graphique lorsqu'il n'est plus nécessaire (évite les fuites de mémoire)
            return () => myChart.destroy();
        }
    }, [chartData, chartType]);

    return (
        <div className='Chart'>
            <h2>Graphique des Données</h2>
            {/* Input pour choisir un fichier CSV */}
            <input type="file" onChange={handleFileChange} />
            {/* Sélecteur pour choisir le type de graphique */}
            <select value={chartType} onChange={handleChartTypeChange}>
                <option value="bar">Barre</option>
                <option value="line">Ligne</option>
                <option value="pie">Camembert</option>
                <option value="radar">Radar</option>
                <option value="bubble">Bubble</option>
                <option value="polarArea">Polar</option>
            </select>
            {/* Référence au canevas pour le graphique */}
            <canvas ref={chartRef} />
        </div>
    );
};

export default ChartDisplay;
