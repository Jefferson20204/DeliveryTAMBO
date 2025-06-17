package com.Login.Backend.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Login.Backend.auth.entities.User;
import com.Login.Backend.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    // Obtener todas las ordenes por usuario
    List<Order> findByUser(User user);

    // Obtener todas las órdenes ordenadas por fecha (más reciente primero)
    List<Order> findAllByOrderByOrderDateDesc();

    @Query("SELECT DISTINCT o FROM Order o " +
            "LEFT JOIN FETCH o.orderItemList items " +
<<<<<<< HEAD
            "LEFT JOIN FETCH o.address " +
=======
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
            "WHERE o.user = :user " +
            "ORDER BY o.orderDate DESC")
    List<Order> findByUserWithItemsAndAddress(@Param("user") User user);
}
