import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = () => {
    // Villa names array
    const villaNames = [
        'Villa Bini', 'Villa Coves', 'Villa Son Parc', 'Villa Son Parc II',
        'Villa Ribes', 'Casa Tarida', 'Casa Tarida II', 'Villa Valderrama',
        'Villa Gades', 'Casa Deveses', 'Villa Tosalet', 'Casa Oyambre',
        'Casa Ruda', 'Villa Fir', 'Casa Nin', 'Casa Nheu', 'Casa Baqueira 1500',
        'Casa Arties', 'Casa Naut', 'Casa Garona', 'Casa Salaró', 'Casa Turó'
    ];

    // Propietario names array
    const propietarioNames = [
        'Alejandra Moyron', 'Alejandra Perez Rivas', 'Álvaro López-Cotelo',
        'Begoña Niederleytner Irisarri', 'Carlos Floria', 'Carlos Gómez',
        'Claudia Solís', 'Daniel Fuster', 'Elena Pernia', 'Fabiola Jimenez',
        'Guillermo Alvarez', 'Ines Cortijo', 'Jaime Gómez-Ulla', 'Jorge Orejas',
        'Julia Peña', 'Laura Leal', 'Laura Peco', 'Leo Perez-Cuv',
        'María Rivero Alonso', 'Maria Sacristan', 'Marijose', 'Marta Guitierrez',
        'Miguel González-Bueno', 'Nacho Ro. Zanón', 'Naroa Ripodas',
        'Nikola Urrutia', 'Óscar Sangrador', 'Pepe Ivars', 'Raul Alonso',
        'Sandra Bueno', 'Silvia Fortuny Elguer', 'Violeta Postigo'
    ];

    // Function to get a random item from an array
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const generateAndDownloadExcel = () => {
        // Generate multiple rows with variations
        const data = Array.from({ length: 12 }, (_, index) => ({
            casa: getRandomItem(villaNames),
            propietario: getRandomItem(propietarioNames),
            diasDisfrutados: 38 + index * 2,
            valorMercado: 18800 + index * 1000,
            totalInicial: 6101.4 + index * 500,
            balanceAjustado: 5323.4 + index * 450,
            cuotaMensual2024: 304 + index * 20,
            valorVivienda: 185000 + index * 5000,
            gastosMensuales2023: 286 + index * 15,
            ingresosPorAlquiler: 778 + index * 50,
            incrementoValor: 5 + index,
            fechaAdquisicion: `${["Mayo", "Junio", "Julio", "Agosto", "Septiembre"][index]} 2023`
        }));

        // Create workbook
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);

        // Add sheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Datos");

        // Download file
        XLSX.writeFile(wb, "datos_vivla.xlsx");
    };

    return (
        <button onClick={generateAndDownloadExcel}>
            Generar Excel de Ejemplo
        </button>
    );
};

export default ExcelGenerator;