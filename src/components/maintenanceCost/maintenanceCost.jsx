import React from "react";
import tableLineDivisor from '../../assets/table-line-divisor.svg';
import electricity from "../../assets/electricidad.jpg";
import gasImg from "../../assets/gas.jpg";
import waterImg from "../../assets/agua.jpg";
import wifiImg from "../../assets/internet.jpg";
import alarmImg from "../../assets/alarma.jpg";
import othersImg from "../../assets/otros.jpg";
import cleaningImg from "../../assets/limpieza.jpg";
import maintanceImg from "../../assets/mantenimiento.jpg";
import communityImg from "../../assets/comunidad.jpg";
import ibiImg from "../../assets/basuras-ibi.jpg";
import homeInsuraceImg from "../../assets/seguro-hogar.jpg";
import managementImg from "../../assets/gestoria.jpg";
import "./maintenance-cost.css";

export const MaintenanCost = () => {

    const tableLines = [
        'line-divider-1',
        'line-divider-2',
        'line-divider-3',
        'line-divider-4',
        'line-divider-5',
        'line-divider-6',
        'line-divider-7',
        'line-divider-8',
        'line-divider-9',
        'line-divider-10'
    ];

    return (
        <div className="maintenance-cost">
            <div className="div">
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="rectangle" />

                        {/* Headers */}
                        <div className="text-wrapper">Real</div>
                        <div className="text-wrapper-2">Fracción</div>
                        <div className="text-wrapper-3">Fracción/Mes</div>
                        <div className="text-wrapper-4">Suministros</div>

                        {/* Table Lines */}
                        {tableLines.map((className, index) => (
                            <img
                                key={`table-line-${index}`}
                                className={className}
                                alt="Table divider"
                                src={tableLineDivisor}
                            />
                        ))}

                        {/* Content Sections */}
                        <p className="element">
                            <span className="span">
                                794 - 204 229 273
                                <br />
                                374{" "}
                            </span>
                            <span className="text-wrapper-5">1,873</span>
                        </p>

                        <p className="p">
                            <span className="span">
                                99
                                <br />
                                - 25 29 34 47{" "}
                            </span>
                            <span className="text-wrapper-5">234</span>
                        </p>

                        <p className="element-2">
                            <span className="span">
                                13 -
                                <br />
                                3 4 5 6{" "}
                            </span>
                            <span className="text-wrapper-5">31</span>
                        </p>

                        {/* Totals Section */}
                        <div className="rectangle-2" />
                        <div className="text-wrapper-6">Total</div>

                        <p className="element-3">
                            <span className="span">
                                3,692
                                <br />
                                - 3,181 - 472 968{" "}
                            </span>
                            <span className="text-wrapper-5">8,312 3,513 3,458 17,157</span>
                        </p>

                        <p className="element-4">
                            <span className="span">
                                461 - 398
                                <br />
                                - 59 121{" "}
                            </span>
                            <span className="text-wrapper-5">1,039 439 432 2,145</span>
                        </p>

                        <p className="element-5">
                            <span className="span">
                                62 - 53
                                <br />
                                - 8 16{" "}
                            </span>
                            <span className="text-wrapper-5">140 59 55 286</span>
                        </p>
                    </div>

                    {/* Labels */}
                    <div className="text-wrapper-7">Electricidad</div>
                    <div className="text-wrapper-8">Gas</div>
                    <div className="text-wrapper-9">Agua</div>
                    <div className="text-wrapper-10">Internet</div>
                    <div className="text-wrapper-11">Alarma</div>
                    <div className="text-wrapper-12">Otros</div>

                    {/* Rectangle Images */}
                    <img className="rectangle-3" alt="Rectangle" src={electricity} />
                    <img className="rectangle-4" alt="Rectangle" src={gasImg} />
                    <img className="rectangle-5" alt="Rectangle" src={waterImg} />
                    <img className="rectangle-6" alt="Rectangle" src={wifiImg} />
                    <img className="rectangle-7" alt="Rectangle" src={alarmImg} />
                    <img className="rectangle-8" alt="Rectangle" src={othersImg} />

                    {/* Additional Labels */}
                    <div className="text-wrapper-13">Limpieza</div>
                    <div className="text-wrapper-14">Mantenimiento</div>
                    <div className="text-wrapper-15">Comunidad</div>
                    <div className="text-wrapper-16">IBI y Basuras (Impuestos)</div>
                    <div className="text-wrapper-17">Seguro del hogar</div>
                    <div className="text-wrapper-18">Gestoría</div>
                    <div className="text-wrapper-19">Comunidad</div>
                    <div className="text-wrapper-20">Gastos de administracion</div>
                    <div className="text-wrapper-21">Impuestos propietario</div>

                    {/* Additional Rectangle Images */}
                    <img className="rectangle-9" alt="Rectangle" src={cleaningImg} />
                    <img className="rectangle-10" alt="Rectangle" src={maintanceImg} />
                    <img className="rectangle-11" alt="Rectangle" src={communityImg} />
                    <img className="rectangle-12" alt="Rectangle" src={ibiImg} />
                    <img className="rectangle-13" alt="Rectangle" src={homeInsuraceImg} />
                    <img className="rectangle-14" alt="Rectangle" src={managementImg} />
                </div>

                {/* Footer */}
                <p className="gastos-de">GASTOS DE MANTENIMIENTO - 2023</p>
                <p className="text-wrapper-22">
                    La cuota mensual en 2023 por propietario correspondió a 286€
                </p>
            </div>
        </div>
    );
}