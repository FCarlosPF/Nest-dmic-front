import "./App.css";
import { Login } from "./components/Login";
import { TableChina } from "./components/TableCatalogo";
import { Routes, Route} from "react-router-dom";
import { TableUsers } from "./components/TableUsers";
import { BrowserRouter } from "react-router-dom";
import { Catalogos } from "./components/Catalogos";



function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/catalogoChina" element={<TableChina/>} />
          <Route path="/users" element={<TableUsers/>} />
          <Route path="/catalogos" element={<Catalogos/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
