import { useState } from "react";
import TablaNotas from "./components/TablaNotas/TablaNotas";
import ImportarCSV from "./components/ImportarCSV";
import Header from "./components/Header";
// import { estudiantesMock } from "./data/estudiantes";
// import { usePersistenciaNotas } from "./hooks/usePersistenciaNotas";

function App() {
  const [vista, setVista] = useState("tabla");

    const [actividades, setActividades] =
      useState([]);

    const [estudiantes, setEstudiantes] =
      useState([]);

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