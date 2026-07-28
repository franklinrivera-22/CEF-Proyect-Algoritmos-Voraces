import React, { useState } from 'react';
import { cambioMonedas } from '../../algoritmos/cambioMonedas';
import type { ResultadoCambio } from '../../algoritmos/tipos';


export const CambioMonedasApp: React.FC = () => {
  const [monto, setMonto] = useState<number>(87);
  const [denominaciones, setDenominaciones] = useState<string>('50,20,10,5,1');
  const [resultado, setResultado] = useState<ResultadoCambio | null>(null);

  const manejarCalcular = () => {
    const monedas = denominaciones
      .split(',')
      .map((d) => parseInt(d.trim(), 10))
      .filter((d) => !isNaN(d));

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
      )
    : [];

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2>Problema del Cambio de Monedas</h2>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <label>Monto:</label>
          <br />
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Denominaciones (separadas por coma):</label>
          <br />
          <input
            type="text"
            value={denominaciones}
            onChange={(e) => setDenominaciones(e.target.value)}
          />
        </div>

        <div style={{ alignSelf: 'end' }}>
          <button onClick={manejarCalcular}>
            Calcular
          </button>
        </div>
      </div>

      {resultado && (
        <div>
          <h3>Resultado</h3>

          <p>
            <strong>Total de monedas:</strong>{' '}
            {resultado.monedasUsadas.length}
          </p>

          <h4>Monedas utilizadas</h4>

          <ul>
            {resumenMonedas.map(([denominacion, cantidad]) => (
              <li key={denominacion}>
                ${denominacion} × {cantidad}
              </li>
            ))}
          </ul>

          <h3>Bitácora de pasos</h3>

          <ol>
            {resultado.pasos.map((p) => (
              <li key={p.paso}>
                <strong>Paso {p.paso}:</strong> {p.descripcion}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};