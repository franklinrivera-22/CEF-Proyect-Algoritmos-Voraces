import type {
  PasoSimulacion,
  Tarea,
  ResultadoTareas,
} from "./tipos";

export function programacionTareas(
  tareas: Tarea[]
): ResultadoTareas {
  const pasos: PasoSimulacion[] = [];

  const tareasOrdenadas = [...tareas].sort(
    (a, b) => b.ganancia - a.ganancia
  );

  const maxDeadline = Math.max(
    ...tareasOrdenadas.map((t) => t.deadline),
    0
  );

  const horarios: (Tarea | null)[] = new Array(maxDeadline).fill(null);

  tareasOrdenadas.forEach((tarea, indice) => {
    for (let i = tarea.deadline - 1; i >= 0; i--) {
      if (horarios[i] === null) {
        horarios[i] = tarea;

        pasos.push({
          paso: indice + 1,
          descripcion: `Se asigno la tarea ${tarea.nombre} al espacio ${i + 1}.`,
          estadoActual: {
            horarios: horarios.map((t) => t?.nombre ?? "-"),
          },
        });

        break;
      }
    }
  });

  const tareasSeleccionadas = horarios.filter(
    (t): t is Tarea => t !== null
  );

  const gananciaTotal = tareasSeleccionadas.reduce(
    (total, tarea) => total + tarea.ganancia,
    0
  );

  return {
    tareasSeleccionadas,
    gananciaTotal,
    pasos,
  };
}