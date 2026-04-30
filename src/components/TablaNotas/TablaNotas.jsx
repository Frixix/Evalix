import { useState } from "react";
import FiltrosTabla from "./FiltrosTabla";
import FormActividad from "./FormActividad";
import FormEstudiante from "./FormEstudiante";
import TablaNotasHeader from "./TablaNotasHeader";
import TablaNotasRow from "./TablaNotasRow";


import "../../styles/tabla.css";
import {
  calcularPromedio,
  obtenerEstado
} from "../../utils/notas";

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

function TablaNotas({
    estudiantes,
    setEstudiantes,
    actividades,
    setActividades
  }) {
  const hoy = new Date().toISOString().split("T")[0];

  // ================================
  // ESTADOS PRINCIPALES
  // ================================
  const [nombreActividad, setNombreActividad] = useState("");
  const [fechaActividad, setFechaActividad] = useState(hoy);
  const [categoriaActividad, setCategoriaActividad] = useState("Tarea");
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [busqueda, setBusqueda] = useState("");

    const eliminarEstudiante = (estudianteId) => {
    const nuevosEstudiantes = estudiantes.filter(
      (est) => est.id !== estudianteId
    );

      setEstudiantes(nuevosEstudiantes);
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
    // ================================
  // filtrar estudiantes
  // ================================

  const estudiantesFiltrados = estudiantes.filter((est) =>
    est.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );


  return (
    <div className="tabla-container">
      <h2 className="tabla-titulo">
        Tabla de Notas
      </h2>

      <FormActividad
        nombreActividad={nombreActividad}
        setNombreActividad={setNombreActividad}
        categoriaActividad={categoriaActividad}
        setCategoriaActividad={setCategoriaActividad}
        fechaActividad={fechaActividad}
        setFechaActividad={setFechaActividad}
        agregarActividad={agregarActividad}
      />
            <FormEstudiante
              nombreEstudiante={nombreEstudiante}
              setNombreEstudiante={setNombreEstudiante}
              agregarEstudiante={agregarEstudiante}
            />
          {/* Buscar estudiante */}
          <FiltrosTabla
            busqueda={busqueda}
            setBusqueda={setBusqueda}
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
            <TablaNotasHeader
              actividades={actividades}
              eliminarActividad={eliminarActividad}
            />
          </thead>

          <tbody>
              {estudiantesFiltrados.map((est) => {
                const promedio = calcularPromedio(
                  est.notas,
                  actividades
                );

                const estado = obtenerEstado(
                  promedio,
                  est.notas
                );

                return (
                  <TablaNotasRow
                    key={est.id}
                    est={est}
                    actividades={actividades}
                    config={config}
                    promedio={promedio}
                    estado={estado}
                    eliminarEstudiante={eliminarEstudiante}
                    handleNotaChange={handleNotaChange}
                    actualizarEstado={actualizarEstado}
                  />
                );
              })}
            </tbody>
        </table>
        
      </div>
    </div>
  );
}

export default TablaNotas;