import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card/Card";
import AddAddress from "./AddAddress";
import { deleteAddressAPI } from "../../../api/userInfo";
import { removeAddress, selectUserInfo } from "../../../store/features/user";
import { setLoading } from "../../../store/features/common";

const Address = () => {
  const [addAddress, setAddAddress] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  // Eliminar direccion
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
      {" "}
      {/* Direcciones */}
      <Card type="form" title={"Mis Direcciones"}>
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
      </Card>
    </>
  );
};

export default Address;
