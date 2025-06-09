package com.Login.Backend.entities;

public enum PaymentStatus {
    PENDING, // pago pendiente
    COMPLETED, // pago completado
    FAILED, // pago fallido
    REFUNDED, // devolucion de dinero
}
