package com.Login.Backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    // Endpoint para probar la conexión
    @GetMapping(value = "/get")
    public String test() {
        return "test ok";
    }
}
