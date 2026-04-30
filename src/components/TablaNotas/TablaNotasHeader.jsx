function TablaNotasHeader({
  actividades,
  eliminarActividad
}) {
  return (
    <tr>
      <th>Estudiante</th>

      {actividades.map((act) => (
        <th key={act.id}>
          <div className="actividad-header">
            <span>{act.nombre}</span>

            <small>{act.categoria}</small>

            <small>{act.fechaCreacion}</small>

            <button
              className="btn-eliminar"
              onClick={() => {
                const confirmar =
                  window.confirm(
                    `¿Eliminar "${act.nombre}"?\n\nEsta acción no se puede deshacer.`
                  );

                if (confirmar) {
                  eliminarActividad(act.id);
                }
              }}
            >
              <span className="material-symbols-outlined">
                delete
              </span>
            </button>
          </div>
        </th>
      ))}

      <th>Promedio</th>
      <th>Estado</th>
    </tr>
  );
}

export default TablaNotasHeader;