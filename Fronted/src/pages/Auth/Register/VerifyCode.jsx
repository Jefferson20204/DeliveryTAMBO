import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../store/features/common";
import { verifyAPI } from "../../../api/authentication";
import Button from "../../../components/Buttons/Button";
import Input from "../../../components/Input/Input";
import Message from "../../../components/Message/Message";
import "../AuthStyles.css";

const VerifyCode = ({ email }) => {
  const [values, setValues] = useState({
    userName: email,
    code: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      dispatch(setLoading({ loading: true, message: "Verificando código..." }));
      verifyAPI(values)
        .then((res) => {
          setMessage(
            "¡Gracias! Tu correo electrónico se ha verificado correctamente. Ya puedes iniciar sesión en tu cuenta."
          );
          setTimeout(() => navigate("/v1/login"), 2000);
        })
        .catch((err) => {
          setError(
            "El código de verificación ingresado es incorrecto o ha expirado."
          );
        })
        .finally(() => {
          dispatch(setLoading({ loading: false, message: "" }));
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
      {error && <Message type="error" message={error} />}
      {message ? (
        <div className="form">
          <p>{message}</p>
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit} className="auth form">
            <p>
              Ingrese el código de verificación de 6 dígitos enviado a su correo
              electrónico para verificar su cuenta.
            </p>

            <Input
              type="text"
              name="code"
              value={values.code}
              maxLength={6}
              onChange={handleOnChange}
              placeholder="Código de 6 digitos"
              className="input"
              required
            />

            <div className="section-button">
              <Button type="submit" variant="primary">
                Verificar
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default VerifyCode;
