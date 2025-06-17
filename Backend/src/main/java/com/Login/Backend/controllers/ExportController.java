package com.Login.Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< HEAD
import com.Login.Backend.entities.Order;
import com.Login.Backend.services.ExportService;
import com.Login.Backend.services.OrderService;
=======
import com.Login.Backend.dto.ProductDTO;
import com.Login.Backend.entities.Order;
import com.Login.Backend.services.ExportService;
import com.Login.Backend.services.OrderService;
import com.Login.Backend.services.ProductService;
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60

@RestController
@RequestMapping("/api/export")
public class ExportController {

    @Autowired
    private ExportService exportService;

    @Autowired
    private OrderService orderService;

<<<<<<< HEAD
    @GetMapping("/all-orders/excel")
    public ResponseEntity<byte[]> exportExcel() throws Exception {
=======
    @Autowired
    private ProductService productService;

    @GetMapping("/all-orders/excel")
    public ResponseEntity<byte[]> exportAllOrdersExcel() throws Exception {
>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
        List<Order> orders = orderService.getAllOrdersByDateDesc();
        byte[] excelBytes = exportService.exportAllOrdersToExcel(orders);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=orders.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelBytes);
    }

<<<<<<< HEAD
=======
    @GetMapping("/all-products/excel")
    public ResponseEntity<byte[]> exportAllProductsExcel() throws Exception {
        List<ProductDTO> product = productService.getAllProducts(null, null, null, null, null, false);
        byte[] excelBytes = exportService.exportAllProductsExcel(product);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=product.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelBytes);
    }

>>>>>>> e87fda2524a0265c9281c2166a4703b61369ad60
}
