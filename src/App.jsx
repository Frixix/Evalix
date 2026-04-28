import { useState } from "react";
import TablaNotas from "./components/TablaNotas";
import ImportarCSV from "./components/ImportarCSV";
import Header from "./components/Header";
import { estudiantesMock } from "./data/estudiantes";

function App() {
  const [vista, setVista] = useState("tabla");

  // 🔥 ESTADO GLOBAL
  const [estudiantes, setEstudiantes] = useState(estudiantesMock);


  console.log("MOCK:", estudiantesMock);
  console.log("STATE:", estudiantes);
  return (
    <>
      <Header setVista={setVista} />

      {vista === "tabla" && (
        <TablaNotas
          estudiantes={estudiantes}
          setEstudiantes={setEstudiantes}
        />
      )}

      {vista === "importar" && (
        <ImportarCSV
          onImport={(nuevos) =>
            setEstudiantes((prev) => [...prev, ...nuevos])
          }
        />
      )}
    </>
  );
}

export default App;