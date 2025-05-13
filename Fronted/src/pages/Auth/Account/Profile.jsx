import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectUserInfo,
  selectIsUserAdmin,
} from "../../../store/features/user";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);

  return (
    <>
      <h1>Información</h1>
      <div>
        {isUserAdmin && (
          <div className="text-right">
            <Link to={"/admin/products"} className="link">
              Panel de administrador
            </Link>
          </div>
        )}
        <div>
          <h2>Detalles de contacto</h2>
        </div>
        <div>
          <p>Nombre</p>
          <p>
            {userInfo?.firstName} {userInfo?.lastName}
          </p>
          <p>Número telefónico</p>
          <p>{userInfo?.phoneNumber ?? "None"}</p>
          <p>Email</p>
          <p>{userInfo?.email}</p>
          <p>Roles</p>
          <ul>
            {userInfo?.authorityList?.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
