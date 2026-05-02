import { REGLAS_ACADEMICAS } from "../constants/reglasAcademicas";

export const calcularPromedio = (
  notas,
  actividades = []
) => {
  let suma = 0;
  let totalNotasValidas = 0;

  actividades.forEach((act) => {
    const valor = notas?.[act.id];

    if (
      valor === "" ||
      valor === undefined
    ) {
      return;
    }

    if (valor === "NP") {
      totalNotasValidas++;
      return;
    }

    const numero = Number(valor);

    if (!isNaN(numero)) {
      suma += numero;
      totalNotasValidas++;
    }
  });

  if (totalNotasValidas === 0) {
    return 0;
  }

  return suma / totalNotasValidas;
};

export const obtenerEstado = (
  promedio,
  notas
) => {
  const valores = Object.values(notas).filter(
    (nota) => nota !== ""
  );

  if (valores.length === 0) {
    return {
      texto: "Sin datos",
      clase: "estado-neutral"
    };
  }

  if (
    promedio <
    REGLAS_ACADEMICAS.notaMinimaAprobacion
  ) {
    return {
      texto: "Pierde",
      clase: "estado-pierde"
    };
  }

  if (
    promedio <
    REGLAS_ACADEMICAS.notaRiesgo
  ) {
    return {
      texto: "Riesgo",
      clase: "estado-riesgo"
    };
  }

  return {
    texto: "Aprueba",
    clase: "estado-aprueba"
  };
};