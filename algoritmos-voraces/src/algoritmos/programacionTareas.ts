import type { Tarea, ResultadoTareas, PasoSimulacion } from "./tipos";

export function programacionTareas(tareas: Tarea[]): ResultadoTareas {
  const tareasOrdenadas = [...tareas].sort((a, b) => b.ganancia - a.ganancia);

  const maxDeadline = Math.max(...tareas.map((t) => t.deadline), 0);
  const slots: (Tarea | null)[] = Array(maxDeadline).fill(null);

  const tareasSeleccionadas: Tarea[] = [];
  const pasos: PasoSimulacion[] = [];
  let gananciaTotal = 0;
  let contadorPaso = 1;

  for (const tarea of tareasOrdenadas) {
    for (let j = Math.min(maxDeadline, tarea.deadline) - 1; j >= 0; j--) {
      if (slots[j] === null) {
        slots[j] = tarea;
        tareasSeleccionadas.push(tarea);
        gananciaTotal += tarea.ganancia;

        pasos.push({
          paso: contadorPaso++,
          descripcion: `Se asigna "${tarea.nombre}" (Ganancia: Lps.${tarea.ganancia}) al bloque de tiempo ${j + 1}.`,
          estadoActual: {
            tareaAsignada: tarea.nombre,
            slot: j + 1,
            gananciaTotal,
          },
        });
        break;
      }
    }
  }

  return {
    tareasSeleccionadas,
    gananciaTotal,
    pasos,
  };
}
