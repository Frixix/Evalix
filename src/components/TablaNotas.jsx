import { estudiantesMock } from "../data/estudiantes";
import { useState } from "react";

function TablaNotas() {
  const [estudiantes, setEstudiantes] = useState(estudiantesMock);

    const handleNotaChange = (id, actividad, valor) => {
    const nuevosEstudiantes = estudiantes.map((est) => {
      if (est.id === id) {
        return {
          ...est,
          notas: {
            ...est.notas,
            [actividad]: valor
          }
        };
      }
      return est;
    });

    setEstudiantes(nuevosEstudiantes);
  };

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
          {estudiantes.map((est) => (
            <tr key={est.id}>
              <td>{est.nombre}</td>

              <td>
                <input
                  type="number"
                  value={est.notas.actividad1}
                  onChange={(e) =>
                    handleNotaChange(est.id, "actividad1", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={est.notas.actividad2}
                  onChange={(e) =>
                    handleNotaChange(est.id, "actividad2", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(estudiantes, null, 2)}</pre>
    </div>
  );
}

export default TablaNotas;