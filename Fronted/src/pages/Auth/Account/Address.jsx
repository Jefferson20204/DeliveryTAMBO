import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "../../../components/Card/Card";
import { deleteAddressAPI } from "../../../api/userInfo";
import { setLoading } from "../../../store/features/common";
import Button from "../../../components/Buttons/Button";
import AddAddressModal from "./AddAddressModal";
import { fetchUserAddress } from "../../../api/userInfo";
import DeleteIcon from "../../../common/DeleteIcon";
import "./Address.css";

const Address = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = useCallback(() => {
    dispatch(
      setLoading({
        loading: true,
        message: "Cargando direcciones...",
      })
    );

    const fetchData = fetchUserAddress().then((res) => {
      setAddresses(res);
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

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Eliminar direccion
  const onDeleteAddress = useCallback(
    (id) => {
      dispatch(setLoading(true));
      deleteAddressAPI(id)
        .then((res) => {
          // Actualizar las direcciones después de eliminar
          fetchAddresses();
        })
        .catch((err) => {
          console.error("Error al eliminar dirección:", err);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, fetchAddresses]
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
        {addresses?.length > 0 ? (
          <div className="addresses-container">
            {addresses?.map((address, index) => (
              <div key={index} className="address-item">
                <div className="address-content">
                  <p className="address-text">{address.address}</p>
                  {address.id && (
                    <p className="address-details">{address.id}</p>
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

        <AddAddressModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onSuccess={fetchAddresses}
        />
      </Card>
    </>
  );
};

export default Address;
