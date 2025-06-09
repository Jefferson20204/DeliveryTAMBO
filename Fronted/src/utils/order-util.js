export const createOrderRequest = (
  cartItems,
  totalToPay,
  addressId,
  paymentMethod,
  invoiceType,
  docType,
  docNumber,
  billingAddress,
  businessName
) => {
  let request = {};
  request.orderDate = new Date().toISOString();
  request.addressId = addressId;

  let orderItems = [];
  cartItems?.map((item) => {
    orderItems.push({
      productId: item.id,
      discount: 0,
      quantity: item?.quantity,
    });
  });
  request.orderItemRequests = orderItems;
  request.totalAmount = totalToPay?.toFixed(2);
  request.discount = 0;
  request.paymentMethod = paymentMethod.toUpperCase();
  request.expectedDeliveryDate = "2025-10-05T21:11:46.202Z";
  //   request.currency = "usd";
  request.receiptType = invoiceType.toUpperCase();
  request.docType = docType;
  request.docNumber = docNumber;
  request.billingAddress = invoiceType === "factura" ? billingAddress : null;
  request.businessName = invoiceType === "factura" ? businessName : null;
  return request;
};

export const getStepCount = {
  PENDING: 1,
  IN_PROGRESS: 2,
  SHIPPED: 3,
  DELIVERED: 4,
};
