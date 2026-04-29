import { useState, useEffect } from "react";
import TablaNotas from "./components/TablaNotas";
import ImportarCSV from "./components/ImportarCSV";
import Header from "./components/Header";
import { estudiantesMock } from "./data/estudiantes";

function App() {
// ================================
// ESTADO DE NAVEGACIÓN / VISTA ACTUAL
// ================================
const [vista, setVista] = useState("tabla");

// ================================
// CONTROL DE HYDRATION
// Evita guardar en localStorage antes de cargar datos
// ================================
const [hidratado, setHidratado] = useState(false);

// ================================
// ESTADO GLOBAL DE ACTIVIDADES
// ================================
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

// ================================
// ESTADO GLOBAL DE ESTUDIANTES
// ================================
const [estudiantes, setEstudiantes] = useState(estudiantesMock);

// ================================
// HYDRATION DESDE LOCALSTORAGE
// ================================
useEffect(() => {
const datosGuardados =
localStorage.getItem("evalix_datos");

if (datosGuardados) {
  try {
    const datosParseados =
      JSON.parse(datosGuardados);

    if (
      Array.isArray(datosParseados.estudiantes)
    ) {
      setEstudiantes(
        datosParseados.estudiantes
      );
    }

    if (
      Array.isArray(datosParseados.actividades)
    ) {
      setActividades(
        datosParseados.actividades
      );
    }
  } catch (error) {
    console.error(
      "Error cargando localStorage:",
      error
    );
  }
}

setHidratado(true);

}, []);

// ================================
// PERSISTENCIA AUTOMÁTICA
// ================================
useEffect(() => {
if (!hidratado) return;

localStorage.setItem(
  "evalix_datos",
  JSON.stringify({
    estudiantes,
    actividades
  })
);


}, [
estudiantes,
actividades,
hidratado
]);

return (
<> <Header setVista={setVista} />

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
