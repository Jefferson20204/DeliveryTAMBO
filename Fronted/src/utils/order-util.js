export const createOrderRequest = (
  cartItems,
<<<<<<< HEAD
  totalToPay,
  addressId,
  paymentMethod,
=======
  deliveryMethod,
  totalToPay,
  latitude,
  longitude,
  paymentMethod,
  totalDiscount,
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
  invoiceType,
  docType,
  docNumber,
  billingAddress,
  businessName
) => {
  let request = {};
  request.orderDate = new Date().toISOString();
<<<<<<< HEAD
  request.addressId = addressId;
=======
  request.latitude = latitude;
  request.longitude = longitude;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

  let orderItems = [];
  cartItems?.map((item) => {
    orderItems.push({
      productId: item.id,
      discount: 0,
      quantity: item?.quantity,
    });
  });
  request.orderItemRequests = orderItems;
<<<<<<< HEAD
  request.totalAmount = totalToPay?.toFixed(2);
  request.discount = 0;
=======
  request.deliveryMethod = deliveryMethod.toUpperCase();
  request.totalAmount = totalToPay?.toFixed(2);
  request.discount = totalDiscount.toFixed(2);
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
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
<<<<<<< HEAD
  IN_PROGRESS: 2,
  SHIPPED: 3,
  DELIVERED: 4,
=======
  PAID: 2,
  IN_PROGRESS: 3,
  SHIPPED: 4,
  DELIVERED: 5,
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
};
