import { useState, useEffect } from "react";
import TablaNotas from "./components/TablaNotas/TablaNotas";
import ImportarCSV from "./components/ImportarCSV";
import Header from "./components/Header";

import { tablaNotasService } from "./services/tablaNotasService";

function App() {
  const [vista, setVista] = useState("tabla");

  const [actividades, setActividades] =
    useState([]);

  const [estudiantes, setEstudiantes] =
    useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const { estudiantes, actividades } =
        await tablaNotasService.obtenerDatos();

      setEstudiantes(estudiantes || []);
      setActividades(actividades || []);
    };

    cargarDatos();
  }, []);

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