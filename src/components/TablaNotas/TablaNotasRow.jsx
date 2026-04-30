function TablaNotasRow({
  est,
  actividades,
  config,
  promedio,
  estado,
  eliminarEstudiante,
  handleNotaChange,
  actualizarEstado
}) {
  return (
    <tr>
      <td>
        <div className="estudiante-info">
          <span>{est.nombre}</span>

          <button
            className="btn-eliminar"
            onClick={() => {
              const confirmar = window.confirm(
                `¿Eliminar a "${est.nombre}"?\n\nEsta acción no se puede deshacer.`
              );

              if (confirmar) {
                eliminarEstudiante(est.id);
              }
            }}
          >
            <span className="material-symbols-outlined">
              delete
            </span>
          </button>
        </div>
      </td>

      {actividades.map((act) => {
        const esNP = est.notas[act.id] === "NP";

        return (
          <td
            key={act.id}
            className={esNP ? "celda-np" : ""}
          >
            <input
              className="input-nota"
              type="number"
              min={config.escala.min}
              max={config.escala.max}
              step={config.escala.step}
              value={
                esNP
                  ? ""
                  : est.notas[act.id] || ""
              }
              onChange={(e) =>
                handleNotaChange(
                  est.id,
                  act.id,
                  e.target.value
                )
              }
            />

            <button
              className="btn-np"
              onClick={() =>
                actualizarEstado(
                  est.id,
                  act.id,
                  "NP"
                )
              }
            >
              NP
            </button>
          </td>
        );
      })}

      <td>
        {promedio.toFixed(config.redondeo)}
      </td>

      <td>
        <span className={`badge ${estado.clase}`}>
          {estado.texto}
        </span>
      </td>
    </tr>
  );
}

export default TablaNotasRow;