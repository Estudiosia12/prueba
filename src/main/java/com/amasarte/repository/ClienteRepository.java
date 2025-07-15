package com.amasarte.repository;

import com.amasarte.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // Verifica si ya existe un cliente con ese correo
    boolean existsByCorreo(String correo);

    Cliente findByCorreoAndPassword(String correo, String password);
}
