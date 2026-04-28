function ImportarCSV({ onImport, actividades }) {
  const handleImportCSV = (e) => {
    
    const archivo = e.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = (evento) => {
      const texto = evento.target.result;

      const filas = texto.split(/\r?\n/).slice(1);

      const nuevos = filas
        .map((f) => f.trim())
        .filter((f) => f !== "")
        .map((fila) => {
          const [nombre] = fila.split(",");

          return {
            id: Date.now() + Math.random(),
            nombre: nombre.trim(),
            notas: {}
          };
        });

      onImport(nuevos);
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
  </div>
);
}

export default ImportarCSV;