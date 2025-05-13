package com.Login.Backend.controllers;

import com.Login.Backend.dto.ProductDTO;
import com.Login.Backend.services.ProductService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminProductController {
    @Autowired
    private ProductService productService;

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
}
