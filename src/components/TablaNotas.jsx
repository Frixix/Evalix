import { estudiantesMock } from "../data/estudiantes";
import { useState } from "react";

function TablaNotas() {

  // Configuración de la escala de notas
  const escala = {
    min: 0,
    max: 5,
    step: 0.1
  };
  // Estado principal 
  const [estudiantes, setEstudiantes] = useState(estudiantesMock);

  const calcularPromedio = (notas) => {
    const valores = Object.values(notas)
      .map((n) => Number(n))
      .filter((n) => !isNaN(n));

    if (valores.length === 0) return 0;

    const suma = valores.reduce((acc, n) => acc + n, 0);
    return suma / valores.length;
  };

  // validación real 
    const handleNotaChange = (id, actividad, valor) => {

      // 🔹 Permitir vacío directamente
      if (valor === "") {
        actualizarEstado(id, actividad, "");
        return;
      }

      const numero = Number(valor);

      // 🔹 Evitar NaN
      if (isNaN(numero)) return;

      // 🔹 Validar rango
      if (numero < escala.min || numero > escala.max) return;

      actualizarEstado(id, actividad, numero);
    };
    const actualizarEstado = (id, actividad, valor) => {
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
            <th>Promedio</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((est) => (
            <tr key={est.id}>
              <td>{est.nombre}</td>

              <td>
                <input
                  type="number"
                  min={escala.min}
                  max={escala.max}
                  step={escala.step}
                  value={est.notas.actividad1}
                  onChange={(e) =>
                    handleNotaChange(est.id, "actividad1", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min={escala.min}
                  max={escala.max}
                  step={escala.step}
                  value={est.notas.actividad2}
                  onChange={(e) =>
                    handleNotaChange(est.id, "actividad2", e.target.value)
                  }
                />
              </td>
              <td>{calcularPromedio(est.notas).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default TablaNotas;