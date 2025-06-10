export const createOrderRequest = (
  cartItems,
  deliveryMethod,
  totalToPay,
  latitude,
  longitude,
  paymentMethod,
  totalDiscount,
  invoiceType,
  docType,
  docNumber,
  billingAddress,
  businessName
) => {
  let request = {};
  request.orderDate = new Date().toISOString();
  request.latitude = latitude;
  request.longitude = longitude;

  let orderItems = [];
  cartItems?.map((item) => {
    orderItems.push({
      productId: item.id,
      discount: 0,
      quantity: item?.quantity,
    });
  });
  request.orderItemRequests = orderItems;
  request.deliveryMethod = deliveryMethod.toUpperCase();
  request.totalAmount = totalToPay?.toFixed(2);
  request.discount = totalDiscount.toFixed(2);
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
  PAID: 2,
  IN_PROGRESS: 3,
  SHIPPED: 4,
  DELIVERED: 5,
};
