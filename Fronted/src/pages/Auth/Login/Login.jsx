import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { loginAPI } from "../../../api/authentication";
import { saveToken } from "../../../utils/jwt-helper";
import Divider from "../../../components/Divider/Divider";
import Button from "../../../components/Buttons/Button";
import AuthFormWrapper from "../AuthFormWrapper";
import Input from "../../../components/Input/Input";
import Message from "../../../components/Message/Message";
import GoogleSignIn from "../../../components/Buttons/GoogleSignIn";
import { loadUserInfo } from "../../../store/features/user";
import { fetchUserDetails } from "../../../api/userInfo";
import "../AuthStyles.css";

const Login = () => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const [apiError, setApiError] = useState({ message: "", code: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAndStoreUserDetails = useCallback(async () => {
    try {
      dispatch(
        setLoading({
          loading: true,
          message: "Cargando información del usuario...",
        })
      );
      const userDetails = await fetchUserDetails();
      dispatch(loadUserInfo(userDetails));
    } catch (error) {
      console.error("Error al cargar detalles del usuario:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(
        setLoading({ loading: true, message: "Validando credenciales..." })
      );

      try {
        const res = await loginAPI(values);

        if (res?.token) {
          saveToken(res.token);
          await fetchAndStoreUserDetails(); // Obtener y guardar info del usuario
          navigate("/"); // Redirigir al home
        } else {
          setApiError({
            message: "¡Algo salió mal! No se recibió token de autenticación",
            code: 500,
          });
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Inicio de sesión fallido. Intente de nuevo.";
        setApiError({
          message: errorMessage,
          code: err.response?.status || 500,
        });
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, navigate, values, fetchAndStoreUserDetails]
  );

  const handleOnChange = useCallback((e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <AuthFormWrapper title="Iniciar sesión" variant="login">
      {apiError.message && <Message type="error" message={apiError.message} />}
      <form onSubmit={onSubmit} className="auth form">
        <Input
          type="email"
          name="userName"
          value={values.userName}
          onChange={handleOnChange}
          placeholder="Correo Electrónico"
          className="input"
          autoComplete="username"
          required
        />
        <Input
          type="password"
          name="password"
          value={values.password}
          onChange={handleOnChange}
          placeholder="Contraseña"
          className="input"
          autoComplete="current-password"
          required
        />

        <div className="section-button">
          <Button type="submit" variant="primary">
            Iniciar sesión
          </Button>

          <Link to="/v1/register" className="btn-link-wrapper">
            <Button variant="outline">¿No tienes una cuenta? Regístrate</Button>
          </Link>

          <Link to="/v1/forgot-password" className="link">
            ¿Olvidaste tu contraseña?
          </Link>

          <Divider text="o" />

          <GoogleSignIn />
        </div>
      </form>
    </AuthFormWrapper>
  );
};

export default Login;
