function ImportarCSV({ onImport }) {
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

  return (
    <div className="import-section">
      <h2>Importar estudiantes</h2>

      <input type="file" accept=".csv" onChange={handleImportCSV} />
    </div>
  );
}

export default ImportarCSV;