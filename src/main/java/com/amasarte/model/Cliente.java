package com.amasarte.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellidos;
    private String direccion;
    private String telefono;
    @Column(unique = true)
    private String correo;
    // Campos para login


    private String password;
}