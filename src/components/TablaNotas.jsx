import { useState } from "react";
import { estudiantesMock } from "../data/estudiantes";
import "../styles/tabla.css";

function TablaNotas() {
  // ================================
  // CONFIGURACIÓN
  // ================================
  const escala = {
    min: 0,
    max: 5,
    step: 0.1
  };

  // ================================
  // ESTADO PRINCIPAL
  // ================================
  const [estudiantes, setEstudiantes] = useState(estudiantesMock);

  // ================================
  // FUNCIONES AUXILIARES
  // ================================

  // Calcula promedio de un objeto de notas
  const calcularPromedio = (notas) => {
    const valores = Object.values(notas)
      .map((n) => Number(n))
      .filter((n) => !isNaN(n));

    if (valores.length === 0) return 0;

    const suma = valores.reduce((acc, n) => acc + n, 0);
    return suma / valores.length;
  };

  // Determina el estado visual del estudiante
  const obtenerEstado = (promedio, notas) => {
    const valores = Object.values(notas).filter((n) => n !== "");

    if (valores.length === 0) {
      return {
        texto: "Sin datos",
        clase: "estado-neutral"
      };
    }

    if (promedio < 3) {
      return {
        texto: "Pierde",
        clase: "estado-pierde"
      };
    }

    if (promedio < 3.5) {
      return {
        texto: "Riesgo",
        clase: "estado-riesgo"
      };
    }

    return {
      texto: "Aprueba",
      clase: "estado-aprueba"
    };
  };

  // ================================
  // ACTUALIZACIÓN DE ESTADO
  // ================================

  const actualizarEstado = (id, actividad, valor) => {
    const nuevosEstudiantes = estudiantes.map((est) => {
      if (est.id === id) {
        return {
          ...est,
          notas: {
            ...est.notas,
            [actividad]: valor
          }
        };
      }

      return est;
    });

    setEstudiantes(nuevosEstudiantes);
  };

  // Manejo de cambios en inputs
  const handleNotaChange = (id, actividad, valor) => {
    if (valor === "") {
      actualizarEstado(id, actividad, "");
      return;
    }

    const numero = Number(valor);

    if (isNaN(numero)) return;

    if (numero < escala.min || numero > escala.max) return;

    actualizarEstado(id, actividad, numero);
  };

  // ================================
  // RENDER
  // ================================
  return (
    <div className="tabla-container">
      <h2 className="tabla-titulo">Tabla de Notas</h2>

      <table className="tabla">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Actividad 1</th>
            <th>Actividad 2</th>
            <th>Promedio</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((est) => {
            // ================================
            // VARIABLES DE CADA FILA
            // ================================

            const promedio = calcularPromedio(est.notas);

            const estado = obtenerEstado(promedio, est.notas);

            return (
              <tr key={est.id}>
                <td>{est.nombre}</td>

                <td>
                  <input
                    className="input-nota"
                    type="number"
                    min={escala.min}
                    max={escala.max}
                    step={escala.step}
                    value={est.notas.actividad1}
                    onChange={(e) =>
                      handleNotaChange(
                        est.id,
                        "actividad1",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    className="input-nota"
                    type="number"
                    min={escala.min}
                    max={escala.max}
                    step={escala.step}
                    value={est.notas.actividad2}
                    onChange={(e) =>
                      handleNotaChange(
                        est.id,
                        "actividad2",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>{promedio.toFixed(2)}</td>

                <td>
                  <span className={`badge ${estado.clase}`}>
                    {estado.texto}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaNotas;