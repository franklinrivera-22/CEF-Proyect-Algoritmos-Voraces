import { useState, useRef, useEffect, useCallback } from 'react';

export function useWorker() {
  const [cargando, setCargando] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../algoritmos/greedy.worker.ts', import.meta.url),
      { type: 'module' }
    );

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const ejecutarEnWorker = useCallback(
    <T = unknown, R = unknown>(tipo: string, datos: T, onResultado: (resultado: R) => void) => {
      if (!workerRef.current) return;

      setCargando(true);

      workerRef.current.onmessage = (e: MessageEvent<{ resultado: R }>) => {
        setCargando(false);
        onResultado(e.data.resultado);
      };

      workerRef.current.onerror = (err) => {
        setCargando(false);
        console.error('Error reportado desde el Web Worker:', err);
      };

      workerRef.current.postMessage({ tipo, datos } as unknown);
    },
    []
  );

  return { ejecutarEnWorker, cargando };
}