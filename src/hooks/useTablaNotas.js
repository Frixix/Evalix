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

  return {
    agregarEstudiante
  };
}

export default useTablaNotas;