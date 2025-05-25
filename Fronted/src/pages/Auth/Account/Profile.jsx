import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddAddress from "./AddAddress";
import { deleteAddressAPI } from "../../../api/userInfo";
import {
  removeAddress,
  selectUserInfo,
  selectIsUserAdmin,
} from "../../../store/features/user";
import { setLoading } from "../../../store/features/common";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);
  const [addAddress, setAddAddress] = useState(false);

  const dispatch = useDispatch();

  const onDeleteAddress = useCallback(
    (id) => {
      dispatch(setLoading(true));
      deleteAddressAPI(id)
        .then((res) => {
          dispatch(removeAddress(id));
        })
        .catch((err) => {})
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch]
  );

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
          <p>Ubicaciones</p>
          <button onClick={() => setAddAddress(true)}>Add New</button>
          {!addAddress && (
            <ul>
              {userInfo?.addressList?.map((address, index) => (
                <li key={index}>
                  {address.street} - {address.district}
                  <button
                    onClick={() => onDeleteAddress(address?.id)}
                    className="underline text-blue-900"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {addAddress && <AddAddress onCancel={() => setAddAddress(false)} />}
        </div>
      </div>
    </>
  );
};

export default Profile;
