import { ChangeEvent, useEffect, useState } from "react";
import UserGateway from "../gateways/UserGateway";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../css/TableUsers.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AuthGateway from "../gateways/AuthGateway";
import { Route } from "react-router-dom";


interface IUser {
  id: number;
  email: string;
  name: string;
}

interface FormularioState {
    name: string;
    email: string;
    password: string;
  }

export const TableUsers = () => {
  const usersGateway = new UserGateway();
  const authGateway = new AuthGateway();
  const [users, setUsers] = useState<IUser[]>([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [valores, setValores] = useState<FormularioState>({
    name: "",
    email: "",
    password: "",
  });
  const reiniciarPagina = () => {
    window.location.reload();
  };

  const manejarCambios = (e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValores({
      ...valores,
      [name]: value,
    });
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await  authGateway.register(valores)
        const usuarioCreado = response.data;
        setUsers([...users, usuarioCreado]);

    } catch (error) {
        console.error('Error al registrar:', error);

    }
    console.log('Valores del formulario:', valores);
  };

  const eliminarElemento = (id: number) => {
    // Eliminar un elemento del catálogo por su ID
    usersGateway
      .delete(id)
      .then(() => {
        // Actualizar el estado del catálogo eliminando el elemento con el ID dado
        setUsers((prevUser) =>
        prevUser.filter((elemento) => elemento.id !== id)
        );
      })
      .catch((error) => console.error("Error al eliminar elemento:", error));
  };

  useEffect(() => {
    usersGateway
      .getAll()
      .then((data) => setUsers(data))
      .catch((error) =>
        console.error("Error al obtener elementos del catálogo:", error)
      );
  }, []);

  return (
    <>
      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>BUTTONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.id}</td>
                <td>{elemento.name}</td>
                <td>{elemento.email}</td>
                <td className="contenedor-button" colSpan={2}>
                  <Button className="button button-editar" variant="warning">
                    Editar
                  </Button>
                  <Button className="button button-editar" variant="danger" onClick={() => eliminarElemento(elemento.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success" onClick={handleShow}>
          Agregar
        </Button>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={valores.name}
                onChange={manejarCambios}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={valores.email}
                onChange={manejarCambios}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={valores.password}
                onChange={manejarCambios}
              />
            </Form.Group>
            <button type="submit">Enviar</button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={reiniciarPagina}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
