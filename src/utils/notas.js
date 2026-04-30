export const calcularPromedio = (
  notas,
  actividades = []
) => {
  let suma = 0;
  let totalNotasValidas = 0;

  actividades.forEach((act) => {
    const valor = notas?.[act.id];

    if (valor === "" || valor === undefined) return;

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

  if (totalNotasValidas === 0) return 0;

  return suma / totalNotasValidas;
};

export const obtenerEstado = (
  promedio,
  notas
) => {
  const valores = Object.values(notas).filter(
    (n) => n !== ""
  );

  if (valores.length === 0) {
    return {
      texto: "Sin datos",
      clase: "estado-neutral"
    };
  }

  if (promedio < 3) {
    return {
      texto: "Pierde",
      clase: "estado-pierde"
    };
  }

  if (promedio < 3.5) {
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