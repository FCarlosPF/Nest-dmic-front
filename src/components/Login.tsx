import { ChangeEvent, FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import AuthGateway from "../gateways/AuthGateway";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

interface FormData {
  email: string;
  password: string;
}


export const Login= () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const authGateway = new AuthGateway();



  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Puedes acceder a los valores del formulario en formData.email y formData.password
    
    try {
        // Llamar a authService.login(loginUser) aquí
        const response = await authGateway.login(formData);
        const token = response.data.token;
        console.log('Usuario autenticado con éxito:', response.data);
        document.cookie = `token=${token}; path=/;`;

        if (response.data.token && response.data.roles) {
          document.cookie = `token=${response.data.token}; path=/;`
        }
        if (response.data.role.includes('admin')) {
          navigate('/users')
        } else if (response.data.role.includes('user')) {
          navigate('/catalogos')
        } 
        console.log(response.data.role)
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        Swal.fire('Usuario no identificado')
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      }
    

  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              No se debe compartir tu cuenta
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};
