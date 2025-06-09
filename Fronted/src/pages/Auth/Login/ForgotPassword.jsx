import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { sendResetPasswordEmailAPI } from "../../../api/authentication";
import { Link } from "react-router-dom";
import Button from "../../../components/Buttons/Button";
import AuthFormWrapper from "../AuthFormWrapper";
import Input from "../../../components/Input/Input";
import Message from "../../../components/Message/Message";
import "../AuthStyles.css";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState(null);
  const [message, setMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(setLoading({ loading: true, message: "Enviando email..." }));
      setMessage("");
      setApiError(null);

      try {
        const response = await sendResetPasswordEmailAPI(email);

        // Suponiendo que tu API devuelve un string como mensaje
        setMessage(response.message || "Correo de recuperación enviado.");
        disableButtonTemporarily();
      } catch (error) {
        const errorMsg =
          error?.message || "Error al enviar el correo de recuperación.";
        setApiError(errorMsg);
      } finally {
        dispatch(setLoading({ loading: false, message: "" }));
      }
    },
    [dispatch, email]
  );

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const disableButtonTemporarily = () => {
    setButtonDisabled(true);
    setSecondsLeft(60);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setButtonDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <>
      <AuthFormWrapper title="Restablecer contraseña" variant={"login"}>
        {message && <Message type="success" message={message} />}
        {apiError && <Message type="error" message={apiError.message} />}
        <form onSubmit={handleSubmit} className="auth form">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Correo electrónico"
            className="input"
            required
          />

          <div className="section-button">
            <Button type="submit" variant="primary" disabled={buttonDisabled}>
              {buttonDisabled
                ? `Vuelve a enviar dentro de ${formatTime(secondsLeft)}`
                : "Enviar correo de recuperación"}
            </Button>

            <Link to="/v1/login" className="btn-link-wrapper">
              <Button variant="outline">Volver al login</Button>
            </Link>
          </div>
        </form>
      </AuthFormWrapper>
    </>
  );
};

export default ResetPasswordPage;
