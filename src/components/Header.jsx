import "../styles/header.css";


function Header({ setVista }) {
  return (
    <div className="header">
      <h1>Evalix</h1>

      <div className="nav">
        <button onClick={() => setVista("tabla")}>
          Tabla de notas
        </button>

        <button onClick={() => setVista("importar")}>
          Importar CSV
        </button>
      </div>
    </div>
  );
}

export default Header;