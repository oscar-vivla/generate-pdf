import { ReportCard } from "../reportCard/ReportCard";

export const ReportList = ({
    data,
    selectedRows,
    pdfPreviews,
    onSelect,
    onSelectAll,
    onGenerateAll,
    onGeneratePDF,
    onViewPDF,
    onDownloadPDF
}) => (
    <div>
        <div className="select-all">
            <div className="select-all-left">
                <input
                    type="checkbox"
                    checked={selectedRows.every(Boolean)}
                    onChange={onSelectAll}
                    id="select-all"
                />
                <label htmlFor="select-all">Seleccionar todos</label>
            </div>
            <button
                onClick={onGenerateAll}
                disabled={!selectedRows.some(Boolean)}
                className="btn-generate-all"
            >
                Generar y Descargar PDFs
            </button>
        </div>
        <div className="reports-list">
            {data.map((rowData, index) => (
                <ReportCard
                    key={index}
                    data={rowData}
                    isSelected={selectedRows[index]}
                    pdfUrl={pdfPreviews[index]}
                    onSelect={() => onSelect(index)}
                    onGenerate={() => onGeneratePDF(rowData, index)}
                    onView={() => onViewPDF(pdfPreviews[index])}
                    onDownload={() => onDownloadPDF(pdfPreviews[index], index)}
                />
            ))}
        </div>
    </div>
);
