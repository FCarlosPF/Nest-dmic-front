import Button from "react-bootstrap/Button";
import "../css/Catalogos.css";
import { useNavigate } from "react-router-dom";

export const Catalogos = () => {
  const navigate = useNavigate();

  const handleClickChina = () =>{
    navigate('/catalogoChina')
  }

  const handleClickQueretaro = () =>{
    navigate('/catalogoQueretaro')
  }


  return (
    <>
      <h1>Lista de Catalogos</h1>

      <Button variant="dark" className="catalogo" onClick={handleClickChina}>
        Catalogo China
      </Button>
      <Button variant="dark" className="catalogo" onClick={handleClickQueretaro}>
        Catalogo Queretaro
      </Button>
    </>
  );
};
