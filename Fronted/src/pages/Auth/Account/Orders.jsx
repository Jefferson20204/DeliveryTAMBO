import { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/features/common";
import { fetchOrderAPI, cancellingOrderAPI } from "../../../api/userInfo";
import { loadOrders, selectAllOrders } from "../../../store/features/user";
import Card from "../../../components/Card/Card";
import Timeline from "../../../components/Timeline/Timeline";
import { getStepCount } from "../../../utils/order-util";

// Función reutilizable para formatear fechas
const formatDate = (dateString) => {
  if (!dateString) return "No disponible";

  const date = new Date(dateString);
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter, setSelectedFilter] = useState("ACTIVE");
  const [cancellingId, setCancellingId] = useState(null); // Para manejar estado de cancelación por pedido

  const fetchOrders = useCallback(async () => {
    dispatch(setLoading({ loading: true, message: "Cargando pedidos..." }));

    try {
      const res = await fetchOrderAPI();
      dispatch(loadOrders(res));
    } catch (err) {
      console.error("Error al cargar pedidos:", err);
      // Aquí podrías mostrar un toast/notificación al usuario
    } finally {
      dispatch(setLoading({ loading: false, message: "" }));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filtra y transforma los pedidos solo cuando allOrders cambia
  const orders = useMemo(() => {
    return (
      allOrders?.map((order) => ({
        id: order?.id,
        orderDate: order?.orderDate,
        orderStatus: order?.orderStatus,
        expectedDeliveryDate: order?.expectedDeliveryDate,
        status: ["PENDING", "IN_PROGRESS", "SHIPPED", "PAID"].includes(
          order?.orderStatus
        )
          ? "ACTIVE"
          : order?.orderStatus === "DELIVERED"
          ? "COMPLETED"
          : order?.orderStatus,
        items: order?.orderItemList?.map((orderItem) => ({
          id: orderItem?.id,
          name: orderItem?.product?.name,
          price: orderItem?.product?.price,
          quantity: orderItem?.quantity,
          url: orderItem?.product?.resources?.[0]?.url,
          slug: orderItem?.product?.slug,
        })),
        totalAmount: order?.totalAmount,
      })) || []
    );
  }, [allOrders]);

  // Cancelar pedido con manejo de estado individual
  const onCancellOrder = useCallback(
    async (id) => {
      setCancellingId(id);
      dispatch(setLoading({ loading: true, message: "Cancelando pedido..." }));

      try {
        await cancellingOrderAPI(id);
        await fetchOrders(); // Refrescar la lista
      } catch (err) {
        console.error("Error al cancelar pedido:", err);
      } finally {
        setCancellingId(null);
        dispatch(setLoading({ loading: false, message: "" }));
      }
    },
    [dispatch, fetchOrders]
  );

  const handleOnChange = useCallback((evt) => {
    setSelectedFilter(evt.target.value);
  }, []);

  // Filtrar pedidos según el filtro seleccionado
  const filteredOrders = useMemo(
    () => orders.filter((order) => order?.status === selectedFilter),
    [orders, selectedFilter]
  );

  return (
    <Card title={"Mis pedidos"}>
      {orders.length > 0 && (
        <div className="addresses-container">
          <div className="flex justify-between">
            <select
              className="border-2 rounded-lg mb-4 p-2"
              value={selectedFilter}
              onChange={handleOnChange}
            >
              <option value="ACTIVE">Activos</option>
              <option value="CANCELLED">Cancelados</option>
              <option value="COMPLETED">Completados</option>
            </select>
          </div>

          {filteredOrders.length === 0 ? (
            <p>
              No hay pedidos{" "}
              {selectedFilter === "ACTIVE"
                ? "activos"
                : selectedFilter === "CANCELLED"
                ? "cancelados"
                : "completados"}
              .
            </p>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="address-item">
                <div className="address-content">
                  <p className="address-text">Orden N°: {order.id}</p>
                  <p className="address-details">
                    Fecha: {formatDate(order.orderDate)}
                  </p>
                  <p className="address-details">
                    Fecha de entrega estimada:{" "}
                    {formatDate(order.expectedDeliveryDate)}
                  </p>

                  {order.orderStatus !== "CANCELLED" && (
                    <Timeline stepCount={getStepCount[order.orderStatus]} />
                  )}
                </div>

                {order.orderStatus !== "CANCELLED" &&
                  getStepCount[order.orderStatus] <= 2 && (
                    <button
                      onClick={() => onCancellOrder(order.id)}
                      className="delete-button"
                      disabled={cancellingId === order.id}
                      aria-label="Cancelar pedido"
                    >
                      {cancellingId === order.id ? "Cancelando..." : "Cancelar"}
                    </button>
                  )}
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  );
};

export default Orders;
