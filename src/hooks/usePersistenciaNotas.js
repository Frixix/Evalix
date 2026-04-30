import { useEffect, useState } from "react";

export function usePersistenciaNotas({
  estudiantes,
  actividades,
  setEstudiantes,
  setActividades
}) {
  const [hidratado, setHidratado] =
    useState(false);

  useEffect(() => {
    const datosGuardados =
      localStorage.getItem("evalix_datos");

    if (datosGuardados) {
      try {
        const datosParseados =
          JSON.parse(datosGuardados);

        if (
          Array.isArray(
            datosParseados.estudiantes
          )
        ) {
          setEstudiantes(
            datosParseados.estudiantes
          );
        }

        if (
          Array.isArray(
            datosParseados.actividades
          )
        ) {
          setActividades(
            datosParseados.actividades
          );
        }
      } catch (error) {
        console.error(
          "Error cargando localStorage:",
          error
        );
      }
    }

    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;

    localStorage.setItem(
      "evalix_datos",
      JSON.stringify({
        estudiantes,
        actividades
      })
    );
  }, [
    estudiantes,
    actividades,
    hidratado
  ]);
}