import './report-card.css';

export const ReportCard = ({
    data,
    isSelected,
    pdfUrl,
    onSelect,
    onGenerate,
    onView,
    onDownload
}) => (
    <div className="report-card">
        <div className="report-header">
            <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
            />
            <div className="report-info">
                <h3>{data.casa}</h3>
                <p>Propietario: {data.propietario}</p>
            </div>
        </div>
        <div className="report-actions">
            {!pdfUrl ? (
                <button onClick={onGenerate} className="btn-generate">
                    Generar PDF
                </button>
            ) : (
                <>
                    <button onClick={onView} className="btn-view">Ver PDF</button>
                    <button onClick={onDownload} className="btn-download">Descargar</button>
                </>
            )}
        </div>
    </div>
);