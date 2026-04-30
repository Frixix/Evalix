function FiltrosTabla({
  busqueda,
  setBusqueda
}) {
  return (
    <input
      type="text"
      placeholder="Buscar estudiante..."
      value={busqueda}
      onChange={(e) =>
        setBusqueda(e.target.value)
      }
    />
  );
}

export default FiltrosTabla;