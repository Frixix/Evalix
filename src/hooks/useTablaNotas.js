import { tablaNotasService } from "../services/tablaNotasService";

function useTablaNotas({
  estudiantes,
  setEstudiantes,
  actividades,
  setActividades
}) {

  // ==================
  // Agregar estudiante 
  // ==================
  const agregarEstudiante = async (
    nombreEstudiante
  ) => {
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
    const estudianteGuardado =
      await tablaNotasService.crearEstudiante(
        nuevoEstudiante
      );

    if (!estudianteGuardado) return;

    setEstudiantes([
      ...estudiantes,
      {
        id: estudianteGuardado.id,
        nombre: estudianteGuardado.nombre,
        notas: notasIniciales
      }
    ]);
  };
  // ============
  // Eliminar estudiante 
  // ===========

  const eliminarEstudiante = (
    estudianteId
  ) => {
    tablaNotasService.eliminarEstudiante(
      estudianteId
    );

    const nuevosEstudiantes =
      estudiantes.filter(
        (est) => est.id !== estudianteId
      );

    setEstudiantes(nuevosEstudiantes);
  };
  // ============
  // Agregar actividad 
  // ===========

  const agregarActividad = ({
  nombreActividad,
  categoriaActividad,
  fechaActividad
}) => {
  if (!nombreActividad.trim()) return;

  const nuevaActividad = {
    id: Date.now(),
    nombre: nombreActividad,
    categoria: categoriaActividad,
    fechaCreacion: fechaActividad
  };
  tablaNotasService.crearActividad(
    nuevaActividad
  );
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
};

// ================================
  // ELIMINAR ACTIVIDAD
  // ================================
  const eliminarActividad = (
    actividadId
  ) => {

    tablaNotasService.eliminarActividad(
      actividadId
    );
    const nuevasActividades =
      actividades.filter(
        (act) => act.id !== actividadId
      );

    setActividades(nuevasActividades);

    const estudiantesActualizados =
      estudiantes.map((est) => {
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
  // ACTUALIZAR ESTADO (NOTA)
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

  tablaNotasService.actualizarNota({
    estudianteId: id,
    actividadId: actividad,
    valor
  });

    setEstudiantes(nuevosEstudiantes);
  };

  const handleNotaChange = (
    id,
    actividad,
    valor,
    config
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

    actualizarEstado(
      id,
      actividad,
      numero
    );
  };


  // =========

  
  return {
    agregarEstudiante,
    eliminarEstudiante,
    agregarActividad,
    eliminarActividad,
    actualizarEstado,
    handleNotaChange
  };
}

export default useTablaNotas;