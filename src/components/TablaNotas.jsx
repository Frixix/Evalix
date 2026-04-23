import { estudiantesMock } from "../data/estudiantes";

function TablaNotas() {
  return (
    <div>
      <h2>Tabla de Notas</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Actividad 1</th>
            <th>Actividad 2</th>
          </tr>
        </thead>

        <tbody>
          {estudiantesMock.map((est) => (
            <tr key={est.id}>
              <td>{est.nombre}</td>

              <td>
                <input type="number" />
              </td>

              <td>
                <input type="number" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaNotas;