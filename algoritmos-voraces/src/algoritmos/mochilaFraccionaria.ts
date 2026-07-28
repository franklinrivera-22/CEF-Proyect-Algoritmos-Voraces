import type {
  MochilaEntrada,
  ResultadoMochila,
  ObjetoMochila,
  PasoSimulacion,
} from "./tipos";

export function mochilaFraccionaria(
  entrada: MochilaEntrada
): ResultadoMochila {

  const pasos: PasoSimulacion[] = [];

  const objetosOrdenados = [...entrada.objetos].sort((a, b) => {
    return (b.valor / b.peso) - (a.valor / a.peso);
  });

  const objetosSeleccionados: ObjetoMochila[] = [];

  let pesoActual = 0;
  let valorActual = 0;
  let numeroPaso = 1;

  for (const objeto of objetosOrdenados) {

    if (pesoActual + objeto.peso <= entrada.capacidad) {

      objetosSeleccionados.push(objeto);

      pesoActual += objeto.peso;
      valorActual += objeto.valor;

      pasos.push({
        paso: numeroPaso++,
        descripcion: `Se agregó ${objeto.nombre}`,
        estadoActual: {
          peso: pesoActual,
          valor: valorActual,
        },
      });

    }

  }

  return {
    objetosSeleccionados,
    valorTotal: valorActual,
    pesoTotal: pesoActual,
    pasos,
  };
}