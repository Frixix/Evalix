import { useState } from "react";

function ImportarCSV({
  
  onImport,
  actividades,
  estudiantes
}) {
  const [mensajeImportacion, setMensajeImportacion] = useState("");
  const handleImportCSV = (e) => {
    
    const archivo = e.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = (evento) => {
      const texto = evento.target.result;
      const lineas = texto.split(/\r?\n/);

        const encabezado = lineas[0]?.trim().toLowerCase();

        if (encabezado !== "nombre") {
          alert(
            'CSV inválido. La primera columna debe llamarse "nombre".'
          );
          return;
        }

      const filas = lineas.slice(1);

      const nuevos = filas
        .map((f) => f.trim())
        .filter((f) => f !== "")
        .map((fila) => {
          const [nombre] = fila.split(",");

          if (!nombre?.trim()) return null;

          const notasIniciales = {};

          actividades.forEach((act) => {
            notasIniciales[act.id] = "";
          });

          return {
            id: Date.now() + Math.random(),
            nombre: nombre.trim(),
            notas: notasIniciales
          };
        })
        .filter(Boolean);

        const nuevosFiltrados = nuevos.filter((nuevo) => {
          return !estudiantes.some(
            (existente) =>
              existente.nombre.toLowerCase().trim() ===
              nuevo.nombre.toLowerCase().trim()
        );
      });

        if (nuevosFiltrados.length === 0) {
          setMensajeImportacion(
            "No se encontraron estudiantes válidos para importar."
          );
          return;
        }

      onImport(nuevosFiltrados);

      const duplicadosOmitidos =
        nuevos.length - nuevosFiltrados.length;

      setMensajeImportacion(
        `Se importaron ${nuevosFiltrados.length} estudiantes correctamente. ${
          duplicadosOmitidos > 0
            ? `${duplicadosOmitidos} duplicados omitidos.`
            : ""
        }`
      );
    };

    lector.readAsText(archivo);
  };


    const descargarPlantilla = () => {
    const contenido = [
      ["nombre"],
      ["Juan Perez"],
      ["Maria Gomez"],
      ["Carlos Rodriguez"]
    ]
      .map((fila) => fila.join(","))
      .join("\n");

    const blob = new Blob([contenido], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "plantilla_estudiantes.csv";
    link.click();

    URL.revokeObjectURL(url);
  };
 return (
  <div className="import-section">
    <h2>Importar estudiantes</h2>

    <label className="btn-agregar">
      Seleccionar archivo
      <input
        type="file"
        accept=".csv"
        onChange={handleImportCSV}
        hidden
      />
    </label>

    <button
      className="btn-agregar"
      onClick={descargarPlantilla}
    >
      Descargar plantilla
    </button>

    {mensajeImportacion && (
      <p className="mensaje-importacion">
        {mensajeImportacion}
      </p>
    )}
  </div>
);
}

export default ImportarCSV;