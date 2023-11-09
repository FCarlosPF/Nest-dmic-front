import React, { useEffect, useState } from "react";
import CatalogoGateway from "../gateways/CatalogoGateway";
import "../css/TableCatalogo.css";

interface CatalogoItem {
  iqms: number;
  familia: string;
  molde: string;
  foto: string;
}

export const Table = () => {
  const baseUrl = "https://nest-dmic-postgres.onrender.com/catalogo"; // Reemplaza esto con la URL de tu API
  const [catalogo, setCatalogo] = useState<CatalogoItem[]>([]);
  const catalogoGateway = new CatalogoGateway(baseUrl);
  const [nuevoElemento, setNuevoElemento] = useState<CatalogoItem>({
    iqms: 0,
    familia: "",
    molde: "",
    foto: "",
  });
  const [busquedaIQMS, setBusquedaIQMS] = useState<number>(0);
  const [resultadoBusqueda, setResultadoBusqueda] =
    useState<CatalogoItem | null>(null);

  useEffect(() => {
    catalogoGateway
      .getAll()
      .then((data) => setCatalogo(data))
      .catch((error) =>
        console.error("Error al obtener elementos del catálogo:", error)
      );
  }, []);

  const agregarElemento = (event: React.FormEvent) => {
    event.preventDefault();

    catalogoGateway
      .create(nuevoElemento)
      .then((data) => {
        setCatalogo([...catalogo, data]);
        setNuevoElemento({
          iqms: 0,
          familia: "",
          molde: "",
          foto: "",
        });
      })
      .catch((error) =>
        console.error("Error al agregar nuevo elemento:", error)
      );
  };

  const eliminarElemento = (iqms: number) => {
    // Eliminar un elemento del catálogo por su ID
    catalogoGateway
      .delete(iqms)
      .then(() => {
        // Actualizar el estado del catálogo eliminando el elemento con el ID dado
        setCatalogo((prevCatalogo) =>
          prevCatalogo.filter((elemento) => elemento.iqms !== iqms)
        );
      })
      .catch((error) => console.error("Error al eliminar elemento:", error));
  };

  const buscarPorIQMS = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        const resultado = await catalogoGateway.getById(busquedaIQMS);
        setResultadoBusqueda(resultado); // Almacena el resultado de la búsqueda en el estado resultadoBusqueda
        console.log("Resultado de la búsqueda:", resultado);
      } catch (error) {
        console.error("Error al realizar la búsqueda por IQMS:", error);
      }
    }
  };

  return (
    <>
      <h2>Agregar Nuevo Elemento</h2>
      <input
        type="text"
        placeholder="IQMS"
        value={nuevoElemento.iqms}
        onChange={(e) =>
          setNuevoElemento({ ...nuevoElemento, iqms: parseInt(e.target.value) })
        }
      />
      <input
        type="text"
        placeholder="Familia"
        value={nuevoElemento.familia}
        onChange={(e) =>
          setNuevoElemento({ ...nuevoElemento, familia: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Molde"
        value={nuevoElemento.molde}
        onChange={(e) =>
          setNuevoElemento({ ...nuevoElemento, molde: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Foto"
        value={nuevoElemento.foto}
        onChange={(e) =>
          setNuevoElemento({ ...nuevoElemento, foto: e.target.value })
        }
      />
      <button onClick={agregarElemento}>Agregar</button>
      <br />
      <br />
      <hr />
      Buscar por IQMS:
      <input
        type="text"
        placeholder="Buscar por IQMS"
        value={busquedaIQMS}
        onChange={(e) => setBusquedaIQMS(parseInt(e.target.value))}
        onKeyDown={buscarPorIQMS} // Llama a la función buscarPorIQMS cuando se presiona una tecla
      />
      <hr />
      <div className="contenedor-tabla-catalogo">
        <table>
          <thead>
            <tr>
              <th>IQMS</th>
              <th>FAMILIA</th>
              <th>MOLDE</th>
              <th>FOTO</th>
            </tr>
          </thead>
          <tbody>
            {catalogo.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.iqms}</td>
                <td>{elemento.familia}</td>
                <td>{elemento.molde}</td>
                <td>
                  <img src={elemento.foto} alt="" width={200} height={200} />
                </td>
                <td>
                  <button onClick={() => eliminarElemento(elemento.iqms)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {resultadoBusqueda && (
        <div>
          <h2>Resultado de la Búsqueda</h2>
          <table>
            <thead>
              <tr>
                <th>IQMS</th>
                <th>FAMILIA</th>
                <th>MOLDE</th>
                <th>FOTO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{resultadoBusqueda.iqms}</td>
                <td>{resultadoBusqueda.familia}</td>
                <td>{resultadoBusqueda.molde}</td>
                <td>
                  <img
                    src={resultadoBusqueda.foto}
                    alt=""
                    width={200}
                    height={200}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      </div>
      
    </>
  );
};
