import { useCallback, useState, useEffect } from "react";
<<<<<<< HEAD
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
=======
import { useDispatch } from "react-redux";
import Card from "../../../components/Card/Card";
import { deleteAddressAPI } from "../../../api/userInfo";
import { setLoading } from "../../../store/features/common";
import Button from "../../../components/Buttons/Button";
import AddAddressModal from "./AddAddressModal";
import { fetchUserAddress } from "../../../api/userInfo";
import "./Address.css";

const Address = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = useCallback(() => {
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    dispatch(
      setLoading({
        loading: true,
        message: "Cargando direcciones...",
      })
    );

<<<<<<< HEAD
    const fetchData = fetchUserDetails()
      .then((res) => {
        dispatch(loadUserInfo(res));
      })
      .catch((err) => {
        console.log(err);
      });
=======
    const fetchData = fetchUserAddress().then((res) => {
      setAddresses(res);
    });
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

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

<<<<<<< HEAD
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
=======
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Eliminar direccion
  const onDeleteAddress = useCallback(
    (id) => {
      dispatch(
        setLoading({
          loading: true,
          message: "Eliminando direccion...",
        })
      );
      deleteAddressAPI(id)
        .then((res) => {
          // Actualizar las direcciones después de eliminar
          fetchAddresses();
        })
        .catch((err) => {
          console.error("Error al eliminar dirección:", err);
        })
        .finally(() => {
          dispatch(
            setLoading({
              loading: false,
              message: "",
            })
          );
        });
    },
    [dispatch, fetchAddresses]
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
        {userInfo.addressList?.length > 0 ? (
          <div className="addresses-container">
            {userInfo?.addressList?.map((address, index) => (
              <div key={index} className="address-item">
                <div className="address-content">
                  <p className="address-text">{address.address}</p>
                  {address.additionalDetails && (
                    <p className="address-details">
                      {address.additionalDetails}
=======
        {addresses?.length > 0 ? (
          <div className="addresses-container">
            {addresses?.map((address, index) => (
              <div key={index} className="address-item">
                <div className="address-content">
                  <p className="address-text">{address.address}</p>
                  {address.id && (
                    <p className="address-details">
                      {address.district}, {address.city}
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onDeleteAddress(address?.id)}
                  className="delete-button"
                  aria-label="Eliminar dirección"
                >
<<<<<<< HEAD
                  <DeleteIcon size={20} className="delete-button" />
=======
                  <i className="fa-solid fa-trash delete-button"></i>
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-addresses">No tienes una dirección registrada.</p>
        )}

<<<<<<< HEAD
        <AddAddressModal show={showModal} onHide={() => setShowModal(false)} />
=======
        <AddAddressModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onSuccess={fetchAddresses}
        />
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
      </Card>
    </>
  );
};

export default Address;
