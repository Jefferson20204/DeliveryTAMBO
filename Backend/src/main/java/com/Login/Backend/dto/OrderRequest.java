package com.Login.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.Login.Backend.entities.PaymentMethod;
import com.Login.Backend.entities.ReceiptType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private UUID userId;
    private Date orderDate;
    private UUID addressId;
    private List<OrderItemRequest> orderItemRequests;
    private Double totalAmount;
    private Double discount;
    private PaymentMethod paymentMethod;
    private Date expectedDeliveryDate;
    private ReceiptType receiptType;
    private String ruc;
    private String razonSocial;

}
