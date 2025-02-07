import React from "react";
import { ElementCost } from "../elementCost/ElementCost";

const PDFGenerator = ({ data }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            {/* Botón que solo se ve en pantalla, no en el PDF */}
            <div className="print:hidden mb-4">
                <button onClick={handlePrint}>Generar PDF</button>
            </div>

            {/* Contenedor del PDF */}
            <div className="print:p-0">

                <ElementCost data={data} />
            </div>
        </div>
    );
};

export default PDFGenerator;