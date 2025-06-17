import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, currency = "USD", onApprove, onError }) => {
  const paypalOptions = {
    "client-id":
<<<<<<< HEAD
      "AdNXGCPmJ8hNO4QzQpgNLqzWMpE5WcccuiPsWRUCV07n79ckkZDTuwSoe628o2pky7fz4NRc0Cj_SZAL", // Reemplaza con tu Client ID real
=======
      "AdNXGCPmJ8hNO4QzQpgNLqzWMpE5WcccuiPsWRUCV07n79ckkZDTuwSoe628o2pky7fz4NRc0Cj_SZAL", // Client ID real
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    currency: currency,
    "disable-funding": "card,credit", // Opcional: deshabilita métodos de pago
    "data-sdk-integration-source": "integrationbuilder_sc", // Para analytics
  };

  const buttonStyles = {
    layout: "vertical",
    color: "gold",
<<<<<<< HEAD
    shape: "rect",
    label: "paypal",
    height: 40,
=======
    label: "pay",
    height: 55,
    shape: "pill",
    disableMaxWidth: true,
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={buttonStyles}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: currency,
                  breakdown: {
                    item_total: {
                      value: amount.toFixed(2),
                      currency_code: currency,
                    },
                  },
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          return actions.order.capture().then(() => {
            onApprove(data);
          });
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
