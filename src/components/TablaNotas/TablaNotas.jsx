import { useState } from "react";
import FiltrosTabla from "./FiltrosTabla";
import FormActividad from "./FormActividad";
import FormEstudiante from "./FormEstudiante";
import TablaNotasHeader from "./TablaNotasHeader";
import TablaNotasRow from "./TablaNotasRow";
import useTablaNotas from "../../hooks/useTablaNotas";
import useFiltroEstudiantes from "../../hooks/useFiltroEstudiantes";


import "../../styles/tabla.css";
import {
  calcularPromedio,
  obtenerEstado
} from "../../utils/notas";

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

  
 // ================================
 // HOOK PRINCIPAL DE TABLA DE NOTAS
 // ================================
  
  const {
    agregarEstudiante,
    eliminarEstudiante,
    agregarActividad,
    eliminarActividad,
    actualizarEstado,
    handleNotaChange
  } = useTablaNotas({
    estudiantes,
    setEstudiantes,
    actividades,
    setActividades
  });

  
    // ================================
  // filtrar estudiantes
  // ================================
  const estudiantesFiltrados =
  useFiltroEstudiantes(
    estudiantes,
    busqueda
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
            agregarActividad={() => {
              agregarActividad({
                nombreActividad,
                categoriaActividad,
                fechaActividad
              });

              setNombreActividad("");
              setFechaActividad(hoy);
              setCategoriaActividad("Tarea");
            }}
          />
          <FormEstudiante
            nombreEstudiante={nombreEstudiante}
            setNombreEstudiante={setNombreEstudiante}
            agregarEstudiante={() => {
              agregarEstudiante(nombreEstudiante);
              setNombreEstudiante("");
            }}
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
                    handleNotaChange={(...args) =>
                      handleNotaChange(...args, config)
                    }
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