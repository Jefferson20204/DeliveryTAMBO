import React from "react";
import Button from "./Button";
import GoogleLogo from "../../../assets/img/Icons/Google.png";
import { API_BASE_URL } from "../../../api/constant";

const GoogleSignIn = () => {
  const handleClick = () => {
    window.location.href = API_BASE_URL + "/oauth2/authorization/google";
  };

  return (
    <Button onClick={handleClick} variant="google" icon={GoogleLogo}>
      Continuar con Google
    </Button>
  );
};

export default GoogleSignIn;
