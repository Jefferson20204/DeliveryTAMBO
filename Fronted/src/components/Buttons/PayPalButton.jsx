import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, currency = "USD", onApprove, onError }) => {
  const paypalOptions = {
    "client-id":
      "AdNXGCPmJ8hNO4QzQpgNLqzWMpE5WcccuiPsWRUCV07n79ckkZDTuwSoe628o2pky7fz4NRc0Cj_SZAL", // Client ID real
    currency: currency,
    "disable-funding": "card,credit", // Opcional: deshabilita métodos de pago
    "data-sdk-integration-source": "integrationbuilder_sc", // Para analytics
  };

  const buttonStyles = {
    layout: "vertical",
    color: "gold",
    shape: "rect",
    label: "paypal",
    height: 40,
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
