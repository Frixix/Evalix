import { supabase } from "../supabaseClient";

export const tablaNotasService = {
  // =========================
  // OBTENER DATOS
  // =========================
  async obtenerDatos() {
    const {
      data: estudiantes,
      error: errorEstudiantes
    } = await supabase
      .from("estudiantes")
      .select("*");

    const {
      data: actividades,
      error: errorActividades
    } = await supabase
      .from("actividades")
      .select("*");

    if (
      errorEstudiantes ||
      errorActividades
    ) {
      console.error(
        "Error cargando datos:",
        errorEstudiantes ||
          errorActividades
      );

      return {
        estudiantes: [],
        actividades: []
      };
    }

    console.log(
      "Datos cargados:",
      {
        estudiantes,
        actividades
      }
    );

    return {
      estudiantes,
      actividades
    };
  },

  // =========================
  // CREAR ESTUDIANTE
  // =========================
  async crearEstudiante(estudiante) {
    const { data, error } =
      await supabase
        .from("estudiantes")
        .insert([
          {
            nombre: estudiante.nombre,
            notas: estudiante.notas
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

  // =========================
  // CREAR ACTIVIDAD
  // =========================
  async crearActividad(actividad) {
    const { data, error } =
      await supabase
        .from("actividades")
        .insert([
          {
            nombre: actividad.nombre,
            categoria:
              actividad.categoria,
            fechaCreacion:
              actividad.fechaCreacion
          }
        ])
        .select();

    if (error) {
      console.error(
        "Error creando actividad:",
        error
      );
      return null;
    }

    console.log(
      "Actividad guardada:",
      data
    );

    return data[0];
  },

  // =========================
  // ACTUALIZAR NOTA
  // =========================
  async actualizarNota(data) {
    console.log(
      "Mock actualizar nota:",
      data
    );
  },

  // =========================
  // ELIMINAR ESTUDIANTE
  // =========================
  async eliminarEstudiante(id) {
    const { error } =
      await supabase
        .from("estudiantes")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(
        "Error eliminando estudiante:",
        error
      );

      return;
    }

    console.log(
      "Estudiante eliminado:",
      id
    );
  },

  // =========================
  // ELIMINAR ACTIVIDAD
  // =========================
  async eliminarActividad(id) {
    const { error } =
      await supabase
        .from("actividades")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(
        "Error eliminando actividad:",
        error
      );

      return;
    }

    console.log(
      "Actividad eliminada:",
      id
    );
  }
};