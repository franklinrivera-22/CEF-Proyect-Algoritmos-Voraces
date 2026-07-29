import React, { useState } from "react";

import { programacionTareas } from "../../algoritmos/programacionTareas";
import type {ResultadoTareas, Tarea, InfoComplejidad,} from "../../algoritmos/tipos";
import { TarjetaComplejidad } from "../common/TarjetaComplejidad";

const COMPLEJIDAD_TAREAS: InfoComplejidad = {
  temporal: "O(n log n)",
  espacial: "O(n)",
  explicacion:
    "Las tareas se ordenan por ganancia y luego se asignan al ultimo espacio disponible antes de su deadline.",
};

const TAREAS_INICIALES: Tarea[] = [
  {
    nombre: "Tarea A",
    deadline: 2,
    ganancia: 100,
  },
  {
    nombre: "Tarea B",
    deadline: 1,
    ganancia: 19,
  },
  {
    nombre: "Tarea C",
    deadline: 2,
    ganancia: 27,
  },
  {
    nombre: "Tarea D",
    deadline: 1,
    ganancia: 25,
  },
  {
    nombre: "Tarea E",
    deadline: 3,
    ganancia: 15,
  },
];

export const ProgramacionTareasApp: React.FC = () => {
  const [resultado, setResultado] =
    useState<ResultadoTareas | null>(null);

  const ejecutarSimulacion = () => {
    const res = programacionTareas(TAREAS_INICIALES);
    setResultado(res);
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Programacion de Tareas con Deadlines</h2>

      <TarjetaComplejidad info={COMPLEJIDAD_TAREAS} />

      <button
        onClick={ejecutarSimulacion}
        style={{ marginBottom: "1rem" }}
      >
        Calcular
      </button>

      {resultado && (
        <div>
          <h3>Resultado</h3>

          <p>
            <strong>Ganancia Total:</strong>{" "}
            {resultado.gananciaTotal}
          </p>

          <h4>Tareas seleccionadas</h4>

          <ul>
            {resultado.tareasSeleccionadas.map((tarea) => (
              <li key={tarea.nombre}>
                {tarea.nombre} — Deadline: {tarea.deadline} —
                Ganancia: {tarea.ganancia}
              </li>
            ))}
          </ul>

          <h4>Bitácora de pasos</h4>

          <ol>
            {resultado.pasos.map((paso) => (
              <li key={paso.paso}>
                {paso.descripcion}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};