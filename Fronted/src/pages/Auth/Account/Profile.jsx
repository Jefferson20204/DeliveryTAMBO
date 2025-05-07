import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../store/features/user";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="m-1">
      <h1>Información</h1>
      <div>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
