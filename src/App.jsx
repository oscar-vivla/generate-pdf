import React from 'react';
import { usePDFGenerator } from './hooks/usePDFGenerator';
import { useExcelData } from './hooks/useDataExcel';
import { ReportList } from './components/reportList/ReportList';
import { FileUpload } from './components/fileUpload/FileUpload';
import './App.css';

const App = () => {
  const excelData = useExcelData();
  const pdfGenerator = usePDFGenerator();

  const handleGeneratePDF = async (rowData, index) => {
    const { pdfUrl } = await pdfGenerator.generatePDF(rowData, index);
    const newPreviews = [...excelData.pdfPreviews];
    newPreviews[index] = pdfUrl;
    excelData.setPdfPreviews(newPreviews);
  };

  if (pdfGenerator.isLoading) {
    return <div className="loader" />;
  }

  if (!excelData.data) {
    return <FileUpload onUpload={excelData.handleFileUpload} />;
  }

  return (
    <div className="container">
      <ReportList
        data={excelData.data}
        selectedRows={excelData.selectedRows}
        pdfPreviews={excelData.pdfPreviews}
        onSelect={excelData.handleRowSelect}
        onSelectAll={excelData.handleSelectAll}
        onGenerateAll={pdfGenerator.generateAndDownloadPDFs}
        onGeneratePDF={handleGeneratePDF}
        onViewPDF={pdfGenerator.openPDFInNewTab}
        onDownloadPDF={pdfGenerator.downloadPDF}
      />
    </div>
  );
};

export default App;