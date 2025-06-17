package com.Login.Backend.controllers;

<<<<<<< HEAD
=======
import com.Login.Backend.auth.dto.UserDetailsDto;
import com.Login.Backend.auth.entities.User;
import com.Login.Backend.auth.services.UserService;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
import com.Login.Backend.dto.ProductDTO;
import com.Login.Backend.services.ProductService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
=======
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminProductController {
    @Autowired
    private ProductService productService;

<<<<<<< HEAD
=======
    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
    // Obtener todos los productos para el administrador
    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID typeId,
            @RequestParam(required = false) String slug,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            HttpServletResponse response) {

        List<ProductDTO> productList = new ArrayList<>();

        if (StringUtils.isNotBlank(slug)) {
            ProductDTO productDto = productService.getProductBySlug(slug);
            productList.add(productDto);
        } else {
            productList = productService.getAllProducts(categoryId, typeId, name, minPrice, maxPrice, false);
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
<<<<<<< HEAD
=======

    @GetMapping("/users")
    public ResponseEntity<List<UserDetailsDto>> getAllUsers(Principal principal) {
        User user = (User) userDetailsService.loadUserByUsername(principal.getName());

        if (user == null
                || !user.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ADMIN"))) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        List<User> users = userService.getAllUsers();

        List<UserDetailsDto> userDetailsDtos = users.stream().map(u -> UserDetailsDto.builder()
                .firstName(u.getFirstName().trim())
                .lastName(u.getLastName().trim())
                .email(u.getEmail().trim())
                .profileImageUrl(u.getProfileImageUrl())
                .phoneNumber(u.getPhoneNumber())
                .authorityList(u.getAuthorities().stream()
                        .map(auth -> auth.getAuthority()).toList())
                .build()).toList();
        return new ResponseEntity<>(userDetailsDtos, HttpStatus.OK);
    }

    // @PostMapping("/update-rol-user")
    // public ResponseEntity<List<UserDetailsDto>> getAllUsers(Principal principal,
    // @RequestParam String email,
    // @RequestParam String role) {
    // try {
    // User admin = (User)
    // userDetailsService.loadUserByUsername(principal.getName());

    // if (admin == null
    // || !admin.getAuthorities().stream().anyMatch(auth ->
    // auth.getAuthority().equals("ADMIN"))) {
    // return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    // }

    // User user = userService.getUserFindByEmail(email);

    // if (user == null) {
    // return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    // user.setAuthorities(userService.);

    // return new ResponseEntity<>(HttpStatus.OK);

    // } catch (Exception e) {
    // return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    // }

    // }

>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
}
