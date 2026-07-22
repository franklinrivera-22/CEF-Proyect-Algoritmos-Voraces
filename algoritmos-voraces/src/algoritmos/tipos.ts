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