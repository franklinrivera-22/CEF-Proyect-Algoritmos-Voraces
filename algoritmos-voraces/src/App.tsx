import { useState } from "react";
import "./App.css";
import iconoLogo from "./assets/icono-512.png";
import { usePWA } from "./hooks/usePWA";

import { Home } from "./components/home/Home";
import { TareasView } from "./components/tareas/Tareas";
import { CambioMonedasApp } from "./components/cambio-monedas/CambioMonedasApp";
import { MochilaFraccionariaApp } from "./components/mochila/MochilaFraccionariaApp";

type Seccion = "home" | "monedas" | "mochila" | "actividades";

export function App() {
  const [seccion, setSeccion] = useState<Seccion>("home");
  const { isInstallable, instalarPWA } = usePWA();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div
            className="logo-container"
            style={{ cursor: "pointer" }}
            onClick={() => setSeccion("home")}
          >
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
            onClick={() => setSeccion("home")}
            className={`tab-btn ${seccion === "home" ? "tab-btn-active" : ""}`}
          >
            Inicio
          </button>
          <button
            onClick={() => setSeccion("monedas")}
            className={`tab-btn ${seccion === "monedas" ? "tab-btn-active" : ""}`}
          >
            Cambio de Monedas
          </button>
          <button
            onClick={() => setSeccion("mochila")}
            className={`tab-btn ${seccion === "mochila" ? "tab-btn-active" : ""}`}
          >
            Mochila Fraccionaria
          </button>
          <button
            onClick={() => setSeccion("actividades")}
            className={`tab-btn ${seccion === "actividades" ? "tab-btn-active" : ""}`}
          >
            Selección de Actividades
          </button>
        </nav>

        {seccion === "home" ? (
          <Home onNavegar={setSeccion} />
        ) : (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                {seccion === "monedas" && "Algoritmo de Cambio de Monedas"}
                {seccion === "mochila" && "Problema de la Mochila Fraccionaria"}
                {seccion === "actividades" &&
                  "Programación y Selección de Actividades"}
              </h2>
            </div>

            <div className="card-body">
              {seccion === "monedas" && <CambioMonedasApp />}
              {seccion === "mochila" && <MochilaFraccionariaApp />}
              {seccion === "actividades" && <TareasView />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;