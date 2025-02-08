import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';
import { ElementCost } from '../components/elementCost/ElementCost';
import { MaintenanCost } from '../components/maintenanceCost/MaintenanceCost';

export const usePDFGenerator = () => {
    const [isLoading, setIsLoading] = useState(false);

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

    const generateAndDownloadPDFs = async (data, selectedRows, pdfPreviews, setPdfPreviews) => {
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

    return {
        isLoading,
        generatePDF,
        downloadPDF,
        openPDFInNewTab,
        generateAndDownloadPDFs
    };
};