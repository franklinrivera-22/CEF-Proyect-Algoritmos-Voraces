import React from "react";
import type { InfoComplejidad } from "../../algoritmos/tipos";

export const TarjetaComplejidad: React.FC<{ info: InfoComplejidad }> = ({
  info,
}) => (
  <div
    style={{
      border: "1px solid #cbd5e1",
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: "#f1f5f9",
      marginBottom: "16px",
    }}
  >
    <h4 style={{ margin: "0 0 8px 0" }}>Complejidad Algorítmica</h4>
    <p style={{ margin: "4px 0", fontSize: "14px" }}>
      <strong>Temporal:</strong> <code>{info.temporal}</code>
    </p>
    <p style={{ margin: "4px 0", fontSize: "14px" }}>
      <strong>Espacial:</strong> <code>{info.espacial}</code>
    </p>
    <p style={{ margin: "4px 0", fontSize: "12px", color: "#64748b" }}>
      {info.explicacion}
    </p>
  </div>
);
