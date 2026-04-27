import { useState, useEffect } from "react";
import { estudiantesMock } from "../data/estudiantes";
import "../styles/tabla.css";

// ================================
// CONFIGURACIÓN GLOBAL
// ================================
const config = {
  escala: {
    min: 0,
    max: 5,
    step: 0.1
  },
  redondeo: 2
};

function TablaNotas() {
  const hoy = new Date().toISOString().split("T")[0];

  // ================================
  // ESTADOS PRINCIPALES
  // ================================
  const [estudiantes, setEstudiantes] = useState(estudiantesMock);
  const [nombreActividad, setNombreActividad] = useState("");
  const [fechaActividad, setFechaActividad] = useState(hoy);
  const [categoriaActividad, setCategoriaActividad] = useState("Tarea");
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [actividades, setActividades] = useState([
    {
      id: 1,
      nombre: "Actividad 1",
      categoria: "Tarea",
      fechaCreacion: hoy
    },
    {
      id: 2,
      nombre: "Actividad 2",
      categoria: "Tarea",
      fechaCreacion: hoy
    }
  ]);

    const eliminarEstudiante = (estudianteId) => {
    const nuevosEstudiantes = estudiantes.filter(
      (est) => est.id !== estudianteId
    );

      setEstudiantes(nuevosEstudiantes);
    };

  // ================================
  // HYDRATION + VALIDACIÓN
  // ================================
  useEffect(() => {
    const datosGuardados = localStorage.getItem("evalix_datos");

    if (!datosGuardados) return;

    try {
      const datosParseados = JSON.parse(datosGuardados);

      const estudiantesValidos =
        Array.isArray(datosParseados.estudiantes);

      const actividadesValidas =
        Array.isArray(datosParseados.actividades);

      if (estudiantesValidos && actividadesValidas) {
        setEstudiantes(datosParseados.estudiantes);
        setActividades(datosParseados.actividades);
      }
    } catch (error) {
      console.error(
        "Error cargando datos guardados:",
        error
      );
    }
  }, []);

  // ================================
  // PERSISTENCIA LOCAL
  // ================================
  useEffect(() => {
    const datos = {
      estudiantes,
      actividades
    };

    localStorage.setItem(
      "evalix_datos",
      JSON.stringify(datos)
    );
  }, [estudiantes, actividades]);



  const estudiantesFiltrados = estudiantes.filter((est) =>
    est.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );
  // ================================
  // PROMEDIO
  // ================================
  const calcularPromedio = (notas, actividades = []) => {
    let suma = 0;
    let totalNotasValidas = 0;

    actividades.forEach((act) => {
      const valor = notas?.[act.id];

      if (valor === "" || valor === undefined) return;

      if (valor === "NP") {
        totalNotasValidas++;
        return;
      }

      const numero = Number(valor);

      if (!isNaN(numero)) {
        suma += numero;
        totalNotasValidas++;
      }
    });

    if (totalNotasValidas === 0) return 0;

    return suma / totalNotasValidas;
  };

  // ================================
  // ESTADO VISUAL
  // ================================
  const obtenerEstado = (promedio, notas) => {
    const valores = Object.values(notas).filter(
      (n) => n !== ""
    );

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
  // ACTUALIZAR NOTA
  // ================================
  const actualizarEstado = (
    id,
    actividad,
    valor
  ) => {
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

  const handleNotaChange = (
    id,
    actividad,
    valor
  ) => {
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
    if (!nombreActividad.trim()) return;

    const nuevaActividad = {
      id: Date.now(),
      nombre: nombreActividad,
      categoria: categoriaActividad,
      fechaCreacion: fechaActividad
    };

    setActividades([
      ...actividades,
      nuevaActividad
    ]);

    const estudiantesActualizados =
      estudiantes.map((est) => ({
        ...est,
        notas: {
          ...est.notas,
          [nuevaActividad.id]: ""
        }
      }));

    setEstudiantes(estudiantesActualizados);

    setNombreActividad("");
    setFechaActividad(hoy);
    setCategoriaActividad("Tarea");
  };

  

 // ================================
  // AGREGAR ESTUDIANTE
  // ================================
  const agregarEstudiante = () => {
    if (!nombreEstudiante.trim()) return;

    const notasIniciales = {};

    actividades.forEach((act) => {
      notasIniciales[act.id] = "";
    });

    const nuevoEstudiante = {
      id: Date.now(),
      nombre: nombreEstudiante,
      notas: notasIniciales
    };

    setEstudiantes([
      ...estudiantes,
      nuevoEstudiante
    ]);

    setNombreEstudiante("");
  };

  // ================================
  // ELIMINAR ACTIVIDAD
  // ================================
  const eliminarActividad = (actividadId) => {
  const nuevasActividades = actividades.filter(
      (act) => act.id !== actividadId
    );

    setActividades(nuevasActividades);

    const estudiantesActualizados = estudiantes.map((est) => {
      const nuevasNotas = {
        ...est.notas
      };

      delete nuevasNotas[actividadId];

      return {
        ...est,
        notas: nuevasNotas
      };
    });

    setEstudiantes(estudiantesActualizados);
  };

  return (
    <div className="tabla-container">
      <h2 className="tabla-titulo">
        Tabla de Notas
      </h2>

      <input
        type="text"
        placeholder="Nombre de la actividad"
        value={nombreActividad}
        onChange={(e) =>
          setNombreActividad(e.target.value)
        }
      />

      <select
        value={categoriaActividad}
        onChange={(e) =>
          setCategoriaActividad(
            e.target.value
          )
        }
      >
        <option value="Tarea">Tarea</option>
        <option value="Quiz">Quiz</option>
        <option value="Examen">Examen</option>
        <option value="Proyecto">
          Proyecto
        </option>
        <option value="Laboratorio">
          Laboratorio
        </option>
      </select>

      <input
        type="date"
        value={fechaActividad}
        onChange={(e) =>
          setFechaActividad(
            e.target.value
          )
        }
      />

      <button
        className="btn-agregar"
        onClick={agregarActividad}
      >
        + Agregar actividad
      </button>

            <input
          type="text"
          placeholder="Nombre del estudiante"
          value={nombreEstudiante}
          onChange={(e) =>
            setNombreEstudiante(e.target.value)
          }
        />

        <button
          className="btn-agregar"
          onClick={agregarEstudiante}
        >
          + Agregar estudiante
        </button>

          {/* Buscar estudiante */}
          <input
            type="text" 
            placeholder="Buscar estudiante..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

      <div className="leyenda-np">
        <span className="badge-np">NP</span>
        <p>
          No presentó / No entregó actividad
        </p>
      </div>

      <div className="tabla-wrapper">
        <table className="tabla">
          <thead>
            <tr>
              <th>Estudiante</th>

              {actividades.map((act) => (
                <th key={act.id}>
                  <div className="actividad-header">
                    <span>{act.nombre}</span>
                    <small>
                      {act.categoria}
                    </small>
                    <small>
                      {act.fechaCreacion}
                    </small>

                    <button
                      className="btn-eliminar"
                      onClick={() => {
                        const confirmar =
                          window.confirm(
                            `¿Eliminar "${act.nombre}"?\n\nEsta acción no se puede deshacer.`
                          );

                        if (confirmar) {
                          eliminarActividad(
                            act.id
                          );
                        }
                      }}
                    >
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                  </div>
                </th>
              ))}

              <th>Promedio</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {estudiantesFiltrados.map((est) => {
              const promedio =
                calcularPromedio(
                  est.notas,
                  actividades
                );

              const estado =
                obtenerEstado(
                  promedio,
                  est.notas
                );

              return (
                <tr key={est.id}>
                  <td>
                    <div className="estudiante-info">
                      <span>{est.nombre}</span>

                      <button
                        className="btn-eliminar"
                        onClick={() => {
                          const confirmar = window.confirm(
                            `¿Eliminar a "${est.nombre}"?\n\nEsta acción no se puede deshacer.`
                          );

                          if (confirmar) {
                            eliminarEstudiante(est.id);
                          }
                        }}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>

                  {actividades.map((act) => {
                    const esNP =
                      est.notas[act.id] ===
                      "NP";

                    return (
                      <td
                        key={act.id}
                        className={
                          esNP
                            ? "celda-np"
                            : ""
                        }
                      >
                        <input
                          className="input-nota"
                          type="number"
                          min={
                            config.escala.min
                          }
                          max={
                            config.escala.max
                          }
                          step={
                            config.escala.step
                          }
                          value={
                            esNP
                              ? ""
                              : est.notas[
                                  act.id
                                ] || ""
                          }
                          onChange={(e) =>
                            handleNotaChange(
                              est.id,
                              act.id,
                              e.target.value
                            )
                          }
                        />

                        <button
                          className="btn-np"
                          onClick={() =>
                            actualizarEstado(
                              est.id,
                              act.id,
                              "NP"
                            )
                          }
                        >
                          NP
                        </button>
                      </td>
                    );
                  })}

                  <td>
                    {promedio.toFixed(
                      config.redondeo
                    )}
                  </td>

                  <td>
                    <span
                      className={`badge ${estado.clase}`}
                    >
                      {estado.texto}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaNotas;