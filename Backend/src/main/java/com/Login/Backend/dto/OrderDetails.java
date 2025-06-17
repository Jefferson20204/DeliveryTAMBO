package com.Login.Backend.dto;

import com.Login.Backend.entities.OrderStatus;
<<<<<<< HEAD
=======

>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetails {

    private UUID id;
    private Date orderDate;
<<<<<<< HEAD
    private AddressDTO address;
=======
    private Double latitude;
    private Double longitude;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    private Double totalAmount;
    private OrderStatus orderStatus;
    private String shipmentNumber;
    private Date expectedDeliveryDate;
    private List<OrderItemDetail> orderItemList;

}
