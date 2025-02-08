import { useState } from 'react';
import * as XLSX from 'xlsx';

export const useExcelData = () => {
    const [data, setData] = useState(null);
    const [pdfPreviews, setPdfPreviews] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleFileUpload = async (file) => {
        try {
            const buffer = await file.arrayBuffer();
            const workbook = XLSX.read(buffer);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const excelData = XLSX.utils.sheet_to_json(sheet);
            setData(excelData);
            setPdfPreviews(new Array(excelData.length).fill(null));
            setSelectedRows(new Array(excelData.length).fill(false));
        } catch (error) {
            console.error('Error al cargar el Excel:', error);
        }
    };

    const handleSelectAll = (e) => {
        setSelectedRows(new Array(data?.length || 0).fill(e.target.checked));
    };

    const handleRowSelect = (index) => {
        const newSelectedRows = [...selectedRows];
        newSelectedRows[index] = !newSelectedRows[index];
        setSelectedRows(newSelectedRows);
    };

    return {
        data,
        pdfPreviews,
        setPdfPreviews,
        selectedRows,
        handleFileUpload,
        handleSelectAll,
        handleRowSelect
    };
};