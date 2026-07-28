import { cambioMonedas } from "./cambioMonedas";
import { mochilaFraccionaria } from "./mochilaFraccionaria";
import { programacionTareas } from "./programacionTareas";

type MensajeWorker =
  | { tipo: "CAMBIO_MONEDAS"; datos: Parameters<typeof cambioMonedas>[0] }
  | { tipo: "MOCHILA"; datos: Parameters<typeof mochilaFraccionaria>[0] }
  | { tipo: "TAREAS"; datos: Parameters<typeof programacionTareas>[0] };

self.onmessage = (e: MessageEvent<MensajeWorker>) => {
  const { tipo, datos } = e.data;

  switch (tipo) {
    case "CAMBIO_MONEDAS": {
      const res = cambioMonedas(datos);
      self.postMessage({ resultado: res });
      break;
    }
    case "MOCHILA": {
      const res = mochilaFraccionaria(datos);
      self.postMessage({ resultado: res });
      break;
    }
    case "TAREAS": {
      const res = programacionTareas(datos);
      self.postMessage({ resultado: res });
      break;
    }
    default:
      console.error("Tipo de algoritmo no reconocido:", tipo);
  }
};