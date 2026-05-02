function useTablaNotas({
  estudiantes,
  setEstudiantes,
  actividades
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

  return {
    agregarEstudiante,
    eliminarEstudiante
  };
    

}

export default useTablaNotas;