import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = () => {
    const generateAndDownloadExcel = () => {
        // Generar múltiples filas con variaciones
        const data = Array.from({ length: 5 }, (_, index) => ({
            casa: 'Casa ' + index,
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

        // Crear workbook
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);

        // Añadir la hoja al workbook
        XLSX.utils.book_append_sheet(wb, ws, "Datos");

        // Descargar el archivo
        XLSX.writeFile(wb, "datos_vivla.xlsx");
    };

    return (
        <button onClick={generateAndDownloadExcel}>
            Generar Excel de Ejemplo
        </button>
    );
};

export default ExcelGenerator;