package com.Login.Backend.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {

    private UUID id;
    private String street;
    private String number;
    private String reference;
    private String district;
    private String province;
    private String department;
    private UUID userId;

}
