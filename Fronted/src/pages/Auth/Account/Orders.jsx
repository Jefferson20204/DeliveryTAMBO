import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { fetchOrderAPI } from "../../../api/userInfo";
import { loadOrders, selectAllOrders } from "../../../store/features/user";
import Card from "../../../components/Card/Card";

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [orders, setOrders] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("ACTIVE");

  useEffect(() => {
    dispatch(
      setLoading({
        loading: true,
        message: "Cargando pedidos...",
      })
    );

    const fetchData = fetchOrderAPI()
      .then((res) => {
        dispatch(loadOrders(res));
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

  useEffect(() => {
    const displayOrders = [];
    allOrders?.map((order) => {
      displayOrders.push({
        id: order?.id,
        orderDate: order?.orderDate,
        orderStatus: order?.orderStatus,
        status:
          order?.orderStatus === "PENDING" ||
          order?.orderStatus === "IN_PROGRESS" ||
          order?.orderStatus === "SHIPPED" ||
          order?.orderStatus === "PAID"
            ? "ACTIVE"
            : order?.orderStatus === "DELIVERED"
            ? "COMPLETED"
            : order?.orderStatus,
        items: order?.orderItemList?.map((orderItem) => {
          return {
            id: orderItem?.id,
            name: orderItem?.product?.name,
            price: orderItem?.product?.price,
            quantity: orderItem?.quantity,
            url: orderItem?.product?.resources?.[0]?.url,
            slug: orderItem?.product?.slug,
          };
        }),
        totalAmount: order?.totalAmount,
      });
    });
    setOrders(displayOrders);
  }, [allOrders]);

  const handleOnChange = useCallback((evt) => {
    const value = evt?.target?.value;
    setSelectedFilter(value);
  }, []);

  return (
    <>
      <Card title={"Mis pedidos"}>
        {orders?.length > 0 && (
          <div className="addresses-container">
            <div className="flex justify-between">
              <select
                className="border-2 rounded-lg mb-4 p-2"
                value={selectedFilter}
                onChange={handleOnChange}
              >
                <option value={"ACTIVE"}>Active</option>
                <option value={"CANCELLED"}>Cancelled</option>
                <option value={"COMPLETED"}>Completed</option>
              </select>
            </div>
            {orders?.map((order, index) => {
              return (
                order?.status === selectedFilter && (
                  <div key={index} className="address-item">
                    <div className="address-content">
                      <p className="address-text">COD: {order.id}</p>
                      <p className="address-details">
                        {""}
                        {(() => {
                          const date = new Date(order?.orderDate);
                          const day = date
                            .getDate()
                            .toString()
                            .padStart(2, "0");
                          const month = (date.getMonth() + 1)
                            .toString()
                            .padStart(2, "0"); // enero = 0
                          const year = date.getFullYear();
                          const hours = date
                            .getHours()
                            .toString()
                            .padStart(2, "0");
                          const minutes = date
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");

                          return `${day}/${month}/${year} ${hours}:${minutes}`;
                        })()}
                      </p>
                    </div>
                    <button
                      // onClick={() => onDeleteAddress(address?.id)}
                      className="delete-button"
                      aria-label="Eliminar dirección"
                    >
                      <i class="fa-solid fa-trash delete-button"></i>
                    </button>
                  </div>
                )
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
};

export default Orders;
