package com.Login.Backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private BigDecimal percentage;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Boolean isActive;

    @ManyToMany
    @JoinTable(name = "product_discounts", joinColumns = @JoinColumn(name = "discount_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products;
}
