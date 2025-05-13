package com.Login.Backend.entities;

public enum DeliveryStatus {
    PENDING, // esperando asignación
    ASSIGNED, // repartidor asignado
    IN_TRANSIT, // en camino
    DELIVERED, // entregado
    CANCELLED // cancelado
}
