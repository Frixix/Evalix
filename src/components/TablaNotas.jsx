import { useState } from "react";
import { estudiantesMock } from "../data/estudiantes";
import "../styles/tabla.css";

function TablaNotas() {
  // ================================
  // CONFIGURACIÓN GLOBAL (DOCENTE)
  // ================================
  const config = {
    escala: {
      min: 0,
      max: 5,
      step: 0.1
    },
    redondeo: 2
  };

  // ================================
  // FORMULARIO DE NUEVA ACTIVIDAD
  // ================================
  const [nombreActividad, setNombreActividad] = useState("");
  const [fechaActividad, setFechaActividad] = useState("");

  // ================================
  // ESTADO PRINCIPAL
  // ================================
  const [estudiantes, setEstudiantes] = useState(estudiantesMock);

  const [actividades, setActividades] = useState([
    {
      id: 1,
      nombre: "Actividad 1",
      fechaCreacion: new Date().toISOString().split("T")[0]
    },
    {
      id: 2,
      nombre: "Actividad 2",
      fechaCreacion: new Date().toISOString().split("T")[0]
    }
  ]);

  // ================================
  // PROMEDIO
  // ================================
  const calcularPromedio = (notas, actividades = []) => {
    let suma = 0;

    actividades.forEach((act) => {
      const valor = Number(notas?.[act.id]);

      if (!isNaN(valor)) {
        suma += valor;
      }
    });

    if (actividades.length === 0) return 0;

    return suma / actividades.length;
  };

  // ================================
  // ESTADO VISUAL
  // ================================
  const obtenerEstado = (promedio, notas) => {
    const valores = Object.values(notas).filter((n) => n !== "");

    if (valores.length === 0) {
      return { texto: "Sin datos", clase: "estado-neutral" };
    }

    if (promedio < 3) {
      return { texto: "Pierde", clase: "estado-pierde" };
    }

    if (promedio < 3.5) {
      return { texto: "Riesgo", clase: "estado-riesgo" };
    }

    return { texto: "Aprueba", clase: "estado-aprueba" };
  };

  // ================================
  // ACTUALIZAR NOTAS
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

  const handleNotaChange = (id, actividad, valor) => {
    if (valor === "") {
      actualizarEstado(id, actividad, "");
      return;
    }

    const numero = Number(valor);

    if (isNaN(numero)) return;

    if (
      numero < config.escala.min ||
      numero > config.escala.max
    ) {
      return;
    }

    actualizarEstado(id, actividad, numero);
  };

  // ================================
  // AGREGAR ACTIVIDAD
  // ================================
  const agregarActividad = () => {
    if (!nombreActividad.trim() || !fechaActividad) return;

    const nuevaActividad = {
      id: Date.now(),
      nombre: nombreActividad,
      fechaCreacion: fechaActividad
    };

    setActividades([...actividades, nuevaActividad]);

    const estudiantesActualizados = estudiantes.map((est) => ({
      ...est,
      notas: {
        ...est.notas,
        [nuevaActividad.id]: ""
      }
    }));

    setEstudiantes(estudiantesActualizados);

    setNombreActividad("");
    setFechaActividad("");
  };

  // ================================
  // RENDER
  // ================================
  return (
    <div className="tabla-container">
      <h2 className="tabla-titulo">Tabla de Notas</h2>

      {/* FORMULARIO NUEVA ACTIVIDAD */}
      <div className="actividad-form">
        <input
          type="text"
          placeholder="Nombre de la actividad"
          value={nombreActividad}
          onChange={(e) =>
            setNombreActividad(e.target.value)
          }
        />

        <input
          type="date"
          value={fechaActividad}
          onChange={(e) =>
            setFechaActividad(e.target.value)
          }
        />

        <button onClick={agregarActividad}>
          Agregar actividad
        </button>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>Estudiante</th>

            {actividades.map((act) => (
              <th key={act.id}>{act.nombre}</th>
            ))}

            <th>Promedio</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((est) => {
            const promedio = calcularPromedio(
              est.notas,
              actividades
            );

            const estado = obtenerEstado(
              promedio,
              est.notas
            );

            return (
              <tr key={est.id}>
                <td>{est.nombre}</td>

                {actividades.map((act) => (
                  <td key={act.id}>
                    <input
                      className="input-nota"
                      type="number"
                      min={config.escala.min}
                      max={config.escala.max}
                      step={config.escala.step}
                      value={est.notas[act.id] || ""}
                      onChange={(e) =>
                        handleNotaChange(
                          est.id,
                          act.id,
                          e.target.value
                        )
                      }
                    />
                  </td>
                ))}

                <td>{promedio.toFixed(config.redondeo)}</td>

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