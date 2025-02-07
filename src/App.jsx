import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as XLSX from 'xlsx';
import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';
import { ElementCost } from './components/elementCost/ElementCost';
import { MaintenanCost } from './components/maintenanceCost/MaintenanceCost';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const generatePDF = async (rowData, index) => {
    const pdfDoc = await PDFDocument.create();

    // Primera página - ElementCost
    const page1 = pdfDoc.addPage();
    const { width, height } = page1.getSize();
    const tempDiv1 = document.createElement('div');
    document.body.appendChild(tempDiv1);

    const root1 = ReactDOM.createRoot(tempDiv1);
    root1.render(<ElementCost data={rowData} />);

    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas1 = await html2canvas(tempDiv1, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    root1.unmount();
    document.body.removeChild(tempDiv1);

    // Segunda página - MaintenanCost
    const page2 = pdfDoc.addPage();
    const tempDiv2 = document.createElement('div');
    document.body.appendChild(tempDiv2);

    const root2 = ReactDOM.createRoot(tempDiv2);
    root2.render(<MaintenanCost />);

    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas2 = await html2canvas(tempDiv2, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    root2.unmount();
    document.body.removeChild(tempDiv2);

    // Insertar imágenes en páginas
    const img1 = await pdfDoc.embedPng(canvas1.toDataURL('image/png'));
    const img2 = await pdfDoc.embedPng(canvas2.toDataURL('image/png'));

    page1.drawImage(img1, {
      x: 0,
      y: 0,
      width: width,
      height: height
    });

    page2.drawImage(img2, {
      x: 0,
      y: 0,
      width: width,
      height: height
    });

    // Guardar PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);

    return { pdfUrl, blob };
  };

  const downloadPDF = (pdfUrl, index) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `informe_${index + 1}.pdf`;
    link.click();
  };

  const openPDFInNewTab = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const generateAndDownloadPDFs = async () => {
    setIsLoading(true);
    const newPreviews = [...pdfPreviews];

    for (let i = 0; i < data.length; i++) {
      if (selectedRows[i]) {
        const { pdfUrl } = await generatePDF(data[i], i);
        newPreviews[i] = pdfUrl;
        downloadPDF(pdfUrl, i);
      }
    }

    setPdfPreviews(newPreviews);
    setIsLoading(false);
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
              onClick={generateAndDownloadPDFs}
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