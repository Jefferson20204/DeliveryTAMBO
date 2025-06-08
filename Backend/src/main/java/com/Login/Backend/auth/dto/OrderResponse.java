package com.Login.Backend.auth.dto;

import java.util.UUID;

import com.Login.Backend.entities.PaymentMethod;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private UUID orderId;
    // private Map<String, String> credentials;
    private PaymentMethod paymentMethod;

}
