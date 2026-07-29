export interface PasoSimulacion {
  paso: number;
  descripcion: string;
  estadoActual: Record<string, unknown>;
}

export interface InfoComplejidad {
  temporal: string;
  espacial: string;
  explicacion: string;
}


export interface CambioMonedaEntrada {
  monedas: number[];
  cantidad: number;
}

export interface ResultadoCambio {
  monedasUsadas: number[];
  pasos: PasoSimulacion[];
}


export interface ObjetoMochila {
  nombre: string;
  peso: number;
  valor: number;
}

export interface MochilaEntrada {
  objetos: ObjetoMochila[];
  capacidad: number;
}

export interface ObjetoSeleccionado extends ObjetoMochila {
  fraccion: number;     
  pesoTomado: number;    
  valorAportado: number; 
}

export interface ResultadoMochila {
  objetosSeleccionados: ObjetoSeleccionado[];
  valorTotal: number;
  pesoTotal: number;
  pasos: PasoSimulacion[];
}


export interface Tarea {
  nombre: string;
  ganancia: number;
  deadline: number;
}

export interface ResultadoTareas {
  tareasSeleccionadas: Tarea[];
  gananciaTotal: number;
  pasos: PasoSimulacion[];
}