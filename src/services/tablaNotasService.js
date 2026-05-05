import { supabase } from "../lib/supabase";

export const tablaNotasService = {
  obtenerDatos() {
    return {
      estudiantes: [],
      actividades: []
    };
  },

  async crearEstudiante(estudiante) {
    const { data, error } = await supabase
      .from("estudiantes")
      .insert([
        {
          nombre: estudiante.nombre
        }
      ])
      .select();

    if (error) {
      console.error(
        "Error creando estudiante:",
        error
      );
      return null;
    }

    console.log(
      "Estudiante guardado:",
      data
    );

    return data[0];
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