import React from 'react';
import type { PasoSimulacion } from '../../algoritmos/tipos';

export const BitacoraPasos: React.FC<{ pasos: PasoSimulacion[] }> = ({ pasos }) => (
  <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
    <h4 style={{ margin: '0 0 8px 0' }}>Bitácora de Pasos (Estrategia Voraz):</h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {pasos.map((p) => (
        <div key={p.paso} style={{ padding: '8px 12px', background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: '6px', fontSize: '14px' }}>
          <strong>Paso {p.paso}:</strong> {p.descripcion}
        </div>
      ))}
    </div>
  </div>
);