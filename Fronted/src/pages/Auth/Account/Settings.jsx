import { useCallback } from "react";
import { logOut } from "../../../utils/jwt-helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../../../store/features/user";
import Button from "../../../components/Buttons/Button";
import Card from "../../../components/Card/Card";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    logOut();
    dispatch(clearUserInfo());
    navigate("/");
  }, [navigate, dispatch]);

  return (
    <>
      <Card title={"Ajustes"}>
        <Button variant="outline" onClick={onLogOut}>
          Cerrar sesión
        </Button>
      </Card>
    </>
  );
};

export default Settings;
