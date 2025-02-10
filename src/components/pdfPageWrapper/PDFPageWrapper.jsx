import './pdf-styles.css';

export const PDFPageWrapper = ({ children }) => (
    <div className="pdf-page">
        <div className="pdf-content">
            {children}
        </div>
    </div>
);