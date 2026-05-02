export const tablaNotasService = {
  obtenerDatos() {
    return {
      estudiantes: [],
      actividades: []
    };
  },

  crearEstudiante(estudiante) {
    console.log(
      "Mock crear estudiante:",
      estudiante
    );
  },

  crearActividad(actividad) {
    console.log(
      "Mock crear actividad:",
      actividad
    );
  },

  actualizarNota(data) {
    console.log(
      "Mock actualizar nota:",
      data
    );
  },

  eliminarEstudiante(id) {
    console.log(
      "Mock eliminar estudiante:",
      id
    );
  },

  eliminarActividad(id) {
    console.log(
      "Mock eliminar actividad:",
      id
    );
  }
};