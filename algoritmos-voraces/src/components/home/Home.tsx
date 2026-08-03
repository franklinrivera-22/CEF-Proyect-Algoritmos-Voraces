import React from "react";

export type SeccionAlgoritmo = "monedas" | "mochila" | "actividades";

interface HomeProps {
  onNavegar: (seccion: SeccionAlgoritmo) => void;
}

interface TarjetaAlgoritmo {
  id: SeccionAlgoritmo;
  titulo: string;
  descripcion: string;
  complejidad: string;
  icono: string;
}

const ALGORITMOS: TarjetaAlgoritmo[] = [
  {
    id: "monedas",
    titulo: "Cambio de Monedas",
    descripcion:
      "Devuelve un monto usando la menor cantidad de piezas, eligiendo siempre la denominación más grande posible.",
    complejidad: "O(N log N + K)",
    icono: "\u{1FA99}",
  },
  {
    id: "mochila",
    titulo: "Mochila Fraccionaria",
    descripcion:
      "Maximiza el valor transportado ordenando por relación valor/peso y tomando fracciones cuando es necesario.",
    complejidad: "O(N log N)",
    icono: "\u{1F392}",
  },
  {
    id: "actividades",
    titulo: "Selección de Actividades",
    descripcion:
      "Programa tareas con plazos y ganancias para obtener el máximo beneficio posible sin solapamientos.",
    complejidad: "O(N²)",
    icono: "\u{1F5D3}\u{FE0F}",
  },
];

export const Home: React.FC<HomeProps> = ({ onNavegar }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Bienvenido a GreedyLab</h2>
        <p className="card-text" style={{ marginTop: "6px" }}>
          Laboratorio interactivo de algoritmos voraces (greedy).
          Cada algoritmo muestra su decisión paso a paso y su complejidad. Elige
          uno para comenzar.
        </p>
      </div>

      <div
        className="card-body"
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {ALGORITMOS.map((algo) => (
          <div
            key={algo.id}
            onClick={() => onNavegar(algo.id)}
            style={{
              border: "1px solid #cbd5e1",
              borderRadius: "12px",
              padding: "20px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "#ffffff",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(16,26,36,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span style={{ fontSize: "34px" }}>{algo.icono}</span>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#101A24" }}>
              {algo.titulo}
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#475569", flex: 1 }}>
              {algo.descripcion}
            </p>
            <span
              style={{
                alignSelf: "flex-start",
                fontSize: "12px",
                fontFamily: "monospace",
                background: "#f1f5f9",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                padding: "2px 8px",
              }}
            >
              {algo.complejidad}
            </span>
            <button
              type="button"
              className="btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                onNavegar(algo.id);
              }}
            >
              Abrir →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};