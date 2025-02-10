import { useCallback, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';
import { ElementCost } from '../components/elementCost/ElementCost';
import MaintenanceCost from '../components/maintenanceCost/maintenanceCost';
import Cover from '../components/cover/Cover';

export const usePDFGenerator = () => {
    const [isLoading, setIsLoading] = useState(false);


    const waitForRender = useCallback((element) => {
        return new Promise(resolve => {
            // Creamos un observer que mira cambios en el DOM
            const observer = new MutationObserver((mutations, obs) => {

                if (document.readyState === 'complete') {
                    obs.disconnect();

                    setTimeout(resolve, 50);
                }
            });


            observer.observe(element, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });

            if (document.readyState === 'complete') {
                observer.disconnect();
                setTimeout(resolve, 50);
            }
        });
    }, []);

    const generatePage = useCallback(async (Component, props = {}) => {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.width = '1200px';
        document.body.appendChild(tempDiv);
        const root = ReactDOM.createRoot(tempDiv);

        try {
            root.render(<Component {...props} />);

            await waitForRender(tempDiv);

            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                useCORS: true,
                logging: false,
                width: 1200,
                height: tempDiv.offsetHeight,
                windowWidth: 1200,
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.querySelector('div');
                    if (clonedElement) {
                        clonedElement.style.width = '1200px';
                    }
                }
            });

            return canvas;
        } finally {
            root.unmount();
            document.body.removeChild(tempDiv);
        }
    }, [waitForRender]);

    const generatePDF = useCallback(async (rowData, index) => {

        try {
            const pdfDoc = await PDFDocument.create();
            // Generar páginas
            // const cover = await generatePage(Cover, { data: rowData });
            // const canvas1 = await generatePage(ElementCost, { data: rowData });
            // const canvas2 = await generatePage(MaintenanceCost);

            // Añadir páginas al PDF
            const pages = [
                // { component: Cover, props: { data: rowData }, title: 'Cover' },
                { component: ElementCost, props: { data: rowData }, title: 'ElementCost' },
                { component: MaintenanceCost, props: {}, title: 'MaintenanceCost' }
            ];


            for (const { component, props, title } of pages) {
                const canvas = await generatePage(component, props);
                const page = pdfDoc.addPage();
                const { width, height } = page.getSize();

                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                const arrayBuffer = await blob.arrayBuffer();
                const img = await pdfDoc.embedPng(arrayBuffer);
                // const page = pdfDoc.addPage();
                // const { width, height } = page.getSize();
                // const img = await pdfDoc.embedPng(canvas.toDataURL('image/png'));

                page.drawImage(img, {
                    x: 0,
                    y: 0,
                    width,
                    height
                });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(blob);

            return { pdfUrl, blob };
        } catch (error) {
            console.error(`Error generating PDF for index ${index}:`, error);
            throw error;
        }
    }, [generatePage]);


    const downloadPDF = (pdfUrl, index) => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `informe_${index + 1}.pdf`;
        link.click();
    };

    const openPDFInNewTab = (pdfUrl) => {
        window.open(pdfUrl, '_blank');
    };

    const generateAndDownloadPDFs = useCallback(async (data, selectedRows, pdfPreviews, setPdfPreviews) => {
        setIsLoading(true);
        const newPreviews = [...pdfPreviews];
        const batchSize = 3;

        try {
            const selectedData = data
                .map((item, index) => ({ data: item, index }))
                .filter((_, index) => selectedRows[index]);

            for (let i = 0; i < selectedData.length; i += batchSize) {
                const batch = selectedData.slice(i, i + batchSize);
                await Promise.all(
                    batch.map(async ({ data, index }) => {
                        const { pdfUrl } = await generatePDF(data, index);
                        newPreviews[index] = pdfUrl;
                        downloadPDF(pdfUrl, index);
                    })
                );
            }

            setPdfPreviews(newPreviews);
        } catch (error) {
            console.error('Error al generar PDFs:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [generatePDF, downloadPDF]);

    return {
        isLoading,
        generatePDF,
        downloadPDF,
        openPDFInNewTab,
        generateAndDownloadPDFs
    };
};