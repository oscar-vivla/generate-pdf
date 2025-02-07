import React from "react";
import lineDivisor from '../../assets/line-divisor.svg';
import "./ElementCost.css";

export const ElementCost = ({ data }) => {
  if (!data) {
    console.error('No se recibieron datos');
    return null;
  }

  // Extraer datos con valores por defecto por si faltan
  const {
    diasDisfrutados = 0,
    valorMercado = 0,
    totalInicial = 0,
    balanceAjustado = 0,
    cuotaMensual2024 = 0,
    valorVivienda = 0,
    gastosMensuales2023 = 0,
    ingresosPorAlquiler = 0,
    incrementoValor = 0,
    fechaAdquisicion = ''
  } = data;


  return (
    <div className="element-COST">
      <div className="div">
        <div className="text-wrapper">EXECUTIVE SUMMARY</div>

        <div className="group">
          <p className="este-a-o-disfrutaste">
            <span className="span">Este año disfrutaste </span>

            <span className="text-wrapper-2">{diasDisfrutados}</span>

            <span className="span">
              {" "}
              de tu casa, una experiencia que en el mercado tendría un coste de{" "}
            </span>

            <span className="text-wrapper-2">{valorMercado}</span>
          </p>

          <div className="valor-a-adido">
            VALOR
            <br />
            AÑADIDO
          </div>

          <img className="line" alt="Line" src={lineDivisor} />

          <p className="element-d-as">
            <span className="text-wrapper-3">
              38
              <br />
            </span>

            <span className="text-wrapper-4">días</span>
          </p>
        </div>

        <div className="group-2">
          <p className="inicialmente-el">
            <span className="span">Inicialmente, el total fue de </span>

            <span className="text-wrapper-2">{totalInicial}</span>

            <span className="span">
              . Tras aplicar los ingresos por alquiler, ajustamos tu balance a{" "}
            </span>

            <span className="text-wrapper-2">{balanceAjustado}</span>
          </p>

          <p className="tu-balance-anual-en">
            {" "}
            TU BALANCE
            <br />
            ANUAL EN 2023
          </p>

          <img className="img" alt="Line" src={lineDivisor} />

          <p className="element-EURO">
            <span className="text-wrapper-5">5,323</span>

            <span className="text-wrapper-6">
              .4
              <br />
            </span>

            <span className="text-wrapper-7">EURO</span>
          </p>
        </div>

        <div className="group-3">
          <p className="p">
            <span className="span">
              Para el próximo año, estimamos que tu cuota mensual será de{" "}
            </span>

            <span className="text-wrapper-2">304 €</span>

            <span className="span">
              . Esta cuota la hemos querido ajustar al máximo aumentando
              ligeramente con respecto a los gastos reales del 2023, por debajo
              del IPC.
            </span>
          </p>

          <div className="text-wrapper-8">PROYECCIÓN 2024</div>

          <img className="line-2" alt="Line" src={lineDivisor} />

          <p className="element-EURO-2">
            <span className="text-wrapper-9">
              304
              <br />
            </span>

            <span className="text-wrapper-7">EURO</span>
          </p>
        </div>

        <div className="group-4">
          <p className="p">
            <span className="span">
              Desde la adquisición de la vivienda en Mayo de 2023, el precio de
              la vivienda&nbsp;&nbsp;ha continuado creciendo de forma sostenida
              (+5%) como consecuencia de la escasez de vivienda en la zona y su
              atractivo.
              <br />
              VIVLA estima que el valor actualizado de la fracción se sitúa en{" "}
            </span>

            <span className="text-wrapper-2">185.000 €</span>

            <span className="span">
              {" "}
              a finales de 2023.
              <br />
            </span>
          </p>

          <div className="text-wrapper-8">VALORACIÓN</div>

          <img className="line-3" alt="Line" src={lineDivisor} />

          <div className="text-wrapper-10">185K</div>
        </div>

        <div className="group-5">
          <p className="este-a-o-tus-gastos">
            <span className="span">Este año, tus gastos mensuales fueron </span>

            <span className="text-wrapper-2">286 €</span>

            <span className="span">
              . <br />
              Este cálculo incluye mantenimiento y servicios para garantizar el
              máximo cuidado de tu propiedad.
            </span>
          </p>

          <div className="text-wrapper-8">
            GASTOS
            <br />
            2023
          </div>

          <img className="line-4" alt="Line" src={lineDivisor} />

          <p className="element-EURO-3">
            <span className="text-wrapper-9">
              286
              <br />
            </span>

            <span className="text-wrapper-7">EURO</span>
          </p>
        </div>
      </div>
    </div>
  );
};
