import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PayPalButton from "../../components/Buttons/PayPalButton";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Buttons/Button";
import Card from "../../components/Card/Card";
import { clearCart } from "../../store/actions/cartAction";
import { setLoading } from "../../store/features/common";
import { confirmPayPalPayment } from "../../api/paymentApi";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartState.cart);

  const {
    orderId,
    paymentMethod,
    totalToPay,
    totalProducts,
    totalDiscount,
    deliveryMethod,
    tipAmount,
  } = location.state || {};
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      navigate("/cart");
    }
  }, [orderId, navigate]);

  const handlePayPalSuccess = async (paymentData) => {
    try {
      dispatch(
        setLoading({
          loading: true,
          message: "Confirmando transacción...",
        })
      );
      setError(null);

      const response = await confirmPayPalPayment(orderId, paymentData.orderID);

      if (response.status !== "success") {
        throw new Error(response.message || "Error al confirmar pago");
      }

      dispatch(clearCart()); // Eliminamos todos los productos del carrito en el Local Storage
      setPaymentCompleted(true);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);

      if (error.message.includes("ORDER_ALREADY_CAPTURED")) {
        setError(
          "Este pago ya fue procesado anteriormente. Verifica tu historial de pedidos."
        );
      }
    } finally {
      dispatch(
        setLoading({
          loading: false,
          message: "",
        })
      );
    }
  };

  return (
    <div className="px-auto py-auto">
      <Card title="Resumen de tu pedido">
        <h3>Orden #: {orderId}</h3>
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item-row" key={item.id}>
              <div className="cart-item-image">
                <img
                  src={item.thumbnail || "/default-thumbnail.jpg"}
                  alt={item.name}
                />
              </div>

              <div className="cart-item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-quantity">Cantidad: {item.quantity}</p>
              </div>

              <div className="cart-item-prices">
                <p className="item-price-descuento">
                  S/ {(item.price * item.quantity).toFixed(2)}
                </p>
                {item.price < item.priceOriginal && (
                  <p className="item-price-original">
                    S/ {(item.priceOriginal * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-item">
            <span>Total de productos:</span>
            <span>S/ {totalProducts.toFixed(2)}</span>
          </div>

          <div className="summary-item">
            <span>Total descuento:</span>
            <span>- S/ {totalDiscount.toFixed(2)}</span>
          </div>

          <div className="summary-item">
            <span>Precio por despacho:</span>
            <span>S/ {deliveryMethod}</span>
          </div>

          {tipAmount > 0 && (
            <div className="summary-item">
              <span>Propina:</span>
              <span>S/ {tipAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-item total">
            <span>Total a pagar:</span>
            <span>S/ {totalToPay.toFixed(2)}</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {paymentMethod === "PAYPAL" && !paymentCompleted ? (
          <div className="payment-section">
            <PayPalButton
              amount={totalToPay}
              currency="USD"
              onApprove={handlePayPalSuccess}
              onError={(err) =>
                setError("Error en el pago con PayPal: " + err.message)
              }
            />
          </div>
        ) : paymentCompleted ? (
          <div className="success-message">
            <h3>¡Pago completado con éxito!</h3>
            <Button onClick={() => navigate("/account-details/orders")}>
              Ver mis pedidos
            </Button>
          </div>
        ) : (
          <Button onClick={() => navigate("/cart")}>Volver al carrito</Button>
        )}
      </Card>
    </div>
  );
};

export default CheckoutPage;
