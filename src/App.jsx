import React from 'react';
import { usePDFGenerator } from './hooks/usePDFGenerator';
import { useExcelData } from './hooks/useDataExcel';
import './App.css';

const App = () => {
  const {
    data,
    pdfPreviews,
    setPdfPreviews,
    selectedRows,
    handleFileUpload,
    handleSelectAll,
    handleRowSelect
  } = useExcelData();

  const {
    isLoading,
    generatePDF,
    downloadPDF,
    openPDFInNewTab,
    generateAndDownloadPDFs
  } = usePDFGenerator();


  const handleGenerateAndDownloadPDFs = () => {
    generateAndDownloadPDFs(data, selectedRows, pdfPreviews, setPdfPreviews);
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