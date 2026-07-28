import { useState } from "react";
import "./App.css"; 
import iconoLogo from "./assets/icono-512.png";
import { usePWA } from "./hooks/usePWA";

import { TareasView } from "./components/tareas/Tareas";
import { CambioMonedasApp } from "./components/cambio-monedas/CambioMonedasApp";

export function App() {
  const [seccion, setSeccion] = useState<'monedas' | 'mochila' | 'actividades'>('monedas');
  const { isInstallable, instalarPWA } = usePWA();

  return (
    <div className="app-container">

      <header className="app-header">
        <div className="header-content">
          <div className="logo-container">
            <img src={iconoLogo} alt="GreedyLab" className="logo-container img" />
          </div>
          <div>
            <h1 className="header-title">GreedyLab</h1>
            <p className="header-subtitle">Laboratorio de Algoritmos Voraces</p>
          </div>
        </div>

        {isInstallable && (
          <button onClick={instalarPWA} className="btn-pwa">
           Instalar App
         </button>
        )}
      </header>


      <main className="app-main">

        <nav className="tab-nav">
          <button
            onClick={() => setSeccion('monedas')}
            className={`tab-btn ${seccion === 'monedas' ? 'tab-btn-active' : ''}`}
          >
            Cambio de Monedas
          </button>
          <button
            onClick={() => setSeccion('mochila')}
            className={`tab-btn ${seccion === 'mochila' ? 'tab-btn-active' : ''}`}
          >
            Mochila Fraccionaria
          </button>
          <button
            onClick={() => setSeccion('actividades')}
            className={`tab-btn ${seccion === 'actividades' ? 'tab-btn-active' : ''}`}
          >
            Selección de Actividades / Tareas
          </button>
        </nav>


        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {seccion === 'monedas' && 'Algoritmo de Cambio de Monedas'}
              {seccion === 'mochila' && 'Problema de la Mochila Fraccionaria'}
              {seccion === 'actividades' && 'Programación y Selección de Actividades'}
            </h2>
          </div>

          <div className="card-body">
            {seccion === 'monedas' && <CambioMonedasApp />}

            {seccion === 'actividades' && <TareasView />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;