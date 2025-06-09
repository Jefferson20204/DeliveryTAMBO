import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserInfo, loadUserInfo } from "../../store/features/user";
import Button from "../../components/Buttons/Button";
import Card from "../../components/Card/Card";
import AddAddressModal from "../Auth/Account/AddAddressModal";
import { countCartItems } from "../../store/features/cart";
import { createOrderRequest } from "../../utils/order-util";
import { placeOrderAPI } from "../../api/orderApi";
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";
import AddressIcon from "../../common/AddressIcon";
import { logOut } from "../../utils/jwt-helper";
import { fetchUserAddress } from "../../api/userInfo";
import "./CartPage.css";

const DELIVERY_FEE = 5.0;

const CartPage = () => {
  const cartItems = useSelector((state) => state.cartState.cart);
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const totalItems = useSelector(countCartItems);
  const dispatch = useDispatch();

  // DATOS DEL PEDIDO
  const [paymentMethod, setPaymentMethod] = useState(""); // "paypal" o "yape"
  const [invoiceType, setInvoiceType] = useState("boleta"); // "boleta" o "factura"
  const [docType, setDocType] = useState("DNI");
  const [docNumber, setDocNumber] = useState("");
  const [businessName, setBusinessName] = useState(""); // solo factura
  const [billingAddress, setBillingAddress] = useState(""); // solo factura
  const [tipOption, setTipOption] = useState("none"); // none, percent, manual
  const [tipPercent, setTipPercent] = useState(10);
  const [tipManual, setTipManual] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // "store" o "delivery"
  const [selectedStore, setSelectedStore] = useState("Tienda Central");
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const [errors, setErrors] = useState({}); // Mensaje de errores

  const fetchAddresses = useCallback(() => {
    dispatch(
      setLoading({
        loading: true,
        message: "Cargando carrito...",
      })
    );

    const fetchData = fetchUserAddress()
      .then((res) => {
        setDeliveryAddress(res[0] || null);
      })
      .catch((err) => {
        console.log(err);
        logOut(); // borramos usuarios del local storage
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

  // Validación de campos obligatorios
  const validateForm = () => {
    const newErrors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = "Seleccione un método de pago";
    }

    if (!docNumber) {
      newErrors.docNumber = "Ingrese su número de documento";
    } else if (docType === "DNI" && !validateDNI(docNumber)) {
      newErrors.docNumber = "El DNI debe tener 8 dígitos";
    } else if (docType === "CE" && !/^[0-9]{9}$/.test(docNumber)) {
      newErrors.docNumber = "El Carnet de Extranjería debe tener 9 dígitos";
    } else if (docType === "RUC" && !/^[0-9]{11}$/.test(docNumber)) {
      newErrors.docNumber = "El RUC debe tener 11 dígitos";
    }

    if (invoiceType === "factura") {
      if (!businessName) {
        newErrors.businessName = "Ingrese razón social";
      }
      if (!billingAddress) {
        newErrors.billingAddress = "Ingrese dirección fiscal";
      }
    }

    if (!deliveryMethod) {
      newErrors.deliveryMethod = "Seleccione método de entrega";
    } else if (deliveryMethod === "delivery" && !deliveryAddress) {
      newErrors.deliveryAddress = "Seleccione una dirección de entrega";
    }

    if (tipOption === "manual" && (isNaN(tipManual) || tipManual < 1)) {
      newErrors.tipManual = "La propina mínima es S/1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Accion del boton Pagar ahora
  const handlePayment = async () => {
    try {
      if (!validateForm()) {
        alert("Ingrese todos los datos obligatorios");
        return;
      }

      dispatch(
        setLoading({
          loading: true,
          message: "Verificando información...",
        })
      );

      // objeto con los datos del pedido
      const orderRequest = createOrderRequest(
        cartItems,
        deliveryMethod,
        totalToPay,
        deliveryMethod === "delivery" ? deliveryAddress.latitude : null,
        deliveryMethod === "delivery" ? deliveryAddress.longitude : null,
        paymentMethod,
        totalDiscount,
        invoiceType,
        docType,
        docNumber,
        billingAddress,
        businessName
      );

      console.log("Order request:", JSON.stringify(orderRequest, null, 2)); // Imprimir orden ha enviar
      const response = await placeOrderAPI(orderRequest); // Guarda orden en la base de datos con estado: PENDIENTE
      console.log("Order created successfully:", response); // Imprime los datos: {orderId, paymentMethod}

      // Redirige al checkout con los datos de la orden
      navigate("/checkout", {
        state: {
          orderId: response.orderId,
          paymentMethod: response.paymentMethod,
          totalProducts: totalProducts, // subtotal de los precios de solo los productos
          totalDiscount: totalDiscount, // total de descuentos
          deliveryMethod:
            deliveryMethod === "delivery" ? DELIVERY_FEE.toFixed(2) : 0,
          tipAmount: tipAmount,
          totalToPay: totalToPay, // Envía el total calculado
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      dispatch(
        setLoading({
          loading: false,
          message: "",
        })
      );
    }
  };

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
    (sum, item) => sum + item.subTotal,
    0
  );

  const tipAmount =
    tipOption === "percent"
      ? (totalWithDiscount * tipPercent) / 100
      : tipOption === "manual"
      ? parseFloat(tipManual || 0)
      : 0;

  const totalToPay =
    totalWithDiscount +
    (deliveryMethod === "delivery" ? DELIVERY_FEE : 0) +
    tipAmount;

  const validateDNI = (dni) => {
    // Expresión regular para exactamente 8 dígitos
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(dni);
  };

  return (
    <>
      <main className="main-content">
        {totalItems > 0 ? (
          <div className="cart-container">
            <div className="cart-column">
              {!userInfo.email ? (
                <Card
                  type="form"
                  title={"Datos requeridos"}
                  buttons={
                    <Button
                      fullWidth={false}
                      onClick={() => navigate("/v1/login")}
                    >
                      Iniciar Sesión
                    </Button>
                  }
                >
                  <p>Debes iniciar sesión para completar tu compra.</p>
                </Card>
              ) : (
                <div className="checkout-form">
                  {/* Método de pago con nuevos estilos */}
                  <Card title={"Método de pago *"}>
                    {errors.paymentMethod && (
                      <p className="error-message">{errors.paymentMethod}</p>
                    )}
                    <div className="payment-methods">
                      <label
                        className={`payment-option ${
                          paymentMethod === "paypal" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          onBlur={() => {
                            if (!paymentMethod) {
                              setErrors({
                                ...errors,
                                paymentMethod: "Seleccione un método de pago",
                              });
                            } else {
                              const { paymentMethod: _, ...rest } = errors;
                              setErrors(rest);
                            }
                          }}
                        />
                        <img
                          src="https://www.paypalobjects.com/marketing/web/logos/paypal-mark-color_new.svg"
                          alt="PayPal"
                          className="payment-logo"
                        />
                        <span>PayPal</span>
                      </label>
                      <label
                        className={`payment-option ${
                          paymentMethod === "yape" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="yape"
                          checked={paymentMethod === "yape"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          onBlur={() => {
                            if (!paymentMethod) {
                              setErrors({
                                ...errors,
                                paymentMethod: "Seleccione un método de pago",
                              });
                            } else {
                              const { paymentMethod: _, ...rest } = errors;
                              setErrors(rest);
                            }
                          }}
                        />
                        <img
                          src="https://www.tambo.pe/images/payment-methods/yape.png"
                          alt="Yape"
                          className="payment-logo"
                        />
                        <span>Yape</span>
                      </label>
                    </div>
                  </Card>

                  {/* Datos de facturación con nuevos estilos */}
                  <Card title={"Datos para facturación *"}>
                    <div className="invoice-options">
                      <label
                        className={`invoice-option ${
                          invoiceType === "boleta" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="invoiceType"
                          value="boleta"
                          checked={invoiceType === "boleta"}
                          onChange={(e) => setInvoiceType(e.target.value)}
                        />
                        Boleta
                      </label>
                      <label
                        className={`invoice-option ${
                          invoiceType === "factura" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="invoiceType"
                          value="factura"
                          checked={invoiceType === "factura"}
                          onChange={(e) => setInvoiceType(e.target.value)}
                        />
                        Factura
                      </label>
                    </div>

                    <div className="invoice-details">
                      <label className="form-label">
                        Tipo de documento:
                        <select
                          className="form-select"
                          value={docType}
                          onChange={(e) => setDocType(e.target.value)}
                        >
                          <option value="DNI">DNI</option>
                          <option value="CE">Carnet de extranjería</option>
                          <option value="RUC">RUC</option>
                        </select>
                      </label>
                      <label className="form-label">
                        Número de documento:
                        <input
                          className="form-input"
                          type="text"
                          value={docNumber}
                          onChange={(e) => {
                            // Solo permite números
                            const numericValue = e.target.value.replace(
                              /\D/g,
                              ""
                            );

                            // Limita según tipo de documento
                            let maxLength;
                            if (docType === "DNI") {
                              maxLength = 8;
                            } else if (docType === "RUC") {
                              maxLength = 11;
                            } else {
                              // Para CE u otros
                              maxLength = 12; // O el valor que consideres adecuado
                            }

                            setDocNumber(numericValue.slice(0, maxLength));
                          }}
                          onBlur={() => {
                            if (docType === "DNI" && docNumber.length !== 8) {
                              setErrors({
                                ...errors,
                                docNumber: "El DNI debe tener 8 dígitos",
                              });
                            } else if (
                              docType === "RUC" &&
                              docNumber.length !== 11
                            ) {
                              setErrors({
                                ...errors,
                                docNumber: "El RUC debe tener 11 dígitos",
                              });
                            } else {
                              const { docNumber: _, ...rest } = errors;
                              setErrors(rest);
                            }
                          }}
                        />
                        {errors.docNumber && (
                          <p className="error-message">{errors.docNumber}</p>
                        )}
                      </label>
                      {invoiceType === "factura" && (
                        <>
                          <label className="form-label">
                            Nombre / Razón Social:
                            <input
                              className="form-input"
                              type="text"
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                            />
                            {errors.businessName && (
                              <p className="error-message">
                                {errors.businessName}
                              </p>
                            )}
                          </label>
                          <label className="form-label">
                            Dirección fiscal:
                            <input
                              className="form-input"
                              type="text"
                              value={billingAddress}
                              onChange={(e) =>
                                setBillingAddress(e.target.value)
                              }
                            />
                            {errors.billingAddress && (
                              <p className="error-message">
                                {errors.billingAddress}
                              </p>
                            )}
                          </label>
                        </>
                      )}
                    </div>
                  </Card>

                  {/* Método de entrega con nuevos estilos */}
                  <Card title={"Método de entrega *"}>
                    {errors.deliveryMethod && (
                      <p className="error-message">{errors.deliveryMethod}</p>
                    )}
                    <div className="delivery-options">
                      <label
                        className={`delivery-option ${
                          deliveryMethod === "store" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="store"
                          checked={deliveryMethod === "store"}
                          onChange={() => setDeliveryMethod("store")}
                        />
                        Recoger en tienda
                      </label>
                      <label
                        className={`delivery-option ${
                          deliveryMethod === "delivery" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="delivery"
                          checked={deliveryMethod === "delivery"}
                          onChange={() => setDeliveryMethod("delivery")}
                        />
                        Delivery
                      </label>
                    </div>

                    <div className="delivery-details">
                      {deliveryMethod === "store" && (
                        <select
                          className="form-select"
                          value={selectedStore}
                          onChange={(e) => setSelectedStore(e.target.value)}
                        >
                          <option>TAMBO Los Olivos</option>
                          <option>TAMBO Surquillo</option>
                          <option>TAMBO San Miguel</option>
                        </select>
                      )}
                      {deliveryMethod === "delivery" && (
                        <>
                          {deliveryAddress ? (
                            <div className="address-container">
                              <div className="address-content">
                                <div className="address-icon">
                                  <AddressIcon />
                                </div>
                                <div className="address-info">
                                  <p className="address-title">
                                    Dirección de entrega
                                  </p>
                                  <p className="address-text">
                                    {deliveryAddress.address}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="change-address-btn"
                                onClick={() => setShowModal(true)}
                              >
                                Cambiar
                              </button>
                              {errors.deliveryAddress && (
                                <p className="error-message">
                                  {errors.deliveryAddress}
                                </p>
                              )}
                            </div>
                          ) : (
                            <button
                              className="change-address-btn"
                              onClick={() => setShowModal(true)}
                            >
                              Agregar dirección
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </Card>

                  <AddAddressModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onSuccess={fetchAddresses}
                  />

                  {deliveryMethod === "delivery" && (
                    <Card title={"Propina"}>
                      <h4>Propina para el repartidor</h4>
                      <p className="tip-description">
                        Las propinas les llegan 100% a los repartidores y pueden
                        incentivar a que más repartidores estén disponibles para
                        repartir tus pedidos
                      </p>
                      <div className="tip-options">
                        <label
                          className={`tip-option ${
                            tipOption === "none" ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipOption"
                            value="none"
                            checked={tipOption === "none"}
                            onChange={() => setTipOption("none")}
                          />
                          Sin propina
                        </label>
                        <label
                          className={`tip-option ${
                            tipOption === "percent" ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipOption"
                            value="percent"
                            checked={tipOption === "percent"}
                            onChange={() => setTipOption("percent")}
                          />
                          10%
                        </label>
                        <label
                          className={`tip-option ${
                            tipOption === "manual" ? "selected" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipOption"
                            value="manual"
                            checked={tipOption === "manual"}
                            onChange={() => setTipOption("manual")}
                          />
                          Otro monto
                        </label>
                      </div>
                      {tipOption === "percent" && (
                        <div className="tip-percent-input">
                          <input
                            type="range"
                            min="0"
                            max="20"
                            step="5"
                            value={tipPercent}
                            onChange={(e) =>
                              setTipPercent(parseInt(e.target.value))
                            }
                          />
                          <span>{tipPercent}%</span>
                        </div>
                      )}
                      {tipOption === "manual" && (
                        <div className="tip-manual-input">
                          <span>S/</span>
                          <input
                            type="number"
                            value={tipManual}
                            min="1"
                            step="0.1"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              // Validar que sea número positivo mayor o igual a 1
                              if (!isNaN(value) && value >= 1) {
                                setTipManual(value);
                              } else if (e.target.value === "") {
                                setTipManual(1); // Resetear a 1 si está vacío
                              }
                            }}
                            onBlur={(e) => {
                              if (
                                e.target.value === "" ||
                                parseFloat(e.target.value) < 1
                              ) {
                                setTipManual(1);
                                setErrors({
                                  ...errors,
                                  tipManual: "La propina mínima es S/1",
                                });
                              } else {
                                const { tipManual: _, ...rest } = errors;
                                setErrors(rest);
                              }
                            }}
                          />
                          {errors.tipManual && (
                            <p className="error-message">{errors.tipManual}</p>
                          )}
                        </div>
                      )}
                    </Card>
                  )}
                </div>
              )}
            </div>
            {/* Resumen del carrito */}
            <div className="cart-column">
              <Card title={"Resumen del Carrito"}>
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
                        <p className="item-quantity">
                          Cantidad: {item.quantity}
                        </p>
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
                    <span>
                      S/{" "}
                      {deliveryMethod === "delivery"
                        ? DELIVERY_FEE.toFixed(2)
                        : "0.00"}
                    </span>
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

                <Button onClick={handlePayment} disabled={!userInfo?.email}>
                  Pagar ahora
                </Button>
              </Card>
            </div>
          </div>
        ) : (
          <div className="p-auto">
            <Card>No hay productos en el carrito</Card>
          </div>
        )}
      </main>
    </>
  );
};

export default CartPage;
