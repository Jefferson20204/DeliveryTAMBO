package com.Login.Backend.services;

import java.security.Principal;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Login.Backend.auth.dto.OrderResponse;
import com.Login.Backend.auth.entities.User;
<<<<<<< HEAD
import com.Login.Backend.dto.AddressDTO;
import com.Login.Backend.dto.OrderDetails;
import com.Login.Backend.dto.OrderItemDetail;
import com.Login.Backend.dto.OrderRequest;
import com.Login.Backend.entities.Address;
=======
import com.Login.Backend.dto.OrderDetails;
import com.Login.Backend.dto.OrderItemDetail;
import com.Login.Backend.dto.OrderRequest;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
import com.Login.Backend.entities.Order;
import com.Login.Backend.entities.OrderItem;
import com.Login.Backend.entities.OrderStatus;
import com.Login.Backend.entities.Payment;
import com.Login.Backend.entities.PaymentStatus;
import com.Login.Backend.entities.Product;
import com.Login.Backend.mapper.ProductMapper;
import com.Login.Backend.repositories.OrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    ProductMapper productMapper;

    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest, Principal principal) throws Exception {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

<<<<<<< HEAD
        Address address = user.getAddressList().stream()
                .filter(address1 -> orderRequest.getAddressId().equals(address1.getId())).findFirst().orElse(null);
=======
        // Address address = user.getAddressList().stream()
        // .filter(address1 ->
        // orderRequest.getAddressId().equals(address1.getId())).findFirst().orElse(null);
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
        // .orElseThrow(BadRequestException::new);

        Order order = Order.builder()
                .orderDate(orderRequest.getOrderDate())
                .user(user)
<<<<<<< HEAD
                .address(address != null ? address : null)
=======
                // .address(address != null ? address : null)
                .latitude(orderRequest.getLatitude())
                .longitude(orderRequest.getLongitude())
                .deliveryMethod(orderRequest.getDeliveryMethod())
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
                .totalAmount(orderRequest.getTotalAmount())
                .orderStatus(OrderStatus.PENDING)
                .paymentMethod(orderRequest.getPaymentMethod())
                .expectedDeliveryDate(orderRequest.getExpectedDeliveryDate())
                .discount(orderRequest.getDiscount())
                .receiptType(orderRequest.getReceiptType())
                .docType(orderRequest.getDocType())
                .docNumber(orderRequest.getDocNumber())
                .ruc(orderRequest.getBillingAddress())
                .razonSocial(orderRequest.getBusinessName())
                .build();

        List<OrderItem> orderItems = orderRequest.getOrderItemRequests().stream().map(orderItemRequest -> {
            try {
                Product product = productService.getProductEntityById(orderItemRequest.getProductId());
                OrderItem orderItem = OrderItem.builder()
                        .product(product)
                        .quantity(orderItemRequest.getQuantity())
                        .order(order)
                        .build();
                return orderItem;
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();

        order.setOrderItemList(orderItems);

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentDate(new Date());
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod(order.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.PENDING);
        order.setPayment(payment);

        Order savedOrder = orderRepository.save(order);

        OrderResponse orderResponse = OrderResponse.builder()
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderId(savedOrder.getId())
                .build();

        return orderResponse;

    }

    @Transactional
<<<<<<< HEAD
    public void updateOrderStatus(UUID orderId, OrderStatus status, String transactionId) throws Exception {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new BadRequestException("Orden no encontrada"));

            // Validación adicional del estado
            if (status == null) {
                throw new IllegalArgumentException("El estado no puede ser nulo");
            }

            order.setOrderStatus(status);

            // Actualizar el pago asociado
            if (order.getPayment() != null) {
                Payment payment = order.getPayment();
                payment.setPaymentStatus(
                        status == OrderStatus.PAID ? PaymentStatus.COMPLETED
                                : status == OrderStatus.CANCELLED ? PaymentStatus.REFUNDED : PaymentStatus.FAILED);

                if (transactionId != null) {
                    payment.setTransactionId(transactionId);
                }

                payment.setPaymentDate(new Date());
            }

            orderRepository.save(order);

        } catch (Exception e) {
            throw new IllegalArgumentException("PaymentIntent not found or missing metadata");
=======
    public void updateOrderStatus(UUID orderId, OrderStatus status, String transactionId) {
        try {
            // 1. Validar parámetros
            if (orderId == null) {
                throw new IllegalArgumentException("ID de orden no puede ser nulo");
            }

            if (status == null) {
                throw new IllegalArgumentException("Estado no puede ser nulo");
            }

            // 2. Obtener la orden
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new BadRequestException("Orden no encontrada"));

            // 3. Validar transición de estado
            if (!isValidStatusTransition(order.getOrderStatus(), status)) {
                throw new IllegalStateException("Transición de estado no permitida");
            }

            // 4. Actualizar estado
            order.setOrderStatus(status);

            // 5. Actualizar pago si existe
            if (order.getPayment() != null) {
                updatePaymentStatus(order.getPayment(), status, transactionId);
            }

            orderRepository.save(order);
        } catch (Exception e) {
            System.out.println("Error al actualizar el estado de la ordern: " + e.getMessage());
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
        }

    }

<<<<<<< HEAD
=======
    private void updatePaymentStatus(Payment payment, OrderStatus status, String transactionId) {
        PaymentStatus paymentStatus = switch (status) {
            case PAID -> PaymentStatus.COMPLETED;
            case CANCELLED -> PaymentStatus.REFUNDED;
            default -> PaymentStatus.FAILED;
        };

        payment.setPaymentStatus(paymentStatus);

        if (transactionId != null) {
            payment.setTransactionId(transactionId);
        }

        payment.setPaymentDate(new Date());
    }

    private boolean isValidStatusTransition(OrderStatus current, OrderStatus newStatus) {
        // Implementa tu lógica de transiciones permitidas aquí
        // Ejemplo básico:
        if (newStatus == OrderStatus.CANCELLED) {
            return current == OrderStatus.PENDING || current == OrderStatus.PAID;
        }
        return true;
    }

>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    // Método adicional para obtener la orden
    public Order getOrderById(UUID orderId) {
        return orderRepository.findById(orderId)
                .orElse(null);
    }

    @Transactional(readOnly = true)
    public List<OrderDetails> getOrdersByUser(String email) {
        try {
            User user = (User) userDetailsService.loadUserByUsername(email);
            if (user == null) {
                throw new IllegalArgumentException("Usuario no encontrado");
            }

            return orderRepository.findByUserWithItemsAndAddress(user).stream()
                    .map(this::convertToOrderDetails)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("Error al obtener órdenes del usuario: {}", email, e);
            throw new RuntimeException("Error al recuperar las órdenes", e);
        }
    }

    private OrderDetails convertToOrderDetails(Order order) {
        return OrderDetails.builder()
                .id(order.getId())
                .orderDate(order.getOrderDate())
                .orderStatus(order.getOrderStatus())
                .shipmentNumber(order.getShipmentTrackingNumber())
<<<<<<< HEAD
                .address(convertToAddressDto(order.getAddress()))
=======
                .latitude(order.getLatitude())
                .longitude(order.getLongitude())
                // .address(convertToAddressDto(order.getAddress()))
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
                .totalAmount(order.getTotalAmount())
                .orderItemList(convertToItemDetails(order.getOrderItemList()))
                .expectedDeliveryDate(order.getExpectedDeliveryDate())
                .build();
    }

<<<<<<< HEAD
    private AddressDTO convertToAddressDto(Address address) {
        if (address == null)
            return null;

        return AddressDTO.builder()
                .id(address.getId())
                .alias(address.getAlias())
                .address(address.getFullAddress())
                .district(address.getDistrict())
                .city(address.getCity())
                .country(address.getCountry())
                .isPrimary(address.getIsPrimary())
                .build();
    }

=======
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    private List<OrderItemDetail> convertToItemDetails(List<OrderItem> items) {
        if (items == null || items.isEmpty()) {
            return Collections.emptyList();
        }

        return items.stream()
                .map(this::convertToItemDetail)
                .collect(Collectors.toList());
    }

    private OrderItemDetail convertToItemDetail(OrderItem item) {
        return OrderItemDetail.builder()
                .id(item.getId())
                .product(item.getProduct())
                .quantity(item.getQuantity())
                .itemPrice(item.getItemPrice())
                .build();
    }

    public List<Order> getAllOrdersByDateDesc() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }
<<<<<<< HEAD
=======

    public boolean canOrderBeCancelled(UUID orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            return false;
        }

        // Verifica si el estado de la order es PENDING O PAID
        return order.getOrderStatus() == OrderStatus.PENDING || order.getOrderStatus() == OrderStatus.PAID;
    }
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
}
