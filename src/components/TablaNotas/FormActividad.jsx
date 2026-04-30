function FormActividad({
  nombreActividad,
  setNombreActividad,
  categoriaActividad,
  setCategoriaActividad,
  fechaActividad,
  setFechaActividad,
  agregarActividad
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Nombre de la actividad"
        value={nombreActividad}
        onChange={(e) =>
          setNombreActividad(e.target.value)
        }
      />

      <select
        value={categoriaActividad}
        onChange={(e) =>
          setCategoriaActividad(
            e.target.value
          )
        }
      >
        <option value="Tarea">Tarea</option>
        <option value="Quiz">Quiz</option>
        <option value="Examen">Examen</option>
        <option value="Proyecto">
          Proyecto
        </option>
        <option value="Laboratorio">
          Laboratorio
        </option>
      </select>

      <input
        type="date"
        value={fechaActividad}
        onChange={(e) =>
          setFechaActividad(
            e.target.value
          )
        }
      />

      <button
        className="btn-agregar"
        onClick={agregarActividad}
      >
        + Agregar actividad
      </button>
    </>
  );
}

export default FormActividad;