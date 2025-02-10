import './file-upload.css';

export const FileUpload = ({ onUpload }) => (
    <div className="upload-container">
        <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => onUpload(e.target.files[0])}
            id="file-upload"
        />
        <label htmlFor="file-upload">Subir archivo Excel</label>
    </div>
);