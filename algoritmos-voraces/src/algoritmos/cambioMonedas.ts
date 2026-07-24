import type {
  CambioMonedaEntrada,
  ResultadoCambio,
  PasoSimulacion
} from "./tipos";


export function cambioMonedas(
  entrada: CambioMonedaEntrada
): ResultadoCambio {

  const monedasOrdenadas = [...entrada.monedas].sort(
    (a, b) => b - a
  );

  let cantidadRestante = entrada.cantidad;

  const monedasUsadas: number[] = [];
  const pasos: PasoSimulacion[] = [];

  let contadorPaso = 1;


  for (const moneda of monedasOrdenadas) {

    while (cantidadRestante >= moneda) {

      cantidadRestante -= moneda;

      monedasUsadas.push(moneda);


      pasos.push({
        paso: contadorPaso,
        descripcion:
          `Se selecciona la moneda de ${moneda}`,
        estadoActual: {
          monedaSeleccionada: moneda,
          restante: cantidadRestante,
          monedasUsadas
        }
      });


      contadorPaso++;
    }
  }


  return {
    monedasUsadas,
    pasos
  };
}