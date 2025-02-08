import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { usePDFGenerator } from './hooks/usePDFGenerator';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    isLoading,
    generatePDF,
    downloadPDF,
    openPDFInNewTab,
    generateAndDownloadPDFs
  } = usePDFGenerator();

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

  const handleGenerateAndDownloadPDFs = () => {
    generateAndDownloadPDFs(data, selectedRows, pdfPreviews, setPdfPreviews);
  };


  const handleSelectAll = (e) => {
    setSelectedRows(new Array(data.length).fill(e.target.checked));
  };

  const handleRowSelect = (index) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="container">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      {!data ? (
        <div className="upload-container">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </div>
      ) : (
        <div>
          <div className="select-all">
            <input
              type="checkbox"
              checked={selectedRows.every(Boolean)}
              onChange={handleSelectAll}
              id="select-all-checkbox"
            />
            <label htmlFor="select-all-checkbox">Seleccionar todos</label>
            <button
              onClick={handleGenerateAndDownloadPDFs}
              disabled={!selectedRows.some(Boolean)}
              className="btn-generate-all"
            >
              Generar y Descargar PDFs
            </button>
          </div>
          <div className="reports-list">
            {data.map((rowData, index) => (
              <div key={index} className="report-card">
                <div className="report-select">
                  <input
                    type="checkbox"
                    checked={selectedRows[index]}
                    onChange={() => handleRowSelect(index)}
                  />
                </div>
                <div className="report-info">
                  <h3>Informe {index + 1}</h3>
                  <p>Fecha: {rowData.fechaAdquisicion}</p>
                </div>
                <div className="report-actions">
                  {!pdfPreviews[index] ? (
                    <button
                      onClick={() => generatePDF(rowData, index).then(({ pdfUrl }) => {
                        const newPreviews = [...pdfPreviews];
                        newPreviews[index] = pdfUrl;
                        setPdfPreviews(newPreviews);
                      })}
                      className="btn-generate"
                    >
                      Generar PDF
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => openPDFInNewTab(pdfPreviews[index])}
                        className="btn-view"
                      >
                        Ver PDF
                      </button>
                      <button
                        onClick={() => downloadPDF(pdfPreviews[index], index)}
                        className="btn-download"
                      >
                        Descargar
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;