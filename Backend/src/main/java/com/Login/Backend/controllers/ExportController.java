package com.Login.Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Login.Backend.entities.Order;
import com.Login.Backend.services.ExportService;
import com.Login.Backend.services.OrderService;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    @Autowired
    private ExportService exportService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/all-orders/excel")
    public ResponseEntity<byte[]> exportExcel() throws Exception {
        List<Order> orders = orderService.getAllOrdersByDateDesc();
        byte[] excelBytes = exportService.exportAllOrdersToExcel(orders);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=orders.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excelBytes);
    }

}
