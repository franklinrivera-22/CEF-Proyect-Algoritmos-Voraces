import React, { useState } from "react";

import { mochilaFraccionaria } from "../../algoritmos/mochilaFraccionaria";
import type { ResultadoMochila, ObjetoMochila,} from "../../algoritmos/tipos";
import { TarjetaComplejidad } from "../common/TarjetaComplejidad";

const COMPLEJIDAD_MOCHILA = {
  temporal: "O(n log n)",
  espacial: "O(n)",
  explicacion:
    "Los objetos se ordenan por su relación valor/peso y luego se recorren una sola vez.",
};

const OBJETOS_DEFECTO: ObjetoMochila[] = [
  { nombre: "Oro", peso: 10, valor: 600,},
  {nombre: "Plata", peso: 20, valor: 1000,},
  {nombre: "Bronce", peso: 30, valor: 1200,},];

export const MochilaFraccionariaApp: React.FC = () => {
  const [capacidad, setCapacidad] = useState(50);
  const [resultado, setResultado] = useState<ResultadoMochila | null>(null);
  const ejecutarSimulacion = () => { const res = mochilaFraccionaria({capacidad, objetos: OBJETOS_DEFECTO,});

    setResultado(res);
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Problema de la Mochila Fraccionaria</h2>

      <TarjetaComplejidad info={COMPLEJIDAD_MOCHILA} />

      <div style={{ marginBottom: "1rem" }}>
        <label>Capacidad de la mochila (kg): </label>

        <input
          type="number"
          value={capacidad}
          onChange={(e) =>
            setCapacidad(Number(e.target.value))
          }
        />

        <button onClick={ejecutarSimulacion}style={{ marginLeft: "1rem" }}>
          Calcular
        </button>
      </div>

      {resultado && (
        <div>
          <h3>Resultado</h3>

          <p>
            <strong>Valor total:</strong> {resultado.valorTotal}
          </p>

          <p>
            <strong>Peso utilizado:</strong>{" "}
            {resultado.pesoTotal} kg
          </p>

          <h4>Objetos seleccionados</h4>

          <ul>
            {resultado.objetosSeleccionados.map((objeto) => (
              <li key={objeto.nombre}>
                {objeto.nombre} — Peso: {objeto.peso} kg —
                Valor: {objeto.valor}
              </li>
            ))}
          </ul>

          <h4>Bitacora de pasos</h4>

          <ol>
            {resultado.pasos.map((paso) => (
              <li key={paso.paso}>
                {paso.descripcion}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};