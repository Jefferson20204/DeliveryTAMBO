import React, { useCallback, useState } from "react";
import GoogleSignIn from "../../../components/common/Buttons/GoogleSignIn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { loginAPI } from "../../../api/authentication";
import { saveToken } from "../../../utils/jwt-helper";
import Divider from "../../../components/common/Divider/Divider";
import Button from "../../../components/common/Buttons/Button";
import AuthFormWrapper from "../AuthFormWrapper";
import Input from "../../../components/common/Input/Input";
import Message from "../../../components/common/Message/Message";
import "../AuthStyles.css";

const Login = () => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [apiError, setApiError] = useState({ message: "", code: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading({ loading: true, message: "Validando credenciales..." });
      loginAPI(values)
        .then((res) => {
          if (res?.token) {
            saveToken(res?.token);
            navigate("/");
          } else {
            setError("¡Algo salió mal!");
          }
        })
        .catch((err) => {
          // Maneja errores de conexión o respuestas inesperadas
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "Inicio de sesión fallida. Intente de nuevo.";
          setApiError({
            message: errorMessage,
            code: err.response?.status || 500,
          });
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, navigate, values]
  );

  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  return (
    <>
      <AuthFormWrapper title="Iniciar sesión">
        {apiError.message && (
          <Message type="error" message={apiError.message} />
        )}
        <form onSubmit={onSubmit} className="form">
          <Input
            type="email"
            name="userName"
            value={values?.userName}
            onChange={handleOnChange}
            placeholder="Correo Electrónico"
            className="input"
            autoComplete="username"
            required
          />
          <Input
            type="password"
            name="password"
            value={values?.password}
            onChange={handleOnChange}
            placeholder="Contraseña"
            className="input"
            autoComplete="new-password"
            required
          />

          <div className="section-button">
            <Button type="submit" variant="primary">
              Iniciar sesión
            </Button>

            <Link to="/v1/register" className="btn-link-wrapper">
              <Button variant="outline">
                ¿No tienes una cuenta? Regístrate
              </Button>
            </Link>

            <Link to="/v1/forgot-password" className="link">
              ¿Olvidaste tu contraseña?
            </Link>

            <Divider text="o" />

            <GoogleSignIn />
          </div>
        </form>
      </AuthFormWrapper>
    </>
  );
};

export default Login;
