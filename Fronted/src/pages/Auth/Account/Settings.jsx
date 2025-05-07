import React, { useCallback } from "react";
import { logOut } from "../../../utils/jwt-helper";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const onLogOut = useCallback(() => {
    logOut();
    navigate("/");
  }, [navigate]);
  return (
    <div>
      <button className="btn btn-outline" onClick={onLogOut}>
        Cerrar cesión
      </button>
    </div>
  );
};

export default Settings;
