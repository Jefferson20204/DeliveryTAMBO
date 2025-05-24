import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { fetchUserDetails } from "../../../api/userInfo";
import { loadUserInfo, selectUserInfo } from "../../../store/features/user";

const Account = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  return (
    <div className="m-1">
      {userInfo?.email && (
        <>
          <p>Hola, {userInfo?.firstName}</p>
          <p>Bienvenido a tu cuenta</p>
          <div>
            <ul>
              <li>
                <NavLink to={"/account-details/profile"} className={"link"}>
                  Perfil
                </NavLink>
              </li>
              <li>
                <NavLink to={"/account-details/settings"} className={"link"}>
                  Ajustes
                </NavLink>
              </li>
            </ul>
            <div>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
