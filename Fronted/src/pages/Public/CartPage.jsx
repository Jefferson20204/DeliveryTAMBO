import { useSelector } from "react-redux";
import "./CartPage.css";

const DELIVERY_FEE = 5.0;

const CartPage = () => {
  const cartItems = useSelector((state) => state.cartState.cart);

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

  const totalToPay = totalWithDiscount + DELIVERY_FEE;

  return (
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
                ${item.price.toFixed(2) * item.quantity}
              </p>
              {item.price < item.priceOriginal && (
                <p className="item-price-original">
                  ${item.priceOriginal.toFixed(2) * item.quantity}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-item">
          <span>Total de productos:</span>
          <span>${totalProducts.toFixed(2)}</span>
        </div>

        <div className="summary-item">
          <span>Total descuento:</span>
          <span>- ${totalDiscount.toFixed(2)}</span>
        </div>

        <div className="summary-item">
          <span>Precio por despacho:</span>
          <span>${DELIVERY_FEE.toFixed(2)}</span>
        </div>

        <div className="summary-item total">
          <span>Total a pagar:</span>
          <span>${totalToPay.toFixed(2)}</span>
        </div>
      </div>

      {/* Próximamente: dirección y método de pago */}
    </div>
  );
};

export default CartPage;
