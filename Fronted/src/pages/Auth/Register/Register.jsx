import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { registerAPI } from "../../../api/authentication";
import GoogleSignIn from "../../../components/Buttons/GoogleSignIn";
import Divider from "../../../components/Divider/Divider";
import Button from "../../../components/Buttons/Button";
import AuthFormWrapper from "../AuthFormWrapper";
import Input from "../../../components/Input/Input";
import Message from "../../../components/Message/Message";
import VerifyCode from "./VerifyCode";
import "../AuthStyles.css";

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [apiError, setApiError] = useState({ message: "", code: null });
  const dispatch = useDispatch();
  const [enableVerify, setEnableVerify] = useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setApiError({ message: "", code: null });
      dispatch(
        setLoading({ loading: true, message: "Registrando usuario..." })
      );

      registerAPI(values)
        .then((res) => {
          if (res?.code === 200) {
            setEnableVerify(true);
          } else if (res?.message) {
            // Captura el mensaje de error de la API
            setApiError({
              message: res.message,
              code: res.code || 400,
            });
          }
        })
        .catch((err) => {
          // Maneja errores de conexión o respuestas inesperadas
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "Error en el registro. Inténtalo de nuevo.";
          setApiError({
            message: errorMessage,
            code: err.response?.status || 500,
          });
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, values]
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
      <AuthFormWrapper title="Registro" variant={"registro"}>
        {apiError.message && (
          <Message type="error" message={apiError.message} />
        )}
        {!enableVerify ? (
          <>
            {" "}
            <form onSubmit={onSubmit} className="form">
              <Input
                type="text"
                name="firstName"
                value={values?.firstName}
                onChange={handleOnChange}
                placeholder="Nombre"
                className="input"
                autoComplete="given-name"
                required
              />
              <Input
                type="text"
                name="lastName"
                value={values?.lastName}
                onChange={handleOnChange}
                placeholder="Apellido"
                className="input"
                autoComplete="family-name"
                required
              />
              <Input
                type="number"
                name="phoneNumber"
                value={values?.phoneNumber}
                onChange={handleOnChange}
                placeholder="Teléfono"
                className="input"
                autoComplete="tel"
                required
              />
              <Input
                type="email"
                name="email"
                value={values?.email}
                onChange={handleOnChange}
                placeholder="Correo Electrónico"
                className="input"
                autoComplete="email"
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
                  Registrarse
                </Button>

                <Link to="/v1/login" className="btn-link-wrapper">
                  <Button variant="outline">
                    ¿Ya tienes cuenta? Inicia sesión
                  </Button>
                </Link>

                <Divider text="o" />

                <GoogleSignIn />
              </div>
            </form>
          </>
        ) : (
          <VerifyCode email={values.email} />
        )}
      </AuthFormWrapper>
    </>
  );
};

export default Register;
