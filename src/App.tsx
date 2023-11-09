import "./App.css";
import { Login } from "./components/Login";
import { Table } from "./components/TableCatalogo";
import { Routes, Route, Navigate } from "react-router-dom";
import { TableUsers } from "./components/TableUsers";
import { BrowserRouter } from "react-router-dom";



function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/catalogo" element={<Table />} />
          <Route path="/users" element={<TableUsers/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
