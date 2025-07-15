package com.amasarte.controller;

import com.amasarte.model.Cliente;
import com.amasarte.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String correo = loginData.get("correo");
        String password = loginData.get("password");

        Cliente cliente = clienteRepository.findByCorreoAndPassword(correo, password);
        if (cliente == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        return ResponseEntity.ok(cliente);
    }
}