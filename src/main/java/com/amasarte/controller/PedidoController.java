package com.amasarte.controller;

import com.amasarte.model.Cliente;
import com.amasarte.model.DetallePedido;
import com.amasarte.model.Pedido;
import com.amasarte.repository.ClienteRepository;
import com.amasarte.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final ClienteRepository clienteRepository;
    private final PedidoRepository pedidoRepository;

    public PedidoController(ClienteRepository clienteRepository, PedidoRepository pedidoRepository) {
        this.clienteRepository = clienteRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido) {
        Cliente clienteExistente = clienteRepository.findById(pedido.getCliente().getId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        pedido.setCliente(clienteExistente);
        pedido.setFecha(LocalDate.now());

        for (DetallePedido detalle : pedido.getDetalles()) {
            detalle.setPedido(pedido);
        }

        Pedido guardado = pedidoRepository.save(pedido);
        return ResponseEntity.ok(guardado);
    }
}