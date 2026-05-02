function useTablaNotas({
  estudiantes,
  setEstudiantes,
  actividades,
  setActividades
}) {
  const agregarEstudiante = (
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

    setEstudiantes([
      ...estudiantes,
      nuevoEstudiante
    ]);
  };


  // ============
  // Eliminar estudiante 
  // ===========

  const eliminarEstudiante = (
    estudianteId
  ) => {
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

    return {
      agregarEstudiante,
      eliminarEstudiante,
      agregarActividad,
      eliminarActividad
    };
  
}

export default useTablaNotas;