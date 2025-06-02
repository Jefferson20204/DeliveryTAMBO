import { useState } from "react";
import { useSelector } from "react-redux";
import {
  removeAddress,
  selectUserInfo,
  selectIsUserAdmin,
} from "../../store/features/user";
import "./CartPage.css";
import Button from "../../components/Buttons/Button";

const DELIVERY_FEE = 5.0;

const CartPage = () => {
  const cartItems = useSelector((state) => state.cartState.cart);
  const userInfo = useSelector(selectUserInfo);

  const [paymentMethod, setPaymentMethod] = useState(""); // "paypal" o "yape"
  const [invoiceType, setInvoiceType] = useState("boleta"); // "boleta" o "factura"
  const [docType, setDocType] = useState("DNI");
  const [docNumber, setDocNumber] = useState("");
  const [businessName, setBusinessName] = useState(""); // solo factura
  const [billingAddress, setBillingAddress] = useState(""); // solo factura
  const [tipOption, setTipOption] = useState("none"); // none, percent, manual
  const [tipPercent, setTipPercent] = useState(10);
  const [tipManual, setTipManual] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // "store" o "delivery"
  const [selectedStore, setSelectedStore] = useState("Tienda Central");
  const [deliveryAddress, setDeliveryAddress] = useState(
    userInfo?.addressList?.[0] || null
  );

  // Total sin descuentos: cantidad * precio original
  const totalProducts = cartItems.reduce(
    (sum, item) => sum + item.priceOriginal * item.quantity,
    0
  );

  // Total de descuentos: cantidad * (precio original - precio con descuento) si tiene descuento
  const totalDiscount = cartItems.reduce((sum, item) => {
    if (item.price && item.price < item.priceOriginal) {
      const discountAmount = (item.priceOriginal - item.price) * item.quantity;
      return sum + discountAmount;
    }
    return sum;
  }, 0);

  // Total a pagar: suma de los subtotales reales con descuento + envío
  const totalWithDiscount = cartItems.reduce(
    (sum, item) => sum + item.subTotal, // subTotal real pagado
    0
  );

  const tipAmount =
    tipOption === "percent"
      ? (totalWithDiscount * tipPercent) / 100
      : tipOption === "manual"
      ? parseFloat(tipManual || 0)
      : 0;

  // const totalToPay = totalWithDiscount + DELIVERY_FEE;

  const totalToPay =
    totalWithDiscount +
    (deliveryMethod === "delivery" ? DELIVERY_FEE : 0) +
    tipAmount;

  return (
    <>
      {!userInfo ? (
        <div className="login-required">
          <p>Debes iniciar sesión para completar tu compra.</p>
          <button onClick={() => (window.location.href = "/login")}>
            Iniciar Sesión
          </button>
        </div>
      ) : (
        <div className="checkout-form">
          <h3>1. Método de pago *</h3>
          <label>
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              value="yape"
              checked={paymentMethod === "yape"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Yape
          </label>

          <h3>2. Datos para facturación *</h3>
          <label>
            Tipo de comprobante:
            <select
              value={invoiceType}
              onChange={(e) => setInvoiceType(e.target.value)}
            >
              <option value="boleta">Boleta</option>
              <option value="factura">Factura</option>
            </select>
          </label>

          <label>
            Tipo de documento:
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="DNI">DNI</option>
              <option value="CE">Carnet de extranjería</option>
              <option value="RUC">RUC</option>
            </select>
          </label>

          <label>
            Número de documento:
            <input
              type="text"
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
            />
          </label>

          {invoiceType === "factura" && (
            <>
              <label>
                Nombre / Razón Social:
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </label>

              <label>
                Dirección fiscal:
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              </label>
            </>
          )}

          <h3>3. Propina</h3>
          <select
            value={tipOption}
            onChange={(e) => setTipOption(e.target.value)}
          >
            <option value="none">Sin propina</option>
            <option value="percent">Porcentaje</option>
            <option value="manual">Monto manual</option>
          </select>
          {tipOption === "percent" && (
            <input
              type="number"
              value={tipPercent}
              min="0"
              max="100"
              onChange={(e) => setTipPercent(parseInt(e.target.value))}
            />
          )}
          {tipOption === "manual" && (
            <input
              type="number"
              value={tipManual}
              min="0"
              onChange={(e) => setTipManual(e.target.value)}
            />
          )}

          <h3>4. Método de entrega *</h3>
          <label>
            <input
              type="radio"
              value="store"
              checked={deliveryMethod === "store"}
              onChange={() => setDeliveryMethod("store")}
            />
            Recoger en tienda
          </label>
          <label>
            <input
              type="radio"
              value="delivery"
              checked={deliveryMethod === "delivery"}
              onChange={() => setDeliveryMethod("delivery")}
            />
            Delivery
          </label>

          {deliveryMethod === "store" && (
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option>Tienda Central</option>
              <option>Tienda Surquillo</option>
              <option>Tienda San Miguel</option>
            </select>
          )}

          {deliveryMethod === "delivery" && (
            <>
              {userInfo.addressList?.length > 0 ? (
                <div className="delivery-address">
                  <p>Última dirección:</p>
                  <p>
                    {deliveryAddress.street} {deliveryAddress.number},{" "}
                    {deliveryAddress.district}, {deliveryAddress.province}
                  </p>
                  <button
                    onClick={() =>
                      alert("Funcionalidad para cambiar dirección")
                    }
                  >
                    Cambiar dirección
                  </button>
                </div>
              ) : (
                <p>
                  No tienes una dirección registrada. Añádela desde tu perfil.
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className="cart-page">
        <h2>Resumen del Carrito</h2>

        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item-row" key={item.id}>
              {/* Imagen */}
              <div className="cart-item-image">
                <img
                  src={item.thumbnail || "/default-thumbnail.jpg"}
                  alt={item.name}
                />
              </div>

              {/* Nombre y cantidad */}
              <div className="cart-item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-quantity">Cantidad: {item.quantity}</p>
              </div>

              {/* Precios */}
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
            <span>S/ {DELIVERY_FEE.toFixed(2)}</span>
          </div>

          <div className="summary-item total">
            <span>Total a pagar:</span>
            <span>S/ {totalToPay.toFixed(2)}</span>
          </div>
        </div>

        <Button>Pagar ahora</Button>

        {/* Próximamente: dirección y método de pago */}
      </div>
    </>
  );
};

export default CartPage;
