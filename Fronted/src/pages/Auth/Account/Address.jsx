import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card/Card";
import { deleteAddressAPI } from "../../../api/userInfo";
import {
  loadUserInfo,
  removeAddress,
  selectUserInfo,
} from "../../../store/features/user";
import { setLoading } from "../../../store/features/common";
import Button from "../../../components/Buttons/Button";
import AddAddressModal from "./AddAddressModal";
import { fetchUserDetails } from "../../../api/userInfo";
import DeleteIcon from "../../../common/DeleteIcon";
import "./Address.css";

const Address = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(
      setLoading({
        loading: true,
        message: "Cargando direcciones...",
      })
    );

    const fetchData = fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .catch((err) => {
        console.log(err);
      });

    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));

    Promise.all([fetchData, minDelay]).finally(() => {
      dispatch(
        setLoading({
          loading: false,
          message: "",
        })
      );
    });
  }, [dispatch]);

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
      <Card
        type="form"
        title={"Mis Direcciones"}
        buttons={
          <Button
            variant="primary"
            fullWidth={false}
            onClick={() => setShowModal(true)}
          >
            Agregar nueva dirección
          </Button>
        }
      >
        {userInfo.addressList?.length > 0 ? (
          <div className="addresses-container">
            {userInfo?.addressList?.map((address, index) => (
              <div key={index} className="address-item">
                <div className="address-content">
                  <p className="address-text">{address.address}</p>
                  {address.additionalDetails && (
                    <p className="address-details">
                      {address.additionalDetails}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onDeleteAddress(address?.id)}
                  className="delete-button"
                  aria-label="Eliminar dirección"
                >
                  <DeleteIcon size={20} className="delete-button" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-addresses">No tienes una dirección registrada.</p>
        )}

        <AddAddressModal show={showModal} onHide={() => setShowModal(false)} />
      </Card>
    </>
  );
};

export default Address;
