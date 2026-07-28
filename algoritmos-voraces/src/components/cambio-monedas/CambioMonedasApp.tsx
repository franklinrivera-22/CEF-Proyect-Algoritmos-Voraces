import React, { useState } from 'react';
import { cambioMonedas } from '../../algoritmos/cambioMonedas';
import type { ResultadoCambio, InfoComplejidad } from '../../algoritmos/tipos';
import { TarjetaComplejidad } from '../common/TarjetaComplejidad';
import { BitacoraPasos } from '../common/BitacoraPasos';

const complejidadCambio: InfoComplejidad = {
  temporal: 'O(N log N + K)',
  espacial: 'O(K)',
  explicacion: 'N es el número de denominaciones a ordenar y K el total de monedas entregadas.'
};

export const CambioMonedasApp: React.FC = () => {
  const [monto, setMonto] = useState<number>(1);
  const [denominaciones, setDenominaciones] = useState<string>('50, 20, 10, 5, 2, 1');
  const [resultado, setResultado] = useState<ResultadoCambio | null>(null);

  const manejarCalcular = () => {
    const monedas = denominaciones
      .split(',')
      .map((d) => parseInt(d.trim(), 10))
      .filter((d) => !isNaN(d) && d > 0);

    if (monedas.length === 0 || monto <= 0) return;

    const res = cambioMonedas({
      cantidad: monto,
      monedas,
    });

    setResultado(res);
  };

  const resumenMonedas = resultado
    ? Object.entries(
        resultado.monedasUsadas.reduce((acc, moneda) => {
          acc[moneda] = (acc[moneda] || 0) + 1;
          return acc;
        }, {} as Record<number, number>)
      ).sort((a, b) => Number(b[0]) - Number(a[0]))
    : [];

  return (
    <div className="card">

      <div className="card-header">

        <h2 className="card-title">Problema del Cambio de Monedas</h2>
        <p className="card-text" style={{ fontSize: '13px', marginTop: '4px' }}>
          Encuentra la combinación óptima para devolver cambio minimizando el total de monedas.
        </p>
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        

        <TarjetaComplejidad info={complejidadCambio} />


        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Monto a devolver (Lps):</label>
            <input
              type="number"
              className="form-input"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Denominaciones (separadas por coma):</label>
            <input
              type="text"
              className="form-input"
              value={denominaciones}
              onChange={(e) => setDenominaciones(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={manejarCalcular}>
            Calcular Cambio
          </button>
        </div>

        {/* Resultados */}
        {resultado && (
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            

            <div className="metricas-grid">
              <div className="metric-card metric-card-green">
                <span className="metric-label">Total Monedas</span>
                <span className="metric-val">{resultado.monedasUsadas.length} <small>piezas</small></span>
              </div>

              <div className="metric-card metric-card-yellow">
                <span className="metric-label">Monto Solicitado</span>
                <span className="metric-val">Lps.{monto}</span>
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#0f172a' }}>
                Monedas Utilizadas por Denominación
              </h4>

              <div className="chips-container">
                {resumenMonedas.map(([denominacion, cantidad]) => (
                  <div key={denominacion} className="coin-chip">
                    <div className="coin-icon">Lps.{denominacion}</div>
                    <div className="coin-details">
                      <span className="coin-qty">× {cantidad}</span>
                      <span className="coin-subtotal">(Lps.{Number(denominacion) * cantidad})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <BitacoraPasos pasos={resultado.pasos} />
          </div>
        )}

      </div>
    </div>
  );
};