import React, { useState } from "react";
import { mochilaFraccionaria } from "../../algoritmos/mochilaFraccionaria";
import type {
  ResultadoMochila,
  ObjetoMochila,
  InfoComplejidad,
} from "../../algoritmos/tipos";
import { TarjetaComplejidad } from "../common/TarjetaComplejidad";
import { BitacoraPasos } from "../common/BitacoraPasos";

const complejidadMochila: InfoComplejidad = {
  temporal: "O(N log N)",
  espacial: "O(N)",
  explicacion:
    "Los objetos se ordenan una vez por su relación valor/peso (O(N log N)) y luego se recorren en una sola pasada.",
};

const OBJETOS_INICIALES: ObjetoMochila[] = [
  { nombre: "Oro", peso: 10, valor: 600 },
  { nombre: "Plata", peso: 20, valor: 1000 },
  { nombre: "Bronce", peso: 30, valor: 1200 },
];

export const MochilaFraccionariaApp: React.FC = () => {
  const [capacidad, setCapacidad] = useState<number>(50);
  const [nombre, setNombre] = useState<string>("");
  const [peso, setPeso] = useState<number>(10);
  const [valor, setValor] = useState<number>(100);
  const [objetos, setObjetos] = useState<ObjetoMochila[]>(OBJETOS_INICIALES);
  const [resultado, setResultado] = useState<ResultadoMochila | null>(null);

  const agregarObjeto = () => {
    if (!nombre.trim() || peso <= 0 || valor <= 0) return;
    setObjetos([...objetos, { nombre, peso, valor }]);
    setNombre("");
  };

  const eliminarObjeto = (index: number) => {
    setObjetos(objetos.filter((_, i) => i !== index));
  };

  const handleCalcular = () => {
    if (objetos.length === 0 || capacidad <= 0) return;
    const res = mochilaFraccionaria({ capacidad, objetos });
    setResultado(res);
  };

  return (
    <>
      <p className="card-text" style={{ fontSize: "13px", marginBottom: "16px" }}>
        Maximiza el valor transportado ordenando por relación valor/peso. Si un
        objeto no cabe completo, se toma solo la fracción que llena la mochila.
      </p>

      <TarjetaComplejidad info={complejidadMochila} />

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Capacidad de la mochila (kg)</label>
          <input
            type="number"
            className="form-input"
            value={capacidad}
            onChange={(e) => setCapacidad(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nombre del objeto</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej: Diamante"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Peso (kg)</label>
          <input
            type="number"
            className="form-input"
            value={peso}
            onChange={(e) => setPeso(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Valor (Lps.)</label>
          <input
            type="number"
            className="form-input"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />
        </div>

        <button type="button" onClick={agregarObjeto} className="btn-secondary">
          + Añadir Objeto
        </button>
      </div>

      <div>
        <p className="card-text" style={{ marginBottom: "12px" }}>
          <strong>Objetos disponibles ({objetos.length}):</strong>
        </p>
        <div className="chips-container">
          {objetos.map((o, index) => (
            <div key={index} className="item-chip">
              <div>
                <strong>{o.nombre}</strong> — {o.peso} kg / Lps. {o.valor}{" "}
                <span className="badge-deadline">
                  ratio {(o.valor / o.peso).toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => eliminarObjeto(index)}
                className="btn-delete"
                title="Eliminar objeto"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalcular}
        disabled={objetos.length === 0}
        className="btn-primary"
      >
        Calcular Mochila Óptima
      </button>

      {resultado && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="metricas-grid">
            <div className="metric-card metric-card-green">
              <span className="metric-label">Valor Total Transportado</span>
              <div className="metric-val">Lps. {resultado.valorTotal.toFixed(2)}</div>
            </div>

            <div className="metric-card metric-card-yellow">
              <span className="metric-label">Peso Utilizado</span>
              <div className="metric-val">
                {resultado.pesoTotal.toFixed(1)} <small>/ {capacidad} kg</small>
              </div>
            </div>
          </div>

          <div>
            <p className="card-text" style={{ marginBottom: "12px" }}>
              <strong>Objetos seleccionados:</strong>
            </p>
            <div className="resultado-lista">
              {resultado.objetosSeleccionados.map((o, i) => (
                <div key={i} className="tarea-item-resultado">
                  <div>
                    <strong>{o.nombre}</strong>{" "}
                    <span className="badge-deadline">
                      {o.fraccion === 1
                        ? "Completo"
                        : `${(o.fraccion * 100).toFixed(1)}%`}
                    </span>
                  </div>
                  <div className="tarea-ganancia">
                    + Lps. {o.valorAportado.toFixed(2)} ({o.pesoTomado.toFixed(1)} kg)
                  </div>
                </div>
              ))}
            </div>
          </div>

          <BitacoraPasos pasos={resultado.pasos} />
        </div>
      )}
    </>
  );
};