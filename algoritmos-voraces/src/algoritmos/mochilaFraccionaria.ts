import type {
  MochilaEntrada,
  ResultadoMochila,
  ObjetoSeleccionado,
  PasoSimulacion,
} from "./tipos";

export function mochilaFraccionaria(
  entrada: MochilaEntrada
): ResultadoMochila {
  const pasos: PasoSimulacion[] = [];

  const objetosOrdenados = [...entrada.objetos].sort(
    (a, b) => b.valor / b.peso - a.valor / a.peso
  );

  const objetosSeleccionados: ObjetoSeleccionado[] = [];
  let pesoActual = 0;
  let valorActual = 0;
  let numeroPaso = 1;

  for (const objeto of objetosOrdenados) {
    const capacidadRestante = entrada.capacidad - pesoActual;

  
    if (capacidadRestante <= 0) break;

    const ratio = objeto.valor / objeto.peso;

    if (objeto.peso <= capacidadRestante) {
      objetosSeleccionados.push({
        ...objeto,
        fraccion: 1,
        pesoTomado: objeto.peso,
        valorAportado: objeto.valor,
      });
      pesoActual += objeto.peso;
      valorActual += objeto.valor;

      pasos.push({
        paso: numeroPaso++,
        descripcion:
          `Se agrega "${objeto.nombre}" COMPLETO ` +
          `(ratio ${ratio.toFixed(2)}). Peso +${objeto.peso}, valor +${objeto.valor}.`,
        estadoActual: {
          fraccion: 1,
          pesoAcumulado: pesoActual,
          valorAcumulado: valorActual,
        },
      });
    } else {
  

      const fraccion = capacidadRestante / objeto.peso;
      const valorAportado = objeto.valor * fraccion;

      objetosSeleccionados.push({
        ...objeto,
        fraccion,
        pesoTomado: capacidadRestante,
        valorAportado,
      });
      pesoActual += capacidadRestante;
      valorActual += valorAportado;

      pasos.push({
        paso: numeroPaso,
        descripcion:
          `Se agrega el ${(fraccion * 100).toFixed(1)}% de "${objeto.nombre}" ` +
          `para llenar la capacidad restante (${capacidadRestante}). ` +
          `Valor +${valorAportado.toFixed(2)}.`,
        estadoActual: {
          fraccion,
          pesoAcumulado: pesoActual,
          valorAcumulado: valorActual,
        },
      });

      break; 
    }
  }

  return {
    objetosSeleccionados,
    valorTotal: valorActual,
    pesoTotal: pesoActual,
    pasos,
  };
}