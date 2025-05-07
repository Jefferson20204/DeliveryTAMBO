import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { resetPasswordAPI } from "../../../api/authentication";
import Button from "../../../components/common/Buttons/Button";
import AuthFormWrapper from "../AuthFormWrapper";
import Input from "../../../components/common/Input/Input";
import Message from "../../../components/common/Message/Message";
import "../AuthStyles.css";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      dispatch(
        setLoading({ loading: true, message: "Cambiando contraseña..." })
      );
      resetPasswordAPI(token, password)
        .then(() => {
          setMessage("Contraseña restablecida correctamente.");
          setTimeout(() => navigate("/v1/login"), 2000);
        })
        .catch(() => {
          setError("Error al restablecer la contraseña.");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [token, password, dispatch, navigate]
  );

  return (
    <>
      <AuthFormWrapper title="Restablecer contraseña">
        {error && <Message type="error" message={error} />}
        {message ? (
          <Message type="success" message={message} />
        ) : (
          <form onSubmit={onSubmit} className="form">
            <Input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />

            <div className="section-button">
              <Button type="submit" variant="primary">
                Cambiar contraseña
              </Button>
            </div>
          </form>
        )}
      </AuthFormWrapper>
    </>
  );
};

export default ResetPassword;
