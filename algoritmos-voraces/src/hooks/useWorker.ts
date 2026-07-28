import { useState, useRef, useEffect, useCallback } from 'react';
import GreedyWorker from '../algoritmos/greedy.worker?worker';

export function useWorker() {
  const [cargando, setCargando] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new GreedyWorker();

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const ejecutarEnWorker = useCallback(
    <T = unknown, R = unknown>(
      tipo: "CAMBIO_MONEDAS" | "MOCHILA" | "TAREAS", 
      datos: T, 
      onResultado: (resultado: R) => void
    ) => {
      if (!workerRef.current) return;

      setCargando(true);

      const handleMessage = (e: MessageEvent<{ resultado: R }>) => {
        setCargando(false);
        onResultado(e.data.resultado);
        workerRef.current?.removeEventListener('message', handleMessage);
      };

      const handleError = (err: ErrorEvent) => {
        setCargando(false);
        console.error('Error reportado desde el Web Worker:', err);
        workerRef.current?.removeEventListener('error', handleError);
      };

      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.addEventListener('error', handleError);

      workerRef.current.postMessage({ tipo, datos });
    },
    []
  );

  return { ejecutarEnWorker, cargando };
}