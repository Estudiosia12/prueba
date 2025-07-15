package com.amasarte.controller;

import com.amasarte.model.Cliente;
import com.amasarte.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/registro")
    public Cliente registrarCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }
}