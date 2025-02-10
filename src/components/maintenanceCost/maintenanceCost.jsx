import React from 'react';
import tableLineDivisor from '../../assets/table-line-divisor.svg';
import electricityImg from "../../assets/costImages/electricidad.jpg";
import gasImg from "../../assets/costImages/gas.jpg";
import waterImg from "../../assets/costImages/agua.jpg";
import wifiImg from "../../assets/costImages/internet.jpg";
import alarmImg from "../../assets/costImages/alarma.jpg";
import othersImg from "../../assets/costImages/otros.jpg";
import cleaningImg from "../../assets/costImages/limpieza.jpg";
import maintanceImg from "../../assets/costImages/mantenimiento.jpg";
import communityImg from "../../assets/costImages/comunidad.jpg";
import ibiImg from "../../assets/costImages/basuras-ibi.jpg";
import homeInsuraceImg from "../../assets/costImages/seguro-hogar.jpg";
import managementImg from "../../assets/costImages/gestoria.jpg";
import './maintenance-cost.css';

const MaintenanceCost = () => {
    return (
        <div className="maintenance-container">
            <div className="maintenance-content">
                {/* Header */}
                <h1 className="maintenance-title">
                    Gastos de mantenimiento - 2023
                </h1>

                {/* Column Headers */}
                <div className="columns-header">
                    <div className="column-item"></div>
                    <div className="column-item text-right">Real</div>
                    <div className="column-item text-right">Fracción</div>
                    <div className="column-item text-right">Fracción/Mes</div>
                </div>

                {/* Utilities Section */}
                <div className="items-section">
                    <div className="cost-item">
                        <div className="item-name">
                            <img src={electricityImg} alt="Electricidad" className="item-icon" />
                            <span>Electricidad</span>
                        </div>
                        <div className="item-value">794</div>
                        <div className="item-value">99</div>
                        <div className="item-value">13</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={gasImg} alt="Gas" className="item-icon" />
                            <span>Gas</span>
                        </div>
                        <div className="item-value">-</div>
                        <div className="item-value">-</div>
                        <div className="item-value">-</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={waterImg} alt="Agua" className="item-icon" />
                            <span>Agua</span>
                        </div>
                        <div className="item-value">204</div>
                        <div className="item-value">25</div>
                        <div className="item-value">3</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={wifiImg} alt="Internet" className="item-icon" />
                            <span>Internet</span>
                        </div>
                        <div className="item-value">229</div>
                        <div className="item-value">29</div>
                        <div className="item-value">4</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={alarmImg} alt="Alarma" className="item-icon" />
                            <span>Alarma</span>
                        </div>
                        <div className="item-value">273</div>
                        <div className="item-value">34</div>
                        <div className="item-value">5</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={othersImg} alt="Otros" className="item-icon" />
                            <span>Otros</span>
                        </div>
                        <div className="item-value">374</div>
                        <div className="item-value">47</div>
                        <div className="item-value">6</div>
                    </div>
                </div>

                {/* Supplies Subtotal */}
                <div className="subtotal-row">
                    <div className="subtotal-label">Suministros</div>
                    <div className="subtotal-value">1,873</div>
                    <div className="subtotal-value">234</div>
                    <div className="subtotal-value">31</div>
                </div>

                {/* Maintenance Section */}
                <div className="items-section">
                    <div className="cost-item">
                        <div className="item-name">
                            <img src={cleaningImg} alt="Limpieza" className="item-icon" />
                            <span>Limpieza</span>
                        </div>
                        <div className="item-value">3,692</div>
                        <div className="item-value">461</div>
                        <div className="item-value">62</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={maintanceImg} alt="Mantenimiento" className="item-icon" />
                            <span>Mantenimiento</span>
                        </div>
                        <div className="item-value">-</div>
                        <div className="item-value">-</div>
                        <div className="item-value">-</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={communityImg} alt="Comunidad" className="item-icon" />
                            <span>Comunidad</span>
                        </div>
                        <div className="item-value">3,181</div>
                        <div className="item-value">398</div>
                        <div className="item-value">53</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={ibiImg} alt="IBI y Basuras" className="item-icon" />
                            <span>IBI y Basuras (Impuestos)</span>
                        </div>
                        <div className="item-value">-</div>
                        <div className="item-value">-</div>
                        <div className="item-value">-</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={homeInsuraceImg} alt="Seguro" className="item-icon" />
                            <span>Seguro del hogar</span>
                        </div>
                        <div className="item-value">472</div>
                        <div className="item-value">59</div>
                        <div className="item-value">8</div>
                    </div>

                    <div className="cost-item">
                        <div className="item-name">
                            <img src={managementImg} alt="Gestoría" className="item-icon" />
                            <span>Gestoría</span>
                        </div>
                        <div className="item-value">968</div>
                        <div className="item-value">121</div>
                        <div className="item-value">16</div>
                    </div>
                </div>

                {/* Additional Items */}
                <div className="additional-items">
                    <div className="cost-item bold">
                        <div className="item-name">Comunidad</div>
                        <div className="item-value">8,312</div>
                        <div className="item-value">1,039</div>
                        <div className="item-value">140</div>
                    </div>

                    <div className="cost-item bold">
                        <div className="item-name">Gastos de administracion</div>
                        <div className="item-value">3,513</div>
                        <div className="item-value">439</div>
                        <div className="item-value">59</div>
                    </div>

                    <div className="cost-item bold">
                        <div className="item-name">Impuestos propietario</div>
                        <div className="item-value">3,458</div>
                        <div className="item-value">432</div>
                        <div className="item-value">55</div>
                    </div>
                </div>

                {/* Total Row */}
                <div className="total-row">
                    <div className="total-label">Total</div>
                    <div className="total-value">17,157</div>
                    <div className="total-value">2,145</div>
                    <div className="total-value">286</div>
                </div>

                {/* Footer Note */}
                <p className="footer-note">
                    La cuota mensual en 2023 por propietario correspondió a 286€
                </p>
            </div>
        </div>
    );
};

export default MaintenanceCost;