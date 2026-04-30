import { useState } from "react";
import TablaNotas from "./components/TablaNotas";
import ImportarCSV from "./components/ImportarCSV";
import Header from "./components/Header";
import { estudiantesMock } from "./data/estudiantes";
import { usePersistenciaNotas } from "./hooks/usePersistenciaNotas";

function App() {
  const [vista, setVista] = useState("tabla");

  const [actividades, setActividades] = useState([
    {
      id: 1,
      nombre: "Actividad 1",
      categoria: "Tarea",
      fechaCreacion: new Date().toISOString().split("T")[0]
    },
    {
      id: 2,
      nombre: "Actividad 2",
      categoria: "Tarea",
      fechaCreacion: new Date().toISOString().split("T")[0]
    }
  ]);

  const [estudiantes, setEstudiantes] =
    useState(estudiantesMock);

  usePersistenciaNotas({
    estudiantes,
    actividades,
    setEstudiantes,
    setActividades
  });

  return (
    <>
      <Header setVista={setVista} />

      {vista === "tabla" && (
        <TablaNotas
          estudiantes={estudiantes}
          setEstudiantes={setEstudiantes}
          actividades={actividades}
          setActividades={setActividades}
        />
      )}

      {vista === "importar" && (
        <ImportarCSV
          estudiantes={estudiantes}
          actividades={actividades}
          onImport={(nuevos) =>
            setEstudiantes((prev) => [
              ...prev,
              ...nuevos
            ])
          }
        />
      )}
    </>
  );
}

export default App;