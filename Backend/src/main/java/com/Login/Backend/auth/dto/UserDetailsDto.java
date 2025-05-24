package com.Login.Backend.auth.dto;

import com.Login.Backend.entities.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDto {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private List<String> authorityList;
    private List<Address> addressList;
}
