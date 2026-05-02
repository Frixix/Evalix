
  function useFiltroEstudiantes(
  estudiantes,
  busqueda
) {
  return estudiantes.filter((est) =>
    est.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );
}

export default useFiltroEstudiantes;