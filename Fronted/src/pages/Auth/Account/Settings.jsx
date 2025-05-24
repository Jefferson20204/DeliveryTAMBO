import { useCallback } from "react";
import { logOut } from "../../../utils/jwt-helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../../../store/features/user";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    logOut();
    dispatch(clearUserInfo());
    navigate("/");
  }, [navigate, dispatch]);

  return (
    <div>
      <button className="btn btn-outline" onClick={onLogOut}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Settings;
