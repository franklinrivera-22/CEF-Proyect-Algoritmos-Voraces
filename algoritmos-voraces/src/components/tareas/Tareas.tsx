import React, { useState } from "react";
import type {
  Tarea,
  ResultadoTareas,
  InfoComplejidad,
} from "../../algoritmos/tipos";
import { BitacoraPasos } from "../common/BitacoraPasos";
import { TarjetaComplejidad } from "../common/TarjetaComplejidad";
import { useWorker } from "../../hooks/useWorker";

const complejidadTareas: InfoComplejidad = {
  temporal: "O(N²)",
  espacial: "O(D)",
  explicacion:
    "Se ordenan N tareas por ganancia en O(N log N) y para cada una se realiza una búsqueda lineal en un arreglo de tamaño D (máximo plazo).",
};

export const TareasView: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [ganancia, setGanancia] = useState<number>(50);
  const [deadline, setDeadline] = useState<number>(2);
  const [tareas, setTareas] = useState<Tarea[]>([
    { nombre: "Tarea A", ganancia: 100, deadline: 2 },
    { nombre: "Tarea B", ganancia: 19, deadline: 1 },
    { nombre: "Tarea C", ganancia: 27, deadline: 2 },
    { nombre: "Tarea D", ganancia: 25, deadline: 1 },
    { nombre: "Tarea E", ganancia: 15, deadline: 3 },
  ]);
  const [resultado, setResultado] = useState<ResultadoTareas | null>(null);

  const { ejecutarEnWorker, cargando } = useWorker();

  const agregarTarea = () => {
    if (!nombre.trim() || ganancia <= 0 || deadline <= 0) return;
    setTareas([...tareas, { nombre, ganancia, deadline }]);
    setNombre("");
  };

  const eliminarTarea = (index: number) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  const handleCalcular = () => {
    if (tareas.length === 0) return;

    ejecutarEnWorker<Tarea[], ResultadoTareas>(
      "TAREAS",
      tareas,
      (res) => {
        setResultado(res);
      }
    );
  };

  return (
    <>
  

      <TarjetaComplejidad info={complejidadTareas} />

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Nombre de la Actividad</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej: Tarea A"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Ganancia (Lps.)</label>
          <input
            type="number"
            className="form-input"
            placeholder="100"
            value={ganancia}
            onChange={(e) => setGanancia(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Plazo Máximo (T)</label>
          <input
            type="number"
            className="form-input"
            placeholder="2"
            value={deadline}
            onChange={(e) => setDeadline(Number(e.target.value))}
          />
        </div>

        <button
          type="button"
          onClick={agregarTarea}
          className="btn-secondary"
        >
          + Añadir Tarea
        </button>
      </div>

      <div>
        <p className="card-text" style={{ marginBottom: "12px" }}>
          <strong>Tareas Ingresadas para evaluación ({tareas.length}):</strong>
        </p>
        <div className="chips-container">
          {tareas.map((t, index) => (
            <div key={index} className="item-chip">
              <div>
                <strong>{t.nombre}</strong> — Lps. {t.ganancia}{" "}
                <span className="badge-deadline">T={t.deadline}</span>
              </div>
              <button
                type="button"
                onClick={() => eliminarTarea(index)}
                className="btn-delete"
                title="Eliminar tarea"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>


      <button
        type="button"
        onClick={handleCalcular}
        disabled={cargando || tareas.length === 0}
        className="btn-primary"
      >
        {cargando ? "Procesando Optimización..." : "Optimizar Programación de Tareas"}
      </button>

      {resultado && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="metricas-grid">
            <div className="metric-card metric-card-green">
              <span className="metric-label">Ganancia Máxima Alcanzada</span>
              <div className="metric-val">
                Lps. {resultado.gananciaTotal}
              </div>
            </div>

            <div className="metric-card metric-card-yellow">
              <span className="metric-label">Tareas Seleccionadas</span>
              <div className="metric-val">
                {resultado.tareasSeleccionadas.length} <small>/ {tareas.length} disponibles</small>
              </div>
            </div>
          </div>


          <div>
            <p className="card-text" style={{ marginBottom: "12px" }}>
              <strong>Secuencia de Actividades Seleccionadas:</strong>
            </p>
            <div className="resultado-lista">
              {resultado.tareasSeleccionadas.map((t, i) => (
                <div key={i} className="tarea-item-resultado">
                  <div>
                    <strong>{t.nombre}</strong>{" "}
                    <span className="badge-deadline">Límite T={t.deadline}</span>
                  </div>
                  <div className="tarea-ganancia">+ Lps. {t.ganancia}</div>
                </div>
              ))}
            </div>
          </div>

          <BitacoraPasos pasos={resultado.pasos} />
        </div>
      )}
    </>
  );
};