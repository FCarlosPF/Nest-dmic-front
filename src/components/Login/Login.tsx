import { ChangeEvent, FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import AuthGateway from "../../gateways/AuthGateway";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";
import Banner from "../../assets/images/BannerLogin.jpg";
interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
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
    try {
      // Tu código de autenticación aquí...
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire("Usuario no identificado");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <img src={Banner} alt="Banner Image" className="img-fluid" />
            <div className="text-center mt-3">
              <h3 className="banner-title">Rastrea y maneja tus paquetes</h3>
              <h4 className="banner-subtitle">
                Toda la información de tus paquetes, en un solo lugar
              </h4>
            </div>
          </Container>
        </div>
        <div className="col-lg-6 d-flex justify-content-center align-items-center formulario-container">
          <Form onSubmit={handleSubmit} className="login-form">
            <div className="text-center">
              <h2 className="form-title mb-4">Iniciar sesión</h2>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={`form-label left-align-label`}>
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Form.Text className="form-text">
                No se debe compartir tu cuenta
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className={`form-label left-align-label`}>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="login-submit-button"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
