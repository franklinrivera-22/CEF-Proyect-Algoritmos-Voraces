GreedyLab - Laboratorio de Algoritmos Voraces

Es una aplicación Web Progresiva (PWA) desarrollada con React + TypeScript que visualiza de forma interactiva, paso a paso, el comportamiento de tres algoritmos voraces.

Algoritmos Implementados:

- Cambio de Monedas: Devuelve un monto usando la menor cantidad de piezas, con su complejidad: O(N log N + K).

- Mochila Fraccionaria: Maximiza el valor transportado tomando fracciones de objetos, con su complejidad: O(N log N).

- Programación de Tareas: Asigna tareas con plazos para maximizar la ganancia total, con su complejidad: O(N^2)

Cada algoritmo muestra una bitácora de pasos con la decisión voraz tomada en cada iteración y una tarjeta con su complejidad temporal y espacial.

Características técnicas
- PWA instalable mediante manifest y service worker (vite-plugin-pwa).
- Componentes funcionales de React con Hooks (useState, useEffect, useRef, useCallback).
- Cálculos ejecutados en un Web Worker para no bloquear la interfaz.
- Diseño responsivo para escritorio y móvil.