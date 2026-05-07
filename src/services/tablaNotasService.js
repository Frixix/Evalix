import { supabase } from "../lib/supabase"; // ajusta la ruta según tu caso

export const tablaNotasService = {
  // ========================
  // OBTENER DATOS
  // ========================
  async obtenerDatos() {
    const { data: estudiantes, error: errorEst } =
      await supabase
        .from("estudiantes")
        .select("*");

    const { data: actividades, error: errorAct } =
      await supabase
        .from("actividades")
        .select("*");

    if (errorEst || errorAct) {
      console.error(
        "Error cargando datos:",
        errorEst || errorAct
      );
      return {
        estudiantes: [],
        actividades: []
      };
    }

    return {
      estudiantes,
      actividades
    };
  },

  // ========================
  // CREAR ESTUDIANTE
  // ========================
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

    console.log("Estudiante guardado:", data);

    return data[0];
  },

  // ========================
  // CREAR ACTIVIDAD (aún mock)
  // ========================
  crearActividad(actividad) {
    console.log(
      "Mock crear actividad:",
      actividad
    );
  },

  // ========================
  // ACTUALIZAR NOTA (mock)
  // ========================
  actualizarNota(data) {
    console.log(
      "Mock actualizar nota:",
      data
    );
  },

  // ========================
  // ELIMINAR ESTUDIANTE (mock)
  // ========================
  eliminarEstudiante(id) {
    console.log(
      "Mock eliminar estudiante:",
      id
    );
  },

  // ========================
  // ELIMINAR ACTIVIDAD (mock)
  // ========================
  eliminarActividad(id) {
    console.log(
      "Mock eliminar actividad:",
      id
    );
  }
};