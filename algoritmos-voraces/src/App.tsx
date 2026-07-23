import { useState } from "react";

export function App() {
  const [seccion, setSeccion] = useState<'monedas' | 'mochila' | 'actividades'>('monedas');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header style={{ background: '#14532d', color: 'white', padding: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>GreedyLab - Algoritmos Voraces</h1>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '16px', flex: 1 }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button onClick={() => setSeccion('monedas')} className="btn">Cambio Monedas</button>
          <button onClick={() => setSeccion('mochila')} className="btn">Mochila</button>
          <button onClick={() => setSeccion('actividades')} className="btn">Actividades</button>
        </div>

        <div className="card">
          <p>Seccion actual: <strong>{seccion}</strong></p>
        </div>
      </main>
    </div>
  );
}

export default App;