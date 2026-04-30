function FormEstudiante({
  nombreEstudiante,
  setNombreEstudiante,
  agregarEstudiante
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Nombre del estudiante"
        value={nombreEstudiante}
        onChange={(e) =>
          setNombreEstudiante(
            e.target.value
          )
        }
      />

      <button
        className="btn-agregar"
        onClick={agregarEstudiante}
      >
        + Agregar estudiante
      </button>
    </>
  );
}

export default FormEstudiante;