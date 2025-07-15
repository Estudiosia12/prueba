package com.amasarte.repository;

import com.amasarte.model.Cliente;
import com.amasarte.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
